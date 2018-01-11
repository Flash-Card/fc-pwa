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
    fixture: 'fx01sets.json',
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
  }, {
    name: 'sets',
    modifier: (item) => ({ ...item, meta: { ...item.meta, type: 'textLine' } }),
  }],
};
