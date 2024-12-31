// This script saves all open documents in Adobe InDesign. 
// It displays a progress bar to indicate the saving progress of each document.

if (app.documents.length > 0) { // Check if there are any open documents
    // Create a new window to display the progress of saving documents
    var progressWindow = new Window("palette", "Saving Documents");
    // Add a progress bar to the window, with a range from 0 to the number of open documents
    var progressBar = progressWindow.add("progressbar", undefined, 0, app.documents.length);
    // Set the preferred size of the progress bar
    progressBar.preferredSize = [300, 20];
    // Show the progress window
    progressWindow.show();

    // Loop through each open document
    for (var i = 0; i < app.documents.length; i++) {
        var doc = app.documents[i]; // Get the current document
        // Check if the document has been saved before
        if (!doc.saved) {
            doc.save(); // Save the document if it hasn't been saved before
        } else {
            doc.save(doc.fullName); // Save the document to its current location if it has been saved before
        }
        // Update the progress bar to reflect the number of documents saved
        progressBar.value = i + 1;
    }

    // Close the progress window after all documents have been saved
    progressWindow.close();
} else {
    // Alert the user if there are no open documents to save
    alert("No open documents to save.");
}