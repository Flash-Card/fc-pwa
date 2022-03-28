import { EActionType, IAddCard, IAddDeck, ICard, IDeckItem } from './types';

export function addDeck(deck: IDeckItem): IAddDeck {
  return {
    type: EActionType.ADD_DECK,
    payload: deck,
  };
}

export function addCard(card: ICard): IAddCard {
  return {
    type: EActionType.ADD_CARD,
    payload: card,
  };
}
