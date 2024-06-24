import Papa from "papaparse";
import { useMemo, useState } from "react";
import styles from "./AutoComplete.module.css";
import { CityData } from "./types";
import publicCSV from "/us_cities.csv?url";

const fullUrl = `http://localhost:5173/${publicCSV}`;

class TrieNode<T> {
  isEndOfWord: boolean;
  data: T[] | null; // for collision
  children: Record<string, TrieNode<T>>;

  constructor() {
    this.children = {};
    this.data = null;
    this.isEndOfWord = false;
  }
}

class PrefixTree<T> {
  rootNode: TrieNode<T>;
  constructor() {
    this.rootNode = new TrieNode();
  }

  insertWord(word: string, data: T) {
    if (!word || word.length == 0) {
      return;
    }

    let node = this.rootNode;
    const token = this.tokenizeWord(word);
    for (let i = 0; i < token.length; i++) {
      const first_char = token[i];
      if (!node.children[first_char]) {
        node.children[first_char] = new TrieNode();
      }
      node = node.children[first_char];
    }
    node.isEndOfWord = true;
    if (node.data === null) {
      node.data = [data];
    } else {
      node.data.push(data);
    }
  }

  searchWithExactPrefix(prefix: string): T[] {
    const token = this.tokenizeWord(prefix);
    const results: T[] = [];

    let node = this.rootNode;
    for (let i = 0; i < token.length; i++) {
      if (node.children[token[i]]) {
        node = node.children[token[i]];
      } else {
        // no results
        return results;
      }
    }

    // node is now the root for all the words starting with prefix
    // we explore that tree and collect all terminal leafs

    this.collectAllWords(node, results);
    return results;
  }

  searchWithPrefix(prefix: string, distance: number) {
    const token = this.tokenizeWord(prefix);
    const currentDistance = 0;
    let results: T[] = [];

    let node = this.rootNode;
    for (let i = 0; i < token.length; i++) {
      if (node.children[token[i]]) {
        node = node.children[token[i]];
      } else if (currentDistance < distance) {
        // no results, we decrease the "error distance" and rerun the algo
        for (const k of Object.keys(node.children)) {
          const newPrefix = `${token.slice(0, i)}${k}${token.slice(i + 1)}`;
          console.log("previx", token, newPrefix);
          results = results.concat(
            this.searchWithPrefix(newPrefix, distance - 1),
          );
        }
        return results;
      } else {
        return results;
      }
    }

    this.collectAllWords(node, results);
    return results;
  }

  private tokenizeWord(word: string) {
    return word.toLocaleLowerCase().replace(" ", "").replace(",", "");
  }

  private collectAllWords(node: TrieNode<T>, results: T[]) {
    if (node.isEndOfWord) {
      if (node.data) {
        for (const d of node.data) {
          results.push(d);
        }
      }
    } else {
      const children = Object.values(node.children);
      for (const n of children) {
        this.collectAllWords(n, results);
      }
    }
  }
}

const prefixTree = new PrefixTree<CityData>();

Papa.parse(fullUrl, {
  worker: true,
  download: true,
  step: function (row) {
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

function AutoComplete({ onSelect }: Props) {
  const [searchValue, setSearchValue] = useState("");

  const onChange = (e) => {
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
        placeholder="Search a city"
        onChange={onChange}
      ></input>
      <div className={styles["search-box-results"]}>
        {searchValue.length > 3 && suggestionsList.length == 0 && (
          <span>No Results found</span>
        )}
        <ul>
          {suggestionsList.map((suggestion) => {
            return (
              <li
                key={suggestion.id}
                onClick={() => onSelect(suggestion)}
              >{`${suggestion.name}, ${suggestion.stateCode}`}</li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default AutoComplete;
