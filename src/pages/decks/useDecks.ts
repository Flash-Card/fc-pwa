import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from 'domain/index';
import { getDeckListRequest } from 'domain/decks';

export function useDecks() {
  const disptch = useAppDispatch();

  useEffect(
    () => {
      disptch(getDeckListRequest());
    },
    []
  );

  const decks = useAppSelector(state => Object.values(state.decks));

  return {
    useAppSelector,
    disptch,
    decks
  }
}