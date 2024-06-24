import {
  QueryClient,
  QueryClientProvider,
  skipToken,
  useQuery,
} from "@tanstack/react-query";
import "./App.css";
import AutocompleteModal from "./AutocompleteModal";
import Layout from "./Layout";
import LocationForecast from "./components/location/LocationForecast";
import useCityStore from "./store/useCityStore";
import { CityData, WeatherPoint } from "./types";

const queryClient = new QueryClient();

const getWeatherData = async ({ lat, long }: { lat: number; long: number }) => {
  // points resolution, up to 4 decimals
  return fetch(`https://api.weather.gov/points/${lat},${long}`).then(
    (res) => res.json() as Promise<WeatherPoint>,
  );
};

function WeatherApp() {
  const store = useCityStore();

  const onSelect = (id) => {
    store.selectCityId(id);
  };

  const addCity = (city: CityData) => {
    store.addCity(city);
  };

  return (
    <Layout
      sideContent={store.cities}
      selectedId={store.selectedId}
      onSelect={onSelect}
    >
      <AutocompleteModal onSelect={addCity} />
      <WeatherLocation
        city={store.cities.find((s) => s.id === store.selectedId)}
      />
    </Layout>
  );
}

function WeatherLocation({ city }: { city: CityData | undefined }) {
  const location = city ? { lat: city.lat, long: city.long } : null;
  const { isPending, error, data } = useQuery({
    queryKey: ["weather-info", location],
    queryFn: location
      ? async ({ queryKey }) => getWeatherData(queryKey[1])
      : skipToken,
  });

  if (!city) {
    return <div className="location-forecast">Add a city first</div>;
  }

  if (isPending) {
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherApp />
    </QueryClientProvider>
  );
}

export default App;
