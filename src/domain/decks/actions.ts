import { EActionType } from "./constants";
import {
  IAddCard,
  IAddDeck,
  ICard,
  IDeckItem,
  IUpdateCard,
  IGetDeckListSuccess,
  IGetDeckSuccess,
  IGetDeckListRequest,
  IGetDeckRequest,
  IDeleteCard,
  IDeleteDeck,
  PutDeck,
} from "./types";

export function addDeck(deck: Omit<IDeckItem, "cards">): IAddDeck {
  return {
    type: EActionType.ADD_DECK,
    payload: deck,
  };
}

export function putDeck(deck: IDeckItem): PutDeck {
  return {
    type: EActionType.PUT_DECK,
    payload: deck,
  };
}

export function addCard(card: ICard): IAddCard {
  return {
    type: EActionType.ADD_CARD,
    payload: card,
  };
}

export function updateCard(card: ICard): IUpdateCard {
  return {
    type: EActionType.UPDATE_CARD,
    payload: card,
  };
}

export function getDeckListRequest(): IGetDeckListRequest {
  return {
    type: EActionType.GET_DECK_LIST_REQUEST,
  };
}

export function getDeckListSuccess(
  decks: ReadonlyArray<IDeckItem>
): IGetDeckListSuccess {
  return {
    type: EActionType.GET_DECK_LIST_SUCCESS,
    payload: decks,
  };
}

export function getDeckRequest(id: string): IGetDeckRequest {
  return {
    type: EActionType.GET_DECK_REQUEST,
    payload: id,
  };
}

export function getDeckSuccess(deck: IDeckItem): IGetDeckSuccess {
  return {
    type: EActionType.GET_DECK_SUCCESS,
    payload: deck,
  };
}

export function deleteCard(card: ICard): IDeleteCard {
  return {
    type: EActionType.DELETE_CARD,
    payload: card,
  };
}

export function deleteDeck(id: string): IDeleteDeck {
  return {
    type: EActionType.DELETE_DECK,
    payload: id,
  };
}
