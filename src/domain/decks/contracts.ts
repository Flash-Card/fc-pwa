import * as t from "io-ts";

export const sharedDeck = t.type({
  id: t.string,
  name: t.string,
  dbVersion: t.string,
  cards: t.array(
    t.type({
      front: t.string,
      back: t.string,
      id: t.string,
    })
  ),
});
