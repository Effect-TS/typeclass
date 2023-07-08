import * as Option from "@effect/data/Option"
import * as applicative from "@effect/typeclass/Applicative"
import * as monoid from "@effect/typeclass/Monoid"
import { OptionApplicative } from "@effect/typeclass/test/fixtures/Option"
import * as Util from "./util"

describe.concurrent("Applicative", () => {
  it("liftMonoid", () => {
    const liftMonoid = applicative.getMonoid(OptionApplicative)
    const M = liftMonoid(monoid.numberSum)
    Util.deepStrictEqual(M.combine(Option.none(), Option.none()), Option.none())
    Util.deepStrictEqual(M.combine(Option.some(1), Option.none()), Option.none())
    Util.deepStrictEqual(M.combine(Option.none(), Option.some(2)), Option.none())
    Util.deepStrictEqual(M.combine(Option.some(1), Option.some(2)), Option.some(3))
  })
})
