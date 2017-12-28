import * as CONFIG from 'config';
import { call } from 'redux-saga/effects';

const READ_ONLY = 'readonly';
const READ_WRITE = 'readwrite';

export const TABLE = {
  DICTIONARY: 'dictionary',
  LEXICON: 'lexicon',
  SETS: 'sets',
};

function rejectify(request, reject) {
  request.onerror = (e) => {
    reject(e.target.error);
  };
}

function promisify(request, cbName = 'onsuccess') {
  return new Promise((resolve, reject) => {

    rejectify(request, reject);

    request[cbName] = e => {
      resolve(e.target.result);
    };
  });
}


export function openDB() {

  const request = indexedDB.open(CONFIG.DB_NAME, CONFIG.DB_VERSION);

  return new Promise((resolve, reject) => {

    request.onsuccess = function() {
      resolve(this.result);
    };

    request.onerror = function(e) {
      reject(e.target.error);
    };

  });
}

function os(db, table, permission) {
  return db.transaction(table, permission).objectStore(table);
}

// function createStore(db, schema) {
//   if (!db.objectStoreNames.contains(schema.name)) {
//
//     const objectStore = db.createObjectStore(schema.name, schema.options);
//
//     schema.indexes.forEach(e => {
//       objectStore.createIndex(e.name, e.keyPath, e.option);
//     });
//
//     schema.fixture.forEach(e => objectStore.add(e));
//   }
// }

export function getAll(db, name) {
  return new Promise(resolve => {
    let list = [];
    os(db, name, READ_ONLY).openCursor().onsuccess = function(event) {

      const cursor = event.target.result;

      if (cursor) {

        list = list.concat(cursor.value);

        cursor.continue();

      } else {

        resolve({ name, list });

      }
    };
  });
}

export function* getItem(table, indexName, value) {
  const db = yield call(openDB);
  return yield promisify(os(db, table, READ_ONLY).index(indexName).get(value));
}

export function* addData(table, data) {

  const db = yield call(openDB);

  const add = (data) => promisify(os(db, table, READ_WRITE).add(data));

  if (Array.isArray(data)) {

    return yield Promise.all(data.map(add));

  } else {

    return yield add(data);

  }
}

export function* updateItem(table, payload) {

  const db = yield call(openDB);

  return yield promisify(os(db, table, READ_WRITE).put(payload));

}

export function* deleteItem(table, index) {

  const db = yield call(openDB);

  return yield promisify(os(db, table, READ_WRITE).delete(index));

}
