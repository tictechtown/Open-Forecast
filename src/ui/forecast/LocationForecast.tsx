import { useQuery } from "@tanstack/react-query";
import {
  getDailyForecast,
  getForecast,
  getHourlyForecast,
} from "../../service/weather";
import { WeatherForecast, WeatherGridpoint } from "../../types";
import { convertMeasureValues } from "../../utils/utils";
import "./LocationForecast.css";
import HourlyForecastCard from "./components//HourlyForecast";
import RainForecast from "./components//RainForecast";
import DailyForecast from "./components/DailyForecast";
import DetailForecastCard from "./components/DetailForecastCard";
import NowCard from "./components/NowCard";

type Props = {
  displayName: string;
  gridId: string;
  gridX: number;
  gridY: number;
};

function LocationForecast({ displayName, gridId, gridX, gridY }: Props) {
  const { isPending, error, data } = useQuery<WeatherGridpoint>({
    queryKey: ["location-forecast", { gridId, gridX, gridY }],
    queryFn: ({ queryKey }) => getForecast(queryKey[1]),
  });

  const {
    isPending: isHourlyPending,
    error: hourlyError,
    data: hourlyData,
  } = useQuery<WeatherForecast>({
    queryKey: ["location-forecast-hourly", { gridId, gridX, gridY }],
    queryFn: ({ queryKey }) => getHourlyForecast(queryKey[1]),
  });

  const {
    isPending: isDailyPending,
    error: dailyError,
    data: dailyData,
  } = useQuery<WeatherForecast>({
    queryKey: ["location-forecast-daily", { gridId, gridX, gridY }],
    queryFn: ({ queryKey }) => getDailyForecast(queryKey[1]),
  });

  const showLocations = () => {
    document.querySelector("#nav-bar")?.classList.add("active");
  };

  if (isPending || isHourlyPending || isDailyPending) {
    return (
      <div className="location-forecast">
        <div className="header" onClick={showLocations}>
          <h1>{displayName}</h1>
        </div>
        Pending
      </div>
    );
  }

  if (error || hourlyError || dailyError) {
    return (
      <div className="location-forecast">
        <div className="header" onClick={showLocations}>
          <h1>{displayName}</h1>
        </div>
        Error
      </div>
    );
  }

  const apparentTemperatureValues = data.properties.apparentTemperature;

  const precipitationValues = data.properties.quantitativePrecipitation;
  const probabilityPrecipitationValues =
    data.properties.probabilityOfPrecipitation;

  const nowPeriod = hourlyData.properties.periods[0];
  const dailyTemps = [
    dailyData.properties.periods[0],
    dailyData.properties.periods[1],
  ].map((p) => p.temperature);
  //
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
    <div className="location-forecast">
      <div className="header" onClick={showLocations}>
        <h1>{displayName}</h1>
      </div>

      <NowCard
        period={nowPeriod}
        feelTemp={currentFeel?.value ?? 0}
        highTemp={highTemp}
        lowTemp={lowTemp}
      />
      <HourlyForecastCard periods={hourlyData.properties.periods} />
      <DailyForecast periods={dailyData.properties.periods} />
      <DetailForecastCard gridpoint={data} />
      <RainForecast
        precipitationValues={precipitationValues}
        probabilityPrecipitationValues={probabilityPrecipitationValues}
      />
    </div>
  );
}

export default LocationForecast;