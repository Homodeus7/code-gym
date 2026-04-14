# Методы массивов

## Задача 11 — Реализуй Array.prototype.map ⭐⭐⭐⭐

Напиши собственный `myMap` без использования встроенного `.map()`. Он должен вести себя как стандартный: принимать колбэк `(element, index, array)` и возвращать новый массив.

```js
Array.prototype.myMap = function (callback) {
  // твой код
};

// Проверка:
console.log([1, 2, 3].myMap((x) => x * 2)); // [2, 4, 6]
console.log([1, 2, 3].myMap((x, i) => x + i)); // [1, 3, 5]
```

<details>
<summary>Ответ</summary>

**Ответ:**

```js
Array.prototype.myMap = function (callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this) { // пропускаем "дырки" в разреженных массивах
      result[i] = callback(this[i], i, this);
    }
  }
  return result;
};
```

**Почему так:**

- `callback` вызывается с тремя аргументами: `(element, index, array)` — как в стандарте.
- `i in this` — обработка разреженных массивов (sparse arrays). Например, `[1,,3]` — индекс `1` отсутствует, его не нужно передавать в колбэк.
- Не мутируем исходный массив — создаём новый `result`.

</details>

---

## Задача 12 — Реализуй Array.prototype.filter ⭐⭐⭐⭐

Напиши собственный `myFilter` без использования встроенного `.filter()`. Колбэк — `(element, index, array)`.

```js
Array.prototype.myFilter = function (callback) {
  // твой код
};

// Проверка:
console.log([1, 2, 3, 4].myFilter((x) => x % 2 === 0)); // [2, 4]
console.log(['a', 'b', 'c'].myFilter((_, i) => i > 0));  // ['b', 'c']
```

<details>
<summary>Ответ</summary>

**Ответ:**

```js
Array.prototype.myFilter = function (callback) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};
```

**Почему так:**

- Колбэк возвращает `true`/`false` — включаем или нет элемент в результат.
- Используем `push` вместо присвоения по индексу — результирующий массив должен быть непрерывным.
- `i in this` — пропускаем разреженные индексы.

</details>

---

## Задача 13 — Реализуй Array.prototype.reduce ⭐⭐⭐⭐

Напиши собственный `myReduce`. Он должен поддерживать опциональный начальный аккумулятор, как стандартный `reduce`.

```js
Array.prototype.myReduce = function (callback, initialValue) {
  // твой код
};

// Проверка:
console.log([1, 2, 3, 4].myReduce((acc, x) => acc + x, 0)); // 10
console.log([1, 2, 3, 4].myReduce((acc, x) => acc + x));     // 10
console.log([[1, 2], [3, 4]].myReduce((acc, x) => acc.concat(x), [])); // [1,2,3,4]
```

<details>
<summary>Ответ</summary>

**Ответ:**

```js
Array.prototype.myReduce = function (callback, initialValue) {
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }

  const hasInitial = arguments.length >= 2;
  let acc = hasInitial ? initialValue : undefined;
  let startIndex = 0;

  if (!hasInitial) {
    let found = false;
    for (let i = 0; i < this.length; i++) {
      if (i in this) {
        acc = this[i];
        startIndex = i + 1;
        found = true;
        break;
      }
    }
    if (!found) {
      throw new TypeError('Reduce of empty array with no initial value');
    }
  }

  for (let i = startIndex; i < this.length; i++) {
    if (i in this) {
      acc = callback(acc, this[i], i, this);
    }
  }

  return acc;
};
```

**Почему так:**

- `arguments.length >= 2` — проверяем, передан ли `initialValue` явно (нельзя проверять `=== undefined`, т.к. `undefined` может быть намеренным значением).
- Пустой массив без `initialValue` → `TypeError`, как в стандарте.
- Колбэк получает `(accumulator, currentValue, currentIndex, array)`.

</details>

---
