import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as _ from "@effect/typeclass/Chainable"
import * as OptionInstances from "@effect/typeclass/data/Option"
import * as U from "./util"

describe.concurrent("Chainable", () => {
  it("andThenDiscard", () => {
    const andThenDiscard = _.zipLeft(OptionInstances.Chainable)
    U.deepStrictEqual(pipe(O.none(), andThenDiscard(O.none())), O.none())
    U.deepStrictEqual(pipe(O.none(), andThenDiscard(O.some(2))), O.none())
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.none())), O.none())
    U.deepStrictEqual(pipe(O.some(1), andThenDiscard(O.some(2))), O.some(1))
  })

  it("bind", () => {
    const bind = _.bind(OptionInstances.Chainable)
    U.deepStrictEqual(pipe(O.Do, bind("a", () => O.none())), O.none())
    U.deepStrictEqual(pipe(O.Do, bind("a", () => O.some(1))), O.some({ a: 1 }))
  })

  it("tap", () => {
    const tap = _.tap(OptionInstances.Chainable)
    U.deepStrictEqual(pipe(O.none(), tap(() => O.none())), O.none())
    U.deepStrictEqual(pipe(O.none(), tap(() => O.some(2))), O.none())
    U.deepStrictEqual(pipe(O.some(1), tap(() => O.none())), O.none())
    U.deepStrictEqual(pipe(O.some(1), tap(() => O.some(2))), O.some(1))
  })
})
