/**
 * @since 1.0.0
 */
import type { TypeLambda } from "@effect/data/HKT"
import * as order from "@effect/data/Order"
import type { Order } from "@effect/data/Order"
import type { Monoid } from "@effect/typeclass/Monoid"
import * as monoid from "@effect/typeclass/Monoid"
import * as semigroup from "@effect/typeclass/Semigroup"

/**
 * @category type class
 * @since 1.0.0
 */
export interface Bounded<A> {
  readonly compare: Order<A>
  readonly maxBound: A
  readonly minBound: A
}

/**
 * @category type lambdas
 * @since 1.0.0
 */
export interface BoundedTypeLambda extends TypeLambda {
  readonly type: Bounded<this["Target"]>
}

/**
 * `Monoid` that returns last minimum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const min = <A>(B: Bounded<A>): Monoid<A> =>
  monoid.fromSemigroup(semigroup.min(B.compare), B.maxBound)

/**
 * `Monoid` that returns last maximum of elements.
 *
 * @category constructors
 * @since 1.0.0
 */
export const max = <A>(B: Bounded<A>): Monoid<A> =>
  monoid.fromSemigroup(semigroup.max(B.compare), B.minBound)

/**
 * Checks if a value is between the lower and upper limit of a bound.
 *
 * @category predicates
 * @since 1.0.0
 */
export const between = <A>(B: Bounded<A>): (a: A) => boolean =>
  order.between(B.compare)(B.minBound, B.maxBound)

/**
 * Clamp a value between `minBound` and `maxBound` values.
 *
 * @category utils
 * @since 1.0.0
 */
export const clamp = <A>(B: Bounded<A>): (a: A) => A =>
  order.clamp(B.compare)(B.minBound, B.maxBound)

/**
 * Reverses the `Order` of a `Bounded` and flips `maxBound` and `minBound` values.
 *
 * @category utils
 * @since 1.0.0
 */
export const reverse = <A>(B: Bounded<A>): Bounded<A> => ({
  compare: order.reverse(B.compare),
  minBound: B.maxBound,
  maxBound: B.minBound
})
