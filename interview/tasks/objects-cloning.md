# Объекты: клонирование и кэширование

## Задача 8 — Глубокое клонирование объекта ⭐⭐⭐

Реализуй функцию `deepClone(obj)` без использования `JSON.stringify`. Решение должно корректно обрабатывать:

- вложенные объекты и массивы
- циклические ссылки

```js
function deepClone(obj, seen = new Map()) {
  // твой код
}

// Пример с циклической ссылкой:
const a = { x: 1 };
a.self = a;
const b = deepClone(a);
console.log(b.x); // 1
console.log(b.self === b); // true (не бесконечный цикл)
```

<details>
<summary>Ответ</summary>

**Ответ:**

```js
function deepClone(obj, seen = new Map()) {
  // Примитивы и null возвращаем как есть
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Проверяем циклическую ссылку
  if (seen.has(obj)) {
    return seen.get(obj);
  }

  // Обрабатываем массивы
  if (Array.isArray(obj)) {
    const clone = [];
    seen.set(obj, clone);
    for (let i = 0; i < obj.length; i++) {
      clone[i] = deepClone(obj[i], seen);
    }
    return clone;
  }

  // Обрабатываем объекты
  const clone = {};
  seen.set(obj, clone);
  for (const key of Object.keys(obj)) {
    clone[key] = deepClone(obj[key], seen);
  }
  return clone;
}
```

**Почему так:**

Ключевые моменты:

1. **Примитивы** (`string`, `number`, `boolean`, `null`, `undefined`) — возвращаем напрямую, клонировать нечего.
2. **Циклические ссылки** — используем `Map` для отслеживания уже клонированных объектов. Если встречаем объект, который уже клонировали, возвращаем готовый клон.
3. **Массивы** — нужно обрабатывать отдельно, так как `Array.isArray` даёт точный ответ.
4. **Порядок `seen.set`** — важно записывать в `seen` **до** рекурсии, иначе при циклической ссылке попадём в бесконечный цикл.

Почему нельзя `JSON.stringify`:

- Не работает с `undefined`, `Function`, `Symbol`
- Не работает с циклическими ссылками (бросает ошибку)
- Теряет прототипы объектов

</details>

---

## Задача 10 — Реализуй memoize ⭐⭐⭐

Напиши функцию `memoize(fn)`. Она кэширует результат по аргументам. Учти, что аргументы могут быть примитивами и объектами.

```js
function memoize(fn) {
  // твой код
}

// Пример:
const add = memoize((a, b) => {
  console.log("вычисление...");
  return a + b;
});

console.log(add(1, 2)); // вычисление... 3
console.log(add(1, 2)); // 3 (без вычисления)
console.log(add(2, 3)); // вычисление... 5
```

<details>
<summary>Ответ</summary>

**Ответ:**

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    // Для примитивных аргументов — строковый ключ
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

**Почему так:**

- Используем `Map` для хранения кэша: быстрее объекта и не имеет проблем с ключами.
- `JSON.stringify(args)` — простой способ создать строковый ключ из массива аргументов. Работает для примитивов.

**Ограничение:** `JSON.stringify` не различает некоторые значения (`undefined`, `NaN`, функции). Для более надёжного решения:

```js
function memoize(fn) {
  const cache = new Map();

  return function (...args) {
    // Используем вложенные Map для точного сравнения по значению
    let node = cache;
    for (const arg of args) {
      if (!node.has(arg)) {
        node.set(arg, new Map());
      }
      node = node.get(arg);
    }

    const RESULT_KEY = Symbol.for("__result__");
    if (node.has(RESULT_KEY)) {
      return node.get(RESULT_KEY);
    }

    const result = fn.apply(this, args);
    node.set(RESULT_KEY, result);
    return result;
  };
}
```

Второй подход использует дерево `Map` — каждый аргумент как ключ вложенного уровня. Это позволяет точно сравнивать объекты по ссылке.

</details>

---
