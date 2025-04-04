export type NetatmoStationData = {
  status: 'ok';
  time_server: number;
  body: {
    devices: NetatmoStationDevice[];
  };
};

export type NetatmoStationDevice = {
  _id: string;
  station_name: string;
  dashboard_data: {
    Temperature: number;
    Humidity: number;
    CO2: number;
    Noise: number;
    Pressure: number;
  };
};
