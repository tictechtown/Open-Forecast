import { ReactNode } from "react";
import { CityData } from "../../types";
import { formatCityName } from "../../utils/formatters";
import SearchBox from "../search/SearchBox";
import "./Layout.css";

type Props = {
  sideContent: CityData[];
  selectedId: CityData["id"] | null;
  onSelect: (value: CityData["id"]) => void;
} & { children?: ReactNode };

function Layout({ children, sideContent, selectedId, onSelect }: Props) {
  const handleStartSearch = () => {
    (document.querySelector("#search-modal") as HTMLDialogElement)?.showModal();
  };

  const handleHideLocation = () => {
    document.querySelector("#nav-bar")?.classList.remove("active");
  };

  const handleSelect = (id: number) => {
    onSelect(id);
    handleHideLocation();
  };
  // TODO
  const handleAddCity = () => {};

  const supportsGeoLocation = "geolocation" in navigator;

  return (
    <div>
      <nav id="nav-bar">
        <div className="search-box-small">
          <SearchBox onSelect={handleAddCity} />
          <button onClick={handleHideLocation}></button>
        </div>
        <div className="search-box-large">
          <button onClick={handleStartSearch}>Add Location</button>
        </div>
        <br />
        Saved Locations
        <br />
        {supportsGeoLocation && (
          <div
            className={`button ${selectedId === -1 ? "selected" : ""}`}
            onClick={() => handleSelect(-1)}
          >
            Current Location
          </div>
        )}
        {sideContent.map((s) => {
          const selected = s.id === selectedId ? "selected" : "";
          return (
            <div
              key={s.id}
              className={`button ${selected}`}
              onClick={() => handleSelect(s.id)}
            >
              {formatCityName(s)}
            </div>
          );
        })}
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Layout;
