import { ForecastPeriod } from "../../../types";
import { DayFormatter } from "../../../utils/formatters";
import { detectCondition } from "../../../utils/utils";
import WeatherConditionIcon from "../../icons/WeatherConditionIcon";

// https://erikflowers.github.io/weather-icons/
// https://react-icons.github.io/react-icons/icons/wi/

function DailyForecastItem({
  index,
  period,
  minTemp,
  maxTemp,
}: {
  index: number;
  period: ForecastPeriod[];
  minTemp: number;
  maxTemp: number;
}) {
  const date = new Date(period[0].startTime);
  const day = index == 0 ? "Now" : DayFormatter.format(date);

  const minLocalTemp = Math.min(period[0].temperature, period[1].temperature);
  const maxLocalTemp = Math.max(period[0].temperature, period[1].temperature);

  const currentTemp = minLocalTemp;
  const percentage = (100 * (currentTemp - minTemp)) / (maxTemp - minTemp);
  const maxPercentage = (100 * (maxLocalTemp - minTemp)) / (maxTemp - minTemp);

  const hiddenStyles = {
    width: `${percentage}%`,
  };

  const rangeStyles = {
    width: `${maxPercentage - percentage}%`,
  };

  const dayCondition = detectCondition(period[0]);

  return (
    <div className="grid-item align-items">
      <div className="grid-item-day">
        <strong>{day}</strong>
      </div>
      <div className="grid-item-icon">
        <WeatherConditionIcon condition={dayCondition} />
      </div>
      <div className="grid-item-range">
        <div style={hiddenStyles}></div>
        <div style={rangeStyles} className="grid-item-card">
          <div>{minLocalTemp}°</div>
          <div>{maxLocalTemp}°</div>
        </div>
      </div>
    </div>
  );
}

type Props = {
  periods: ForecastPeriod[];
};

function DailyForecast({ periods }: Props) {
  let minTemp = 200;
  let maxTemp = 0;

  for (const p of periods) {
    minTemp = Math.min(minTemp, p.temperature);
    maxTemp = Math.max(maxTemp, p.temperature);
  }

  // @ts-ignore
  const groupedPeriods: Record<number, ForecastPeriod[]> = Object.groupBy(
    periods,
    ({ number }: ForecastPeriod) => Math.floor((number - 1) / 2),
  );

  return (
    <div className="daily-card">
      <h4>7-day forecast</h4>
      <article>
        {Object.values(groupedPeriods).map((p: ForecastPeriod[], index) => {
          return (
            <DailyForecastItem
              index={index}
              key={p[0].number}
              period={p}
              minTemp={minTemp}
              maxTemp={maxTemp}
            />
          );
        })}
      </article>
    </div>
  );
}

export default DailyForecast;
