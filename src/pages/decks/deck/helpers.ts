import { ValidationErrors } from 'final-form';
import compose from 'lodash/fp/compose';
import set from 'lodash/fp/set';
import { ICard } from 'domain/decks';

export function sortCart<C extends ICard>(field?: 'front' | 'back'): (l: ReadonlyArray<C>) => ReadonlyArray<C> {
  if (field === 'back' || field === 'front') {
    const sort = (a: C, b: C) => a[field].localeCompare(b[field]);
    return (list: ReadonlyArray<C>) => list.slice().sort(sort);
  }
  return (list: ReadonlyArray<C>) => list;
}

type TVR = NonNullable<ValidationErrors>;

type TCondition<V> = (v: V) => boolean;

function enrichErrorFactory<T extends Record<K, any>, K extends keyof T>(values: T) {
  return (field: K, condition: TCondition<T[K]>, message: string) => (err: TVR) => {
    const v = values[field];
    if (condition(v)) return set(field)(message)(err)
    return err;
  }
}

export function cardValidation<T extends ICard>(cards: ReadonlyArray<T>) {
  const front = cards.map(e => e.front);
  const back = cards.map(e => e.back);
  return (values: T): ValidationErrors => {
    const enrichError = enrichErrorFactory<ICard, 'front' | 'back'>(values);
    return compose(
      // (err) => { console.log(err); return err },
      enrichError('front', (v) => front.includes((v || '').trim()), 'Already exist'),
      enrichError('back', (v) => back.includes((v || '').trim()), 'Already exist'),
      enrichError('front', (v) => typeof v === 'undefined', 'Must be not empty'),
      enrichError('back', (v) => typeof v === 'undefined', 'Must be not empty'),
    )({});
  };
}
