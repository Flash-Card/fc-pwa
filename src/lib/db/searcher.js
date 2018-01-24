import SymSpell from './symSpell';

let symspell;
export function searcher(store, query) {
  if (!symspell) {
    symspell = new SymSpell({
      maxDistance: 1,
      verbosity: 2,
    });
    const cursor = store.openCursor();
    const setDictionary = new Promise((resolve) => {
      cursor.onsuccess = function() {
        if (this.result) {
          symspell.add(this.result.value);
          this.result.continue();
        } else {
          resolve();
        }
      };
    });

    return setDictionary.then(() => symspell.search(query));
  } else {
   return symspell.search(query);
  }
}
