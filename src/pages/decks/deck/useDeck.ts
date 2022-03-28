import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'domain/index';
import { IDeckItem, ICard } from 'domain/decks';

export function useDeck() {

  const { id } = useParams<{id: string}>();
  const deck: IDeckItem = useAppSelector(state => id ? state.decks[id] : {} as IDeckItem);

  const cards = useMemo<ReadonlyArray<ICard>>(
    () => Object.values(deck.cards || {}).map(e => ({ title: e.front, ...e })),
    [deck],
  );

  return {
    deck,
    cards,
    id,
  };
}
