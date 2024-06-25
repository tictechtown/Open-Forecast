import { skipToken, useQuery } from "@tanstack/react-query";
import useLocation from "../../hooks/useLocation";
import { getWeatherData } from "../../services/weather";
import { CityData } from "../../types";
import { formatCityName } from "../../utils/formatters";
import Loader from "../common/Loader";
import LocationForecast from "./LocationForecast";

function WeatherLocationForecast({ city }: { city: CityData | undefined }) {
  const {
    location,
    isPending: isLocationPending,
    error: geoError,
  } = useLocation(city);

  const { isPending, error, data } = useQuery({
    queryKey: ["weather-info", location],
    queryFn:
      location !== null
        ? ({ queryKey }) =>
            getWeatherData(queryKey[1] as { lat: number; long: number })
        : skipToken,
  });

  const showLocations = () => {
    document.querySelector("#nav-bar")?.classList.add("active");
  };

  if (!city) {
    return (
      <div className="location-forecast">
        <div className="header" onClick={showLocations}>
          Add a location
        </div>
        <div>
          <h1> Welcome to Open Forecast</h1>
          <div>
            You don't have any location yet. To get started, please tap on the
            button "add a location"
          </div>
        </div>
      </div>
    );
  }

  if (isPending || isLocationPending) {
    return (
      <div className="location-forecast">
        <div className="location-context">
          <Loader />
          <div>Loading Content</div>
        </div>
      </div>
    );
  }

  if (error || geoError) {
    return <div className="location-forecast">Error loading</div>;
  }

  const { gridId, gridX, gridY } = data.properties;
  return (
    <LocationForecast
      displayName={formatCityName(city)}
      gridId={gridId}
      gridX={gridX}
      gridY={gridY}
    />
  );
}

export default WeatherLocationForecast;
