---
title: data/Number.ts
nav_order: 14
parent: Modules
---

## Number overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Bounded](#bounded)
  - [MonoidMax](#monoidmax)
  - [MonoidMin](#monoidmin)
  - [MonoidMultiply](#monoidmultiply)
  - [MonoidSum](#monoidsum)
  - [SemigroupMax](#semigroupmax)
  - [SemigroupMin](#semigroupmin)
  - [SemigroupMultiply](#semigroupmultiply)
  - [SemigroupSum](#semigroupsum)

---

# instances

## Bounded

**Signature**

```ts
export declare const Bounded: bounded.Bounded<number>
```

Added in v1.0.0

## MonoidMax

A `Monoid` that uses the maximum between two values.

The `empty` value is `Infinity`.

**Signature**

```ts
export declare const MonoidMax: monoid.Monoid<number>
```

**Example**

```ts
import { MonoidMax } from "@effect/typeclass/data/Number"

assert.deepStrictEqual(MonoidMax.combine(2, 3), 3)
assert.deepStrictEqual(MonoidMax.combine(2, MonoidMax.empty), 2)
```

Added in v1.0.0

## MonoidMin

A `Monoid` that uses the minimum between two values.

The `empty` value is `-Infinity`.

**Signature**

```ts
export declare const MonoidMin: monoid.Monoid<number>
```

**Example**

```ts
import { MonoidMin } from "@effect/typeclass/data/Number"

assert.deepStrictEqual(MonoidMin.combine(2, 3), 2)
assert.deepStrictEqual(MonoidMin.combine(2, MonoidMin.empty), 2)
```

Added in v1.0.0

## MonoidMultiply

`number` monoid under multiplication.

The `empty` value is `1`.

**Signature**

```ts
export declare const MonoidMultiply: monoid.Monoid<number>
```

**Example**

```ts
import { MonoidMultiply } from "@effect/typeclass/data/Number"

assert.deepStrictEqual(MonoidMultiply.combine(2, 3), 6)
assert.deepStrictEqual(MonoidMultiply.combine(2, MonoidMultiply.empty), 2)
```

Added in v1.0.0

## MonoidSum

`number` monoid under addition.

The `empty` value is `0`.

**Signature**

```ts
export declare const MonoidSum: monoid.Monoid<number>
```

**Example**

```ts
import { MonoidSum } from "@effect/typeclass/data/Number"

assert.deepStrictEqual(MonoidSum.combine(2, 3), 5)
assert.deepStrictEqual(MonoidSum.combine(2, MonoidSum.empty), 2)
```

Added in v1.0.0

## SemigroupMax

A `Semigroup` that uses the maximum between two values.

**Signature**

```ts
export declare const SemigroupMax: semigroup.Semigroup<number>
```

**Example**

```ts
import { SemigroupMax } from "@effect/typeclass/data/Number"

assert.deepStrictEqual(SemigroupMax.combine(2, 3), 3)
```

Added in v1.0.0

## SemigroupMin

A `Semigroup` that uses the minimum between two values.

**Signature**

```ts
export declare const SemigroupMin: semigroup.Semigroup<number>
```

**Example**

```ts
import { SemigroupMin } from "@effect/typeclass/data/Number"

assert.deepStrictEqual(SemigroupMin.combine(2, 3), 2)
```

Added in v1.0.0

## SemigroupMultiply

`number` semigroup under multiplication.

**Signature**

```ts
export declare const SemigroupMultiply: semigroup.Semigroup<number>
```

**Example**

```ts
import { SemigroupMultiply } from "@effect/typeclass/data/Number"

assert.deepStrictEqual(SemigroupMultiply.combine(2, 3), 6)
```

Added in v1.0.0

## SemigroupSum

`number` semigroup under addition.

**Signature**

```ts
export declare const SemigroupSum: semigroup.Semigroup<number>
```

**Example**

```ts
import { SemigroupSum } from "@effect/typeclass/data/Number"

assert.deepStrictEqual(SemigroupSum.combine(2, 3), 5)
```

Added in v1.0.0
