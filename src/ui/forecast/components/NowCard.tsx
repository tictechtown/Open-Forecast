import { ForecastPeriod } from "../../../types";
import { convertCelsiusToF, detectCondition } from "../../../utils/converters";
import WeatherConditionIcon from "../../icons/WeatherConditionIcon";
import "./NowCard.css";

type Props = {
  period: ForecastPeriod;
  feelTemp: number;
  highTemp: number;
  lowTemp: number;
};

function NowCard({ period, feelTemp, highTemp, lowTemp }: Props) {
  return (
    <article className="now-card">
      <header>
        <h4>Now</h4>
      </header>
      <div className="main">
        <div className="primary">
          <div>{period.temperature}°</div>
          <WeatherConditionIcon condition={detectCondition(period)} />
        </div>
        <div className="secondary">
          <div>{period.shortForecast}</div>
          <div>Feels like {convertCelsiusToF(feelTemp)}°</div>
        </div>
      </div>
      <footer>
        High: {highTemp}° • Low: {lowTemp}°
      </footer>
    </article>
  );
}

export default NowCard;
