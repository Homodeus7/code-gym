# Блок 3 — Замыкания

## 🤔 Вопрос 10: Что такое замыкание?

**Вопрос:** Что такое замыкание (closure)?

**Ответ:**

Замыкание — это функция вместе с лексическим окружением, в котором она была создана. Функция «захватывает» переменные из внешней области видимости и сохраняет доступ к ним даже после того, как внешняя функция завершила выполнение.

```js
function makeCounter() {
  let count = 0          // переменная в замыкании

  return {
    increment() { count++ },
    decrement() { count-- },
    getCount() { return count }
  }
}

const counter = makeCounter()
counter.increment()
counter.increment()
console.log(counter.getCount()) // 2 — count «жив» благодаря замыканию

// Второй счётчик независим:
const counter2 = makeCounter()
console.log(counter2.getCount()) // 0 — своё окружение

// Практический пример — приватные данные:
function createUser(name) {
  let _password = "secret" // недоступно снаружи

  return {
    getName: () => name,
    checkPassword: (pwd) => pwd === _password
  }
}
```

---

## 🤔 Вопрос 11: Цикл + setTimeout (var vs let)

**Вопрос:** Классическая задача: что выведет код ниже и как починить?

```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
```

**Ответ:**

Выведет `3, 3, 3` — `var` имеет функциональную область видимости, все три callback ссылаются на одну и ту же переменную `i`, которая к моменту срабатывания таймера равна `3`.

```js
// Проблема:
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100) // 3, 3, 3
}

// Фикс 1 — let (блочная область видимости, своя i на каждую итерацию):
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100) // 0, 1, 2
}

// Фикс 2 — IIFE (создаём новую область видимости):
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100) // 0, 1, 2
  })(i)
}

// Фикс 3 — bind для передачи текущего значения:
for (var i = 0; i < 3; i++) {
  setTimeout(console.log.bind(null, i), 100) // 0, 1, 2
}
```

---

## 🤔 Вопрос 12: Что такое IIFE?

**Вопрос:** Что такое IIFE и зачем нужна?

**Ответ:**

IIFE (Immediately Invoked Function Expression) — функция, которая объявляется и немедленно вызывается.

```js
(function() {
  // код выполняется сразу
})()

// Стрелочная версия:
(() => {
  console.log("IIFE!")
})()
```

**Зачем нужна:**

```js
// 1. Изоляция области видимости (до ES6 модулей):
(function() {
  var privateVar = "secret" // не попадёт в глобальный scope
})()
console.log(typeof privateVar) // "undefined"

// 2. Избежание конфликтов имён в старом коде:
(function($) {
  // здесь $ — jQuery, даже если снаружи $ переопределён
})(jQuery)

// 3. Создание области видимости в цикле (см. вопрос 11)

// 4. Module pattern — имитация модулей:
const counter = (function() {
  let count = 0
  return {
    increment: () => ++count,
    getCount: () => count
  }
})()
```

Сегодня IIFE менее актуальна благодаря ES6 модулям (`import/export`) и блочной области видимости `let/const`.

---

## 🤔 Вопрос 13: Каррирование

**Вопрос:** Что такое каррирование (currying) и зачем оно нужно?

**Ответ:**

Каррирование — преобразование функции с несколькими аргументами в цепочку функций, каждая из которых принимает один аргумент.

```js
// Обычная функция:
function add(a, b, c) { return a + b + c }
add(1, 2, 3) // 6

// Каррированная версия:
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c
    }
  }
}
curriedAdd(1)(2)(3) // 6

// Стрелочный синтаксис:
const add = a => b => c => a + b + c
add(1)(2)(3) // 6

// Практическое применение — частичное применение:
const multiply = a => b => a * b
const double = multiply(2)   // зафиксировали первый аргумент
const triple = multiply(3)

double(5)  // 10
triple(5)  // 15

// Универсальная функция curry:
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args)
    }
    return (...more) => curried(...args, ...more)
  }
}

const curriedAdd3 = curry((a, b, c) => a + b + c)
curriedAdd3(1)(2)(3)  // 6
curriedAdd3(1, 2)(3)  // 6
curriedAdd3(1)(2, 3)  // 6
```

---
