import { ForecastPeriod } from "../../types";
import { detectCondition } from "../../utils/converters";
import { DayFormatter } from "../../utils/formatters";
import WeatherConditionIcon from "../icons/WeatherConditionIcon";

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

export default DailyForecastItem;
