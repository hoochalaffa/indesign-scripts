const { entrypoints } = require("uxp");
const { app } = require("indesign");

entrypoints.setup({
  commands: {
    showAlert: () => showAlert()
  },
  panels: {
    showPanel: {
      show({node} = {}) {}
    }
  }
});

showAlert = () => {
    const dialog = app.dialogs.add();
    const col = dialog.dialogColumns.add();
    const colText = col.staticTexts.add();
    colText.staticLabel = "Congratulations! You just executed your first command.";

    dialog.canCancel = false;
    dialog.show();
    dialog.destroy();
    return;
}

// UXP-compatible script for removing unused character styles in Adobe InDesign

async function removeUnusedCharacterStyles() {
  try {
      const documentsCount = await app.documents.length; // Get the count of open documents

      if (documentsCount === 0) {
          console.log("No open documents to process.");
          return;
      }

      let characterStylesInUse = new Set(); // Set to store unique character style names in use

      // First loop: Collect used character style names
      for (let docIndex = 0; docIndex < documentsCount; docIndex++) {
          const doc = await app.documents[docIndex];
          const stories = await doc.stories;

          for (const story of stories) {
              const characters = await story.characters;

              for (const character of characters) {
                  const appliedStyle = await character.appliedCharacterStyle;
                  if (appliedStyle) {
                      characterStylesInUse.add(appliedStyle.name);
                  }
              }
          }
      }

      // Convert the set to a sorted array
      const characterStyleNames = Array.from(characterStylesInUse).sort();

      console.log("Character Styles in Use:\n" + characterStyleNames.join("\n"));

      // Second loop: Remove unused character styles
      for (let docIndex = 0; docIndex < documentsCount; docIndex++) {
          const doc = await app.documents[docIndex];
          const characterStyles = await doc.characterStyles;

          for (let i = characterStyles.length - 1; i >= 0; i--) {
              const characterStyle = characterStyles[i];
              const isUsed = characterStylesInUse.has(characterStyle.name);

              if (!isUsed && characterStyle.name !== "[None]") {
                  await characterStyle.remove();
              }
          }
      }
  } catch (error) {
      console.error("Error processing documents:", error);
  }
}

// Call the function to execute the script
removeUnusedCharacterStyles();