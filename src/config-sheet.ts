type SheetLines = string[][];

type UserConfig = {
	clientId: string;
	clientSecret: string;
	slackWebhookUrl: string;
};

// eslint-disable-next-line @typescript-eslint/naming-convention
const CONFIG_SHEET_NAME = 'config';

const findCredentialRowIndex = (lines: SheetLines, key: keyof UserConfig): number => {
	const rowIndex = lines.findIndex(line => line[0] === key);
	if (rowIndex === -1) {
		throw new Error(`'${key}' is not found`);
	}

	return rowIndex;
};

const getConfigSheet = (): GoogleAppsScript.Spreadsheet.Sheet => {
	const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(CONFIG_SHEET_NAME);
	if (!sheet) {
		throw new Error(`Sheet '${CONFIG_SHEET_NAME}' is not found`);
	}

	return sheet;
};

export const getConfig = (): UserConfig => {
	const sheet = getConfigSheet();
	const lines = sheet.getDataRange().getValues() as unknown as SheetLines;

	const clientId = lines[findCredentialRowIndex(lines, 'clientId')][1];
	const clientSecret = lines[findCredentialRowIndex(lines, 'clientSecret')][1];
	const slackWebhookUrl = lines[findCredentialRowIndex(lines, 'slackWebhookUrl')][1];

	return {
		clientId,
		clientSecret,
		slackWebhookUrl,
	};
};

export const initConfigSheet = (): boolean => {
	const ss = SpreadsheetApp.getActiveSpreadsheet();
	if (ss.getSheetByName(CONFIG_SHEET_NAME)) {
		return false;
	}

	const sheet = ss.insertSheet(CONFIG_SHEET_NAME);
	sheet.getRange('A1:B3').setValues([
		['clientId', '<Netatmo App Client ID>'],
		['clientSecret', '<Netatmo App Client Secret>'],
		['slackWebhookUrl', '<Slack Incoming Webhook URL>'],
	]);
	Logger.log(`Sheet '${CONFIG_SHEET_NAME}' is created. Please update the values.`);
	return true;
};
