if (app.documents.length > 0) {
    var masterSpreadsInUse = {};

    // Loop through each open document
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex];

        // Collect used master spread IDs from pages
        for (var i = 0; i < doc.pages.length; i++) {
            var page = doc.pages[i];
            if (page.appliedMaster !== null) {
                masterSpreadsInUse[page.appliedMaster.id] = page.appliedMaster.name;
            }
        }

        // Collect used master spread IDs from other master spreads
        for (var j = 0; j < doc.masterSpreads.length; j++) {
            var masterSpread = doc.masterSpreads[j];
            if (masterSpread.appliedMaster !== null) {
                masterSpreadsInUse[masterSpread.appliedMaster.id] = masterSpread.appliedMaster.name;
            }
        }
    }

    // Convert the object to an array of unique names
    var masterSpreadNames = [];
    for (var id in masterSpreadsInUse) {
        if (masterSpreadsInUse.hasOwnProperty(id)) {
            // Check for uniqueness manually
            var isUnique = true;
            for (var k = 0; k < masterSpreadNames.length; k++) {
                if (masterSpreadNames[k] === masterSpreadsInUse[id]) {
                    isUnique = false;
                    break;
                }
            }
            if (isUnique) {
                masterSpreadNames.push(masterSpreadsInUse[id]);
            }
        }
    }

    // Sort the names alphabetically
    masterSpreadNames.sort();

    // Alert the user with the list of master spread names
    alert("Master Spreads in Use:\n" + masterSpreadNames.join("\n"));

    // Loop through each open document again to remove unused master spreads
    for (var docIndex = 0; docIndex < app.documents.length; docIndex++) {
        var doc = app.documents[docIndex];

        for (var j = doc.masterSpreads.length - 1; j >= 0; j--) {
            var masterSpread = doc.masterSpreads[j];
            if (masterSpread.name) {
                var found = false;
                for (var k = 0; k < masterSpreadNames.length; k++) {
                    if (masterSpreadNames[k] === masterSpread.name) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    masterSpread.remove();
                }
            }
        }
    }
} else {
    alert("No open documents to process.");
}