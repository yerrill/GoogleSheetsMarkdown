/**
 * Registers a menu and items
 */
function onOpen() {
  var ui = SpreadsheetApp.getUi();

  ui.createMenu('Markdown')
      .addItem('Copy as Table', 'copyToTable')
      .addToUi();

  Logger.log("Menu Created");
}

/**
 * Called from menu. Generates and displays a Markdown formatted table for selected data.
 */
function copyToTable() {
  var rangeValues = SpreadsheetApp.getActiveSpreadsheet().getSelection().getActiveRange().getValues();
  var mdTable = "";

  // Build header and divider
  // | Header 1 | Header 2 | Header 3 | ...
  // | --- | --- | --- | ...
  if (rangeValues.length > 0 && rangeValues[0].length > 0) {
    var header = rangeValues[0]
                  .map((v) => v.toString().replace("|", "\\|"))
                  .join(" | ");

    mdTable += "| " + header + " |\n";

    mdTable += "|" + " --- |".repeat(rangeValues[0].length) + "\n";
  }

  // Build any additional rows
  // | Data 1 | Data 2 | Data 3 | ...
  for (var i = 1 ; i < rangeValues.length ; i++) {
    var row = rangeValues[i]
                .map((v) => v.toString().replace("|", "\\|"))
                .join(" | ");

    mdTable += "| " + row + " |\n";
  }

  Logger.log("Table Generated:\n\n" + mdTable);
  SpreadsheetApp.getUi().alert("Markdown:\n\n" + mdTable); // Due to lack of "Copy to Clipboard" functionality
}
