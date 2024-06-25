import { skipToken, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getWeatherData } from "./service/weather";
import useCityStore from "./store/useCityStore";
import { CityData } from "./types";
import LocationForecast from "./ui/forecast/LocationForecast";
import Layout from "./ui/layout/Layout";
import SearchModal from "./ui/search/SearchModal";

type LocationStatus =
  | {
      isPending: false;
      location: { lat: number; long: number };
    }
  | { isPending: true; location: null };

function useLocation(city: CityData | undefined) {
  const [locationStatus, setLocationStatus] = useState<LocationStatus | null>(
    city && city.id !== -1
      ? { isPending: false, location: { lat: city.lat, long: city.long } }
      : null,
  );
  const [locationError, setLocationError] = useState<number | null>(null);

  useEffect(() => {
    if (city?.id === -1) {
      setLocationStatus({ isPending: true, location: null });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus({
            isPending: false,
            location: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          });
        },
        (error) => setLocationError(error.code),
      );
    }
  }, [city?.id === -1]);
  if (!locationStatus) {
    return { location: null, isPending: false, locationError: null };
  }
  return { ...locationStatus, locationError };
}

const CURRENT_LOCATION = {
  id: -1,
  lat: -1,
  long: -1,
  name: "Current Location",
  stateCode: "",
};

function WeatherLocation({ city }: { city: CityData | undefined }) {
  const { location, isPending: isLocationPending } = useLocation(city);

  const { isPending, error, data } = useQuery({
    queryKey: ["weather-info", location],
    queryFn:
      location !== null
        ? ({ queryKey }) => getWeatherData(queryKey[1])
        : skipToken,
  });

  if (!city) {
    return <div className="location-forecast">Add a city first</div>;
  }

  if (isPending || isLocationPending) {
    return <div className="location-forecast">Loading</div>;
  }

  if (error) {
    return <div className="location-forecast">Error loading</div>;
  }

  const { gridId, gridX, gridY } = data.properties;
  return (
    <LocationForecast
      displayName={`${city.name}, ${city.stateCode}`}
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
