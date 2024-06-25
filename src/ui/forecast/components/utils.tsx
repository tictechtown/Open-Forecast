import { ForecastPeriod, WeatherCondition } from "../../../types";
import { detectCondition } from "../../../utils/utils";

export function getTimelineClassName(condition: WeatherCondition): string {
  switch (condition) {
    case WeatherCondition.AlmostSunny:
      return "timeline-almost-sun";
    case WeatherCondition.Sunny:
      return "timeline-sun";
    case WeatherCondition.Clear:
      return "timeline-clear";
    case WeatherCondition.Cloudy:
      return "timeline-cloudy";
    case WeatherCondition.LightRain:
      return "timeline-light-rain";
    case WeatherCondition.Overcast:
      return "timeline-overcast";
    case WeatherCondition.PartialSunny:
      return "timeline-partial-sunny";
    case WeatherCondition.Rain:
      return "timeline-rain";
    case WeatherCondition.Snow:
      return "timeline-snow";
    case WeatherCondition.Thunder:
      return "timeline-thunder";
  }
}
export function getConditionText(condition: WeatherCondition): string {
  switch (condition) {
    case WeatherCondition.AlmostSunny:
      return "Almost Sunny";
    case WeatherCondition.Sunny:
      return "Sunny";
    case WeatherCondition.Clear:
      return "Clear";
    case WeatherCondition.Cloudy:
      return "Cloudy";
    case WeatherCondition.LightRain:
      return "Light Rain";
    case WeatherCondition.Overcast:
      return "Overcast";
    case WeatherCondition.PartialSunny:
      return "Partly Sunny";
    case WeatherCondition.Rain:
      return "Rain";
    case WeatherCondition.Snow:
      return "Snow";
    case WeatherCondition.Thunder:
      return "Thunder";
  }
}
type DisplayedPeriod = {
  period: ForecastPeriod;
  shouldDisplayCondition: boolean;
  condition: WeatherCondition;
};
export function processPeriods(periods: ForecastPeriod[]): {
  periods: DisplayedPeriod[];
  maxTemp: number;
  minTemp: number;
} {
  let currentForecast = "";
  let minTemp = 200;
  let maxTemp = 0;

  const res: DisplayedPeriod[] = [];

  let index = 0;
  for (const p of periods) {
    if (index % 2 == 1) {
      index += 1;
      continue;
    }
    const condition = detectCondition(p);
    const shouldDisplayCondition = p.shortForecast !== currentForecast;
    currentForecast = p.shortForecast;

    minTemp = Math.min(minTemp, p.temperature);
    maxTemp = Math.max(maxTemp, p.temperature);
    res.push({ period: p, shouldDisplayCondition, condition });
    index += 1;
  }

  return { maxTemp, minTemp, periods: res };
}
