import * as idb from './index';

export default {
  1: [{
    name: 'dictionary',
    options: { keyPath: 'index', autoIncrement: true },
    indexes: [
      { name: 'index', keyPath: 'index', option: { unique: true } },
      { name: 'key', keyPath: 'key', option: { unique: true } },
    ],
  }, {
    name: 'types',
    options: { keyPath: 'id', autoIncrement: false },
    indexes: [
      { name: 'id', keyPath: 'id', option: { unique: true } },
      { name: 'title', keyPath: 'title', option: { unique: true } },
    ],
    fixture: 'fx01types.json',
  }, {
    name: 'lexicon',
    options: { keyPath: 'key', autoIncrement: false },
    indexes: [
      { name: 'key', keyPath: 'key', option: { unique: true } },
    ],
  }, {
    name: 'sets',
    options: { keyPath: 'id', autoIncrement: false },
    indexes: [
      { name: 'id', keyPath: 'id', option: { unique: true } },
    ],
  }],
  2: [{
    name: 'log',
    options: { keyPath: 'date', autoIncrement: false },
    indexes: [
      { name: 'date', keyPath: 'date', option: { unique: true } },
      { name: 'key', keyPath: 'key', option: { unique: false } },
      { name: 'status', keyPath: 'status', option: { unique: false } },
    ],
  }],
  3: [{
    name: 'env',
    options: { keyPath: 'key', autoIncrement: false },
    indexes: [
      { name: 'key', keyPath: 'key', option: { unique: true } },
    ],
  }],
  4: [],
  5: [],
  6: [],
  7: [{
    name: 'dictionary',
    syncAction({ target }, table) {
      target.result.deleteObjectStore(table);
      target.result.createObjectStore(table, { keyPath: ['set', 'key'], autoIncrement: false });
      const update = idb.updateIndex(table);
      update(target, { name: 'key', keyPath: 'key', option: { unique: false } });
      update(target, { name: 'set', keyPath: 'set', option: { unique: false } });
      update(target, { name: 'index', keyPath: ['set', 'index'], option: { unique: true } });
    },
  }, {
    name: 'sets',
    syncAction({ target }, table) {
      target.result.deleteObjectStore(table);
      target.result.createObjectStore(table, { keyPath: 'id', autoIncrement: false });
      const update = idb.updateIndex(table);
      update(target, { name: 'id', keyPath: 'id', option: { unique: true } });
    },
    fixture: 'fx07sets.json',
  }],
  8: [{
    name: 'dictionary',
    syncAction({ target }, table) {
      idb.updateIndex(table)(target, { name: 'keyName', keyPath: 'keyName', option: { unique: false } });
    },
    asyncAction(db) {
      const mdf = (item) => ({ ...item, keyName: item.key.toUpperCase() });
      return idb.updateList(db, 'dictionary', mdf);
    },
  }],
};
