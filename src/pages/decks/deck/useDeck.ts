import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import get from 'lodash/get';
import { useAppSelector, useAppDispatch } from 'domain/index';
import { IDeckItem, ICard, getDeckRequest } from 'domain/decks';

const defaultDeck = {} as IDeckItem;

export function useDeck() {

  const { id } = useParams<{id: string}>();
  const dispatch = useAppDispatch();
  const deck = useAppSelector(state => id ? get(state, ['decks', id], defaultDeck) : defaultDeck);

  useEffect(
    () => {
      if (id) dispatch(getDeckRequest(id));
    },
    [id, dispatch],
  );
  
  const cards = useMemo<ReadonlyArray<ICard>>(
    () => Object.values(get(deck, 'cards', {})),
    [deck],
  );

  return {
    deck,
    cards,
    id,
  };
}
