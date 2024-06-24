import { WeatherGridpoint } from "../../types";
import "./DetailForecastCard.css";

type Props = {
  gridpoint: WeatherGridpoint;
};

function DetailItem({
  title,
  value,
  unit,
}: {
  title: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="detail-item">
      <div className="detail-value">
        {value.toFixed(0)}
        {unit}
      </div>
      <div className="detail-title">{title}</div>
    </div>
  );
}

function DetailForecastCard({ gridpoint }: Props) {
  return (
    <div className="details-card">
      <h4>Details</h4>
      <article>
        <div className="list">
          <DetailItem
            title="Humidy"
            value={gridpoint.properties.relativeHumidity.values[0].value}
            unit={"%"}
          />
          <DetailItem
            title="Dew Point"
            value={gridpoint.properties.dewpoint.values[0].value}
            unit={"F"}
          />
          <DetailItem
            title="Wind Speed"
            value={gridpoint.properties.windSpeed.values[0].value}
            unit={"mph"}
          />
        </div>
      </article>
    </div>
  );
}

export default DetailForecastCard;
