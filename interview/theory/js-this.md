# Блок 2 — Контекст this

## 🤔 Вопрос 6: Что такое this в JavaScript?

**Вопрос:** Что такое `this` в JavaScript?

**Ответ:**

`this` — ключевое слово, которое указывает на объект-контекст, в котором выполняется код. Значение `this` определяется **не при объявлении, а при вызове функции**.

```js
// 1. Глобальный контекст:
console.log(this); // window (браузер) или {} (Node.js strict mode)

// 2. Метод объекта:
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name); // "Alice" — this = obj
  },
};
obj.greet();

// 3. Конструктор:
function User(name) {
  this.name = name; // this = новый объект
}
const user = new User("Bob");
console.log(user.name); // "Bob"

// 4. Явное задание через call/apply/bind:
function greet() {
  console.log(this.name);
}
greet.call({ name: "Carol" }); // "Carol"

// 5. В strict mode без контекста — undefined:
("use strict");
function fn() {
  console.log(this);
} // undefined
fn();
```

---

## 🤔 Вопрос 7: this в стрелочных vs обычных функциях

**Вопрос:** Как работает `this` в стрелочных функциях vs обычных?

**Ответ:**

Обычная функция — `this` определяется **в момент вызова** (динамический контекст).
Стрелочная функция — `this` берётся из **лексического окружения** (того места, где она объявлена), и его нельзя изменить.

```js
const obj = {
  name: "Alice",

  // Обычная функция — this зависит от вызова:
  regular() {
    console.log(this.name); // "Alice"
    setTimeout(function () {
      console.log(this.name); // undefined — this потерян!
    }, 100);
  },

  // Стрелочная — захватывает this из метода:
  arrow() {
    console.log(this.name); // "Alice"
    setTimeout(() => {
      console.log(this.name); // "Alice" — this из arrow()
    }, 100);
  },
};

// Стрелочную функцию нельзя использовать как метод объекта:
const bad = {
  name: "Bob",
  greet: () => console.log(this.name), // undefined — this = window/undefined
};

// Стрелочную нельзя использовать как конструктор:
const Arrow = () => {};
new Arrow(); // TypeError: Arrow is not a constructor
```

---

## 🤔 Вопрос 8: call, apply, bind

**Вопрос:** В чём разница между `call`, `apply`, `bind`?

**Ответ:**

Все три метода позволяют явно задать `this` для функции:

- `call(thisArg, arg1, arg2, ...)` — вызывает функцию немедленно, аргументы через запятую
- `apply(thisArg, [arg1, arg2, ...])` — вызывает функцию немедленно, аргументы массивом
- `bind(thisArg, arg1, ...)` — возвращает новую функцию с привязанным `this` (не вызывает)

```js
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: "Alice" };

introduce.call(person, "Hello", "!"); // "Hello, I'm Alice!"
introduce.apply(person, ["Hi", "."]); // "Hi, I'm Alice."
const fn = introduce.bind(person, "Hey");
fn("?"); // "Hey, I'm Alice?"

// bind — типичный use case: сохранить метод класса:
class Timer {
  constructor() {
    this.count = 0;
    this.tick = this.tick.bind(this); // фиксируем this
  }
  tick() {
    this.count++;
  }
}

// Частичное применение через bind (partial application):
function multiply(a, b) {
  return a * b;
}
const double = multiply.bind(null, 2);
double(5); // 10
```

---

## 🤔 Вопрос 9: Потеря контекста this

**Вопрос:** Когда происходит потеря контекста `this` и как это фиксить?

**Ответ:**

Контекст теряется, когда метод объекта передаётся как callback или присваивается переменной — вызов происходит уже без объекта.

```js
const user = {
  name: "Alice",
  greet() {
    console.log(this.name);
  },
};

// Потеря контекста:
const greet = user.greet;
greet(); // undefined — вызов без объекта

setTimeout(user.greet, 100); // undefined — callback без контекста

document.addEventListener("click", user.greet); // undefined

// Способы фикса:

// 1. bind:
const greetBound = user.greet.bind(user);
setTimeout(greetBound, 100); // "Alice"

// 2. Стрелочная функция-обёртка:
setTimeout(() => user.greet(), 100); // "Alice"

// 3. bind прямо в addEventListener:
document.addEventListener("click", user.greet.bind(user));

// 4. В классах — bind в конструкторе или стрелочные поля:
class User {
  name = "Alice";
  greet = () => console.log(this.name); // стрелочное поле, this всегда = экземпляр
}
```

---
