# Типы и приведение типов

## Задача 1 — typeof и примитивы ⭐⭐

Что выведет в консоль каждый из вызовов?

```js
console.log(typeof null);
console.log(typeof undefined);
console.log(typeof NaN);
console.log(typeof typeof 42);
```

<details>
<summary>Ответ</summary>

**Ответ:**

```
'object'
'undefined'
'number'
'string'
```

**Почему так:**

- `typeof null === 'object'` — историческая ошибка в JavaScript с первой версии языка. В памяти `null` был представлен нулевым указателем, который интерпретировался как тип объекта. Исправить нельзя — это сломает весь существующий код.
- `typeof undefined === 'undefined'` — специальный тип для неинициализированных переменных.
- `typeof NaN === 'number'` — NaN означает "Not a Number", но при этом является значением типа `number`. Это тоже историческая особенность.
- `typeof typeof 42` — внутренний `typeof 42` возвращает строку `'number'`, а `typeof` строки всегда `'string'`.

</details>

---

## Задача 2 — Сравнение и приведение типов ⭐⭐

Что выведет каждое выражение — `true` или `false`?

```js
console.log(0 == false);
console.log("" == false);
console.log(null == undefined);
console.log(null === undefined);
console.log(NaN == NaN);
```

<details>
<summary>Ответ</summary>

**Ответ:**

```
true
true
true
false
false
```

**Почему так:**

- `0 == false` → `true`: при нестрогом сравнении `false` преобразуется в число `0`. Итого `0 == 0` → `true`.
- `'' == false` → `true`: оба приводятся к числу. `Number('') === 0`, `Number(false) === 0`. Итого `0 == 0` → `true`.
- `null == undefined` → `true`: специальное правило спецификации ECMAScript — `null` и `undefined` равны только друг другу при `==`, и не равны ничему другому.
- `null === undefined` → `false`: строгое сравнение не делает приведения типов. Типы разные (`null` и `undefined`), поэтому `false`.
- `NaN == NaN` → `false`: NaN — единственное значение в JavaScript, которое не равно само себе. Для проверки используй `Number.isNaN(value)`.

</details>

---

## Задача 3 — parseInt и хитрые аргументы ⭐⭐

Что вернёт каждый вызов?

```js
console.log(parseInt("10px"));
console.log(parseInt("0x10"));
console.log(parseInt(""));
console.log(parseInt("10.5"));
console.log(parseInt(true));
```

<details>
<summary>Ответ</summary>

**Ответ:**

```
10
16
NaN
10
NaN
```

**Почему так:**

- `parseInt('10px')` → `10`: парсит строку до первого нечислового символа. `'1'` и `'0'` — числа, `'p'` — нет. Возвращает `10`.
- `parseInt('0x10')` → `16`: `'0x'` — префикс шестнадцатеричного числа. `0x10` в десятичной = `16`.
- `parseInt('')` → `NaN`: нет ни одного числового символа для парсинга.
- `parseInt('10.5')` → `10`: `parseInt` работает с целыми числами. Точка — не числовой символ, парсинг останавливается.
- `parseInt(true)` → `NaN`: сначала `true` преобразуется в строку `'true'`, символ `'t'` не является числом, сразу возвращает `NaN`.

</details>

---
