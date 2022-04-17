export interface ICard {
  id: string;
  deckId: string;
  front: string;
  back: string;
  note?: string;
  hidden?: boolean;
}

export interface IDeckItem {
  id: string;
  name: string;
  cardsInLesson?: number;
  description?: string;
  cards?: Record<string, ICard>;
}

export type TDecks = Record<string, IDeckItem>;

// Actions

export enum EActionType {
  GET_DECK_REQUEST = 'GET_DECK_REQUEST',
  GET_DECK_SUCCESS = 'GET_DECK_SUCCESS',
  GET_DECK_FAILURE = 'GET_DECK_FAILURE',
  GET_DECK_LIST_REQUEST = 'GET_DECK_LIST_REQUEST',
  GET_DECK_LIST_SUCCESS = 'GET_DECK_LIST_SUCCESS',
  GET_DECK_LIST_FAILURE = 'GET_DECK_LIST_FAILURE',
  ADD_DECK = 'ADD_DECKS',
  UPDATE_DECK = 'UPDATE_DECK',
  ADD_CARD = 'ADD_CARD',
  UPDATE_CARD = 'UPDATE_CARD',
  DELETE_CARD = 'DELETE_CARD',
  DELETE_DECK = 'DELETE_DECK',
}

export interface IAddDeck {
  type: typeof EActionType.ADD_DECK;
  payload: Omit<IDeckItem, 'cards'>;
}

export interface IUpdateDeck {
  type: typeof EActionType.UPDATE_DECK;
  payload: Omit<IDeckItem, 'cards'>;
}

export interface IAddCard {
  type: typeof EActionType.ADD_CARD;
  payload: ICard;
}

export interface IUpdateCard {
  type: typeof EActionType.UPDATE_CARD;
  payload: ICard;
}

export interface IGetDeckListRequest {
  type: typeof EActionType.GET_DECK_LIST_REQUEST;
}

export interface IGetDeckListSuccess {
  type: typeof EActionType.GET_DECK_LIST_SUCCESS;
  payload: ReadonlyArray<IDeckItem>;
}

export interface IGetDeckRequest {
  type: typeof EActionType.GET_DECK_REQUEST;
  payload: string;
}

export interface IGetDeckSuccess {
  type: typeof EActionType.GET_DECK_SUCCESS;
  payload: IDeckItem;
}

export interface IDeleteCard {
  type: typeof EActionType.DELETE_CARD;
  payload: ICard;
}

export interface IDeleteDeck {
  type: typeof EActionType.DELETE_DECK;
  payload: string;
}

export type Action = IAddDeck
  | IAddCard
  | IUpdateDeck
  | IUpdateCard
  | IGetDeckListRequest
  | IGetDeckListSuccess
  | IGetDeckRequest
  | IGetDeckSuccess
  | IDeleteCard
  | IDeleteDeck;
