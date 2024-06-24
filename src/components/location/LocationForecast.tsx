import { useQuery } from "@tanstack/react-query";
import { WeatherForecast, WeatherGridpoint } from "../../types";
import { convertMeasureValues } from "../../utils";
import DailyForecast from "./DailyForecast";
import DetailForecastCard from "./DetailForecastCard";
import HourlyForecastCard from "./HourlyForecast";
import "./LocationForecast.css";
import NowCard from "./NowCard";
import RainForecast from "./RainForecast";

const getForecast = async ({
  gridId,
  gridX,
  gridY,
}: {
  gridId: string;
  gridX: number;
  gridY: number;
}) => {
  return fetch(
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}`,
  ).then((res) => res.json() as Promise<WeatherGridpoint>);
};

const getHourlyForecast = async ({
  gridId,
  gridX,
  gridY,
}: {
  gridId: string;
  gridX: number;
  gridY: number;
}) => {
  return fetch(
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast/hourly`,
  ).then((res) => res.json() as Promise<WeatherForecast>);
};

const getDailyForecast = async ({
  gridId,
  gridX,
  gridY,
}: {
  gridId: string;
  gridX: number;
  gridY: number;
}) => {
  console.log(
    "fetching",
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`,
  );
  return fetch(
    `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`,
  ).then((res) => res.json() as Promise<WeatherForecast>);
};

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
