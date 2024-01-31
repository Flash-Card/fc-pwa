import * as t from "io-ts";
import { fold } from "fp-ts/lib/Either";
import { identity, pipe } from "fp-ts/lib/function";

export function valueOrThrow<A, O, I>(codec: t.Type<A, O, I>, value: I): A {
  return pipe(
    codec.decode(value),
    fold((err) => {
      throw err;
    }, identity)
  );
}

export function validate<A, O, I>(contract: t.Type<A, O, I>, v: I): A | null {
  try {
    return valueOrThrow(contract, v);
  } catch (err) {
    return null;
  }
}
