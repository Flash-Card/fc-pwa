import * as CONFIG from 'config';
import schema from './schema';
import { arrayRange } from 'lib/helpers';

const READ_ONLY = 'readonly';
const READ_WRITE = 'readwrite';

export const TABLE = {
  DICTIONARY: 'dictionary',
  LEXICON: 'lexicon',
  SETS: 'sets',
  LOG: 'log',
};

function rejectify(request, reject) {
  request.onerror = function() {
    reject(this.error);
  };
}

function promisify(request) {
  return new Promise((resolve, reject) => {
    rejectify(request, reject);
    request.onsuccess = function() {
      resolve(this.result);
    };
  });
}

function promiSeq(cursor) {
  let list = [];
  return new Promise((resolve, reject) => {
    cursor.onsuccess = function() {
      if (this.result) {
        list = list.concat(this.result.value);
        this.result.continue();
      } else {
        resolve(list);
      }
    };
    rejectify(cursor, reject);
  });
}

export function openDB(config = CONFIG) {
  let fixtures = [];
  const request = indexedDB.open(config.DB_NAME, config.DB_VERSION);
  request.onupgradeneeded = event => {
    const { newVersion, oldVersion, target: { result } } = event;
    arrayRange(newVersion).slice(oldVersion).forEach(idx => {
      schema[idx + 1].forEach(item => {

        const objectStore = result.createObjectStore(item.name, item.options);

        item.indexes.forEach(idx => {
          objectStore.createIndex(idx.name, idx.keyPath, idx.option);
        });

        if (Array.isArray(item.fixture) && item.fixture.length) {
          fixtures = item.fixture.reduce((A, values) => A.concat({ table: item.name, values }), fixtures);
        }

      });
    });
  };
  return promisify(request)
    .then(db => {
      if (fixtures.length) {
        const a = table => add(db, table);
        return Promise
          .all(fixtures.map(item => a(item.table)(item.values)))
          .then(() => db);
      }
      return db;
    });
}

export function os(db, table, permission) {
  return db.transaction(table, permission).objectStore(table);
}

export function getItem(table, indexName, value) {
  return openDB()
    .then(db => promisify(
      os(db, table, READ_ONLY).index(indexName).get(value)),
    );
}

export function getList(db, table) {
  return promiSeq(os(db, table, READ_ONLY).openCursor());
}

function add(db, table) {
  return (item) => promisify(os(db, table, READ_WRITE).add(item));
}

function put(db, table) {
  return (item) => promisify(os(db, table, READ_WRITE).put(item));
}

/**
 *
 * @param table{string}
 * @param item{object}
 * @returns {*|PromiseLike<T>|Promise<T>}
 */
export function addItem(table, item) {
  return openDB()
    .then(db => add(db, table)(item));
}

export function addList(table, list) {
  return openDB()
    .then(db => {
      const a = add(db, table);
      return Promise.all(list.map(a));
    });
}

export function updateItem(table, item) {
  return openDB()
    .then(db => put(db, table)(item));
}

export function deleteItem(table, index) {
  return openDB()
    .then(db => promisify(os(db, table, READ_WRITE).delete(index)));
}

export function clean() {
  return openDB()
    .then(db => {
      db.close();
      return promisify(global.indexedDB.deleteDatabase(CONFIG.DB_NAME));
    });
}

export function fillStore(tables = CONFIG.TABLES) {
  return openDB()
    .then(db => Promise.all(tables.map(t => getList(db, t))))
    .then(list => list.reduce((A, V, I) => ({ ...A, [tables[I]]: V }), {}));
}
