---
title: data/Boolean.ts
nav_order: 10
parent: Modules
---

## Boolean overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [MonoidEqv](#monoideqv)
  - [MonoidEvery](#monoidevery)
  - [MonoidSome](#monoidsome)
  - [MonoidXor](#monoidxor)
  - [SemigroupEqv](#semigroupeqv)
  - [SemigroupEvery](#semigroupevery)
  - [SemigroupSome](#semigroupsome)
  - [SemigroupXor](#semigroupxor)

---

# instances

## MonoidEqv

`boolean` monoid under equivalence.

The `empty` value is `true`.

**Signature**

```ts
export declare const MonoidEqv: monoid.Monoid<boolean>
```

Added in v1.0.0

## MonoidEvery

`boolean` monoid under conjunction, see also {@link SemigroupEvery}.

The `empty` value is `true`.

**Signature**

```ts
export declare const MonoidEvery: monoid.Monoid<boolean>
```

Added in v1.0.0

## MonoidSome

`boolean` monoid under disjunction, see also {@link SemigroupSome}.

The `empty` value is `false`.

**Signature**

```ts
export declare const MonoidSome: monoid.Monoid<boolean>
```

Added in v1.0.0

## MonoidXor

`boolean` monoid under exclusive disjunction, see also {@link SemigroupXor}.

The `empty` value is `false`.

**Signature**

```ts
export declare const MonoidXor: monoid.Monoid<boolean>
```

Added in v1.0.0

## SemigroupEqv

`boolean` semigroup under equivalence.

**Signature**

```ts
export declare const SemigroupEqv: semigroup.Semigroup<boolean>
```

**Example**

```ts
import { SemigroupEqv } from '@effect/typeclass/data/Boolean'

assert.deepStrictEqual(SemigroupEqv.combine(true, true), true)
assert.deepStrictEqual(SemigroupEqv.combine(true, false), false)
assert.deepStrictEqual(SemigroupEqv.combine(false, true), false)
assert.deepStrictEqual(SemigroupEqv.combine(false, false), true)
```

Added in v1.0.0

## SemigroupEvery

`boolean` semigroup under conjunction.

**Signature**

```ts
export declare const SemigroupEvery: semigroup.Semigroup<boolean>
```

**Example**

```ts
import { SemigroupEvery } from '@effect/typeclass/data/Boolean'

assert.deepStrictEqual(SemigroupEvery.combine(true, true), true)
assert.deepStrictEqual(SemigroupEvery.combine(true, false), false)
assert.deepStrictEqual(SemigroupEvery.combine(false, true), false)
assert.deepStrictEqual(SemigroupEvery.combine(false, false), false)
```

Added in v1.0.0

## SemigroupSome

`boolean` semigroup under disjunction.

**Signature**

```ts
export declare const SemigroupSome: semigroup.Semigroup<boolean>
```

**Example**

```ts
import { SemigroupSome } from '@effect/typeclass/data/Boolean'

assert.deepStrictEqual(SemigroupSome.combine(true, true), true)
assert.deepStrictEqual(SemigroupSome.combine(true, false), true)
assert.deepStrictEqual(SemigroupSome.combine(false, true), true)
assert.deepStrictEqual(SemigroupSome.combine(false, false), false)
```

Added in v1.0.0

## SemigroupXor

`boolean` semigroup under exclusive disjunction.

**Signature**

```ts
export declare const SemigroupXor: semigroup.Semigroup<boolean>
```

**Example**

```ts
import { SemigroupXor } from '@effect/typeclass/data/Boolean'

assert.deepStrictEqual(SemigroupXor.combine(true, true), false)
assert.deepStrictEqual(SemigroupXor.combine(true, false), true)
assert.deepStrictEqual(SemigroupXor.combine(false, true), true)
assert.deepStrictEqual(SemigroupXor.combine(false, false), false)
```

Added in v1.0.0
