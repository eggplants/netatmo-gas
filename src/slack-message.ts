import {type NetatmoStationData, type NetatmoStationDevice} from './type.js'

export function createSlackMessage(stationData: NetatmoStationData, serverDate: Date) {
  return {
    blocks: [
      {
        text: {
          text: `Netatmo Station ${Utilities.formatDate(serverDate, 'JST', 'yyyy-MM-dd HH:mm')}`,
          type: 'plain_text',
        },
        type: 'header',
      },
      {
        type: 'divider',
      },
      ...stationData.body.devices.flatMap((device) => createSlackMessageForDevice(device)),
    ],
  }
}

function createSlackMessageForDevice(device: NetatmoStationDevice) {
  return [
    `*${device.station_name}*`,
    `*Temp.*: ${device.dashboard_data.Temperature}°C`,
    `*Humidity*: ${device.dashboard_data.Humidity}%`,
    `*CO2*: ${device.dashboard_data.CO2}ppm`,
    `*Noise*: ${device.dashboard_data.Noise}dB`,
    `*Pressure*: ${device.dashboard_data.Pressure}hPa`,
  ].map((text) => ({
    fields: [{text, type: 'mrkdwn'}],
    type: 'section',
  }))
}
