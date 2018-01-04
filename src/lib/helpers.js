export function arrayRange(length) {
  return Array.apply(null, { length }).map((_, i) => i);
}
