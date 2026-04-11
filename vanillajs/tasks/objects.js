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
// console.log(a.x); //

// Задача 1.2
// Сделай так, чтобы изменение b.x НЕ влияло на a.x
// const a = { x: 1 };
// const b = ???;
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
const user = { name: "Bob", address: { city: "Moscow" } };
const copy = { ...user };
copy.address.city = "London";
// console.log(user.address.city); // поверхностное - копирует только первый уровень вложенности,

// Задача 2.3
// Напиши функцию shallowClone(obj), которая копирует объект без использования
// spread, Object.assign, JSON и structuredClone — только ручным перебором ключей
// shallowClone({ a: 1, b: 2 }) → { a: 1, b: 2 }
function shallowClone(obj) {
  const result = {};
  for (key in obj) {
    if (Object.hasOwn(obj, key)) {
      result[key] = obj[key];
    }
  }
}

// ── 3. Глубокое копирование (deep copy) ───────────────────────────────────

// Задача 3.1
// Скопируй вложенный объект так, чтобы изменение копии не затронуло оригинал
// const state = { user: { name: "Alice", scores: [10, 20, 30] } };

function deepClone1(obj) {
  // return JSON.parse(JSON.stringify(obj))
  // return structuredClone(obj)
  if (obj === null || typeof obj !== "object") return obj; // 🛑 стоп

  const result = Array.isArray(obj) ? [] : {};

  for (const key of Object.keys(obj)) {
    result[key] = deepClone(obj[key]); // ♻️  вызывает себя
  }

  return result;
}

// Задача 3.2
// JSON.parse(JSON.stringify(obj)) — в чём ограничения этого способа?
// Приведи пример объекта, который этот метод сломает
// const broken = ???;

// Задача 3.3
// Напиши рекурсивную функцию deepClone(obj) которая корректно
// копирует вложенные объекты и массивы
// deepClone({ a: { b: { c: 42 } } }) → новый объект, не связанный с исходным
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  const result = Array.isArray(obj) ? [] : {};

  for (const key of Object.keys(obj)) {
    result[key] = deepClone(obj[key]);
  }
  return result;
}

// ── 4. Слияние объектов (merge) ────────────────────────────────────────────

