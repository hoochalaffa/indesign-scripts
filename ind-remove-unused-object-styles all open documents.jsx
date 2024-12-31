// This script processes all open documents in Adobe InDesign to identify and remove unused object styles.
// It first collects all object styles that are currently in use across all documents, including those in anchored objects and groups.
// Then, it removes any object styles that are not in use, except for the default "[None]" style.

if (app.documents.length > 0) { // Check if there are any open documents
    var objectStylesInUse = {}; // Object to store IDs and names of object styles in use

    // First loop: Iterate over each document to collect used object style IDs and names
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex]; // Get the current document

        // Function to check object styles in a page item or group
        function checkObjectStyles(item) {
            if (item.appliedObjectStyle !== null) {
                var styleId = item.appliedObjectStyle.id; // Get the style ID
                var styleName = item.appliedObjectStyle.name; // Get the style name
                objectStylesInUse[styleId] = styleName; // Store the style ID and name
            }
            // If the item is a group, iterate through its items
            if (item instanceof Group) {
                for (var g = 0; g < item.pageItems.length; g++) {
                    checkObjectStyles(item.pageItems[g]);
                }
            }
        }

        // Iterate over each page item in the document
        for (var i = 0; i < doc.pageItems.length; i++) {
            var pageItem = doc.pageItems[i]; // Get the current page item
            checkObjectStyles(pageItem);
        }

        // Iterate over each story in the document to find anchored objects
        for (var j = 0; j < doc.stories.length; j++) {
            var story = doc.stories[j]; // Get the current story
            for (var k = 0; k < story.pageItems.length; k++) {
                var anchoredItem = story.pageItems[k]; // Get the anchored item
                checkObjectStyles(anchoredItem);
            }
        }
    }

    // Convert the object to an array of unique object style names
    var objectStyleNames = [];
    for (var id in objectStylesInUse) {
        if (objectStylesInUse.hasOwnProperty(id)) { // Ensure the property belongs to the object
            // Check for uniqueness of the style name manually
            var isUnique = true;
            for (var l = 0; l < objectStyleNames.length; l++) {
                if (objectStyleNames[l] === objectStylesInUse[id]) {
                    isUnique = false; // Mark as not unique if already present
                    break;
                }
            }
            if (isUnique) {
                objectStyleNames.push(objectStylesInUse[id]); // Add unique style name to the array
            }
        }
    }

    // Sort the object style names alphabetically
    objectStyleNames.sort();

    // Alert the user with the list of object style names currently in use
    alert("Object Styles in Use:\n" + objectStyleNames.join("\n"));

    // Second loop: Iterate over each document to remove unused object styles
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex]; // Get the current document

        // Iterate over each object style in the document in reverse order
        for (var m = doc.objectStyles.length - 1; m >= 0; m--) {
            var objectStyle = doc.objectStyles[m]; // Get the current object style
            var isUsed = false; // Flag to check if the style is used

            // Check if the current style name is in the list of used style names
            for (var n = 0; n < objectStyleNames.length; n++) {
                if (objectStyleNames[n] === objectStyle.name) {
                    isUsed = true; // Mark as used if found
                    break;
                }
            }

            // Remove the object style if it is not used and is not the default "[None]" style
            if (!isUsed && objectStyle.name !== "[None]") {
                objectStyle.remove();
            }
        }
    }
} else {
    alert("No open documents to process."); // Alert the user if there are no open documents
}
