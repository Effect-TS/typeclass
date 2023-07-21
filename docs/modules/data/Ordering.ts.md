---
title: data/Ordering.ts
nav_order: 16
parent: Modules
---

## Ordering overview

Added in v1.0.0

---

<h2 class="text-delta">Table of contents</h2>

- [instances](#instances)
  - [Monoid](#monoid)
  - [Semigroup](#semigroup)

---

# instances

## Monoid

`Monoid` instance for `Ordering`, returns the left-most non-zero `Ordering`.

The `empty` value is `0`.

**Signature**

```ts
export declare const Monoid: monoid.Monoid<Ordering>
```

**Example**

```ts
import { Monoid } from '@effect/typeclass/data/Ordering'

assert.deepStrictEqual(Monoid.combine(Monoid.empty, -1), -1)
assert.deepStrictEqual(Monoid.combine(Monoid.empty, 1), 1)
assert.deepStrictEqual(Monoid.combine(1, -1), 1)
```

Added in v1.0.0

## Semigroup

`Semigroup` instance for `Ordering`, returns the left-most non-zero `Ordering`.

**Signature**

```ts
export declare const Semigroup: semigroup.Semigroup<Ordering>
```

**Example**

```ts
import { Semigroup } from '@effect/typeclass/data/Ordering'

assert.deepStrictEqual(Semigroup.combine(0, -1), -1)
assert.deepStrictEqual(Semigroup.combine(0, 1), 1)
assert.deepStrictEqual(Semigroup.combine(1, -1), 1)
```

Added in v1.0.0
