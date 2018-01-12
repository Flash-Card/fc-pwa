import * as CONFIG from 'config';
import SCHEMA from './schema';
import { arrayRange } from 'lib/helpers';
import Api from 'domain/api';

const READ_ONLY = 'readonly';
const READ_WRITE = 'readwrite';

export const TABLE = CONFIG.TABLES;

/**
 * helpers
 **/

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


/**
 * DB helpers
 **/

function tableExist(db, table) {
  const osn = db.objectStoreNames;
  for (let i = 0; i < osn.length; i++) {
    if (osn[i] === table) return true;
  }
  return false;
}

function add(db, table) {
  return (item) => promisify(os(db, table, READ_WRITE).add(item));
}

function put(db, table, modifier = d => d) {
  return (item) => promisify(os(db, table, READ_WRITE).put(modifier(item)));
}

export function os(db, table, permission) {
  if (tableExist(db, table))
    return db.transaction(table, permission).objectStore(table);
  throw new Error(`Table ${table} is not exist`);
}

export function getList(db, table) {
  if (tableExist(db, table)) {
    return promiSeq(os(db, table, READ_ONLY).openCursor());
  } return Promise.reject(`Table ${table} is not exist in object store`);
}

export function updateList(db, table, modifier) {
  const updater = put(db, table, modifier);
  return promiSeq(os(db, table, READ_WRITE).openCursor())
    .then(list => Promise.all(list.map(updater)));
}

export function upgrade({ getFixtures, schema }) {
  return function(event) {
    const { newVersion, oldVersion, target: { result } } = event;

    const update = ({ name, modifier }) => db => updateList(db, name, modifier);

    arrayRange(newVersion).slice(oldVersion).forEach(idx => {

      schema[idx + 1].forEach(item => {

        if (typeof item.options !== 'undefined') {
          const objectStore = result.createObjectStore(item.name, item.options);
          item.indexes.forEach(idx => {
            objectStore.createIndex(idx.name, idx.keyPath, idx.option);
          });
        }

        if (typeof item.fixture !== 'undefined') {
          this.setAsync(db =>
            getFixtures({ name: item.fixture })
              .then(({ data: { name, values } }) => {
                const a = add(db, name);
                return Promise.all(values.map(a));
              }),
          );
        }

        if (typeof item.modifier === 'function') {
          this.setAsync(update(item));
        }
      });
    });
  };
}


export function OpenDB(config, onUpgrade) {
  let async = [];

  this.setAsync = (value) => {
    async = async.concat(value);
  };

  const request = indexedDB.open(config.DB_NAME, config.DB_VERSION);

  request.onupgradeneeded = onUpgrade.bind(this);

  return promisify(request)
    .then(db => {
      if (async.length) {
        return Promise.all(async.map(fn => fn(db))).then(() => db);
      }
      return db;
    });
}

/**
 *
 **/

const iDB = (getFixtures = Api.fixtures, schema = SCHEMA) => new OpenDB(CONFIG, upgrade({ getFixtures, schema }));

export function getItem(table, indexName, value, idb = iDB) {
  return idb()
    .then(db => promisify(
      os(db, table, READ_ONLY).index(indexName).get(value)),
    );
}

export function addItem(table, item, idb = iDB) {
  return idb()
    .then(db => add(db, table)(item));
}

function iterator(set, actionFn, resolve) {
  let res = [];
  let count = set.size >= 4 ? 3 : set.size - 1; /** Count of thread - 1 */
  const it = set.keys();
  const nx = function(event) {
    if (event) {
      res = res.concat([event.target.result]);
    }
    const n = it.next();
    if (!n.done) {
      const storeItem = actionFn(n.value);
      storeItem.onsuccess = nx;
      ++count;
    } else if (count === 0) {
      resolve(res);
    }
    --count;
  };
  for (let i = 0; i <= count; i++) {
    nx();
  }
}

export function addList(table, list, idb = iDB) {
  return idb()
    .then(db => {
      const set = new Set(list);
      return new Promise(resolve => {
        const itemStore = (v) => os(db, table, READ_WRITE).add(v);
        iterator(set, itemStore, resolve);
      });
    });
}

export function updateItem(table, item, idb = iDB) {
  return idb()
    .then(db => put(db, table)(item));
}

export function deleteItem(table, index, idb = iDB) {
  return idb()
    .then(db => promisify(os(db, table, READ_WRITE).delete(index)));
}

export function count(table, idb = iDB) {
  return idb()
    .then(db => promisify(os(db, table, READ_ONLY).count()));
}

// export function clean(idb = iDB) {
//   return idb()
//     .then(db => {
//       db.close();
//       return promisify(global.indexedDB.deleteDatabase(CONFIG.DB_NAME));
//     });
// }

export function fillStore({ STORE_TABLES }, idb = iDB) {
  const tables = STORE_TABLES;
  return idb()
    .then(db => {
      const isExist = t => tableExist(db, t);
      const tList = t => getList(db, t);
      return Promise.all(
        tables.reduce((A, t) => isExist(t) ? A.concat([tList(t)]) : A, []),
      );
    })
    .then(list => list.reduce((A, V, I) => ({ ...A, [tables[I]]: V }), {}));
}
