import { EActionType, IAddDeck, IDeckItem } from './types';

export function addDeck(deck: IDeckItem): IAddDeck {
  return {
    type: EActionType.ADD_DECK,
    payload: deck,
  }
}
