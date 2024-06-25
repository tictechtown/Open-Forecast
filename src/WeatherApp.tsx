import useCityStore, { CURRENT_LOCATION } from "./store/useCityStore";
import { CityData } from "./types";
import WeatherLocationForecast from "./ui/forecast/WeatherLocationForecast";
import Layout from "./ui/layout/Layout";
import SearchModal from "./ui/search/SearchModal";

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
      <WeatherLocationForecast key={selectedCity?.id} city={selectedCity} />
    </Layout>
  );
}

export default WeatherApp;
