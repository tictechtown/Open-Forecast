import { WeatherGridpoint } from "../../types";
import { convertCelsiusToF } from "../../utils/converters";
import "./DetailForecastCard.css";
import DetailItem from "./components/DetailItem";

type Props = {
  gridpoint: WeatherGridpoint;
};

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
            value={convertCelsiusToF(
              gridpoint.properties.dewpoint.values[0].value ?? 0,
            )}
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
