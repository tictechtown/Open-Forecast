import { ForecastPeriod, WeatherCondition } from "../../types";
import { detectCondition } from "../../utils";

function getTimelineClassName(condition: WeatherCondition): string {
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

function getConditionText(condition: WeatherCondition): string {
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

function processPeriods(periods: ForecastPeriod[]): {
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

type Props = {
  periods: ForecastPeriod[];
};
function HourlyForecastCard({ periods }: Props) {
  const next24h = periods.slice(0, 24);
  const {
    minTemp,
    maxTemp,
    periods: displayedPeriods,
  } = processPeriods(next24h);
  return (
    <div className="hourly-card">
      <h4>Hourly Forecast</h4>
      <article>
        {displayedPeriods.map((period, index) => {
          const p = period.period;
          const date = new Date(p.startTime);
          const hour = new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
          }).format(date);

          const currentTemp = p.temperature;
          const percentage =
            (100 * (currentTemp - minTemp)) / (maxTemp - minTemp);

          const styles = {
            width: `${percentage}%`,
          };

          const timeline = getTimelineClassName(period.condition);
          const forecast = getConditionText(period.condition);

          return (
            <div className="grid-item" key={p.number}>
              <div className={`timeline ${timeline}`} />
              <div className="grid-item-day text-align-end">
                <strong>{index === 0 ? "NOW" : hour}</strong>
              </div>
              <div className="grid-item-status">
                {period.shouldDisplayCondition ? forecast : ""}
              </div>
              <div className="grid-item-range">
                <div style={styles}></div>
                <div className="grid-item-card">{p.temperature}°</div>
              </div>
            </div>
          );
        })}
      </article>
    </div>
  );
}

export default HourlyForecastCard;
