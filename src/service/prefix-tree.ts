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

export class PrefixTree<T> {
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
