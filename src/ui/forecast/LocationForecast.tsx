import { useQuery } from "@tanstack/react-query";
import {
  getDailyForecast,
  getForecast,
  getHourlyForecast,
} from "../../services/weather";
import { WeatherForecast, WeatherGridpoint } from "../../types";
import { convertMeasureValues } from "../../utils/converters";
import DailyForecastCard from "../cards/DailyForecastCard";
import DetailForecastCard from "../cards/DetailForecastCard";
import HourlyForecastCard from "../cards/HourlyForecastCard";
import NowCard from "../cards/NowCard";
import RainForecastCard from "../cards/RainForecastCard";
import Loader from "../common/Loader";
import "./LocationForecast.css";

type Props = {
  displayName: string;
  gridId: string;
  gridX: number;
  gridY: number;
};

function LocationForecast({ displayName, gridId, gridX, gridY }: Props) {
  const { isPending, error, data } = useQuery<WeatherGridpoint>({
    queryKey: ["location-forecast", { gridId, gridX, gridY }],
    queryFn: ({ queryKey }) =>
      getForecast(
        queryKey[1] as { gridId: string; gridX: number; gridY: number },
      ),
  });

  const {
    isPending: isHourlyPending,
    error: hourlyError,
    data: hourlyData,
  } = useQuery<WeatherForecast>({
    queryKey: ["location-forecast-hourly", { gridId, gridX, gridY }],
    queryFn: ({ queryKey }) =>
      getHourlyForecast(
        queryKey[1] as { gridId: string; gridX: number; gridY: number },
      ),
  });

  const {
    isPending: isDailyPending,
    error: dailyError,
    data: dailyData,
  } = useQuery<WeatherForecast>({
    queryKey: ["location-forecast-daily", { gridId, gridX, gridY }],
    queryFn: ({ queryKey }) =>
      getDailyForecast(
        queryKey[1] as { gridId: string; gridX: number; gridY: number },
      ),
  });

  const showLocations = () => {
    document.querySelector("#nav-bar")?.classList.add("active");
  };

  if (isPending || isHourlyPending || isDailyPending) {
    return (
      <div className="location-forecast">
        <div className="header" onClick={showLocations}>
          <h2>{displayName}</h2>
          <Loader />
        </div>
      </div>
    );
  }

  if (error || hourlyError || dailyError) {
    return (
      <div className="location-forecast">
        <div className="header" onClick={showLocations}>
          <h2>{displayName}</h2>
        </div>
        Error getting data
      </div>
    );
  }

  const apparentTemperatureValues = data.properties.apparentTemperature;

  const probabilityPrecipitationValues =
    data.properties.probabilityOfPrecipitation;

  const nowPeriod = hourlyData.properties.periods[0];
  const dailyTemps = [
    dailyData.properties.periods[0],
    dailyData.properties.periods[1],
  ].map((p) => p.temperature);

  const lowTemp = Math.min(...dailyTemps);
  const highTemp = Math.max(...dailyTemps);
  const currentTime = Date.now();
  const feelPeriods = convertMeasureValues(apparentTemperatureValues.values);
  const currentFeel = feelPeriods.find(
    (p) =>
      p.time.getTime() < currentTime &&
      currentTime - 3600 * 1000 <= p.time.getTime(),
  );

  return (
    <div className="location-forecast pad">
      <div className="header" onClick={showLocations}>
        <h2>{displayName}</h2>
      </div>

      <NowCard
        period={nowPeriod}
        feelTemp={currentFeel?.value ?? 0}
        highTemp={highTemp}
        lowTemp={lowTemp}
      />
      <HourlyForecastCard periods={hourlyData.properties.periods} />
      <DailyForecastCard periods={dailyData.properties.periods} />
      <DetailForecastCard gridpoint={data} />
      <RainForecastCard
        probabilityPrecipitationValues={probabilityPrecipitationValues}
      />
      <div className="footer">
        Powered by{" "}
        <a href="https://www.weather.gov/documentation/services-web-api">
          Weather.gov
        </a>
      </div>
    </div>
  );
}

export default LocationForecast;
