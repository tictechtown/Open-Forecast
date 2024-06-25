import { skipToken, useQuery } from "@tanstack/react-query";
import useLocation from "./hooks/useLocation";
import { getWeatherData } from "./service/weather";
import useCityStore from "./store/useCityStore";
import { CityData } from "./types";
import LocationForecast from "./ui/forecast/LocationForecast";
import Layout from "./ui/layout/Layout";
import SearchModal from "./ui/search/SearchModal";
import { formatCityName } from "./utils/formatters";

const CURRENT_LOCATION = {
  id: -1,
  lat: -1,
  long: -1,
  name: "Current Location",
  stateCode: "",
};

function WeatherLocation({ city }: { city: CityData | undefined }) {
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
    return <div className="location-forecast">Loading</div>;
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

function WeatherApp() {
  const store = useCityStore();

  const handleCitySelection = (id: number) => {
    store.selectCityId(id);
  };

  const handleAddCity = (city: CityData) => {
    store.addCity(city);
  };

  const selectedCity: CityData | undefined =
    store.selectedId === -1
      ? CURRENT_LOCATION
      : store.cities.find((s) => s.id === store.selectedId);

  return (
    <Layout
      sideContent={store.cities}
      selectedId={store.selectedId}
      onSelect={handleCitySelection}
    >
      <SearchModal onSelect={handleAddCity} />
      <WeatherLocation key={selectedCity?.id} city={selectedCity} />
    </Layout>
  );
}

export default WeatherApp;
