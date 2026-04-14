# Функции: debounce и throttle

## Задача 6 — Реализуй debounce ⭐⭐⭐

Напиши функцию `debounce(fn, delay)`. Она должна откладывать вызов `fn` до тех пор, пока не пройдёт `delay` миллисекунд с момента последнего вызова.

```js
function debounce(fn, delay) {
  // твой код
}

// Пример использования:
const log = debounce((msg) => console.log(msg), 300);
log("a"); // не выведет сразу
log("b"); // сбрасывает таймер
log("c"); // через 300ms выведет 'c'
```

<details>
<summary>Ответ</summary>

**Ответ:**

```js
function debounce(fn, delay) {
  let timerId = null;

  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
```

**Почему так:**

При каждом вызове возвращаемой функции мы:

1. Отменяем предыдущий запланированный вызов (`clearTimeout`).
2. Планируем новый вызов через `delay` мс.

Таким образом `fn` будет вызвана только после того, как пройдёт `delay` мс без новых вызовов. Используем `fn.apply(this, args)`, чтобы правильно передать контекст и аргументы.

**Пример с leading-вызовом (вызов в начале, а не в конце):**

```js
function debounce(fn, delay, leading = false) {
  let timerId = null;

  return function (...args) {
    if (leading && timerId === null) {
      fn.apply(this, args);
    }
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = null;
      if (!leading) fn.apply(this, args);
    }, delay);
  };
}
```

</details>

---

## Задача 7 — Реализуй throttle ⭐⭐⭐

Напиши функцию `throttle(fn, delay)`. Она должна вызывать `fn` не чаще одного раза за `delay` миллисекунд, игнорируя промежуточные вызовы.

```js
function throttle(fn, delay) {
  // твой код
}

// Пример использования:
const log = throttle((msg) => console.log(msg), 300);
log("a"); // выведет сразу
log("b"); // игнорируется
log("c"); // игнорируется
// через 300ms следующий вызов снова выведет
```

<details>
<summary>Ответ</summary>

**Ответ:**

```js
function throttle(fn, delay) {
  let lastCallTime = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastCallTime >= delay) {
      lastCallTime = now;
      fn.apply(this, args);
    }
  };
}
```

**Почему так:**

Запоминаем время последнего **реального** вызова `fn`. При каждом вызове проверяем: прошло ли достаточно времени? Если да — вызываем и обновляем время. Если нет — игнорируем.

Разница с debounce:

- `debounce` — откладывает вызов, пока не прекратится активность.
- `throttle` — гарантирует максимальную частоту вызовов.

**Альтернатива через флаг (на таймере):**

```js
function throttle(fn, delay) {
  let isThrottled = false;

  return function (...args) {
    if (!isThrottled) {
      fn.apply(this, args);
      isThrottled = true;
      setTimeout(() => {
        isThrottled = false;
      }, delay);
    }
  };
}
```

</details>

---
