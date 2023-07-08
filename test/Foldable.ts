import { pipe } from "@effect/data/Function"
import * as N from "@effect/data/Number"
import * as O from "@effect/data/Option"
import * as _ from "@effect/typeclass/Foldable"
import * as OptionInstances from "@effect/typeclass/test/instances/Option"
import * as ReadonlyArrayInstances from "@effect/typeclass/test/instances/ReadonlyArray"
import * as U from "./util"

describe.concurrent("Foldable", () => {
  it("reduceComposition", () => {
    const reduce = _.reduceComposition(
      ReadonlyArrayInstances.Foldable,
      ReadonlyArrayInstances.Foldable
    )
    const f = (b: string, a: string) => b + a
    U.deepStrictEqual(reduce([], "-", f), "-")
    U.deepStrictEqual(reduce([[]], "-", f), "-")
    U.deepStrictEqual(reduce([["a", "c"], ["b", "d"]], "-", f), "-acbd")
  })

  it("toArray", () => {
    const toArray = _.toArray(OptionInstances.Foldable)
    U.deepStrictEqual(toArray(O.none()), [])
    U.deepStrictEqual(toArray(O.some(2)), [2])
  })

  it("toArrayMap", () => {
    const toArrayMap = _.toArrayMap(OptionInstances.Foldable)
    U.deepStrictEqual(toArrayMap(O.none(), U.double), [])
    U.deepStrictEqual(toArrayMap(O.some(2), U.double), [4])
  })

  it("combineMap", () => {
    const combineMap = _.combineMap(ReadonlyArrayInstances.Foldable)
    U.deepStrictEqual(combineMap(N.MonoidSum)([1, 2, 3], U.double), 12)
  })

  it("reduceKind", () => {
    const reduceKind = _.reduceKind(ReadonlyArrayInstances.Foldable)(OptionInstances.Monad)
    U.deepStrictEqual(reduceKind([], "-", () => O.none()), O.some("-"))
    U.deepStrictEqual(reduceKind(["a"], "-", () => O.none()), O.none())
    U.deepStrictEqual(
      reduceKind(["a", "b", "c"], "-", (b, a) => O.some(b + a)),
      O.some("-abc")
    )
    U.deepStrictEqual(
      reduceKind(["a", "b", "c"], "-", (b, a) => a === "b" ? O.none() : O.some(b + a)),
      O.none()
    )
  })

  it("coproductMapKind", () => {
    const coproductMapKind = _.coproductMapKind(ReadonlyArrayInstances.Foldable)(
      OptionInstances.Alternative
    )
    U.deepStrictEqual(pipe([], coproductMapKind(() => O.none())), O.none())
    U.deepStrictEqual(pipe(["a"], coproductMapKind(() => O.none())), O.none())
    U.deepStrictEqual(pipe(["a", "b", "c"], coproductMapKind((a) => O.some(a))), O.some("a"))
    U.deepStrictEqual(
      pipe(["a", "b", "c"], coproductMapKind((a) => a === "b" ? O.none() : O.some(a))),
      O.some("a")
    )
  })
})
