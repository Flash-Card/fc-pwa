import { IEnv, Action as EnvAction } from './env/types';
import { TDecks, Action as DeckActions } from './decks';

export interface AppState {
  env: IEnv;
  decks: TDecks;
};

export type Action = DeckActions | EnvAction;