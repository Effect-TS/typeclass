/**
 * @since 1.0.0
 */

import * as Either from "@effect/data/Either"
import { dual } from "@effect/data/Function"
import type { Kind, TypeLambda } from "@effect/data/HKT"
import type * as applicative from "@effect/typeclass/Applicative"
import type * as bicovariant from "@effect/typeclass/Bicovariant"
import type * as chainable from "@effect/typeclass/Chainable"
import * as covariant from "@effect/typeclass/Covariant"
import type * as flatMap_ from "@effect/typeclass/FlatMap"
import type * as foldable from "@effect/typeclass/Foldable"
import type * as invariant from "@effect/typeclass/Invariant"
import type * as monad from "@effect/typeclass/Monad"
import type * as of_ from "@effect/typeclass/Of"
import type * as pointed from "@effect/typeclass/Pointed"
import type * as product_ from "@effect/typeclass/Product"
import type * as semiAlternative from "@effect/typeclass/SemiAlternative"
import type * as semiApplicative from "@effect/typeclass/SemiApplicative"
import type * as semiCoproduct from "@effect/typeclass/SemiCoproduct"
import type * as semiProduct from "@effect/typeclass/SemiProduct"
import type * as traversable from "@effect/typeclass/Traversable"

const of = Either.right
const map = Either.map

const bimap: {
  <E1, E2, A, B>(
    f: (e: E1) => E2,
    g: (a: A) => B
  ): (self: Either.Either<E1, A>) => Either.Either<E2, B>
  <E1, A, E2, B>(self: Either.Either<E1, A>, f: (e: E1) => E2, g: (a: A) => B): Either.Either<E2, B>
} = dual(
  3,
  <E1, A, E2, B>(
    self: Either.Either<E1, A>,
    f: (e: E1) => E2,
    g: (a: A) => B
  ): Either.Either<E2, B> =>
    Either.isLeft(self) ? Either.left(f(self.left)) : Either.right(g(self.right))
)

/**
 * @category instances
 * @since 1.0.0
 */
export const Bicovariant: bicovariant.Bicovariant<Either.EitherTypeLambda> = {
  bimap
}

const imap = covariant.imap<Either.EitherTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<Either.EitherTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<Either.EitherTypeLambda> = {
  imap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<Either.EitherTypeLambda> = {
  of
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<Either.EitherTypeLambda> = {
  of,
  imap,
  map
}

const flatMap: {
  <A, E2, B>(
    f: (a: A) => Either.Either<E2, B>
  ): <E1>(self: Either.Either<E1, A>) => Either.Either<E1 | E2, B>
  <E1, A, E2, B>(
    self: Either.Either<E1, A>,
    f: (a: A) => Either.Either<E2, B>
  ): Either.Either<E1 | E2, B>
} = dual(
  2,
  <E1, A, E2, B>(
    self: Either.Either<E1, A>,
    f: (a: A) => Either.Either<E2, B>
  ): Either.Either<E1 | E2, B> => Either.isLeft(self) ? Either.left(self.left) : f(self.right)
)

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<Either.EitherTypeLambda> = {
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<Either.EitherTypeLambda> = {
  imap,
  map,
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<Either.EitherTypeLambda> = {
  imap,
  of,
  map,
  flatMap
}

const product = <E1, A, E2, B>(
  self: Either.Either<E1, A>,
  that: Either.Either<E2, B>
): Either.Either<E1 | E2, [A, B]> =>
  Either.isRight(self) ?
    (Either.isRight(that) ? Either.right([self.right, that.right]) : Either.left(that.left)) :
    Either.left(self.left)

const productMany = <E, A>(
  self: Either.Either<E, A>,
  collection: Iterable<Either.Either<E, A>>
): Either.Either<E, [A, ...Array<A>]> => {
  if (Either.isLeft(self)) {
    return Either.left(self.left)
  }
  const out: [A, ...Array<A>] = [self.right]
  for (const e of collection) {
    if (Either.isLeft(e)) {
      return Either.left(e.left)
    }
    out.push(e.right)
  }
  return Either.right(out)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<Either.EitherTypeLambda> = {
  imap,
  product,
  productMany
}

export const productAll = <E, A>(
  collection: Iterable<Either.Either<E, A>>
): Either.Either<E, Array<A>> => {
  const out: Array<A> = []
  for (const e of collection) {
    if (Either.isLeft(e)) {
      return Either.left(e.left)
    }
    out.push(e.right)
  }
  return Either.right(out)
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<Either.EitherTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<Either.EitherTypeLambda> = {
  imap,
  map,
  product,
  productMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<Either.EitherTypeLambda> = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll
}

const coproduct = <E1, A, E2, B>(
  self: Either.Either<E1, A>,
  that: Either.Either<E2, B>
): Either.Either<E1 | E2, A | B> => Either.isRight(self) ? self : that

const coproductMany = <E, A>(
  self: Either.Either<E, A>,
  collection: Iterable<Either.Either<E, A>>
): Either.Either<E, A> => {
  let out = self
  if (Either.isRight(out)) {
    return out
  }
  for (out of collection) {
    if (Either.isRight(out)) {
      return out
    }
  }
  return out
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiCoproduct: semiCoproduct.SemiCoproduct<Either.EitherTypeLambda> = {
  imap,
  coproduct,
  coproductMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiAlternative: semiAlternative.SemiAlternative<Either.EitherTypeLambda> = {
  map,
  imap,
  coproduct,
  coproductMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<Either.EitherTypeLambda> = {
  reduce: dual(
    3,
    <E, A, B>(self: Either.Either<E, A>, b: B, f: (b: B, a: A) => B): B =>
      Either.isLeft(self) ? b : f(b, self.right)
  )
}

const traverse = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, B>
  ): <TE>(self: Either.Either<TE, A>) => Kind<F, R, O, E, Either.Either<TE, B>>
  <TE, A, R, O, E, B>(
    self: Either.Either<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Either.Either<TE, B>>
} =>
  dual(2, <TE, A, R, O, E, B>(
    self: Either.Either<TE, A>,
    f: (a: A) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Either.Either<TE, B>> =>
    Either.isLeft(self) ?
      F.of<Either.Either<TE, B>>(Either.left(self.left)) :
      F.map<R, O, E, B, Either.Either<TE, B>>(f(self.right), Either.right))

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<Either.EitherTypeLambda> = {
  traverse
}
