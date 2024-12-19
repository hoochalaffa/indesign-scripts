if (app.documents.length > 0) {
    var docPaths = [];

    // Collect paths of all open documents
    for (var i = 0; i < app.documents.length; i++) {
        var doc = app.documents[i];
        docPaths.push(doc.fullName);
    }

    // Close all open documents without saving
    while (app.documents.length > 0) {
        app.documents[0].close(SaveOptions.NO);
    }

    // Reopen the documents that were just closed
    for (var j = 0; j < docPaths.length; j++) {
        app.open(File(docPaths[j]));
    }
} else {
    alert("No open documents to process.");
}
