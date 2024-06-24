import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CityData } from "../types";

type State = {
  cities: CityData[];
  selectedId: number | null;
};

type Action = {
  addCity: (city: CityData) => void;
  removeCity: (city: CityData) => void;
  selectCityId: (cityId: CityData["id"]) => void;
};

const useCityStore = create<State & Action>()(
  persist(
    (set) => ({
      cities: [],
      selectedId: null,
      addCity: (city) =>
        set((state) => {
          // duplicate
          if (state.cities.find((sc) => sc.id === city.id)) {
            return state;
          }
          const cities = [...state.cities];
          cities.push(city);
          return { cities, selectedId: city.id };
        }),
      removeCity: (city) =>
        set((state) => {
          const cities = state.cities.filter((c) => c.id != city.id);
          return { cities };
        }),
      selectCityId: (cityId) => set({ selectedId: cityId }),
    }),
    {
      name: "open-news-ui",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export default useCityStore;