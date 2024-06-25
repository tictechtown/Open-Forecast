import Papa from "papaparse";
import { useMemo, useState } from "react";
import { PrefixTree } from "../../service/prefix-tree";
import { CityData } from "../../types";
import styles from "./SearchBox.module.css";
import SuggestionList from "./components/SuggestionList";
import publicCSV from "/us_cities.csv?url";

const fullUrl = `http://localhost:5173/${publicCSV}`;

const prefixTree = new PrefixTree<CityData>();

// init prefix-tree
Papa.parse(fullUrl, {
  worker: true,
  download: true,
  step: function (row: {
    data: [number, string, string, string, string, number, number];
  }) {
    const data: CityData = {
      id: row.data[0],
      name: row.data[3],
      stateCode: row.data[1],
      lat: row.data[5],
      long: row.data[6],
    };
    prefixTree.insertWord(data.name + data.stateCode, data);
  },
});

type Props = {
  onSelect: (value: CityData) => void;
};

function SearchBox({ onSelect }: Props) {
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
    return matches.slice(0, 10);
  }, [searchValue]);

  return (
    <div className={styles["search-box"]}>
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
