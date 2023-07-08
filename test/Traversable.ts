import { pipe } from "@effect/data/Function"
import * as O from "@effect/data/Option"
import * as OptionInstances from "@effect/typeclass/test/instances/Option"
import * as ReadonlyArrayInstances from "@effect/typeclass/test/instances/ReadonlyArray"
import * as _ from "@effect/typeclass/Traversable"
import * as U from "./util"

describe.concurrent("Traversable", () => {
  it("traverseComposition", () => {
    const traverse = _.traverseComposition(
      ReadonlyArrayInstances.Traversable,
      ReadonlyArrayInstances.Traversable
    )(OptionInstances.Applicative)
    U.deepStrictEqual(
      traverse([[1, 2], [3]], (a) => (a > 0 ? O.some(a) : O.none())),
      O.some([[1, 2], [3]])
    )
    U.deepStrictEqual(
      traverse([[1, -2], [3]], (a) => (a > 0 ? O.some(a) : O.none())),
      O.none()
    )
  })

  it("traverseTap", () => {
    const traverseTap = _.traverseTap(ReadonlyArrayInstances.Traversable)(
      OptionInstances.Applicative
    )
    U.deepStrictEqual(
      pipe([], traverseTap((n) => n > 0 ? O.some(n) : O.none())),
      O.some([])
    )
    U.deepStrictEqual(
      pipe(["a", "b", "c"], traverseTap((s) => s.length > 0 ? O.some(s.length) : O.none())),
      O.some(["a", "b", "c"])
    )
    U.deepStrictEqual(
      pipe(["a", "", "c"], traverseTap((s) => s.length > 0 ? O.some(s) : O.none())),
      O.none()
    )
  })
})
