if (app.documents.length > 0) {
    var paragraphStylesInUse = {};

    // First loop: Collect all used paragraph style IDs across all documents
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex];

        for (var i = 0; i < doc.textFrames.length; i++) {
            var textFrame = doc.textFrames[i];
            for (var j = 0; j < textFrame.paragraphs.length; j++) {
                var paragraph = doc.textFrames[i].paragraphs[j];
                if (paragraph.appliedParagraphStyle !== null) {
                    var styleId = paragraph.appliedParagraphStyle.id;
                    paragraphStylesInUse[styleId] = paragraph.appliedParagraphStyle.name;
                }
            }
        }
    }

    // Convert the object to an array of unique names
    var paragraphStyleNames = [];
    for (var id in paragraphStylesInUse) {
        if (paragraphStylesInUse.hasOwnProperty(id)) {
            // Check for uniqueness manually
            var isUnique = true;
            for (var k = 0; k < paragraphStyleNames.length; k++) {
                if (paragraphStyleNames[k] === paragraphStylesInUse[id]) {
                    isUnique = false;
                    break;
                }
            }
            if (isUnique) {
                paragraphStyleNames.push(paragraphStylesInUse[id]);
            }
        }
    }

    // Sort the names alphabetically
    paragraphStyleNames.sort();

    // Alert the user with the list of paragraph style names
    alert("Paragraph Styles in Use:\n" + paragraphStyleNames.join("\n"));

    // Loop through each open document and remove unused paragraph styles
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex];
        var docParagraphStyleNames = [];

        // Collect all paragraph style names in the current document
        for (var k = 0; k < doc.paragraphStyles.length; k++) {
            docParagraphStyleNames.push(doc.paragraphStyles[k].name);
        }

        // Identify paragraph styles in the document that are also in paragraphStylesInUse
        var usedParagraphStyleNames = [];
        for (var m = 0; m < docParagraphStyleNames.length; m++) {
            var styleName = docParagraphStyleNames[m];
            var isFound = false;
            for (var n = 0; n < paragraphStyleNames.length; n++) {
                if (paragraphStyleNames[n] === styleName) {
                    isFound = true;
                    break;
                }
            }
            if (isFound) {
                usedParagraphStyleNames.push(styleName);
            }
        }

        // Remove paragraph styles not found in paragraphStylesInUse
        for (var k = doc.paragraphStyles.length - 1; k >= 0; k--) {
            var paragraphStyle = doc.paragraphStyles[k];
            var isUsed = false;
            for (var p = 0; p < usedParagraphStyleNames.length; p++) {
                if (usedParagraphStyleNames[p] === paragraphStyle.name) {
                    isUsed = true;
                    break;
                }
            }
            if (!isUsed && paragraphStyle.name !== "[None]") {
                try {
                    paragraphStyle.remove();
                } catch (e) {
                    // Log the error or handle it as needed, but continue with the next style
                    $.writeln("Could not remove paragraph style: " + paragraphStyle.name + ". Error: " + e);
                }
            }
        }
    }
} else {
    alert("No open documents to process.");
}
