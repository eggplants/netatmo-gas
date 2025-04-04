import { getConfig, initConfig } from './configSheet';
import { appendLog } from './logSheet';
import { createSlackMessage } from './slackMessage';
import { updateTrigger } from './trigger';
import { NetatmoStationData } from './type';

const getNetatmoService = (): GoogleAppsScriptOAuth2.OAuth2Service => {
  const { clientId, clientSecret } = getConfig();
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

  if (initConfig()) {
    return;
  }

  const service = getNetatmoService();
  const { slackWebhookUrl } = getConfig();

  if (!service.hasAccess()) {
    Logger.log('Open the following URL and re-run the script: %s', service.getAuthorizationUrl());
    return;
  }

  const netatmoJson = UrlFetchApp.fetch('https://api.netatmo.com/api/getstationsdata', {
    headers: {
      'Content-Type': 'application/json',
      charset: 'utf-8',
      Authorization: `Bearer ${service.getAccessToken()}`,
    },
    method: 'post',
  }).getContentText();

  const netatmoData: NetatmoStationData = JSON.parse(netatmoJson);
  const serverDate = new Date(netatmoData.time_server * 1000);
  appendLog(netatmoJson, serverDate);
  Logger.log(netatmoJson);

  const slackMessageJson = JSON.stringify(createSlackMessage(netatmoData, serverDate));
  Logger.log(slackMessageJson);

  const slackResponse = UrlFetchApp.fetch(slackWebhookUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    payload: slackMessageJson,
  });
  Logger.log(slackResponse.getContentText());
};

export const authCallback = (request: object): GoogleAppsScript.HTML.HtmlOutput => {
  const service = getNetatmoService();
  if (service.handleCallback(request)) {
    return HtmlService.createHtmlOutput('Success!');
  } else {
    return HtmlService.createHtmlOutput('Denied.');
  }
};
