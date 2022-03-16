function eitherNum<D>(num: number, def: D): D | number {
  if (isNaN(num)) return def;
  return num;
}

export function toNumber<D>(s: string | null | number, def: D): number | D {
  if (s === null) return def;
  if (typeof s === 'string') return eitherNum(parseInt(s, 10), def);
  return eitherNum(s, def);
}