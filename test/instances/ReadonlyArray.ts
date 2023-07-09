/**
 * This module provides utility functions for working with arrays in TypeScript.
 *
 * @since 1.0.0
 */

import type { Either } from "@effect/data/Either"
import * as equivalence from "@effect/data/Equivalence"
import type { Equivalence } from "@effect/data/Equivalence"
import { dual } from "@effect/data/Function"
import type { Kind, TypeLambda } from "@effect/data/HKT"
import type { Option } from "@effect/data/Option"
import * as order from "@effect/data/Order"
import type { Order } from "@effect/data/Order"
import * as RA from "@effect/data/ReadonlyArray"
import type * as applicative from "@effect/typeclass/Applicative"
import type * as chainable from "@effect/typeclass/Chainable"
import * as covariant from "@effect/typeclass/Covariant"
import type * as filterable from "@effect/typeclass/Filterable"
import type * as flatMap_ from "@effect/typeclass/FlatMap"
import type * as foldable from "@effect/typeclass/Foldable"
import type * as invariant from "@effect/typeclass/Invariant"
import type * as monad from "@effect/typeclass/Monad"
import type { Monoid } from "@effect/typeclass/Monoid"
import * as monoid from "@effect/typeclass/Monoid"
import type * as of_ from "@effect/typeclass/Of"
import type * as pointed from "@effect/typeclass/Pointed"
import type * as product_ from "@effect/typeclass/Product"
import type * as semiApplicative from "@effect/typeclass/SemiApplicative"
import type { Semigroup } from "@effect/typeclass/Semigroup"
import * as semigroup from "@effect/typeclass/Semigroup"
import * as semiProduct from "@effect/typeclass/SemiProduct"
import type * as traversable from "@effect/typeclass/Traversable"
import type * as traversableFilterable from "@effect/typeclass/TraversableFilterable"

const of = RA.of
const map = RA.map
const flatMap = RA.flatMap

/**
 * @category instances
 * @since 1.0.0
 */
export const Of: of_.Of<RA.ReadonlyArrayTypeLambda> = {
  of
}

const imap = covariant.imap<RA.ReadonlyArrayTypeLambda>(map)

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<RA.ReadonlyArrayTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<RA.ReadonlyArrayTypeLambda> = {
  imap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Pointed: pointed.Pointed<RA.ReadonlyArrayTypeLambda> = {
  of,
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const FlatMap: flatMap_.FlatMap<RA.ReadonlyArrayTypeLambda> = {
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Chainable: chainable.Chainable<RA.ReadonlyArrayTypeLambda> = {
  imap,
  map,
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Filterable: filterable.Filterable<RA.ReadonlyArrayTypeLambda> = {
  partitionMap: RA.partitionMap,
  filterMap: RA.filterMap
}

const traverse = <F extends TypeLambda>(F: applicative.Applicative<F>): {
  <A, R, O, E, B>(
    f: (a: A, i: number) => Kind<F, R, O, E, B>
  ): (self: Iterable<A>) => Kind<F, R, O, E, Array<B>>
  <A, R, O, E, B>(
    self: Iterable<A>,
    f: (a: A, i: number) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Array<B>>
} =>
  dual(2, <A, R, O, E, B>(
    self: Iterable<A>,
    f: (a: A, i: number) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Array<B>> => F.productAll(RA.fromIterable(self).map(f)))

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<RA.ReadonlyArrayTypeLambda> = {
  traverse: traverse as any
}

const product = <A, B>(self: ReadonlyArray<A>, that: ReadonlyArray<B>): ReadonlyArray<[A, B]> => {
  if (RA.isEmptyReadonlyArray(self) || RA.isEmptyReadonlyArray(that)) {
    return RA.empty()
  }
  const out: Array<[A, B]> = []
  for (let i = 0; i < self.length; i++) {
    for (let j = 0; j < that.length; j++) {
      out.push([self[i], that[j]])
    }
  }
  return out
}

const productMany = semiProduct.productMany<RA.ReadonlyArrayTypeLambda>(map, product)

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiProduct: semiProduct.SemiProduct<RA.ReadonlyArrayTypeLambda> = {
  imap,
  product,
  productMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const SemiApplicative: semiApplicative.SemiApplicative<RA.ReadonlyArrayTypeLambda> = {
  imap,
  map,
  product,
  productMany
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Product: product_.Product<RA.ReadonlyArrayTypeLambda> = {
  of,
  imap,
  product,
  productMany,
  productAll: (collection) => {
    const arrays = RA.fromIterable(collection)
    return RA.isEmptyReadonlyArray(arrays) ?
      RA.empty() :
      SemiProduct.productMany(arrays[0], arrays.slice(1))
  }
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Applicative: applicative.Applicative<RA.ReadonlyArrayTypeLambda> = {
  imap,
  of,
  map,
  product,
  productMany,
  productAll: Product.productAll
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Monad: monad.Monad<RA.ReadonlyArrayTypeLambda> = {
  imap,
  of,
  map,
  flatMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Foldable: foldable.Foldable<RA.ReadonlyArrayTypeLambda> = {
  reduce: RA.reduce
}

const traversePartitionMap = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B, C>(
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): (self: ReadonlyArray<A>) => Kind<F, R, O, E, [Array<B>, Array<C>]>
  <A, R, O, E, B, C>(
    self: ReadonlyArray<A>,
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): Kind<F, R, O, E, [Array<B>, Array<C>]>
} =>
  dual(2, <A, R, O, E, B, C>(
    self: ReadonlyArray<A>,
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): Kind<F, R, O, E, [Array<B>, Array<C>]> => {
    return F.map(traverse(F)(self, f), RA.separate)
  })

const traverseFilterMap = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): (self: ReadonlyArray<A>) => Kind<F, R, O, E, Array<B>>
  <A, R, O, E, B>(
    self: ReadonlyArray<A>,
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): Kind<F, R, O, E, Array<B>>
} =>
  dual(2, <A, R, O, E, B>(
    self: ReadonlyArray<A>,
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): Kind<F, R, O, E, Array<B>> => {
    return F.map(traverse(F)(self, f), RA.compact)
  })

/**
 * @category instances
 * @since 1.0.0
 */
export const TraversableFilterable: traversableFilterable.TraversableFilterable<
  RA.ReadonlyArrayTypeLambda
> = {
  traversePartitionMap: traversePartitionMap as any,
  traverseFilterMap: traverseFilterMap as any
}

/**
 * @category instances
 * @since 1.0.0
 */
export const getSemigroup: <A>() => Semigroup<ReadonlyArray<A>> = semigroup.array

/**
 * @category instances
 * @since 1.0.0
 */
export const getMonoid: <A>() => Monoid<ReadonlyArray<A>> = monoid.array

/**
 * @category instances
 * @since 1.0.0
 */
export const getOrder: <A>(O: Order<A>) => Order<ReadonlyArray<A>> = order.array

/**
 * @category instances
 * @since 1.0.0
 */
export const getEquivalence: <A>(O: Equivalence<A>) => Equivalence<ReadonlyArray<A>> =
  equivalence.array
