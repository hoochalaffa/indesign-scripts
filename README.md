# indesign-scripts
InDesign Scripts made to make my life easier.
## Background
I've worked in InDesign since 2006 with InDesign CS. It's been a long time coming that I build some scripts to add features I wish were found in the app. All of these scripts were generated with help from an LLM.
## Revert All Open Documents
I find this helpful when testing scripts across multiple open documents. I would run a script, see how it worked, then revert all open documents to test again.
This script does the following:
1. Check for Open Files: The script first checks if there are any files currently open in the program. If no documents are open, skip to step 6.
2. Save File Locations: If there are open files, it makes a list to remember where each file is stored on the computer.
3. Go Through Each File: It goes through each open file and adds its location to the list.
4. Close All Files: The script then closes all the open files without saving any changes.
5. Reopen Files: After closing, it uses the list from step 2 to reopen each file from its saved location.
6. Show Message if No Files: If there are no files open at the start, it shows a message saying there are no files to work with.
## Save All Open Documents
This script loops through all open documents and saves.
I found this helpful while having multiple documents of a book open and wanting to save all open documents.
## Remove Unused Styles and Parent (Master) Spreads All Open Documents
These scripts compliment the InDesign feature to synchronize styles and Parent Spreads across book documents. While the sync feature will _add_ styles and Parents and _update_ styles and Parents of the same name, it will not remove styles or Parents.

I found that my documents over time and after combining multiple documents from separate projects were very cluttered. For example, for a particular document, I imported a document from word, and it imported about 30 unused and unnamed styles. Other styles were created for one reason or another, renamed in one document but upon syncing added a new style or parent instead of renaming, amongst other situations where the list of styles and parents kept growing.

Scripts that I found online appeared to reduce the number of styles or parents in a document but wouldn't take into consideration styles or parents in use in other documents that a user might want to keep and use later. At first, I would reduce the styles and parents and then resync using the InDesign book feature but would have to sync all documents one at a time to add back all the styles and parents in use across all documents to all other documents.

This set of scripts attempts to address reducing unused styles and parent spreads while taking into account all documents that are open to do it.
### Remove Unused Character Styles All Open Documents
This script does a few things:
1. Check for Open Files: The script starts by checking if there are any files open in the application. If none are open, skip to 8.
2. Prepare to Track Styles: It sets up a way to keep track of which text styles are being used.
3. Find Used Text Styles:
   - Goes through each open file.
   - Within each file, it looks at all the text sections and characters.
   - It notes down any text styles that are applied to the characters.
4. List Unique Styles: It creates a list of unique text style names that are being used.
5. Organize Style Names: The list of style names is sorted alphabetically.
6. Notify User: It shows a message to the user with the list of text styles that are in use.
7. Remove Unused Styles:
   - Goes through each file again.
   - For each file, it checks all the text styles.
   - It deletes any text style that isn't being used, except for a default style.
8. No Files Open: If there are no files open, it informs the user that there are no files to work on.
### Remove Unused Paragraph Styles All Open Documents
1. Check for Open Documents: checks if there are any open documents in the application. If none are open, skip to 7.
2. Collect Used Paragraph Styles:
   - Initializes an object to store paragraph styles in use.
   - Iterates over each document and its text frames to collect IDs and names of paragraph styles applied to paragraphs.
3. Create Unique List of Style Names: Converts the collected paragraph style IDs into an array of unique style names.
4. Sort Style Names: Sorts the list of unique paragraph style names alphabetically.
5. Alert User: Displays an alert with the list of paragraph style names currently in use.
6. Remove Unused Paragraph Styles:
   - Iterates over each open document to collect all paragraph style names.
   - Identifies which styles are used by comparing them with the list of styles in use.
   - Removes paragraph styles from the document that are not in use, except for the "[None]" style.
   - Logs an error message if a style cannot be removed.
7. Handle No Open Documents:
   - If no documents are open, alerts the user that there are no documents to process.
### Remove Unused Parent (Master) Spreads All Open Documents
1. Check for Open Files: The script starts by checking if there are any files open in the application. If none, skip to 9.
2. Prepare to Track Usage: It sets up a way to keep track of which Parent Spreads are being used.
3. Identify Used Parent Spreads from Pages:
   - Goes through each open file.
   - For each page in a file, it checks if a Parent Spread is applied.
   - If a Parent Spread is applied, it notes down its details.
4. Identify Used Parent Spreads from Other Parent Spreads:
   - For each template in a file, it checks if another Parent Spread is applied.
   - If another Parent Spread is applied, it notes down its details.
5. Create a List of Unique Parent Spread Names:
   - Converts the noted details into a list of unique Parent Spread names.
6. Organize the List: Sorts the list of Parent Spread names alphabetically.
7. Notify the User: Shows a message with the list of Parent Spread names that are being used.
8. Remove Unused Parent Spreads:
   - Goes through each open file again.
   - For each Parent Spread, check if its name is in the list of used Parent Spread names.
   - If not found, deletes the Parent Spread.
9. Handle No Open Files: If no files are open, it informs the user that there are no files to process.
