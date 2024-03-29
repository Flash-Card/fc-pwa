export enum EMode {
  READONLY = 'readonly',
  READWRITE = 'readwrite',
  VERSIONCHANGE = 'versionchange',
}

export type Mode = EMode | undefined;

export interface Fixtures {
  table: string;
  data: ReadonlyArray<any>;
}

export type RequestUpgrade = (this: IDBOpenDBRequest, ev: IDBVersionChangeEvent) => ReadonlyArray<Fixtures>;

export type Validator<T> = (value: unknown) => T | null;

export type Query = IDBValidKey;

export interface ICursorOption<T> {
  direction?: IDBCursorDirection;
  adapter?(d: unknown): T;
  isFinish?(d: T, r: T[]): boolean;
}

export interface ITableSchema<INDEX> {
  name: string;
  index: INDEX;
}
