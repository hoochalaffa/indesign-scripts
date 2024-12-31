// This script processes all open documents in Adobe InDesign to identify and remove unused master spreads.
// It first collects all master spreads that are currently in use across all documents.
// Then, it removes any master spreads that are not in use.

if (app.documents.length > 0) { // Check if there are any open documents
    var masterSpreadsInUse = {}; // Object to store IDs and names of master spreads in use

    // First loop: Iterate over each document to collect used master spread IDs and names
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex]; // Get the current document

        // Iterate over each page in the document to collect used master spread IDs
        for (var i = 0; i < doc.pages.length; i++) {
            var page = doc.pages[i]; // Get the current page
            if (page.appliedMaster !== null) { // Check if the page has an applied master spread
                masterSpreadsInUse[page.appliedMaster.id] = page.appliedMaster.name; // Store the master spread ID and name
            }
        }

        // Iterate over each master spread in the document to collect used master spread IDs
        for (var j = 0; j < doc.masterSpreads.length; j++) {
            var masterSpread = doc.masterSpreads[j]; // Get the current master spread
            if (masterSpread.appliedMaster !== null) { // Check if the master spread has an applied master spread
                masterSpreadsInUse[masterSpread.appliedMaster.id] = masterSpread.appliedMaster.name; // Store the master spread ID and name
            }
        }
    }

    // Convert the object to an array of unique master spread names
    var masterSpreadNames = [];
    for (var id in masterSpreadsInUse) {
        if (masterSpreadsInUse.hasOwnProperty(id)) { // Ensure the property belongs to the object
            // Check for uniqueness of the master spread name manually
            var isUnique = true;
            for (var k = 0; k < masterSpreadNames.length; k++) {
                if (masterSpreadNames[k] === masterSpreadsInUse[id]) {
                    isUnique = false; // Mark as not unique if already present
                    break;
                }
            }
            if (isUnique) {
                masterSpreadNames.push(masterSpreadsInUse[id]); // Add unique master spread name to the array
            }
        }
    }

    // Sort the master spread names alphabetically
    masterSpreadNames.sort();

    // Alert the user with the list of master spread names currently in use
    alert("Master Spreads in Use:\n" + masterSpreadNames.join("\n"));

    // Second loop: Iterate over each document to remove unused master spreads
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex]; // Get the current document

        // Iterate over each master spread in the document in reverse order
        for (var j = doc.masterSpreads.length - 1; j >= 0; j--) {
            var masterSpread = doc.masterSpreads[j]; // Get the current master spread
            if (masterSpread.name) { // Check if the master spread has a name
                var found = false; // Flag to check if the master spread is used
                // Check if the current master spread name is in the list of used master spread names
                for (var k = 0; k < masterSpreadNames.length; k++) {
                    if (masterSpreadNames[k] === masterSpread.name) {
                        found = true; // Mark as found if the name is in use
                        break;
                    }
                }
                if (!found) {
                    masterSpread.remove(); // Remove the master spread if it is not in use
                }
            }
        }
    }
} else {
    alert("No open documents to process."); // Alert the user if there are no open documents
}