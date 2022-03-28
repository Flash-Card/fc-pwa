
export interface ICard {
  id: string;
  deckId: string;
  front: string;
  back: string;
}

export interface IDeckItem {
  id: string;
  name: string;
  description?: string;
  cards?: Record<string, ICard>;
}

export type TDecks = Record<string, IDeckItem>;

// Actions

export enum EActionType {
  ADD_DECK = 'ADD_DECKS',
  ADD_CARD = 'ADD_CARD',
}

export interface IAddDeck {
  type: typeof EActionType.ADD_DECK;
  payload: IDeckItem;
}

export interface IAddCard {
  type: typeof EActionType.ADD_CARD;
  payload: ICard;
}

export type Action = IAddDeck | IAddCard;