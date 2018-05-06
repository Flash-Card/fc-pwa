import fakeIndexedDB from 'fake-indexeddb';
import IDBKeyRange from 'fake-indexeddb/lib/FDBKeyRange';
import * as idb from './index';
import schema from './schema';
import { OpenDB } from './index';

const SETS = {
  name: 'sets',
  values: [
    {
      id: 'oxford3000',
      title: 'The Oxford 3000',
      progress: 0,
      meta: {
        description: 'The Oxford 3000 is a list of the 3000 most important words to learn in English.',
        url: 'https://raw.githubusercontent.com/OliverCollins/Oxford-3000-Word-List/master/Oxford%203000%20Word%20List.txt',
      },
    },
  ],
};

const TYPES = {
  name: 'types',
  values: [
    {
      id: '0',
      title: 'article',
      meta: {
        description: 'Слова, выполняющие функцию показателя определённости-неопределённости',
        transcription: '[ˈɑːrtɪkl]',
      },
    },
  ],
};


function getFixtures({ name }) {
  switch (name) {
    case 'fx01types.json':
      return Promise.resolve({ data: TYPES });

    case 'fx01sets.json':
      return Promise.resolve({ data: SETS });

    default:
      return Promise.resolve({ data: { name: '', values: [] } });
  }
}

describe('Indexed store', () => {

  const originIndexedDB = global.indexedDB;
  const originIDBKeyRange = global.IDBKeyRange;
  let data;
  let list;

  const update = idb.upgrade({ getFixtures, schema });
  const iDBx = () => new OpenDB({ DB_NAME: 'FlashCards', DB_VERSION: 3 }, update);

  beforeEach(() => {
    global.indexedDB = fakeIndexedDB;
    global.location = { pathname: '/' };
    global.IDBKeyRange = IDBKeyRange;
    data = {};
    list = [];
  });

  afterEach(() => {
    global.indexedDB._databases.clear();
    global.indexedDB = originIndexedDB;
    global.IDBKeyRange = originIDBKeyRange;
    // delete global.document.reload;
  });

  it('Open db check indexes', () => iDBx()
    .then((db) => {
      expect(db.name).toEqual('FlashCards');
      expect(db.version).toBe(3);
      const os = idb.os(db, schema[1][0].name, 'readonly');
      expect(os.name).toEqual(schema[1][0].name);
      expect(os.indexNames).toEqual(['index', 'key']);
    }));

  it('Database version', () => idb.version(iDBx)
    .then((res) => {
      expect(res).toBe(3);
    }));

  it('object store throw if table not exist', () => {
    const permission = 'readonly';
    const table = 'notExistTable';
    return iDBx()
      .then((db) => {
        expect(() => idb.os(db, table, permission)).toThrow();
      });
  });

  it('add item to table', () => {
    data = { key: 'test' };
    return idb.addItem('dictionary', data, iDBx)
      .then((res) => {
        expect(res).toBe(1);
        return idb.getItem('dictionary', 'index', 1, iDBx);
      })
      .then((res) => {
        expect(res).toEqual({ ...data, index: 1 });
      });
  });

  it('add item to table with custom index', () => {
    data = { key: 'test', index: 10 };
    return idb.addItem('dictionary', data, iDBx)
      .then((res) => {
        expect(res).toBe(10);
        return idb.getItem('dictionary', 'index', 10, iDBx);
      });
  });

  it('add list of item', () => {
    list = [{ key: 'test' }, { key: 'test2' }];
    return idb.addList('dictionary', list, { idb: iDBx })
      .then((res) => {
        expect(res).toEqual([1, 2]);
        return idb.getItem('dictionary', 'key', 'test2', iDBx);
      })
      .then((res) => {
        expect(res).toEqual({ key: 'test2', index: 2 });
      });
  });

  it('get list', () => {
    list = [{ key: 'test', index: 1 }, { key: 'test2', index: 10 }];
    return idb.addList('dictionary', list, { idb: iDBx })
      .then((res) => {
        expect(res).toEqual([1, 10]);
        return iDBx();
      })
      .then(db => idb.getList(db, 'dictionary'))
      .then((l) => {
        expect(l).toEqual(list);
      });
  });

  it('update item', () => {
    list = [{ key: 'test', index: 1 }, { key: 'test2', index: 10 }];
    const item = { key: 'test2-1', index: 10 };
    return idb.addList('dictionary', list, { idb: iDBx })
      .then((res) => {
        expect(res).toEqual([1, 10]);
        return idb.updateItem('dictionary', item, iDBx);
      })
      .then((res) => {
        expect(res).toBe(10);
        return idb.getItem('dictionary', 'index', res, iDBx);
      })
      .then((res) => {
        expect(res).toEqual(item);
      });
  });

  it('delete item', () => {
    list = [{ key: 'test', index: 1 }, { key: 'test2', index: 10 }];
    return idb.addList('dictionary', list, { idb: iDBx })
      .then((res) => {
        expect(res).toEqual([1, 10]);
        return idb.deleteItem('dictionary', 1, iDBx);
      })
      .then((res) => {
        expect(res).not.toBeDefined();
        return idb.count('dictionary', iDBx);
      })
      .then((res) => {
        expect(res).toBe(1);
      });
  });

  it('update list', () => {
    list = [{ key: 'test', index: 1 }, { key: 'test2', index: 10 }];
    const modifier = item => ({ ...item, k: item.index + 1 });
    return idb.addList('dictionary', list, { idb: iDBx })
      .then((res) => {
        expect(res).toEqual([1, 10]);
        return iDBx();
      })
      .then(db => ({ db, pr: idb.updateList(db, 'dictionary', modifier) }))
      .then(({ db, pr }) => pr
        .then((res) => {
          expect(res).toEqual([1, 10]);
          return idb.getList(db, 'dictionary');
        }))
      .then((res) => {
        expect(res).toEqual([
          { key: 'test', index: 1, k: 2 },
          { key: 'test2', index: 10, k: 11 },
        ]);
      });
  });

  it('fill store', () => {
    list = [{ key: 'test', index: 1 }, { key: 'test2', index: 10 }];
    return idb.addList('dictionary', list, { idb: iDBx })
      .then((res) => {
        expect(res).toEqual([1, 10]);
        return idb.fillStore({ STORE_TABLES: ['dictionary'] }, iDBx);
      })
      .then((l) => {
        expect(l).toEqual({ dictionary: list });
      });
  });

});
