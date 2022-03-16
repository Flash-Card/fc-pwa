
export interface ICards {
  id: string;
  front: string;
  back: string;
}

export interface IDeckItem {
  id: string;
  name: string;
  description?: string;
  cards?: Record<string, ICards>;
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

export type Action = IAddDeck;