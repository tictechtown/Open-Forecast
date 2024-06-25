/**
 * Weather API
 * https://www.weather.gov/documentation/services-web-api
 */
import { WeatherForecast, WeatherGridpoint, WeatherPoint } from "../types";

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
  return fetch(`https://api.weather.gov/points/${lat},${long}`).then(
    (res) => res.json() as Promise<WeatherPoint>,
  );
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
  return fetch(
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}`,
  ).then((res) => res.json() as Promise<WeatherGridpoint>);
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
  return fetch(
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast/hourly`,
  ).then((res) => res.json() as Promise<WeatherForecast>);
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
  console.log(
    "fetching",
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`,
  );
  return fetch(
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`,
  ).then((res) => res.json() as Promise<WeatherForecast>);
};
