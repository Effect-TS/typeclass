---
title: data/BigInt.ts
nav_order: 9
parent: Modules
---

## BigInt overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [MonoidMultiply](#monoidmultiply)
  - [MonoidSum](#monoidsum)
  - [SemigroupMax](#semigroupmax)
  - [SemigroupMin](#semigroupmin)
  - [SemigroupMultiply](#semigroupmultiply)
  - [SemigroupSum](#semigroupsum)

---

# instances

## MonoidMultiply

`bigint` monoid under multiplication.

The `empty` value is `1n`.

**Signature**

```ts
export declare const MonoidMultiply: monoid.Monoid<bigint>
```

**Example**

```ts
import { MonoidMultiply } from '@effect/typeclass/data/BigInt'

assert.deepStrictEqual(MonoidMultiply.combine(2n, 3n), 6n)
assert.deepStrictEqual(MonoidMultiply.combine(2n, MonoidMultiply.empty), 2n)
```

Added in v1.0.0

## MonoidSum

`bigint` monoid under addition.

The `empty` value is `0n`.

**Signature**

```ts
export declare const MonoidSum: monoid.Monoid<bigint>
```

**Example**

```ts
import { MonoidSum } from '@effect/typeclass/data/BigInt'

assert.deepStrictEqual(MonoidSum.combine(2n, 3n), 5n)
assert.deepStrictEqual(MonoidSum.combine(2n, MonoidSum.empty), 2n)
```

Added in v1.0.0

## SemigroupMax

A `Semigroup` that uses the maximum between two values.

**Signature**

```ts
export declare const SemigroupMax: semigroup.Semigroup<bigint>
```

**Example**

```ts
import { SemigroupMax } from '@effect/typeclass/data/BigInt'

assert.deepStrictEqual(SemigroupMax.combine(2n, 3n), 3n)
```

Added in v1.0.0

## SemigroupMin

A `Semigroup` that uses the minimum between two values.

**Signature**

```ts
export declare const SemigroupMin: semigroup.Semigroup<bigint>
```

**Example**

```ts
import { SemigroupMin } from '@effect/typeclass/data/BigInt'

assert.deepStrictEqual(SemigroupMin.combine(2n, 3n), 2n)
```

Added in v1.0.0

## SemigroupMultiply

`bigint` semigroup under multiplication.

**Signature**

```ts
export declare const SemigroupMultiply: semigroup.Semigroup<bigint>
```

Added in v1.0.0

## SemigroupSum

`bigint` semigroup under addition.

**Signature**

```ts
export declare const SemigroupSum: semigroup.Semigroup<bigint>
```

**Example**

```ts
import { SemigroupSum } from '@effect/typeclass/data/BigInt'

assert.deepStrictEqual(SemigroupSum.combine(2n, 3n), 5n)
```

Added in v1.0.0
