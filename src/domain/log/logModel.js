import I from "immutable";

const emptyMap = new I.Map();
const CardsLog = emptyMap;

export const reducer = {
  log(state = CardsLog, action) {
    switch (action.type) {

      default:
        return state;
    }
  },
};
