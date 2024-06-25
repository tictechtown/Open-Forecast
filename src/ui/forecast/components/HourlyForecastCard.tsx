import { ForecastPeriod } from "../../../types";
import { TimeFormatter } from "../../../utils/formatters";
import {
  getConditionText,
  getTimelineClassName,
  processPeriods,
} from "./processPeriods";

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
          const hour = TimeFormatter.format(date);

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
