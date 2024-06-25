import { CityData } from "../types";

export const TimeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "2-digit",
});

export const DayFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
});

export function formatCityName(city: CityData): string {
  if (city.id === -1) {
    return "Current Location";
  }
  return `${city.name}, ${city.stateCode}`;
}
