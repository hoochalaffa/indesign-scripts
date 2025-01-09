/*
 * This script analyzes links in all currently open Adobe InDesign documents.
 * 
 * - Checks for open documents: If no documents are open, it alerts the user.
 * 
 * - Collects link information: For each document, it gathers data on all links,
 *   including how many times each link appears and the pages or master spreads
 *   where they are used.
 * 
 * - Creates a report: Compiles the link information into a CSV file, which can
 *   be opened in spreadsheet programs like Excel. The report includes the link's
 *   file path, appearance count, and usage pages.
 * 
 * - Saves the report: The CSV file is saved to the desktop as "link_audit_results.csv".
 * 
 * - Notifies the user: Provides a summary of the total number of links found and
 *   the count of unique links via a pop-up message.
 */
if (app.documents.length > 0) {
    var linkData = {}; // Object to store link information

    // Loop through each open document
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex]; // Get the current document

        // Loop through each link in the document
        for (var linkIndex = 0; linkIndex < doc.links.length; linkIndex++) {
            var link = doc.links[linkIndex]; // Get the current link
            var linkPath = link.filePath; // Get the file path of the link

            // Initialize link data if not already present
            if (!linkData[linkPath]) {
                linkData[linkPath] = {
                    count: 0,
                    pages: []
                };
            }

            // Increment the count of the link
            linkData[linkPath].count++;

            // Get the page or master spread number where the link appears
            var pageNumber = null;
            try {
                var parent = link.parent;
                var page = null;

                // Check if the link is on a page
                if (parent.hasOwnProperty('parentPage') && parent.parentPage !== null) {
                    page = parent.parentPage;
                }

                // If not on a page, check if it's on a master spread
                if (!page && parent.hasOwnProperty('parent') && parent.parent.hasOwnProperty('appliedMaster')) {
                    page = parent.parent.appliedMaster;
                }

                if (page) {
                    pageNumber = page.name; // Get the page or master spread name (number)
                }
            } catch (e) {
                // Handle cases where the link does not have a parent page or master spread
                pageNumber = "Unknown";
            }

            // Add the page number to the pages array if not already present
            if (pageNumber) {
                var pageExists = false;
                for (var i = 0; i < linkData[linkPath].pages.length; i++) {
                    if (linkData[linkPath].pages[i] === pageNumber) {
                        pageExists = true;
                        break;
                    }
                }
                if (!pageExists) {
                    linkData[linkPath].pages.push(pageNumber);
                }
            }
        }
    }

    // Prepare CSV content
    var csvContent = "Link,Count,Pages\n";
    for (var path in linkData) {
        if (linkData.hasOwnProperty(path)) {
            csvContent += "\"" + path + "\"," + linkData[path].count + ",\"" + linkData[path].pages.join(", ") + "\"\n";
        }
    }

    // Save the CSV content to a file
    var file = new File("~/Desktop/link_audit_results.csv");
    file.encoding = "UTF-8";
    file.open("w");
    file.write(csvContent);
    file.close();

    // Alert the user that the task is complete and summarize the results
    var totalLinks = 0;
    var uniqueLinks = 0;
    for (var path in linkData) {
        if (linkData.hasOwnProperty(path)) {
            totalLinks += linkData[path].count;
            uniqueLinks++;
        }
    }
    alert("Task complete. Total links found: " + totalLinks + ". Unique links: " + uniqueLinks + ".");
} else {
    alert("No open documents to process."); // Alert the user if there are no open documents
}
