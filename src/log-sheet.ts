import {type NetatmoStationData, type NetatmoStationDevice} from './type.js';

// eslint-disable-next-line @typescript-eslint/naming-convention
const LOG_SHEET_PREFIX = 'log';

export const appendLog = (netatmoData: NetatmoStationData, serverDate: Date) => {
	for (const device of netatmoData.body.devices) {
		const sheet = getLogSheet(device);

		sheet?.appendRow([
			Utilities.formatDate(serverDate, 'JST', 'yyyy-MM-dd HH:mm:ss'),
			device.dashboard_data.Temperature,
			device.dashboard_data.Humidity,
			device.dashboard_data.CO2,
			device.dashboard_data.Noise,
			device.dashboard_data.Pressure,
		]);
	}
};

const getLogSheet = (device: NetatmoStationDevice): GoogleAppsScript.Spreadsheet.Sheet => {
	const sheetName = `${LOG_SHEET_PREFIX} - ${device.station_name} (${device._id})`;
	const ss = SpreadsheetApp.getActiveSpreadsheet();
	const existingSheet = ss.getSheetByName(sheetName);
	if (existingSheet) {
		return existingSheet;
	}

	const sheet = ss.insertSheet(sheetName);
	sheet.appendRow(['Date', 'Temperature(℃)', 'Humidity(%)', 'CO2(ppm)', 'Noise(dB)', 'Pressure(hPa)']);
	Logger.log(`Sheet '${sheetName}' is created.`);
	return sheet;
};