// Задача 4.1
// Слей два объекта так, чтобы поля второго перезаписали первый
// merge({ a: 1, b: 2 }, { b: 99, c: 3 }) → { a: 1, b: 99, c: 3 }
function merge(obj1, obj2) {
  return { ...obj1, ...obj2 };
  // return Object.assign({}, obj1, obj2)

  // const result = { ...obj1 };
  //   for (const key of Object.keys(obj2)) {
  //     result[key] = obj2[key];
  //   }
  // return result;
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

// ── 9. Агрегация данных из массивов объектов ──────────────────────────────

// Контекст: ты организуешь митапы разработчиков.
// Данные участников:
const developers = [
  {
    firstName: "Noah",
    lastName: "M.",
    country: "Switzerland",
    continent: "Europe",
    age: 19,
    language: "C",
  },
  {
    firstName: "Anna",
    lastName: "R.",
    country: "Liechtenstein",
    continent: "Europe",
    age: 52,
    language: "JavaScript",
  },
  {
    firstName: "Ramon",
    lastName: "R.",
    country: "Paraguay",
    continent: "Americas",
    age: 29,
    language: "Ruby",
  },
  {
    firstName: "George",
    lastName: "B.",
    country: "England",
    continent: "Europe",
    age: 81,
    language: "C",
  },
  {
    firstName: "Lisa",
    lastName: "K.",
    country: "USA",
    continent: "Americas",
    age: 23,
    language: "JavaScript",
  },
  {
    firstName: "Ivan",
    lastName: "P.",
    country: "Russia",
    continent: "Europe",
    age: 35,
    language: "Python",
  },
  {
    firstName: "Mei",
    lastName: "L.",
    country: "China",
    continent: "Asia",
    age: 27,
    language: "Python",
  },
  {
    firstName: "Carlos",
    lastName: "G.",
    country: "Mexico",
    continent: "Americas",
    age: 41,
    language: "Ruby",
  },
];

// Задача 9.1
// Посчитай количество каждого языка программирования среди участников
// countLanguages(developers) → { C: 2, JavaScript: 2, Ruby: 2, Python: 2 }
function countLanguages(list) {
  list.reduce((acc, dev) => {
    acc[dev.language] = (acc[dev.language] || 0) + 1;
    return acc;
  }, {});
}

// Задача 9.2
// Посчитай количество участников с каждого континента
// countContinents(developers) → { Europe: 4, Americas: 3, Asia: 1 }
function countContinents(list) {
  list.reduce((acc, dev) => {
    acc[dev.continent] = (acc[dev.continent] || 0) + 1;
    return acc;
  }, {});
}

// Задача 9.3
// Найди самый популярный язык программирования (тот, у которого count максимальный)
// mostPopularLanguage(developers) → "JavaScript" (или любой другой с max count)
function mostPopularLanguage(list) {
  const counts = list.reduce((acc, dev) => {
    acc[dev.language] = (acc[dev.language] || 0) + 1;
    return acc;
  }, {});
  return Object.keys(counts).reduce((maxLang, lang) => {
    return counts[lang] > counts[maxLang] ? lang : maxLang;
  });
}

function mostPopularLanguage1(list) {
  const counts = list.reduce((acc, dev) => {
    acc[dev.language] = (acc[dev.language] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
}

// Задача 9.4
// Посчитай средний возраст участников по каждому языку
// avgAgeByLanguage(developers) → { C: 50, JavaScript: 37.5, Ruby: 35, Python: 31 }
function avgAgeByLanguage(list) {
  const totals = list.reduce((acc, dev) => {
    if (!acc[dev.language]) {
      acc[dev.language] = { sum: 0, count: 0 };
    }
    acc[dev.language].sum += dev.age;
    acc[dev.language].count += 1;
    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(totals).map(([lang, { sum, count }]) => [lang, sum / count]),
  );
}
// console.log("avgAgeByLanguage", avgAgeByLanguage(developers));

// Задача 9.5 *
// Сгруппируй участников по континентам, но вместо массива объектов
// верни массив имён (firstName) отсортированный по алфавиту
// namesByContinent(developers) →
// {
//   Europe:   ["Anna", "George", "Ivan", "Noah"],
//   Americas: ["Carlos", "Lisa", "Ramon"],
//   Asia:     ["Mei"]
// }
function namesByContinent(list) {
  const grouped = list.reduce((acc, dev) => {
    if (!acc[dev.continent]) {
      acc[dev.continent] = [];
    }
    acc[dev.continent].push(dev.firstName);
    return acc;
  }, {});

  return Object.fromEntries(
    Object.entries(grouped).map(([continent, names]) => [
      continent,
      names.sort(),
    ]),
  );
}

function omit(obj, keys) {
  return Object.fromEntries(
    Object.entries(obj).filter(([k]) => !keys.includes(k)),
  );
}

// console.log("namesByContinent: ", namesByContinent(developers)); // { Europe:[...], Americas:[...], Asia:[...] }

function greetDevelopers(list) {
  return list.map((dev) => ({
    ...dev,
    greeting: `Hi, ${dev.firstName}! What do you like the most about ${dev.language}?`,
  }));
}

// console.log("greetDevelopers: ", greetDevelopers(developers)); // { Europe:[...], Americas:[...], Asia:[...] }

// ── 10. Закрепление: Object.entries / fromEntries / агрегация ─────────────

// Новые данные — заказы в интернет-магазине:
const orders = [
  {
    id: 1,
    customer: "Alice",
    category: "electronics",
    price: 1200,
    status: "delivered",
  },
  { id: 2, customer: "Bob", category: "books", price: 25, status: "pending" },
  {
    id: 3,
    customer: "Alice",
    category: "books",
    price: 40,
    status: "delivered",
  },
  {
    id: 4,
    customer: "Carol",
    category: "electronics",
    price: 850,
    status: "cancelled",
  },
  {
    id: 5,
    customer: "Bob",
    category: "clothes",
    price: 130,
    status: "delivered",
  },
  {
    id: 6,
    customer: "Carol",
    category: "clothes",
    price: 75,
    status: "pending",
  },
  {
    id: 7,
    customer: "Alice",
    category: "electronics",
    price: 300,
    status: "delivered",
  },
  { id: 8, customer: "Bob", category: "books", price: 15, status: "cancelled" },
];

// Задача 10.1
// Посчитай общую сумму заказов по каждой категории
// totalByCategory(orders) → { electronics: 2350, books: 80, clothes: 205 }
function totalByCategory(list) {
  const total = {};
  list.forEach((order) => {
    total[order.category] = (total[order.category] ?? 0) + order.price;
  });
  return total;
}

// Задача 10.2
// Посчитай количество заказов по каждому статусу
// countByStatus(orders) → { delivered: 4, pending: 2, cancelled: 2 }
function countByStatus(list) {
  return list.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] ?? 0) + 1;
    return acc;
  }, {});
}

// Задача 10.3
// Найди категорию с наибольшей суммой заказов
// topCategory(orders) → "electronics"

function topCategory(list) {
  const sums = list.reduce((acc, o) => {
    acc[o.category] = (acc[o.category] ?? 0) + o.price;
    return acc;
  }, {});
  return Object.keys(sums).reduce((topKey, key) => {
    return sums[key] > sums[topKey] ? key : topKey;
  });
}

function topCategoryOld(list) {
  const sums = {};
  for (const { category, price } of list) {
    sums[category] = (sums[price] ?? 0) + price;
  }
  let topKey = null;
  for (const [key, val] of Object.entries(sums)) {
    if (topKey === null || val > sums[topKey]) topKey = key;
  }
  return topKey;
}
console.log("topCategoryOld: ", topCategoryOld(orders));

// Задача 10.4
// Посчитай среднюю стоимость заказа по каждому покупателю
// avgPriceByCustomer(orders) →
// { Alice: 513.33..., Bob: 56.67..., Carol: 462.5 }
function avgPriceByCustomer(list) {
  const sums = list.reduce((acc, o) => {
    if (!acc[o.customer]) acc[o.customer] = { sum: 0, count: 0 };
    acc[o.customer].sum += o.price;
    acc[o.customer].count += 1;
    return acc;
  }, {});
  return Object.fromEntries(
    Object.entries(sums).map(([customer, { sum, count }]) => [
      customer,
      sum / count,
    ]),
  );
}

// Задача 10.5
// Сгруппируй заказы по покупателям — верни объект где значение это
// массив категорий (без дублей), отсортированный по алфавиту
// categoriesByCustomer(orders) →
// {
//   Alice: ["books", "electronics"],
//   Bob:   ["books", "clothes"],
//   Carol: ["clothes", "electronics"]
// }
// { id: 8, customer: "Bob", category: "books", price: 15, status: "cancelled" },

function categoriesByCustomer(list) {
  return list.reduce((acc, o) => {
    if (!acc[o.customer]) acc[o.customer] = [];
    acc[o.customer].push(o.category);
    return acc;
  }, {});
}
function categoriesByCustomerOld(list) {
  const obj = {};
  for (const { customer, category } of list) {
    if (!obj[customer]) obj[customer] = [];
    obj[customer].push(category);
  }
  return obj;
}

// Задача 10.6 *
// Посчитай долю (в процентах) каждого статуса от общего числа заказов
// statusShare(orders) → { delivered: 50, pending: 25, cancelled: 25 }
function statusShare(list) {
  // твой код
}

// ========================================
// Тесты (раскомментируй для проверки)
// ========================================

/*
console.log("=== 2. Shallow copy ===");
console.log(shallowClone({ a: 1, b: 2 })); // { a: 1, b: 2 }

console.log("=== 3. Deep copy ===");
const nested = { a: { b: { c: 42 } } };
const cloned = deepClone(nested);
cloned.a.b.c = 99;
console.log(nested.a.b.c); // 42 (не изменился)

console.log("=== 4. Merge ===");
console.log(merge({ a: 1, b: 2 }, { b: 99, c: 3 })); // { a:1, b:99, c:3 }

console.log("=== 5. Иммутабельные обновления ===");
const user = { id: 1, name: "Alice", age: 30 };
console.log(updateName(user, "Bob"));  // { id:1, name:"Bob", age:30 }
console.log(user.name);               // "Alice"
console.log(omit({ a:1, b:2, c:3 }, "b")); // { a:1, c:3 }

console.log("=== 6. Сравнение ===");
console.log(shallowEqual({ a:1, b:2 }, { a:1, b:2 })); // true
console.log(deepEqual({ x: { y: 1 } }, { x: { y: 1 } })); // true

console.log("=== 7. Трансформация ===");
console.log(flipObject({ a: "x", b: "y" }));          // { x:"a", y:"b" }
console.log(filterObject({ a:1, b:-2, c:3 }, v=>v>0));// { a:1, c:3 }
console.log(mapObject({ a:1, b:2 }, v => v * 10));     // { a:10, b:20 }

console.log("=== 8. keys/values/entries ===");
console.log(sumValues({ a:10, b:20, c:5 }));           // 35
console.log(maxKey({ math:90, english:75, history:88 })); // "math"

console.log("=== 9. Агрегация ===");
console.log(countLanguages(developers));     // { C:2, JavaScript:2, Ruby:2, Python:2 }
console.log(countContinents(developers));    // { Europe:4, Americas:3, Asia:1 }
console.log(mostPopularLanguage(developers)); // любой язык с max count
console.log(avgAgeByLanguage(developers));   // { C:50, JavaScript:37.5, Ruby:35, Python:31 }
console.log(namesByContinent(developers));   // { Europe:[...], Americas:[...], Asia:[...] }
*/
