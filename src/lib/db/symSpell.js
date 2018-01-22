/* eslint no-loop-func: 0 */
/**
 * Mnemonist SymSpell
 * ===================
 *
 * JavaScript implementation of the Symmetric Delete Spelling dictionary to
 * efficiently index & query expression based on edit distance.
 * Note that the current implementation target the v3.0 of the algorithm.
 *
 * [Reference]:
 * http://blog.faroo.com/2012/06/07/improved-edit-distance-based-spelling-correction/
 * https://github.com/wolfgarbe/symspell
 *
 * [Author]:
 * Wolf Garbe
 */

const DEFAULT_MAX_DISTANCE = 2,
  DEFAULT_VERBOSITY = 2;

function createDictionaryItem(value) {
  const suggestions = new Set();

  if (typeof value === 'number')
    suggestions.add(value);

  return {
    suggestions,
    count: 0,
    set: [],
  };
}

function createSuggestionItem(key, distance, count, set) {
  return {
    key: key || '',
    distance: distance || 0,
    count: count || 0,
    set,
  };
}

function edits(word, distance, max, deletes) {
  deletes = deletes || new Set();
  distance++;

  let deletedItem,
    l = word.length,
    i;

  if (l > 1) {
    for (i = 0; i < l; i++) {
      deletedItem = word.substring(0, i) + word.substring(i + 1);

      if (!deletes.has(deletedItem)) {
        deletes.add(deletedItem);

        if (distance < max)
          edits(deletedItem, distance, max, deletes);
      }
    }
  }

  return deletes;
}

function addLowestDistance(words, verbosity, item, suggestion, int, deletedItem) {
  const first = item.suggestions.values().next().value;

  if (verbosity < 2 &&
    item.suggestions.size > 0 &&
    words[first].length - deletedItem.length > suggestion.length - deletedItem.length) {
    item.suggestions = new Set();
    item.count = 0;
  }

  if (verbosity === 2 ||
    !item.suggestions.size ||
    words[first].length - deletedItem.length >= suggestion.length - deletedItem.length) {
    item.suggestions.add(int);
  }
}

function damerauLevenshtein(source, target) {
  let m = source.length,
    n = target.length,
    H = [[]],
    INF = m + n,
    sd = new Map(),
    i,
    l,
    j;

  H[0][0] = INF;

  for (i = 0; i <= m; i++) {
    if (!H[i + 1])
      H[i + 1] = [];
    H[i + 1][1] = i;
    H[i + 1][0] = INF;
  }

  for (j = 0; j <= n; j++) {
    H[1][j + 1] = j;
    H[0][j + 1] = INF;
  }

  let st = source + target,
    letter;

  for (i = 0, l = st.length; i < l; i++) {
    letter = st[i];

    if (!sd.has(letter))
      sd.set(letter, 0);
  }

  // Iterating
  for (i = 1; i <= m; i++) {
    let DB = 0;

    for (j = 1; j <= n; j++) {
      let i1 = sd.get(target[j - 1]),
        j1 = DB;

      if (source[i - 1] === target[j - 1]) {
        H[i + 1][j + 1] = H[i][j];
        DB = j;
      }
      else {
        H[i + 1][j + 1] = Math.min(
            H[i][j],
            H[i + 1][j],
            H[i][j + 1],
          ) + 1;
      }

      H[i + 1][j + 1] = Math.min(
        H[i + 1][j + 1],
        H[i1][j1] + (i - i1 - 1) + 1 + (j - j1 - 1),
      );
    }

    sd.set(source[i - 1], i);
  }

  return H[m + 1][n + 1];
}

export default class SymSpell {
  constructor(options) {
    this.options = options || {};
    this.dictionary = {};
    this.size = 0;
    this.maxLength = 0;
    this.words = [];
    // Properties
    this.maxDistance = typeof this.options.maxDistance === 'number'
      ? this.options.maxDistance
      : DEFAULT_MAX_DISTANCE;
    this.verbosity = typeof this.options.verbosity === 'number'
      ? this.options.verbosity
      : DEFAULT_VERBOSITY;
  }


  clear() {
    // Properties
    this.size = 0;
    this.dictionary = {};
    this.maxLength = 0;
    this.words = [];
  }

