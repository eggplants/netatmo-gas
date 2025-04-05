import {getConfig, initConfigSheet} from './config-sheet.js';
import {appendLog} from './log-sheet.js';
import {fetchNetatmoResponse, postToSlack} from './request.js';
import {createSlackMessage} from './slack-message.js';
import {updateTrigger} from './trigger.js';

const getNetatmoService = (): GoogleAppsScriptOAuth2.OAuth2Service => {
	const {clientId, clientSecret} = getConfig();
	return OAuth2.createService('Netatmo')
		.setAuthorizationBaseUrl('https://api.netatmo.com/oauth2/authorize')
		.setTokenUrl('https://api.netatmo.com/oauth2/token')
		.setClientId(clientId)
		.setClientSecret(clientSecret)
		.setCallbackFunction('authCallback')
		.setPropertyStore(PropertiesService.getUserProperties())
		.setScope('read_station');
};

export const main = () => {
	updateTrigger();

	const isUpdateNeeded = initConfigSheet();
	if (isUpdateNeeded) {
		return;
	}

	const service = getNetatmoService();
	if (!service.hasAccess()) {
		Logger.log('Open the following URL and re-run the script: %s', service.getAuthorizationUrl());
		return;
	}

	const netatmoData = fetchNetatmoResponse(service.getAccessToken());
	const serverDate = new Date(netatmoData.time_server * 1000);
	const {slackWebhookUrl} = getConfig();
	if (serverDate.getMinutes() === 0) {
		postToSlack(slackWebhookUrl, createSlackMessage(netatmoData, serverDate));
	}

	appendLog(netatmoData, serverDate);
};

export const authCallback = (request: Record<string, unknown>): GoogleAppsScript.HTML.HtmlOutput => {
	const service = getNetatmoService();
	if (service.handleCallback(request)) {
		return HtmlService.createHtmlOutput('Success!');
	}

	return HtmlService.createHtmlOutput('Denied.');
};
