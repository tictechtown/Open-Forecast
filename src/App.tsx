import {
  QueryClient,
  QueryClientProvider,
  skipToken,
  useQuery,
} from "@tanstack/react-query";
import "./App.css";
import { getWeatherData } from "./service/weather";
import useCityStore from "./store/useCityStore";
import { CityData } from "./types";
import LocationForecast from "./ui/forecast/LocationForecast";
import Layout from "./ui/layout/Layout";
import SearchModal from "./ui/search/SearchModal";

const queryClient = new QueryClient();

function WeatherApp() {
  const store = useCityStore();

  const handleCitySelection = (id: number) => {
    store.selectCityId(id);
  };

  const handleAddCity = (city: CityData) => {
    store.addCity(city);
  };

  return (
    <Layout
      sideContent={store.cities}
      selectedId={store.selectedId}
      onSelect={handleCitySelection}
    >
      <SearchModal onSelect={handleAddCity} />
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
