import { useEffect, useState } from "react";
import { CityData } from "../types";

type LocationStatus =
  | {
      isPending: false;
      location: { lat: number; long: number };
      error: null;
    }
  | { isPending: true; location: null; error: null }
  | { isPending: false; location: null; error: GeolocationPositionError };

export default function useLocation(city: CityData | undefined) {
  const [locationStatus, setLocationStatus] = useState<LocationStatus | null>(
    city && city.id !== -1
      ? {
          isPending: false,
          location: { lat: city.lat, long: city.long },
          error: null,
        }
      : null,
  );

  useEffect(() => {
    if (city?.id === -1) {
      setLocationStatus({ isPending: true, location: null, error: null });
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationStatus({
            isPending: false,
            error: null,
            location: {
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
          });
        },
        (error) =>
          setLocationStatus({ isPending: false, error, location: null }),
      );
    }
  }, [city?.id === -1]);
  if (!locationStatus) {
    return {
      location: null,
      isPending: false,
      error: GeolocationPositionError.POSITION_UNAVAILABLE,
    };
  }
  return locationStatus;
}
