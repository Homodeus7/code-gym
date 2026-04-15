# Блок 4 — Прототипы и ООП

## 🤔 Вопрос 14: Прототипная цепочка

**Вопрос:** Как работает прототипная цепочка?

**Ответ:**

Каждый объект в JS имеет скрытую ссылку `[[Prototype]]` на другой объект (прототип). При обращении к свойству JS сначала ищет его в самом объекте, затем поднимается вверх по цепочке прототипов до `null`.

```js
const animal = {
  breathe() {
    return "breathing";
  },
};

const dog = {
  bark() {
    return "woof";
  },
};

// Устанавливаем прототип:
Object.setPrototypeOf(dog, animal);

dog.bark(); // "woof"    — собственный метод
dog.breathe(); // "breathing" — найден в прототипе animal
dog.toString(); // "[object Object]" — найден в Object.prototype

// Цепочка: dog → animal → Object.prototype → null

// Проверки:
dog.hasOwnProperty("bark"); // true — собственное
dog.hasOwnProperty("breathe"); // false — из прототипа

"bark" in dog; // true (включая прототипы)
"breathe" in dog; // true (включая прототипы)

// Constructor function — классический способ:
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

const cat = new Animal("Cat");
cat.speak(); // "Cat makes a sound"
// cat → Animal.prototype → Object.prototype → null
```

---

## 🤔 Вопрос 15: **proto** vs prototype

**Вопрос:** В чём разница между `__proto__` и `prototype`?

**Ответ:**

- `prototype` — свойство **функций-конструкторов** и классов. Это объект, который станет прототипом для всех экземпляров, созданных через `new`.
- `__proto__` — свойство **экземпляров** (и любых объектов), указывает на прототип конкретного объекта. Устаревший способ доступа к `[[Prototype]]`.

```js
function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function () {
  return "woof";
};

const rex = new Dog("Rex");

// prototype — у функции-конструктора:
console.log(Dog.prototype); // { bark: [Function], constructor: Dog }
console.log(typeof Dog.prototype); // "object"

// __proto__ — у экземпляра:
console.log(rex.__proto__); // { bark: [Function], constructor: Dog }
console.log(rex.__proto__ === Dog.prototype); // true — один и тот же объект!

// Современная альтернатива __proto__:
Object.getPrototypeOf(rex) === Dog.prototype; // true (предпочтительно)

// Схема:
// Dog (функция)    → .prototype → { bark, constructor }
// rex (экземпляр)  → .__proto__ → { bark, constructor }
//                                        ↓
//                              Object.prototype → null

// Не путай:
console.log(rex.prototype); // undefined — у экземпляров нет prototype
console.log(Dog.__proto__); // Function.prototype — Dog сам является объектом
```

---

## 🤔 Вопрос 16: class — синтаксический сахар?

**Вопрос:** `class` в JS — синтаксический сахар или что-то новое?

**Ответ:**

В основе `class` всё ещё лежит прототипная система, поэтому это «синтаксический сахар» над функциями-конструкторами. Но `class` добавляет несколько **поведенческих отличий**, делая его не просто синонимом.

```js
// До ES6:
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `${this.name} speaks`;
};

// ES6 class — то же самое под капотом:
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} speaks`;
  }
}

typeof Animal; // "function" — class IS a function!
```

**Отличия class от функций-конструкторов:**

```js
// 1. Нельзя вызвать без new:
Animal(); // TypeError: Class constructor must be called with 'new'

// 2. Не поднимается (hoisting): класс не доступен до объявления
// new Foo() // ReferenceError
// class Foo {}

// 3. Тело класса всегда в strict mode

// 4. Приватные поля (ES2022) — принципиально новая возможность:
class User {
  #password = "secret"; // настоящий приватный — нельзя получить снаружи

  check(pwd) {
    return pwd === this.#password;
  }
}
const u = new User();
u.#password; // SyntaxError — не доступно снаружи!

// 5. static поля и методы:
class MathUtils {
  static PI = 3.14159;
  static square(x) {
    return x * x;
  }
}
MathUtils.square(4); // 16
```

---
