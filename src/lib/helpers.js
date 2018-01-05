export function arrayRange(length) {
  return Array.apply(null, { length }).map((_, i) => i);
}

export function makeString(strings, ...keys) {
  if (keys.length === 0) return () => strings.reduce((A, V) => A + V, '');
  return args => {
    let str = '';
    for (let i=0; i < keys.length; i++) {
      str += strings[i];
      str += (typeof args !== 'undefined' && keys[i] in args) ? args[keys[i]] : `:${keys[i]}`;
    }
    str += strings[strings.length - 1];
    return str;
  };
}
