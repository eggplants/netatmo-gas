import { NetatmoStationData } from './type';

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
    ...stationData.body.devices.map((device) => ({
      type: 'section',
      text: {
        text: device.station_name,
        type: 'plain_text',
      },
      fields: [
        ['Temp.', `${device.dashboard_data.Temperature}°C`],
        ['Humidity', `${device.dashboard_data.Humidity}%`],
        ['CO2', `${device.dashboard_data.CO2}ppm`],
        ['Noise', `${device.dashboard_data.Noise}dB`],
        ['Pressure', `${device.dashboard_data.Pressure}hPa`],
      ].map(([label, value]) => ({
        "type": "section",
        "fields": [
          {
            type: 'mrkdwn',
            text: `*${label}*`,
          },
          {
            type: 'plain_text',
            text: value,
          },
        ],
      })),
    })),
  ],
});
