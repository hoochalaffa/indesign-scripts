// This script processes all open documents in Adobe InDesign to identify and remove unused character styles.
// It first collects all character styles that are currently in use across all documents.
// Then, it removes any character styles that are not in use, except for the default "[None]" style.

if (app.documents.length > 0) { // Check if there are any open documents
    var characterStylesInUse = {}; // Object to store IDs and names of character styles in use

    // First loop: Iterate over each document to collect used character style IDs and names
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex]; // Get the current document

        // Iterate over each story in the document
        for (var i = 0; i < doc.stories.length; i++) {
            var story = doc.stories[i]; // Get the current story

            // Iterate over each character in the story
            for (var j = 0; j < story.characters.length; j++) {
                var character = story.characters[j]; // Get the current character

                // Check if the character has an applied character style
                if (character.appliedCharacterStyle !== null) {
                    var styleId = character.appliedCharacterStyle.id; // Get the style ID
                    var styleName = character.appliedCharacterStyle.name; // Get the style name
                    characterStylesInUse[styleId] = styleName; // Store the style ID and name
                }
            }
        }
    }

    // Convert the object to an array of unique character style names
    var characterStyleNames = [];
    for (var id in characterStylesInUse) {
        if (characterStylesInUse.hasOwnProperty(id)) { // Ensure the property belongs to the object
            // Check for uniqueness of the style name manually
            var isUnique = true;
            for (var k = 0; k < characterStyleNames.length; k++) {
                if (characterStyleNames[k] === characterStylesInUse[id]) {
                    isUnique = false; // Mark as not unique if already present
                    break;
                }
            }
            if (isUnique) {
                characterStyleNames.push(characterStylesInUse[id]); // Add unique style name to the array
            }
        }
    }

    // Sort the character style names alphabetically
    characterStyleNames.sort();

    // Alert the user with the list of character style names currently in use
    alert("Character Styles in Use:\n" + characterStyleNames.join("\n"));

    // Second loop: Iterate over each document to remove unused character styles
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex]; // Get the current document

        // Iterate over each character style in the document in reverse order
        for (var k = doc.characterStyles.length - 1; k >= 0; k--) {
            var characterStyle = doc.characterStyles[k]; // Get the current character style
            var isUsed = false; // Flag to check if the style is used

            // Check if the current style name is in the list of used style names
            for (var n = 0; n < characterStyleNames.length; n++) {
                if (characterStyleNames[n] === characterStyle.name) {
                    isUsed = true; // Mark as used if found
                    break;
                }
            }

            // Remove the character style if it is not used and is not the default "[None]" style
            if (!isUsed && characterStyle.name !== "[None]") {
                characterStyle.remove();
            }
        }
    }
} else {
    alert("No open documents to process."); // Alert the user if there are no open documents
}
