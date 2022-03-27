
export function* quiz<T>(list: ReadonlyArray<T>): Generator<T, any, boolean> {
  let wrong: ReadonlyArray<T> = [];
  for (const item of list) {
    const res: boolean = yield item;
    if (!res) {
      wrong = wrong.concat(item);
    }
  }
  if (wrong.length) {
    yield* quiz(wrong);
  }
}

export function compare<T extends string>(a: T, b: T): boolean {
  return a === b;
}