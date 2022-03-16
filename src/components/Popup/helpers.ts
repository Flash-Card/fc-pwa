export function getNextIndex(reverse: boolean, index: number, max: number): number {
  const next = reverse ? index - 1 : index + 1;
  if (next > max) return 0;
  if (next < 0) return max;
  return next;
}
