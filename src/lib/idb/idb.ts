import get from 'lodash/get';
import { EMode, Fixtures, ITableSchema, Mode, Query, RequestUpgrade } from './types';
import { applyFixtures, promisifyCursor } from './helpers';

export default class IDB {

  readonly name: string;
  readonly version: number | undefined;
  private requestUpgrade: RequestUpgrade | null;
  private db: IDBDatabase | null;

  constructor(name: string, requestUpgrade: RequestUpgrade | null, version?: number) {
    this.name = name;
    this.version = version;
    this.requestUpgrade = requestUpgrade;
    this.db = null;
  }

  protected async os(table: string | string[], mode: Mode): Promise<IDBObjectStore> {
    this.db = await this.open();
    const osName = Array.isArray(table) ? table[0] : table;
    return this.db.transaction(table, mode).objectStore(osName);
  }

  protected async request<T>(req: IDBRequest<T>, cb: () => void = this.close): Promise<T> {
    return new Promise((resolve, reject) => {
      req.onsuccess = function() { cb(); resolve(this.result); }
      req.onerror = function() { cb(); reject(this.error); }
    });
  }

  protected close = () => {
    if (this.db) this.db.close();
    this.db = null;
  }

  protected async getTransaction<I extends Record<string, string>>(schema: ITableSchema<I>, mode: Mode = EMode.READONLY) {
    const idb = await this.open();
    const transaction = idb.transaction([schema.name], mode);
    transaction.oncomplete = () => { idb.close(); };
    return { transaction, table: schema.name, indexes: schema.index };
  }

  open(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = window.indexedDB.open(this.name, this.version);
      const _requestUpgrade = this.requestUpgrade;
      let fixtures: ReadonlyArray<Fixtures> | undefined;
      request.onupgradeneeded = function upgrade(event) {
        if (typeof _requestUpgrade === 'function') {
          fixtures = _requestUpgrade.call(this, event);
        }
      }
      request.onerror = function requestFailure() {
        reject(this.error);
      }
      request.onsuccess = function requestSuccess() {
        if (fixtures) {
          applyFixtures.call(this.result, fixtures).then(() => { resolve(this.result); })
        } else {
          resolve(this.result);
        }
      }
    });
  }

  async exportsDB(): Promise<Record<string, any>> {
    const idb = await this.open();
    const transaction = idb.transaction(idb.objectStoreNames, EMode.READONLY);
    const tablesList = [...idb.objectStoreNames];
    const dataList = await Promise.all(
      tablesList.map(
        storeName => promisifyCursor(transaction.objectStore(storeName), null),
      )
    );
    return dataList.reduce((a, v, i) => ({ ...a, [tablesList[i]]: v}), {});
  }

  async importsDB(data: Record<string, any>, exclude: ReadonlyArray<string> = []): Promise<void> {
    const idb = await this.open();
    const tables = [...idb.objectStoreNames].filter(t => !exclude.includes(t));
    await Promise.all(
      tables
        .map(table =>
          this.request(
            idb
              .transaction(table, EMode.READWRITE)
              .objectStore(table).clear(),
            () => null // TODO: Add callback that clear complete
          )
        )
    );
    await Promise.all(
      tables
        .map(table =>
          Promise.all(
            get(data, table, []).map(
              (item: any) => this.request(
                idb
                  .transaction(
                    table,
                    EMode.READWRITE,
                  )
                    .objectStore(table)
                    .add(item),
                () => null, // TODO: Add external callback function that informed about completed process
              )
            )
          )
        )
    );
    idb.close();
  }

  async clearOS(table: string) {
    const objectStore = await this.os(table, EMode.READWRITE);
    return this.request(objectStore.clear());
  }

  async getItem<T>(table: string, query: Query, indexName?: string): Promise<T | null> {
    const objectStore = await this.os(table, EMode.READONLY);
    return await new Promise((resolve, reject) => {
      const request = indexName ? objectStore.index(indexName).get(query) : objectStore.get(query);
      request.onsuccess = (event) => {
        this.close();
        resolve(get(event, ['target', 'result']));
      };
      request.onerror = () => { this.close(); reject(); };
    });
  }

  async getAll<T>(table: string, indexName?: string, query?: Query | null): Promise<T | null> {
    const objectStore = await this.os(table, EMode.READONLY);
    return await new Promise((resolve, reject) => {
      const request = typeof indexName === 'string' ? objectStore.index(indexName).getAll(query) : objectStore.getAll(query);
      request.onsuccess = (event) => {
        this.close();
        resolve(get(event, ['target', 'result']));
      };
      request.onerror = () => { this.close(); reject(); };
    });
  }

  async addItem(table: string, value: any): Promise<unknown> {
    const objectStore = await this.os(table, EMode.READWRITE);
    return this.request(objectStore.add(value));
  }

  async deleteItem(table: string, query: Query): Promise<unknown> {
    const objectStore = await this.os(table, EMode.READWRITE);
    return this.request(objectStore.delete(query));
  }

  async updateItem(table: string, value: any): Promise<unknown> {
    const objectStore = await this.os(table, EMode.READWRITE);
    return this.request(objectStore.put(value));
  }

  async updateIfExist(table: string, value: any): Promise<unknown> {
    try {
      const objectStore = await this.os(table, EMode.READWRITE);
      await this.request(objectStore.add(value))
    } catch (err) {
      if (err instanceof Error && err.message === 'Key already exists in the object store.') {
        return await this.updateItem(table, value);
      } else {
        console.warn(err);
      }
    }
  }
}
