import { useState } from "react";
import { CityData } from "../../types";
import { formatCityName } from "../../utils/formatters";
import NavBarSearchButton from "./components/NavBarSearchButton";

type Props = {
  sideContent: CityData[];
  selectedId: CityData["id"] | null;
  onSelect: (value: CityData["id"]) => void;
  onSearchSelect: (value: CityData) => void;
};

function NavBar({ sideContent, selectedId, onSelect, onSearchSelect }: Props) {
  const [navSearchKey, setNavSearchKey] = useState<boolean>(true);

  const handleStartSearch = () => {
    (document.querySelector("#search-modal") as HTMLDialogElement)?.showModal();
  };

  const handleHideLocation = () => {
    setNavSearchKey((key) => !key);
    document.querySelector("#nav-bar")?.classList.remove("active");
  };

  const handleSelect = (id: number) => {
    onSelect(id);
    handleHideLocation();
  };

  const handleAddCity = (city: CityData) => {
    setNavSearchKey((key) => !key);
    onSearchSelect(city);
    handleHideLocation();
  };

  const supportsGeoLocation = "geolocation" in navigator;

  return (
    <>
      <NavBarSearchButton
        key={navSearchKey ? "nav-search-true" : "nav-search-false"}
        onAddCity={handleAddCity}
        onHideSearch={handleHideLocation}
        onStartSearch={handleStartSearch}
      />
      <br />
      Saved Locations
      <br />
      {supportsGeoLocation && (
        <div
          role="button"
          tabIndex={0}
          className={`button ${selectedId === -1 ? "selected" : ""}`}
          onClick={() => handleSelect(-1)}
        >
          Current Location
          <svg
            className="inline-svg"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 12C19 15.866 15.866 19 12 19M19 12C19 8.13401 15.866 5 12 5M19 12H21M12 19C8.13401 19 5 15.866 5 12M12 19V21M5 12C5 8.13401 8.13401 5 12 5M5 12H3M12 5V3M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      )}
      {sideContent.map((s) => {
        const selected = s.id === selectedId ? "selected" : "";
        return (
          <div
            key={s.id}
            role="button"
            tabIndex={0}
            className={`button ${selected}`}
            onClick={() => handleSelect(s.id)}
          >
            {formatCityName(s)}
          </div>
        );
      })}
    </>
  );
}

export default NavBar;
