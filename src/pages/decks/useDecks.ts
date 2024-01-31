import { useEffect, useCallback } from "react";
import { useAppSelector, useAppDispatch } from "domain/index";
import { getDeckListRequest, putDeck } from "domain/decks";
import * as contract from "domain/decks/contracts";
import { valueOrThrow } from "lib/contracts";

export function useDecks() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDeckListRequest());
  }, []);

  const decks = useAppSelector((state) => Object.values(state.decks));
  const dbVersion = useAppSelector((state) => state.env.version);

  const appendDeck = useCallback((maybeDeck: unknown) => {
    try {
      const {
        dbVersion: deckDBVersion,
        cards,
        ...sharedDeck
      } = valueOrThrow(contract.sharedDeck, maybeDeck);
      if (dbVersion !== deckDBVersion) {
        console.error("dbVersion mismatch", deckDBVersion, dbVersion);
        return;
      }
      if (decks.some((e) => e.id === sharedDeck.id)) {
        console.error("deck already exist");
        // TODO: dispatch update deck
        return;
      }
      dispatch(
        putDeck({
          ...sharedDeck,
          cards: cards.reduce((acc, e) => ({ ...acc, [e.id]: e }), {}),
        })
      );
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
    useAppSelector,
    dispatch,
    appendDeck,
    decks,
  };
}
