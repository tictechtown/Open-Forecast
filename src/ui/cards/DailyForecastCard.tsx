import { ForecastPeriod } from "../../types";
import DailyForecastItem from "./DailyForecastItem";
import "./Timeline.css";

type Props = {
  periods: ForecastPeriod[];
};

function DailyForecastCard({ periods }: Props) {
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

export default DailyForecastCard;
