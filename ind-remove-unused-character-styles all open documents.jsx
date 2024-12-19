if (app.documents.length > 0) {
    var characterStylesInUse = {};

    // First loop: Collect all used character style IDs and names across all documents
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex];

        for (var i = 0; i < doc.stories.length; i++) {
            var story = doc.stories[i];
            for (var j = 0; j < story.characters.length; j++) {
                var character = story.characters[j];
                if (character.appliedCharacterStyle !== null) {
                    var styleId = character.appliedCharacterStyle.id;
                    var styleName = character.appliedCharacterStyle.name;
                    characterStylesInUse[styleId] = styleName;
                }
            }
        }
    }

    // Convert the object to an array of unique names
    var characterStyleNames = [];
    for (var id in characterStylesInUse) {
        if (characterStylesInUse.hasOwnProperty(id)) {
            // Check for uniqueness manually
            var isUnique = true;
            for (var k = 0; k < characterStyleNames.length; k++) {
                if (characterStyleNames[k] === characterStylesInUse[id]) {
                    isUnique = false;
                    break;
                }
            }
            if (isUnique) {
                characterStyleNames.push(characterStylesInUse[id]);
            }
        }
    }

    // Sort the names alphabetically
    characterStyleNames.sort();

    // Alert the user with the list of character style names
    alert("Character Styles in Use:\n" + characterStyleNames.join("\n"));

    // Second loop: Remove unused character styles in each document
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex];

        for (var k = doc.characterStyles.length - 1; k >= 0; k--) {
            var characterStyle = doc.characterStyles[k];
            var isUsed = false;
            for (var n = 0; n < characterStyleNames.length; n++) {
                if (characterStyleNames[n] === characterStyle.name) {
                    isUsed = true;
                    break;
                }
            }
            if (!isUsed && characterStyle.name !== "[None]") {
                characterStyle.remove();
            }
        }
    }
} else {
    alert("No open documents to process.");
}
