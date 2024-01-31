import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import get from "lodash/get";
import { createFile, share } from "lib/pwa";
import { confirmation } from "lib/confirmation";
import { useAppSelector, useAppDispatch } from "domain/index";
import {
  IDeckItem,
  ICard,
  getDeckRequest,
  EActionType,
  addCard,
} from "domain/decks";
import { EditDeck } from "../edit";
import { sortCart, cardValidation, shareDeckAdapter } from "./helpers";

const defaultDeck = {} as IDeckItem;

export function useDeck() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const deck = useAppSelector((state) =>
    id ? get(state, ["decks", id], defaultDeck) : defaultDeck
  );

  const dbVersion = useAppSelector((state) => state.env.version);

  const [isEditDeck, setEditDeck] = useState<boolean>(false);

  useEffect(() => {
    if (id) dispatch(getDeckRequest(id));
  }, [id, dispatch]);

  const cards = useMemo<ReadonlyArray<ICard>>(
    () => sortCart(deck.sortBy)(Object.values(get(deck, "cards", {}))),
    [deck]
  );

  const handleDelete = useCallback(() => {
    dispatch({ type: EActionType.DELETE_DECK, payload: deck.id });
    navigate("/", { replace: true });
  }, []);

  const handleShare = useCallback(() => {
    const file = createFile(
      JSON.stringify(shareDeckAdapter(dbVersion, deck)),
      "application/json",
      `${deck.name}.fcdeck`
    );
    share({ files: [file], title: deck.name });
  }, [deck]);

  const editForm = useMemo(
    () =>
      isEditDeck ? (
        <EditDeck onComplete={() => setEditDeck(false)} item={deck} />
      ) : null,
    [isEditDeck, deck]
  );

  const validateCard = useCallback(cardValidation(cards), [cards]);

  const addCardHandler = useCallback(
    (card: ICard) => dispatch(addCard(card)),
    [dispatch]
  );

  return {
    deck,
    cards,
    id,
    editForm,
    validateCard,
    addCard: addCardHandler,
    onDeleteDeck: confirmation(handleDelete, "Delete deck?"),
    onEditDeck: () => setEditDeck(true),
    onShareDeck: handleShare,
  };
}
