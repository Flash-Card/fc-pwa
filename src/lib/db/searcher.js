import SymSpell from './symSpell';

export function searcher(store, query) {
  const symspell = new SymSpell({
    maxDistance: 1,
    verbosity: 2,
  });
  const cursor = store.openCursor();
  const setDictionary = new Promise((resolve) => {
    cursor.onsuccess = function() {
      if (this.result) {
        symspell.add(this.result.value.key);
        this.result.continue();
      } else {
        resolve();
      }
    };
  });

  return setDictionary.then(() => symspell.search(query));
}
