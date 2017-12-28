import { selector } from 'lib/selectors';

export const cardItem = state => state.cards;

export const typesById = state => state.types;
export const typesList = selector(typesById, c => c.toList().sort((a, b) => a.get('id') - b.get('id')));

export const setsById = state => state.sets;
export const setsList = selector(setsById, c => c.toList());

export const lexicon = state => state.lexicon;
export const lexiconKeys = selector(lexicon, l => l.toList().map(e => e.get('key')));
export const isCardinLexicon = selector(lexicon, cardItem, (l, c) =>  l.has(c.get('key')));
