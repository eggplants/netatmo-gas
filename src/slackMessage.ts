import { NetatmoStationData, NetatmoStationDevice } from './type';

export const createSlackMessage = (stationData: NetatmoStationData, serverDate: Date) => ({
  blocks: [
    {
      type: 'header',
      text: {
        text: `Netatmo Station ${Utilities.formatDate(serverDate, 'JST', 'yyyy-MM-dd HH:mm:ss')}`,
        type: 'plain_text',
      },
    },
    {
      type: 'divider',
    },
    ...stationData.body.devices.flatMap((device) => createSlackMessageForDevice(device)),
  ],
});

const createSlackMessageForDevice = (device: NetatmoStationDevice) =>
  [
    `*${device.station_name}*`,
    `*Temp.*: ${device.dashboard_data.Temperature}°C`,
    `*Humidity*: ${device.dashboard_data.Humidity}%`,
    `*CO2*: ${device.dashboard_data.CO2}ppm`,
    `*Noise*: ${device.dashboard_data.Noise}dB`,
    `*Pressure*: ${device.dashboard_data.Pressure}hPa`,
  ].map((text) => ({
    type: 'section',
    fields: [{ type: 'mrkdwn', text }],
  }));
