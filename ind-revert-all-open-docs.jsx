// This script reverts all open documents in Adobe InDesign to their last saved state.
// It does this by closing all open documents without saving any changes and then reopening them.

// Check if there are any open documents
if (app.documents.length > 0) {
    var docPaths = []; // Array to store the file paths of all open documents

    // Loop through each open document to collect their file paths
    for (var i = 0; i < app.documents.length; i++) {
        var doc = app.documents[i]; // Get the current document
        docPaths.push(doc.fullName); // Add the document's full file path to the array
    }

    // Close all open documents without saving changes
    while (app.documents.length > 0) {
        app.documents[0].close(SaveOptions.NO); // Close the first document in the list without saving
    }

    // Reopen each document using the stored file paths
    for (var j = 0; j < docPaths.length; j++) {
        app.open(File(docPaths[j])); // Open the document at the specified file path
    }
} else {
    // Alert the user if there are no open documents to process
    alert("No open documents to process.");
}