  add(word) {
    let item = this.dictionary[word.key];

    if (item !== undefined) {
      if (typeof item === 'number') {
        item = createDictionaryItem(item, word.set);
        this.dictionary[word.key] = item;
      }
      if (!item.set.includes(word.set)) item.set = [...item.set, word.set];
      item.count++;
    } else {
      item = createDictionaryItem();
      item.count++;
      item.set = [word.set];

      this.dictionary[word.key] = item;

      if (word.key.length > this.maxLength)
        this.maxLength = word.key.length;
    }

    if (item.count === 1) {
      const number = this.words.length;
      this.words.push(word.key);

      const deletes = edits(word.key, 0, this.maxDistance);

      deletes.forEach(deletedItem => {
        let target = this.dictionary[deletedItem];

        if (target !== undefined) {
          if (typeof target === 'number') {
            target = createDictionaryItem(target);

            this.dictionary[deletedItem] = target;
          }

          if (!target.suggestions.has(number)) {
            addLowestDistance(
              this.words,
              this.verbosity,
              target,
              word.key,
              number,
              deletedItem,
            );
          }
        }
        else {
          this.dictionary[deletedItem] = number;
        }
      });
    }

    this.size++;
  }

  lookup(dictionary, words, verbosity, maxDistance, maxLength, input) {
    const length = input.length;

    if (length - maxDistance > maxLength) return [];

    let candidates = [input],
      candidateSet = new Set(),
      suggestionSet = new Set();

    let suggestions = [],
      candidate,
      item;

    // Exhausting every candidates
    while (candidates.length > 0) {
      candidate = candidates.shift();

      // Early termination
      if (
        verbosity < 2 &&
        suggestions.length > 0 &&
        length - candidate.length > suggestions[0].distance
      )
        break;

      item = dictionary[candidate];

      if (item !== undefined) {
        if (typeof item === 'number')
          item = createDictionaryItem(item);

        if (item.count > 0 && !suggestionSet.has(candidate)) {
          suggestionSet.add(candidate);

          const suggestItem = createSuggestionItem(
            candidate,
            length - candidate.length,
            item.count,
            item.set,
          );

          suggestions.push(suggestItem);

          // Another early termination
          if (verbosity < 2 && length - candidate.length === 0)
            break;
        }

        // Iterating over the item's suggestions
        item.suggestions.forEach(index => {
          let suggestion = words[index];

          // Do we already have this suggestion?
          if (suggestionSet.has(suggestion))
            return;

          suggestionSet.add(suggestion);

          // Computing distance between candidate & suggestion
          let distance = 0;

          if (input !== suggestion) {
            if (suggestion.length === candidate.length) {
              distance = length - candidate.length;
            }
            else if (length === candidate.length) {
              distance = suggestion.length - candidate.length;
            }
            else {
              let ii = 0,
                jj = 0;

              const l = suggestion.length;

              while (
              ii < l &&
              ii < length &&
              suggestion[ii] === input[ii]
                ) {
                ii++;
              }

              while (
              jj < l - ii &&
              jj < length &&
              suggestion[l - jj - 1] === input[length - jj - 1]
                ) {
                jj++;
              }

              if (ii > 0 || jj > 0) {
                distance = damerauLevenshtein(
                  suggestion.substr(ii, l - ii - jj),
                  input.substr(ii, length - ii - jj),
                );
              }
              else {
                distance = damerauLevenshtein(suggestion, input);
              }
            }
          }

          // Removing suggestions of higher distance
          if (verbosity < 2 &&
            suggestions.length > 0 &&
            suggestions[0].distance > distance) {
            suggestions = [];
          }

          if (verbosity < 2 &&
            suggestions.length > 0 &&
            distance > suggestions[0].distance) {
            return;
          }

          if (distance <= maxDistance) {
            const target = dictionary[suggestion];

            if (target !== undefined) {
              suggestions.push(createSuggestionItem(
                suggestion,
                distance,
                target.count,
                target.set,
              ));
            }
          }
        });
      }

      // Adding edits
      if (length - candidate.length < maxDistance) {

        if (verbosity < 2 &&
          suggestions.length > 0 &&
          length - candidate.length >= suggestions[0].distance)
          continue;

        for (let i = 0, l = candidate.length; i < l; i++) {
          const deletedItem = (
            candidate.substring(0, i) +
            candidate.substring(i + 1)
          );

          if (!candidateSet.has(deletedItem)) {
            candidateSet.add(deletedItem);
            candidates.push(deletedItem);
          }
        }
      }
    }

    if (verbosity === 0) return suggestions.slice(0, 1);

    return suggestions;
  }

  search(input) {
    return this.lookup(
      this.dictionary,
      this.words,
      this.verbosity,
      this.maxDistance,
      this.maxLength,
      input,
    );
  }
}
