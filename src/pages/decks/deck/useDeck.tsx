import { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import get from "lodash/get";
import { createFile, share } from "lib/pwa";
import { useAppSelector, useAppDispatch } from "domain/index";
import {
  IDeckItem,
  ICard,
  getDeckRequest,
  EActionType,
  addCard,
} from "domain/decks";
import { MorePic } from "components/MorePick";
import { EditDeck } from "../edit";
import { sortCart, cardValidation } from "./helpers";

const defaultDeck = {} as IDeckItem;

interface IActionItem {
  value: string;
  title: string;
}

const actionList: ReadonlyArray<IActionItem> = [
  { value: "delete", title: "Delete Deck" },
  { value: "edit", title: "Edit Deck" },
  { value: "share", title: "Share Deck" },
];

export function useDeck() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const deck = useAppSelector((state) =>
    id ? get(state, ["decks", id], defaultDeck) : defaultDeck
  );

  const [isEditDeck, setEditDeck] = useState<boolean>(false);

  useEffect(() => {
    if (id) dispatch(getDeckRequest(id));
  }, [id, dispatch]);

  const cards = useMemo<ReadonlyArray<ICard>>(
    () => sortCart(deck.sortBy)(Object.values(get(deck, "cards", {}))),
    [deck]
  );

  const handleSelect = useCallback(
    ({ value }: IActionItem) => {
      if (value === "delete") {
        dispatch({ type: EActionType.DELETE_DECK, payload: deck.id });
        navigate("/", { replace: true });
      } else if (value === "edit") {
        setEditDeck(true);
      } else if (value === "share") {
        const file = createFile(
          JSON.stringify(deck),
          "application/json",
          `${deck.name}.fcdeck`
        );
        share({ files: [file], title: deck.name });
      }
    },
    [deck]
  );

  const actionSelector = useCallback(
    (className: string) => (
      <MorePic
        list={actionList}
        onSelect={handleSelect}
        className={className}
      />
    ),
    []
  );

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
    actionSelector,
    editForm,
    validateCard,
    addCard: addCardHandler,
  };
}
