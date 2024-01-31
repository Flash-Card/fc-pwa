import set from "lodash/fp/set";
import update from "lodash/fp/update";
import omit from "lodash/fp/omit";
import { arrayToRecord } from "lib/dataAdapters";
import { EActionType } from "./constants";
import { TDecks, Action } from "./types";

const initialDecks: TDecks = {};

export const reducer = {
  decks(state: TDecks = initialDecks, action: Action) {
    switch (action.type) {
      case EActionType.GET_DECK_REQUEST:
        return set(action.payload)({ id: action.payload })(state);

      case EActionType.GET_DECK_SUCCESS:
        return set(action.payload.id)(action.payload)(state);

      case EActionType.GET_DECK_LIST_SUCCESS:
        return {
          ...state,
          ...arrayToRecord(action.payload, "id"),
        };

      case EActionType.ADD_DECK:
      case EActionType.PUT_DECK:
        return set(action.payload.id)(action.payload)(state);

      case EActionType.UPDATE_DECK:
        return update(action.payload.id)(({ cards }) => ({
          ...action.payload,
          cards,
        }))(state);

      case EActionType.ADD_CARD:
      case EActionType.UPDATE_CARD:
        return update([action.payload.deckId, "cards"])(
          set(action.payload.id)(action.payload)
        )(state);

      case EActionType.DELETE_DECK:
        return omit(action.payload)(state);

      case EActionType.DELETE_CARD:
        return update([action.payload.deckId, "cards"])(
          omit(action.payload.id)
        )(state);

      default:
        return state;
    }
  },
};
