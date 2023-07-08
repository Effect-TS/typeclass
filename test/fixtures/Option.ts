import * as Option from "@effect/data/Option"
import type { Applicative } from "@effect/typeclass/Applicative"
import * as covariant from "@effect/typeclass/Covariant"

const imap = covariant.imap<Option.OptionTypeLambda>(Option.map)

const product = <A, B>(self: Option.Option<A>, that: Option.Option<B>): Option.Option<[A, B]> =>
  Option.isSome(self) && Option.isSome(that) ?
    Option.some([self.value, that.value]) :
    Option.none()

const productMany = <A>(
  self: Option.Option<A>,
  collection: Iterable<Option.Option<A>>
): Option.Option<[A, ...Array<A>]> => {
  if (Option.isNone(self)) {
    return Option.none()
  }
  const out: [A, ...Array<A>] = [self.value]
  for (const o of collection) {
    if (Option.isNone(o)) {
      return Option.none()
    }
    out.push(o.value)
  }
  return Option.some(out)
}

export const OptionApplicative: Applicative<Option.OptionTypeLambda> = {
  of: Option.some,
  map: Option.map,
  imap,
  product,
  productMany,
  productAll: Option.all
}
