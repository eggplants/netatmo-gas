export function evaluateEnvironmentParameter(props: {
  temperature: number
  humidity: number
  co2ppm: number
  noiseDb: number
  pressureHpa: number
}) {
  const {co2ppm, humidity, noiseDb, pressureHpa, temperature} = props

  // NOTE: https://ja.wikipedia.org/wiki/不快指数
  const thi = 0.81 * temperature + 0.01 * humidity * (0.99 * temperature - 14.3) + 46.3
  return {
    co2ppm: [co2ppm, toStarRating(evaluateCo2(co2ppm))],
    humidity: [humidity, toStarRating(evaluateHumidity(humidity))],
    noiseDb: [noiseDb, toStarRating(evaluateNoise(noiseDb))],
    pressureHpa: [pressureHpa, toStarRating(evaluatePressure(pressureHpa))],
    temperature: [temperature, toStarRating(evaluateTemperature(temperature))],
    thi: [thi, toStarRating(evaluateThi(thi))],
  }
}

function toStarRating(score: number): string {
  return '★'.repeat(score) + '☆'.repeat(5 - score)
}

function evaluateThi(thi: number): number {
  if (thi >= 65 && thi <= 70) return 5
  if (thi >= 60 && thi < 65) return 4
  if (thi >= 55 && thi < 60 && thi > 70 && thi <= 75) return 3
  if ((thi >= 50 && thi < 55) || (thi > 75 && thi <= 80)) return 2
  return 1 // Thi < 50 or > 80
}

function evaluateTemperature(temp: number): number {
  if (temp >= 22 && temp <= 25) return 5
  if ((temp >= 20 && temp < 22) || (temp > 25 && temp <= 27)) return 4
  if ((temp >= 18 && temp < 20) || (temp > 27 && temp <= 29)) return 3
  if ((temp >= 16 && temp < 18) || (temp > 29 && temp <= 31)) return 2
  return 1 // Temp <= 15 or temp >= 32
}

function evaluateHumidity(humidity: number): number {
  if (humidity >= 45 && humidity <= 60) return 5
  if ((humidity >= 40 && humidity < 45) || (humidity > 60 && humidity <= 65)) return 4
  if ((humidity >= 35 && humidity < 40) || (humidity > 65 && humidity <= 70)) return 3
  if ((humidity >= 30 && humidity < 35) || (humidity > 70 && humidity <= 75)) return 2
  return 1 // Humidity < 30 or > 75
}

function evaluateCo2(co2ppm: number): number {
  if (co2ppm <= 600) return 5
  if (co2ppm <= 800) return 4
  if (co2ppm <= 1000) return 3
  if (co2ppm <= 1500) return 2
  return 1 // Co2ppm > 1500
}

function evaluateNoise(noiseDb: number): number {
  if (noiseDb <= 55) return 5
  if (noiseDb <= 65) return 4
  if (noiseDb <= 70) return 3
  if (noiseDb <= 75) return 2
  return 1 // NoiseDb > 75
}

function evaluatePressure(hpa: number): number {
  if (hpa >= 1010 && hpa <= 1020) return 5
  if ((hpa >= 1000 && hpa < 1010) || (hpa > 1020 && hpa <= 1030)) return 4
  if ((hpa >= 990 && hpa < 1000) || (hpa > 1030 && hpa <= 1040)) return 3
  if ((hpa >= 980 && hpa < 990) || (hpa > 1040 && hpa <= 1050)) return 2
  return 1 // Hpa < 980 or > 1050
}
