import { skipToken, useQuery } from "@tanstack/react-query";
import useLocation from "../../hooks/useLocation";
import { getWeatherData } from "../../services/weather";
import { CityData } from "../../types";
import { formatCityName } from "../../utils/formatters";
import LocationLoader from "../common/LocationLoader";
import StationLoader from "../common/StationLoader";
import LocationForecast from "./LocationForecast";
import ErrorContent from "./components/ErrorContent";
import WelcomeContent from "./components/WelcomeContent";

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

  const handleShowModal = () => {
    (document.querySelector("#search-modal") as HTMLDialogElement)?.showModal();
    document.querySelector("#nav-bar")?.classList.add("active");
  };

  const handleShowNavBar = () => {
    document.querySelector("#nav-bar")?.classList.add("active");
  };

  if (!city) {
    return (
      <WelcomeContent
        onClickModal={handleShowModal}
        onClickNavBar={handleShowNavBar}
      />
    );
  }

  if (isLocationPending) {
    return (
      <div className="location-context pad">
        <LocationLoader />
        <div>Fetching Location Data</div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="location-context pad">
        <StationLoader />
        <div>Finding Weather Station</div>
      </div>
    );
  }

  if (geoError) {
    return (
      <ErrorContent
        onClickModal={handleShowModal}
        onClickNavBar={handleShowNavBar}
      >
        Error Getting Geolocation, Please Enable it first
      </ErrorContent>
    );
  }

  if (error || geoError) {
    return (
      <ErrorContent
        onClickModal={handleShowModal}
        onClickNavBar={handleShowNavBar}
      >
        Error Getting Station Data
      </ErrorContent>
    );
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
