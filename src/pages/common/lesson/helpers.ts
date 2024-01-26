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

export function compare<T extends string>(a: T | unknown, b: T): boolean {
  if (typeof a === "string" && typeof b === "string") {
    return a.trim() === b.trim();
  }
  return a === b.trim();
}

function shuffle<T>(array: T[]): ReadonlyArray<T> {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function answerList<T>(
  list: ReadonlyArray<T>,
  index: number
): ReadonlyArray<T> {
  if (list.length <= 3) return shuffle(list.slice());
  const l = new Set<number>([index]);
  do {
    l.add(Math.floor(Math.random() * list.length));
  } while (l.size < 3);
  return shuffle([...l]).map((idx) => list[idx]);
}
