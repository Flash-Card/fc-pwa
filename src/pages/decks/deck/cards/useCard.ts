import { useCallback, useMemo, useReducer } from "react";
import { useLocation } from "react-router-dom";
import get from "lodash/get";

import { useAppDispatch } from "domain/index";
import { updateCard, deleteCard, ICard } from "domain/decks";

import {
  reducer,
  getInitialState,
  TDeckReducer,
  ECardActionType,
  setCounter,
} from "./reducer";

function getIndexByHash(list: ReadonlyArray<ICard>, hash: string): number {
  return list.findIndex((f) => f.id === hash.slice(1));
}

export const useCard = (cards: ReadonlyArray<ICard>) => {
  const { hash } = useLocation();
  const appDispatch = useAppDispatch();

  const getIndex = useCallback(
    () => getIndexByHash(cards, hash),
    [cards, hash]
  );

  const [state, dispatch] = useReducer<TDeckReducer>(
    reducer,
    getInitialState(getIndexByHash(cards, hash))
  );

  const onAction = useCallback(
    (type: ECardActionType) => () => {
      if (type !== ECardActionType.SET_COUNTER) {
        dispatch({ type });
      }
    },
    [dispatch]
  );

  const card = useMemo<ICard>(
    () => get(cards, state.count, {} as ICard),
    [cards, state.count]
  );

  const onDelete = useCallback(() => {
    appDispatch(deleteCard(card));
  }, [card]);

  const onEdit = useCallback(() => {}, []);

  const onTransfer = useCallback(() => {}, []);

  const onToggleVisibility = useCallback(() => {
    appDispatch(updateCard({ ...card, hidden: !card.hidden }));
  }, [appDispatch, card]);

  const onSetCounter = useCallback(
    (counter: number) => {
      dispatch(setCounter(counter));
    },
    [dispatch]
  );

  return {
    onDelete,
    onEdit,
    onTransfer,
    onToggleVisibility,
    onSetCounter,
    getIndex,
    onAction,
    card,
    state,
  };
};
