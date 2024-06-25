import { CityData } from "../../../types";
import { formatCityName } from "../../../utils/formatters";
import styles from "../SearchBox.module.css";

type Props = {
  suggestionsList: CityData[];
  showNoResult: boolean;
  onSelect: (value: CityData) => void;
};

function SuggestionList({ suggestionsList, showNoResult, onSelect }: Props) {
  return (
    <div className={styles["search-box-results"]}>
      {showNoResult && <span>No Results found</span>}
      <ul>
        {suggestionsList.map((suggestion) => {
          return (
            <li key={suggestion.id} onClick={() => onSelect(suggestion)}>
              {formatCityName(suggestion)}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SuggestionList;
