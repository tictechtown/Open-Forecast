/**
 * Weather API
 * https://www.weather.gov/documentation/services-web-api
 */

/**
 * Returns a WeatherPoint from a Latitude/Longitute coordinates
 * @param {Latitude, Longitude}
 * @returns
 */
export const getWeatherData = async ({
  lat,
  long,
}: {
  lat: number;
  long: number;
}) => {
  // points resolution, up to 4 decimals
  const response = await fetch(`https://api.weather.gov/points/${lat},${long}`);
  if (!response.ok) {
    throw new Error("Network Error");
  }
  return response.json();
};

export const getForecast = async ({
  gridId,
  gridX,
  gridY,
}: {
  gridId: string;
  gridX: number;
  gridY: number;
}) => {
  const response = await fetch(
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}`,
  );
  if (!response.ok) {
    throw new Error("Network Error");
  }
  return response.json();
};

export const getHourlyForecast = async ({
  gridId,
  gridX,
  gridY,
}: {
  gridId: string;
  gridX: number;
  gridY: number;
}) => {
  const response = await fetch(
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast/hourly`,
  );
  if (!response.ok) {
    throw new Error("Network Error");
  }
  return response.json();
};

export const getDailyForecast = async ({
  gridId,
  gridX,
  gridY,
}: {
  gridId: string;
  gridX: number;
  gridY: number;
}) => {
  const response = await fetch(
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`,
  );
  if (!response.ok) {
    throw new Error("Network Error");
  }
  return response.json();
};
