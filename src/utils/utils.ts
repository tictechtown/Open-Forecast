import { ForecastPeriod, MeasureValue, WeatherCondition } from "../types";

const ONE_HOUR = 3600 * 1000;

export function convertMeasureValues(
  values: MeasureValue[],
): { time: Date; value: number | null }[] {
  const res: { time: Date; value: number | null }[] = [];
  for (const value of values) {
    const [isoTime, period] = value.validTime.split("/");
    const periodCount = parseInt(period.replace(/[^0-9]/g, ""), 10);
    const startTime = new Date(isoTime);
    for (let i = 0; i < periodCount; i++) {
      const time = new Date(startTime.getTime() + ONE_HOUR * i);
      res.push({ time, value: value.value });
    }
    // TODO, usually period is PTXH
  }

  return res;
}

export function convertCelsiusToF(value: number): number {
  return (value * 9) / 5 + 32;
}

export function convertFarenheitToC(value: number): number {
  return ((value - 32) * 5) / 9;
}

export function detectCondition(period: ForecastPeriod): WeatherCondition {
  const forecast = period.shortForecast;
  if (forecast === "Partly Sunny") {
    return WeatherCondition.PartialSunny;
  } else if (forecast === "Mostly Sunny") {
    return WeatherCondition.AlmostSunny;
  } else if (forecast === "Sunny") {
    return WeatherCondition.Sunny;
  } else if (forecast === "Mostly Clear") {
    return WeatherCondition.Clear;
  } else if (forecast === "Chance Showers And Thunderstorms") {
    return WeatherCondition.Thunder;
  } else if (forecast === "Slight Chance Showers And Thunderstorms") {
    return WeatherCondition.Cloudy;
  } else if (forecast === "Showers And Thunderstorms Likely") {
    return WeatherCondition.Rain;
  } else if (forecast === "Chance Rain Showers") {
    return WeatherCondition.LightRain;
  } else if (forecast === "Rain Showers Likely") {
    return WeatherCondition.Rain;
  } else if (forecast === "Partly Cloudy") {
    return WeatherCondition.Cloudy;
  } else if (forecast === "Mostly Cloudy") {
    return WeatherCondition.Overcast;
  }

  return WeatherCondition.Sunny;
}
