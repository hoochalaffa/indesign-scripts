if (app.documents.length > 0) {
    var progressWindow = new Window("palette", "Saving Documents");
    var progressBar = progressWindow.add("progressbar", undefined, 0, app.documents.length);
    progressBar.preferredSize = [300, 20];
    progressWindow.show();

    for (var i = 0; i < app.documents.length; i++) {
        var doc = app.documents[i];
        if (!doc.saved) {
            doc.save();
        } else {
            doc.save(doc.fullName);
        }
        progressBar.value = i + 1;
    }

    progressWindow.close();
} else {
    alert("No open documents to save.");
}