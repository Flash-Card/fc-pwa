import { selector } from 'lib/selectors';
import I from 'immutable';

export const cardItem = state => state.cards;

export const typesById = state => state.types;
export const typesList = selector(typesById, c => c.toList().sort((a, b) => a.get('id') - b.get('id')));

export const setsById = state => state.sets;
export const setsList = selector(setsById, c => c.toList());

export const lexicon = state => state.lexicon;
export const lexiconList = selector(lexicon, l => l.toList());
export const lexiconKeys = selector(lexiconList, l => l.map(e => e.get('key')));
export const isCardinLexicon = selector(lexicon, cardItem, (l, c) =>  l.has(c.get('key')));

const quiz = state => state.quiz;
export const quizList = selector(quiz, q => q.get('list'));
export const quizCurrentIndex = selector(quiz, q => q.get('current'));
export const quizCurrentItem = selector(
  quizList,
  quizCurrentIndex,
  lexicon,
  (q, i, l) => l.get(q.get(i), new I.Map()),
);
