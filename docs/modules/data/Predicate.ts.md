---
title: data/Predicate.ts
nav_order: 17
parent: Modules
---

## Predicate overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Contravariant](#contravariant)
  - [Invariant](#invariant)
  - [Of](#of)
  - [Product](#product)
  - [SemiProduct](#semiproduct)
  - [getMonoidEqv](#getmonoideqv)
  - [getMonoidEvery](#getmonoidevery)
  - [getMonoidSome](#getmonoidsome)
  - [getMonoidXor](#getmonoidxor)
  - [getSemigroupEqv](#getsemigroupeqv)
  - [getSemigroupEvery](#getsemigroupevery)
  - [getSemigroupSome](#getsemigroupsome)
  - [getSemigroupXor](#getsemigroupxor)

---

# instances

## Contravariant

**Signature**

```ts
export declare const Contravariant: contravariant.Contravariant<Predicate.PredicateTypeLambda>
```

Added in v1.0.0

## Invariant

**Signature**

```ts
export declare const Invariant: invariant.Invariant<Predicate.PredicateTypeLambda>
```

Added in v1.0.0

## Of

**Signature**

```ts
export declare const Of: of_.Of<Predicate.PredicateTypeLambda>
```

Added in v1.0.0

## Product

**Signature**

```ts
export declare const Product: product_.Product<Predicate.PredicateTypeLambda>
```

Added in v1.0.0

## SemiProduct

**Signature**

```ts
export declare const SemiProduct: semiProduct.SemiProduct<Predicate.PredicateTypeLambda>
```

Added in v1.0.0

## getMonoidEqv

**Signature**

```ts
export declare const getMonoidEqv: <A>() => monoid.Monoid<Predicate.Predicate<A>>
```

Added in v1.0.0

## getMonoidEvery

**Signature**

```ts
export declare const getMonoidEvery: <A>() => monoid.Monoid<Predicate.Predicate<A>>
```

Added in v1.0.0

## getMonoidSome

**Signature**

```ts
export declare const getMonoidSome: <A>() => monoid.Monoid<Predicate.Predicate<A>>
```

Added in v1.0.0

## getMonoidXor

**Signature**

```ts
export declare const getMonoidXor: <A>() => monoid.Monoid<Predicate.Predicate<A>>
```

Added in v1.0.0

## getSemigroupEqv

**Signature**

```ts
export declare const getSemigroupEqv: <A>() => semigroup.Semigroup<Predicate.Predicate<A>>
```

Added in v1.0.0

## getSemigroupEvery

**Signature**

```ts
export declare const getSemigroupEvery: <A>() => semigroup.Semigroup<Predicate.Predicate<A>>
```

Added in v1.0.0

## getSemigroupSome

**Signature**

```ts
export declare const getSemigroupSome: <A>() => semigroup.Semigroup<Predicate.Predicate<A>>
```

Added in v1.0.0

## getSemigroupXor

**Signature**

```ts
export declare const getSemigroupXor: <A>() => semigroup.Semigroup<Predicate.Predicate<A>>
```

Added in v1.0.0
