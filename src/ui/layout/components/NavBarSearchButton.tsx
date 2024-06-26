import { CityData } from "../../../types";
import SearchButton from "../../common/SearchButton";
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
        <SearchButton onClick={onStartSearch} />
      </div>
    </>
  );
}

export default NavBarSearchButton;
