import Papa from "papaparse";
import { useMemo, useState } from "react";
import { PrefixTree } from "../../services/prefix-tree";
import { CityData } from "../../types";
import styles from "./SearchBox.module.css";
import SuggestionList from "./components/SuggestionList";
import publicCSV from "/us-cities.csv?url";

const prefixTree = new PrefixTree<CityData>();

// full URL for our static CSV asset
const cityListUrl = new URL(publicCSV, import.meta.url).href;

// init prefix-tree
Papa.parse(cityListUrl, {
  worker: true,
  download: true,
  step: function (row: {
    // id, state_code, city, latitude, longitude, population
    data: [number, string, string, number, number, number];
  }) {
    const data: CityData = {
      id: row.data[0],
      name: row.data[2],
      stateCode: row.data[1],
      lat: row.data[3],
      long: row.data[4],
      population: row.data[5],
    };
    prefixTree.insertWord(data.name + data.stateCode, data);
  },
});

type Props = {
  onSelect: (value: CityData) => void;
  large?: boolean;
};

function SearchBox({ onSelect, large = false }: Props) {
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const suggestionsList = useMemo(() => {
    if (searchValue.length < 3) {
      return [];
    }
    let matches = prefixTree.searchWithExactPrefix(searchValue);
    if (matches.length === 0) {
      matches = prefixTree.searchWithPrefix(searchValue, 1);
    }

    // we sort results by population desc
    matches.sort((a, b) => b.population - a.population);

    return matches.slice(0, 10);
  }, [searchValue]);

  return (
    <div className={`${styles["search-box"]} ${large ? styles["large"] : ""}`}>
      <input
        type="text"
        value={searchValue}
        placeholder="Search for a location"
        onChange={onChange}
      ></input>

      <SuggestionList
        suggestionsList={suggestionsList}
        onSelect={onSelect}
        showNoResult={searchValue.length > 3 && suggestionsList.length == 0}
      />
    </div>
  );
}

export default SearchBox;
