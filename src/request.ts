import {type NetatmoStationData} from './type.js'

export function fetchNetatmoResponse(token: string): NetatmoStationData {
  const response = UrlFetchApp.fetch('https://api.netatmo.com/api/getstationsdata', {
    headers: {
      authorization: `Bearer ${token}`,
      charset: 'utf8',
      'Content-Type': 'application/json',
    },
    method: 'post',
  }).getContentText()
  return JSON.parse(response) as NetatmoStationData
}

export function postToSlack(slackWebhookUrl: string, message: Record<string, unknown>) {
  return UrlFetchApp.fetch(slackWebhookUrl, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'post',
    payload: message,
  }).getContentText()
}
