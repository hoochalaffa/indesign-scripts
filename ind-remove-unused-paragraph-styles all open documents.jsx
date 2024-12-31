// This script processes all open documents in Adobe InDesign to identify and remove unused paragraph styles.
// It first collects all paragraph styles that are currently in use across all documents.
// Then, it removes any paragraph styles that are not in use, except for the default "[None]" style.

if (app.documents.length > 0) { // Check if there are any open documents
    var paragraphStylesInUse = {}; // Object to store IDs and names of paragraph styles in use

    // First loop: Iterate over each document to collect used paragraph style IDs and names
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex]; // Get the current document

        // Iterate over each text frame in the document
        for (var i = 0; i < doc.textFrames.length; i++) {
            var textFrame = doc.textFrames[i]; // Get the current text frame

            // Iterate over each paragraph in the text frame
            for (var j = 0; j < textFrame.paragraphs.length; j++) {
                var paragraph = textFrame.paragraphs[j]; // Get the current paragraph

                // Check if the paragraph has an applied paragraph style
                if (paragraph.appliedParagraphStyle !== null) {
                    var styleId = paragraph.appliedParagraphStyle.id; // Get the style ID
                    paragraphStylesInUse[styleId] = paragraph.appliedParagraphStyle.name; // Store the style ID and name
                }
            }
        }
    }

    // Convert the object to an array of unique paragraph style names
    var paragraphStyleNames = [];
    for (var id in paragraphStylesInUse) {
        if (paragraphStylesInUse.hasOwnProperty(id)) { // Ensure the property belongs to the object
            // Check for uniqueness of the style name manually
            var isUnique = true;
            for (var k = 0; k < paragraphStyleNames.length; k++) {
                if (paragraphStyleNames[k] === paragraphStylesInUse[id]) {
                    isUnique = false; // Mark as not unique if already present
                    break;
                }
            }
            if (isUnique) {
                paragraphStyleNames.push(paragraphStylesInUse[id]); // Add unique style name to the array
            }
        }
    }

    // Sort the paragraph style names alphabetically
    paragraphStyleNames.sort();

    // Alert the user with the list of paragraph style names currently in use
    alert("Paragraph Styles in Use:\n" + paragraphStyleNames.join("\n"));

    // Second loop: Iterate over each document to remove unused paragraph styles
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex]; // Get the current document
        var docParagraphStyleNames = []; // Array to store all paragraph style names in the current document

        // Collect all paragraph style names in the current document
        for (var k = 0; k < doc.paragraphStyles.length; k++) {
            docParagraphStyleNames.push(doc.paragraphStyles[k].name); // Add style name to the array
        }

        // Identify paragraph styles in the document that are also in paragraphStylesInUse
        var usedParagraphStyleNames = [];
        for (var m = 0; m < docParagraphStyleNames.length; m++) {
            var styleName = docParagraphStyleNames[m]; // Get the current style name
            var isFound = false; // Flag to check if the style is found in the used styles

            // Check if the current style name is in the list of used style names
            for (var n = 0; n < paragraphStyleNames.length; n++) {
                if (paragraphStyleNames[n] === styleName) {
                    isFound = true; // Mark as found if present
                    break;
                }
            }
            if (isFound) {
                usedParagraphStyleNames.push(styleName); // Add found style name to the array
            }
        }

        // Remove paragraph styles not found in paragraphStylesInUse
        for (var k = doc.paragraphStyles.length - 1; k >= 0; k--) {
            var paragraphStyle = doc.paragraphStyles[k]; // Get the current paragraph style
            var isUsed = false; // Flag to check if the style is used

            // Check if the current style name is in the list of used style names
            for (var p = 0; p < usedParagraphStyleNames.length; p++) {
                if (usedParagraphStyleNames[p] === paragraphStyle.name) {
                    isUsed = true; // Mark as used if present
                    break;
                }
            }
            // Remove the style if it is not used and is not the default "[None]" style
            if (!isUsed && paragraphStyle.name !== "[None]") {
                try {
                    paragraphStyle.remove(); // Attempt to remove the unused style
                } catch (e) {
                    // Log the error or handle it as needed, but continue with the next style
                    $.writeln("Could not remove paragraph style: " + paragraphStyle.name + ". Error: " + e);
                }
            }
        }
    }
} else {
    alert("No open documents to process."); // Alert the user if there are no open documents
}
