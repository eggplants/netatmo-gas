const LOG_SHEET_NAME = 'log';

export const appendLog = (result: string, serverDate: Date) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LOG_SHEET_NAME) ?? ss.insertSheet(LOG_SHEET_NAME);

  sheet?.appendRow([
    Utilities.formatDate(serverDate, 'JST', 'yyyy-MM-dd HH:mm:ss'),
    result,
  ]);
}
