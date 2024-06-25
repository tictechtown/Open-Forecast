import { CityData } from "../../../types";
import SearchBox from "../../search/SearchBox";
import "./NavBarSearchButton.css";

type Props = {
  onAddCity: (value: CityData) => void;
  onStartSearch: () => void;
  onHideSearch: () => void;
};

function NavBarSearchButton({ onAddCity, onStartSearch, onHideSearch }: Props) {
  return (
    <>
      <div className="search-box-small">
        <button className="close-button" onClick={onHideSearch}></button>
        <SearchBox onSelect={onAddCity} />
      </div>
      <div className="search-box-large">
        <button onClick={onStartSearch}>
          <span className="search-btn">Add Location</span>
        </button>
      </div>
    </>
  );
}

export default NavBarSearchButton;
