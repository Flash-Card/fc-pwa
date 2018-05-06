export function is(mask, value) {
  if (typeof mask !== 'number' && typeof value !== 'number') {
    throw new Error(`Invalid arguments for compare \n mask ${mask} \n value ${value}`);
  }
  return mask === (mask & value);
}

export function checkArray(masks, value) {
  return masks.some(a => is(a, value));
}

const SW = {
  boolean: a => a,
  number: (a, r) => is(a, r),
  function: (a, r) => a(r),
  object: (a, r) => (Array.isArray(a) ? checkArray(a, r) : false),
};

export function check(access_level, user_rights) {
  const type = typeof access_level;
  if (type in SW) return SW[type](access_level, user_rights);
  return false;
}

/**
 * Helper function
 * @function
 * @name createPolicies
 * @param dict object dictionary of all available rights
 * @param items array of rights for this instance
 *
 * */
export function createPolicies(dict, items) {
  const maker = createMask(dict);
  if (items.length === 1) return maker(items[0]);
  return items.map(maker);
}

function createMask(dictionary) {
  const merge = mergeMask(dictionary);
  return (element) => {
    if (Array.isArray(element)) return merge(element);
    return dictionary[element];
  };
}

export function mergeMask(dict) {
  return arr => arr.reduce((A, V) => dict[V] | A, 0);
}

export function makeDictionary(arr) {
  return arr.reduce((A, e, i) => ({ ...A, [e]: 1 << i }), {});
}

export function arrayFilter(restriction) {
  return f => check(f.restriction, restriction);
}
