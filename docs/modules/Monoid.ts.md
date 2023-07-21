---
title: Monoid.ts
nav_order: 27
parent: Modules
---

## Monoid overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [combinators](#combinators)
  - [array](#array)
  - [reverse](#reverse)
  - [struct](#struct)
  - [tuple](#tuple)
- [constructors](#constructors)
  - [fromSemigroup](#fromsemigroup)
  - [max](#max)
  - [min](#min)
- [type class](#type-class)
  - [Monoid (interface)](#monoid-interface)

---

# combinators

## array

Given a type `A`, this function creates and returns a `Semigroup` for `ReadonlyArray<A>`.

The `empty` value is the empty array.

**Signature**

```ts
export declare const array: <A>() => Monoid<readonly A[]>
```

Added in v1.0.0

## reverse

The dual of a `Monoid`, obtained by swapping the arguments of `combine`.

**Signature**

```ts
export declare const reverse: <A>(M: Monoid<A>) => Monoid<A>
```

Added in v1.0.0

## struct

This function creates and returns a new `Monoid` for a struct of values based on the given `Monoid`s for each property in the struct.
The returned `Monoid` combines two structs of the same type by applying the corresponding `Monoid` passed as arguments to each property in the struct.

The `empty` value of the returned `Monoid` is a struct where each property is the `empty` value of the corresponding `Monoid` in the input `monoids` object.

It is useful when you need to combine two structs of the same type and you have a specific way of combining each property of the struct.

**Signature**

```ts
export declare const struct: <R extends { readonly [x: string]: Monoid<any> }>(
  fields: R
) => Monoid<{ readonly [K in keyof R]: [R[K]] extends [Monoid<infer A>] ? A : never }>
```

Added in v1.0.0

## tuple

Similar to `Promise.all` but operates on `Monoid`s.

```
[Monoid<A>, Monoid<B>, ...] -> Monoid<[A, B, ...]>
```

This function creates and returns a new `Monoid` for a tuple of values based on the given `Monoid`s for each element in the tuple.
The returned `Monoid` combines two tuples of the same type by applying the corresponding `Monoid` passed as arguments to each element in the tuple.

The `empty` value of the returned `Monoid` is the tuple of `empty` values of the input `Monoid`s.

It is useful when you need to combine two tuples of the same type and you have a specific way of combining each element of the tuple.

**Signature**

```ts
export declare const tuple: <T extends readonly Monoid<any>[]>(
  ...elements: T
) => Monoid<{ readonly [I in keyof T]: [T[I]] extends [Monoid<infer A>] ? A : never }>
```

Added in v1.0.0

# constructors

## fromSemigroup

**Signature**

```ts
export declare const fromSemigroup: <A>(S: Semigroup<A>, empty: A) => Monoid<A>
```

Added in v1.0.0

## max

Get a monoid where `combine` will return the maximum, based on the provided bounded order.

The `empty` value is the `minimum` value.

**Signature**

```ts
export declare const max: <A>(B: Bounded<A>) => Monoid<A>
```

Added in v1.0.0

## min

Get a monoid where `combine` will return the minimum, based on the provided bounded order.

The `empty` value is the `maxBound` value.

**Signature**

```ts
export declare const min: <A>(B: Bounded<A>) => Monoid<A>
```

Added in v1.0.0

# type class

## Monoid (interface)

**Signature**

```ts
export interface Monoid<A> extends Semigroup<A> {
  readonly empty: A
  readonly combineAll: (collection: Iterable<A>) => A
}
```

Added in v1.0.0
