// const arr = [1, 2, 3, 4, 5];

Array.prototype.myMap = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      result[i] = callback(this[i], i, this);
    }
  }
  return result;
};

// const res = arr.myMap((x) => x * 2);

// console.log(res);

Array.prototype.myReduceEasy = function (callback) {
  let accumulator = this[0];

  for (let i = 1; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let startIndex;
  let accumulator;

  if (initialValue === undefined) {
    accumulator = this[0];
    startIndex = 1;
  } else {
    accumulator = initialValue;
    startIndex = 0;
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

const answ = [5, 2, 9, 1].myReduce((acc, x) => acc + x, 10);

// console.log(answ);

Array.prototype.myFilter = function (callback) {
  if (typeof callback !== "function") {
    throw new TypeError("Callback must be a function");
  }
  const result = [];

  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

// this.name = "pipia";

// let obj = {
//   name: "Alice",
//   sayHi: function () {
//     setTimeout(() => {
//       console.log(this.name);
//     }, 1000);
//   },
// };

// obj.sayHi();

const isUndefined = (value) => value === undefined;

// console.log(obj.length);

// ========================================
// ЗАДАЧИ НА WHILE ЦИКЛЫ
// ========================================

// === 1. БАЗОВЫЕ ЗАДАЧИ ===

// Задача 1: Посчитать от 1 до 10
// Напиши функцию, которая выводит числа от 1 до 10
function countTo10() {
  let i = 0;
  while (i <= 10) {
    // console.log(i);
    i++;
  }
}

// Задача 2: Сумма чисел от 1 до n
// Вычисли сумму чисел от 1 до n
// Например: sumTo(5) → 1+2+3+4+5 = 15
function sumTo(n) {
  let i = 1;
  while (i <= n) {
    // console.log(i);
    i++;
  }
}

// Задача 3: Факториал
// Вычисли факториал числа
// factorial(5) → 5*4*3*2*1 = 120
function factorial(n) {
  let i = 1;
  let result = 1;
  while (i <= n) {
    result *= i;
    i++;
  }
  return result;
}

// === 2. РАБОТА СО СТРОКАМИ ===

// Задача 4: Реверс строки
// Переверни строку задом наперёд
// reverseString("hello") → "olleh"
function reverseString(str) {
  let i = str.length - 1;
  let result = "";
  while (i >= 0) {
    result += str[i];
    i--;
  }
  return result;
}
// console.log(reverseString("hello"));
// Задача 5: Удалить пробелы
// Удали все пробелы из строки
// removeSpaces("hello world") → "helloworld"
function removeSpaces(str) {
  let i = 0;
  let result = "";
  while (i < str.length) {
    if (str[i] !== " ") {
      result += str[i];
    }
    i++;
  }
  return result;
}
// console.log(removeSpaces("hello world"));
// === 3. РАБОТА С МАССИВАМИ ===

// Задача 6: Найти максимум в массиве
// Найди максимальное число в массиве (БЕЗ Math.max)
// findMax([3, 7, 2, 9, 1]) → 9
function findMax(arr) {
  let i = 1;
  let max = arr[0];
  while (i < arr.length) {
    if (arr[i] > max) {
      max = arr[i];
    }
    i++;
  }
  return max;
}
// console.log(findMax([3, 7, 2, 9, 1]));
// Задача 7: Посчитать чётные числа
// Посчитай сколько чётных чисел в массиве
// countEven([1, 2, 3, 4, 5, 6]) → 3
function countEven(arr) {
  let i = 0,
    count = 0;
  while (i < arr.length) {
    arr[i] % 2 === 0 && count++;
    i++;
  }
  return count;
}
// console.log(countEven([1, 2, 3, 4, 5, 6]));

// === 4. РАБОТА С ОБЪЕКТАМИ (связные списки) ===

// Задача 8: Длина списка
// Найди длину связного списка
// const list = { value: 1, next: { value: 2, next: { value: 3, next: null }}};
// getLength(list) → 3
function getLength(obj) {
  let count = 0;
  let current = obj;
  while (current !== null) {
    count++;
    current = current.next;
  }
  return count;
}
const list = { value: 1, next: { value: 2, next: { value: 3, next: null } } };
//
// console.log(getLength(list));
// Задача 9: Сумма значений в списке
// Найди сумму всех значений в связном списке
// sumList(list) → 1+2+3 = 6
function sumList(obj) {
  let sum = 0;
  let current = obj;
  while (current !== null) {
    sum += current.value;
    current = current.next;
  }
  return sum;
}

// console.log(sumList(list));

// Задача 10: Найти элемент по индексу
// Найди значение по индексу в связном списке
// getValueAt(list, 1) → 2
function getValueAt(obj, index) {
  let current = obj;
  let i = 0;
  while (current !== null) {
    if (i === index) {
      return current.value;
    }
    current = current.next;
    i++;
  }
  return undefined;
}
// console.log(getValueAt(list, 1));
// === 5. СЛОЖНЫЕ ЗАДАЧИ ===

// Задача 11: Число Фибоначчи
// Найди n-е число Фибоначчи
// fibonacci(7) → 13 (последовательность: 0,1,1,2,3,5,8,13...)
function fibonacci(n) {
  let sum = 0;
  let;
}

// Задача 12: Степень числа
// Возведи число в степень БЕЗ оператора **
// power(2, 5) → 32
function power(base, exponent) {
  let i = 1;
  let result = base;
  while (i < exponent) {
    result *= base;
    i++;
  }
  return result;
}
// console.log(power(2, 5));

// ========================================
// ПОДСКАЗКИ:
// ========================================
// Структура while:
// let i = 0;              // 1. Инициализация счётчика
// while (i < 10) {        // 2. Условие продолжения
//   console.log(i);       // 3. Действие
//   i++;                  // 4. Изменение счётчика (важно!)
// }
//
// Частые ошибки:
// ❌ Забыть изменить счётчик → бесконечный цикл
// ❌ Неправильное условие выхода
// ✅ Всегда проверяй, что цикл когда-нибудь остановится

// Array.prototype.remove_ = function (values_list) {
//   const result = [];
//   for (let i = 0; i < this.length; i++) {
//     if (!values_list.includes(this[i])) {
//       result.push(this[i]);
//     }
//   }
//   return result;
// };

// const arr = [1, 1, 2, 3, 1, 2, 3, 4];

// console.log(arr.remove_([1, 3]));

// Enough is enough!
function deleteNth(list, n) {
  const counts = {};
  const result = [];

  for (let i = 0; i < list.length; i++) {
    const el = list[i];
    counts[el] = (counts[el] || 0) + 1;

    if (counts[el] <= n) {
      result.push(el);
    }
  }

  return result;
}

// console.log(deleteNth([1, 2, 3, 1, 2, 1, 2, 3], 2)); // [1,2,3,1,2,3]
// console.log(deleteNth([20, 37, 20, 21], 1)); // [20,37,21]

// const node = $('js-node');
// node
//   .addClass('node')
//   •toggleClass('item')
//   • removeClass('node')
//   .css({color: 'red', paddingTop: "10px'})
//   .html('<li>hello</li>');|

const numbers = [17, 17, 3, 17, 17, 17, 17];

function stray(numbers) {
  return numbers.find((num, index) => {
    // массив без текущего элемента
    const withoutCurrent = numbers.filter((_, i) => i !== index);
    // если его нет в остальных — оно уникальное
    return !withoutCurrent.includes(num);
  });
}

// console.log(stray(numbers));

// ==============================
// Задачки: find, indexOf, lastIndexOf
// ==============================

// --- find ---

// 1. Найди первое чётное число в массиве
// ожидается: 4
const nums1 = [3, 7, 4, 9, 2, 11];

// console.log(nums1.find((n) => n % 2 === 0));

// 2. Найди первого пользователя старше 25 лет
// ожидается: { name: "Bob", age: 28 }
const users = [
  { name: "Alice", age: 22 },
  { name: "Bob", age: 28 },
  { name: "Carl", age: 31 },
];

// console.log(users.find((u) => u.age > 25));

// 3. Найди первое число больше 100, если таких нет — выведи "не найдено"
// ожидается: "не найдено"
const nums3 = [10, 50, 80, 99];

const result = nums3.find((n) => n > 100);

// console.log(result ?? "не найдено");

// --- indexOf ---

// 4. Найди на какой позиции стоит число 7
// ожидается: 2
const nums4 = [3, 5, 7, 9, 11];

// console.log(nums4.findIndex((n) => n === 7));

// 5. Проверь есть ли слово "banana" в массиве (без includes)
// ожидается: true
const fruits = ["apple", "mango", "banana", "grape"];

// console.log(fruits.indexOf("banana") !== -1);

// 6. Найди все индексы числа 5 в массиве
// ожидается: [0, 2, 4]
const nums6 = [5, 3, 5, 8, 5];

const result1 = nums6.reduce((acc, n, index) => {
  if (n === 5) acc.push(index);
  return acc;
}, []);

// console.log(result1);
// --- lastIndexOf ---

// 7. Найди индекс последнего вхождения числа 9
// ожидается: 5
const nums7 = [9, 3, 7, 9, 2, 9, 1];

// console.log(nums7.lastIndexOf(9));

// 8. Определи — встречается ли число 4 больше одного раза
// ожидается: true
const nums8 = [1, 4, 7, 4, 9];

// console.log(nums8.indexOf(4) !== nums8.lastIndexOf(4));
// console.log(nums8.filter((n) => n === 4).length > 1);

// --- Комбо ---

// 9. Найди все дублирующиеся числа в массиве
// ожидается: [2, 3]
const nums9 = [1, 2, 3, 2, 4, 3, 5];

const result2 = nums9.filter((n, index) => {
  return (
    nums9.indexOf(n) !== nums9.lastIndexOf(n) && // дубликат
    nums9.indexOf(n) === index // берём только первое вхождение
  );
});

// console.log("nums9", result2);

// 10. Найди первый элемент который встречается более одного раза
// ожидается: 4
const nums10 = [4, 7, 2, 7, 4, 9];

// console.log(
//   nums10.find((num) => nums10.indexOf(num) !== nums10.lastIndexOf(num)),
// );

// console.log(nums10.find((num) => nums10.filter((n) => n === num).length > 1));

// closed_brackets("(J))") ➞ True
// # J can be replaced with (

// closed_brackets("(") ➞ False
// # Unbalanced open bracket.

// closed_brackets("") ➞ True
// # Empty string is a valid sequence.

// closed_brackets("()J(") ➞ False
// # Not possible to balance the brackets.

// closed_brackets("J") ➞ True
// # J can be replaced with an empty string.

// closed_brackets(")(") ➞ False
// # Numbers of ( and ) are the same but they are in the wrong places.

// closed_brackets("J)(J") ➞ True
// # First 'J' can be replaced with '(' and second with ')'

// closed_brackets("()") ➞ True
// # A proper sequence of balanced brackets.

function closed_brackets(str) {
  let min = 0;
  let max = 0;

  for (const ch of str) {
    if (ch === "(") {
      min++;
      max++;
    } else if (ch === ")") {
      min--;
      max--;
    } else {
      min--;
      max++; // J — расширяет диапазон
    }

    if (max < 0) return false; // слишком много ) даже в лучшем случае
    min = Math.max(0, min); // не может быть отрицательным
  }

  return min === 0; // можно закрыть все скобки
}
// console.log(closed_brackets("J)(J"));

// ========================================
// ЗАДАЧИ: КОПИРОВАНИЕ И РАБОТА С ОБЪЕКТАМИ
// ========================================

// ── 1. Ссылки vs значения ──────────────────────────────────────────────────

//   │ number, string, boolean │ само значение   │ копируется значение │
//   ├─────────────────────────┼─────────────────┼─────────────────────┤
//   │ object, array, function │ адрес (ссылка)  │ копируется адрес    │

// Задача 1.1
// Что выведет код? Объясни почему.
// const a = { x: 1 };
// const b = a;
// b.x = 99;
// console.log(a.x); // ?

// Задача 1.2
// Сделай так, чтобы изменение b.x НЕ влияло на a.x
// const a = { x: 1 };
// const b = { ...a };
// b.x = 99;
// console.log(a.x); // должно быть 1

// ── 2. Поверхностное копирование (shallow copy) ────────────────────────────

// Задача 2.1
// Скопируй объект тремя способами: Object.assign, spread, Object.fromEntries
const original = { name: "Alice", age: 25 };

// Способ 1: Object.assign
const copy1 = Object.assign({}, original);

// Способ 2: spread
const copy2 = { ...original };

// Способ 3: Object.fromEntries
const copy3 = Object.fromEntries(Object.entries(original));

// Задача 2.2
// Что выведет код? Почему "вложенный" объект всё равно мутировался?
// const user = { name: "Bob", address: { city: "Moscow" } };
// const copy = { ...user };
// copy.address.city = "London";
// console.log(user.address.city); ответ: при поверхностном копировании мы все равно ссылаемся на оринанальный обьект

// Задача 2.3
// Напиши функцию shallowClone(obj), которая копирует объект без использования
// spread, Object.assign, JSON и structuredClone — только ручным перебором ключей
// shallowClone({ a: 1, b: 2 }) → { a: 1, b: 2 }
function shallowClone(obj) {
  const result = {};
  for (key in obl) {
    if (Object.hasOwn(obj, key)) {
      result[key] = obl[key];
    }
  }
  return result;
}

// ── 3. Глубокое копирование (deep copy) ───────────────────────────────────

// Задача 3.1
// Скопируй вложенный объект так, чтобы изменение копии не затронуло оригинал
// const state = { user: { name: "Alice", scores: [10, 20, 30] } };

// Задача 3.2
// JSON.parse(JSON.stringify(obj)) — в чём ограничения этого способа?
// Приведи пример объекта, который этот метод сломает
// const broken = ???;

// Задача 3.3
// Напиши рекурсивную функцию deepClone(obj) которая корректно
// копирует вложенные объекты и массивы
// deepClone({ a: { b: { c: 42 } } }) → новый объект, не связанный с исходным
function deepClone(obj) {
  // твой код
}

// ── 4. Слияние объектов (merge) ────────────────────────────────────────────

// Задача 4.1
// Слей два объекта так, чтобы поля второго перезаписали первый
// merge({ a: 1, b: 2 }, { b: 99, c: 3 }) → { a: 1, b: 99, c: 3 }
function merge(obj1, obj2) {
  // твой код
}

// Задача 4.2
// Напиши deepMerge — рекурсивное слияние вложенных объектов
// deepMerge(
//   { user: { name: "Alice", role: "user" } },
//   { user: { role: "admin" }, theme: "dark" }
// ) → { user: { name: "Alice", role: "admin" }, theme: "dark" }
function deepMerge(obj1, obj2) {
  // твой код
}

// ── 5. Иммутабельные обновления ────────────────────────────────────────────

// Задача 5.1
// Обнови поле name у объекта user НЕ мутируя оригинал
// const user = { id: 1, name: "Alice", age: 30 };
// updateName(user, "Bob") → { id: 1, name: "Bob", age: 30 }
// и user.name всё ещё "Alice"
function updateName(user, newName) {
  // твой код
}

// Задача 5.2
// Добавь элемент в массив scores без мутации оригинального объекта
// const state = { user: "Alice", scores: [10, 20] };
// addScore(state, 30) → { user: "Alice", scores: [10, 20, 30] }
// state.scores.length должно остаться 2
function addScore(state, score) {
  // твой код
}

// Задача 5.3
// Удали ключ из объекта без мутации (не используй delete)
// omit({ a: 1, b: 2, c: 3 }, "b") → { a: 1, c: 3 }
function omit(obj, key) {
  // твой код
}

// ── 6. Сравнение объектов ──────────────────────────────────────────────────

// Задача 6.1
// Почему это false? Как сравнить два объекта по содержимому?
// console.log({ a: 1 } === { a: 1 }); // false

// Задача 6.2
// Напиши функцию shallowEqual(a, b) — поверхностное сравнение двух объектов
// shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2 }) → true
// shallowEqual({ a: 1 }, { a: 2 }) → false
function shallowEqual(a, b) {
  // твой код
}

// Задача 6.3 *
// Напиши deepEqual(a, b) — глубокое сравнение вложенных объектов и массивов
// deepEqual({ x: { y: 1 } }, { x: { y: 1 } }) → true
// deepEqual({ x: [1, 2] }, { x: [1, 3] }) → false
function deepEqual(a, b) {
  // твой код
}

// ── 7. Трансформация объектов ──────────────────────────────────────────────

// Задача 7.1
// Разверни объект — поменяй ключи и значения местами
// flipObject({ a: "x", b: "y" }) → { x: "a", y: "b" }
function flipObject(obj) {
  // твой код
}

// Задача 7.2
// Отфильтруй объект — оставь только те поля, которые прошли предикат
// filterObject({ a: 1, b: -2, c: 3, d: -4 }, v => v > 0) → { a: 1, c: 3 }
function filterObject(obj, predicate) {
  // твой код
}

// Задача 7.3
// Примени функцию к каждому значению объекта (как map, но для объекта)
// mapObject({ a: 1, b: 2, c: 3 }, v => v * 10) → { a: 10, b: 20, c: 30 }
function mapObject(obj, fn) {
  // твой код
}

// ── 8. Object.keys / values / entries ─────────────────────────────────────

// Задача 8.1
// Посчитай сумму всех значений в объекте
// sumValues({ a: 10, b: 20, c: 5 }) → 35
function sumValues(obj) {
  // твой код
}

// Задача 8.2
// Найди ключ с максимальным значением
// maxKey({ math: 90, english: 75, history: 88 }) → "math"
function maxKey(obj) {
  // твой код
}

// Задача 8.3
// Сгруппируй массив объектов по полю (без lodash)
// groupBy([
//   { name: "Alice", role: "admin" },
//   { name: "Bob", role: "user" },
//   { name: "Carol", role: "admin" },
// ], "role")
// → { admin: [{...Alice}, {...Carol}], user: [{...Bob}] }
function groupBy(arr, key) {
  // твой код
}
// function A() {}
// const a = new A();

// A.prototype.sayHi = function () {
//   return "hi";
// };

// console.log(a.sayHi());

function nbDig(n, d) {
  return Array.from({ length: n + 1 }, (_, i) => i ** 2)
    .join("")
    .split("")
    .filter((el) => el == d).length;
}


