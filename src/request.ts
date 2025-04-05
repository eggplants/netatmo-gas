import {type NetatmoStationData} from './type.js';

export const fetchNetatmoResponse = (token: string): NetatmoStationData => {
	const response = UrlFetchApp.fetch('https://api.netatmo.com/api/getstationsdata', {
		headers: {
			'Content-Type': 'application/json',
			charset: 'utf8',
			authorization: `Bearer ${token}`,
		},
		method: 'post',
	}).getContentText();
	return JSON.parse(response) as NetatmoStationData;
};

export const postToSlack = (slackWebhookUrl: string, message: Record<string, unknown>) =>
	UrlFetchApp.fetch(slackWebhookUrl, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'post',
		payload: message,
	},
	).getContentText();
