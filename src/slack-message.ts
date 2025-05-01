import {evaluateEnvironmentParameter} from './evaluate-environment-parameter.js'
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
  const {co2ppm, humidity, noiseDb, pressureHpa, temperature} = evaluateEnvironmentParameter({
    co2ppm: device.dashboard_data.CO2,
    humidity: device.dashboard_data.Humidity,
    noiseDb: device.dashboard_data.Noise,
    pressureHpa: device.dashboard_data.Pressure,
    temperature: device.dashboard_data.Temperature,
  })
  return [
    `*${device.station_name}*`,
    `*Temp.*: ${temperature[0]}°C	${temperature[1]}`,
    `*Humidity*: ${humidity[0]}%	${humidity[1]}`,
    `*CO2*: ${co2ppm[0]}ppm	${co2ppm[1]}`,
    `*Noise*: ${noiseDb[0]}dB	${noiseDb[1]}`,
    `*Pressure*: ${pressureHpa[0]}hPa	${pressureHpa[1]}`,
  ].map((text) => ({
    fields: [{text, type: 'mrkdwn'}],
    type: 'section',
  }))
}
