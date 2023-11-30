/**
 * @since 1.0.0
 */
import type * as applicative from "@effect/typeclass/Applicative"
import * as covariant from "@effect/typeclass/Covariant"
import type * as filterable from "@effect/typeclass/Filterable"
import type * as invariant from "@effect/typeclass/Invariant"
import type * as traversable from "@effect/typeclass/Traversable"
import type * as traversableFilterable from "@effect/typeclass/TraversableFilterable"
import type { Either } from "effect/Either"
import { dual } from "effect/Function"
import type { Kind, TypeLambda } from "effect/HKT"
import type { Option } from "effect/Option"
import * as ReadonlyRecord from "effect/ReadonlyRecord"

const map = ReadonlyRecord.map

const imap = covariant.imap<ReadonlyRecord.ReadonlyRecordTypeLambda>(map)

const partitionMap = ReadonlyRecord.partitionMap

const filterMap = ReadonlyRecord.filterMap

const traverse = <F extends TypeLambda>(F: applicative.Applicative<F>): {
  <K extends string, A, R, O, E, B>(
    f: (a: A, key: K) => Kind<F, R, O, E, B>
  ): (self: Record<K, A>) => Kind<F, R, O, E, Record<string, B>>
  <K extends string, A, R, O, E, B>(
    self: Record<K, A>,
    f: (a: A, key: K) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Record<string, B>>
} =>
  dual(2, <A, R, O, E, B>(
    self: Record<string, A>,
    f: (a: A, key: string) => Kind<F, R, O, E, B>
  ): Kind<F, R, O, E, Record<string, B>> =>
    F.map(
      F.productAll(
        Object.entries(self).map(([key, a]) => F.map(f(a, key), (b) => [key, b] as const))
      ),
      Object.fromEntries
    ))

const traversePartitionMap = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B, C>(
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): (
    self: ReadonlyRecord.ReadonlyRecord<A>
  ) => Kind<F, R, O, E, [Record<string, B>, Record<string, C>]>
  <A, R, O, E, B, C>(
    self: ReadonlyRecord.ReadonlyRecord<A>,
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): Kind<F, R, O, E, [Record<string, B>, Record<string, C>]>
} =>
  dual(2, <A, R, O, E, B, C>(
    self: ReadonlyRecord.ReadonlyRecord<A>,
    f: (a: A) => Kind<F, R, O, E, Either<B, C>>
  ): Kind<F, R, O, E, [Record<string, B>, Record<string, C>]> => {
    return F.map(traverse(F)(self, f), ReadonlyRecord.separate)
  })

const traverseFilterMap = <F extends TypeLambda>(
  F: applicative.Applicative<F>
): {
  <A, R, O, E, B>(
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): (self: ReadonlyRecord.ReadonlyRecord<A>) => Kind<F, R, O, E, Record<string, B>>
  <A, R, O, E, B>(
    self: ReadonlyRecord.ReadonlyRecord<A>,
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): Kind<F, R, O, E, Record<string, B>>
} =>
  dual(2, <A, R, O, E, B>(
    self: ReadonlyRecord.ReadonlyRecord<A>,
    f: (a: A) => Kind<F, R, O, E, Option<B>>
  ): Kind<F, R, O, E, Record<string, B>> => {
    return F.map(traverse(F)(self, f), ReadonlyRecord.getSomes)
  })

/**
 * @category instances
 * @since 1.0.0
 */
export const Covariant: covariant.Covariant<ReadonlyRecord.ReadonlyRecordTypeLambda> = {
  imap,
  map
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Invariant: invariant.Invariant<ReadonlyRecord.ReadonlyRecordTypeLambda> = {
  imap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Filterable: filterable.Filterable<ReadonlyRecord.ReadonlyRecordTypeLambda> = {
  partitionMap,
  filterMap
}

/**
 * @category instances
 * @since 1.0.0
 */
export const Traversable: traversable.Traversable<ReadonlyRecord.ReadonlyRecordTypeLambda> = {
  traverse
}

/**
 * @category instances
 * @since 1.0.0
 */
export const TraversableFilterable: traversableFilterable.TraversableFilterable<
  ReadonlyRecord.ReadonlyRecordTypeLambda
> = {
  traversePartitionMap,
  traverseFilterMap
}
