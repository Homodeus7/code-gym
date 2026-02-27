// ========================================
// ЗАДАЧИ: МАССИВЫ
// ========================================

// ── 1. Базовые операции ─────────────────────────────────────────────────────

// Задача 1.1 — Найти максимальный элемент (без Math.max)
// findMax([3, 7, 2, 9, 1]) → 9
function findMax(arr) {
  // твой код
}

// Задача 1.2 — Перевернуть массив (без .reverse())
// reverseArray([1, 2, 3, 4, 5]) → [5, 4, 3, 2, 1]
function reverseArray(arr) {
  // твой код
}

// Задача 1.3 — FizzBuzz
// Верни массив строк от 1 до n:
// кратно 3 → "Fizz", кратно 5 → "Buzz", кратно обоим → "FizzBuzz", иначе → строка числа
// fizzBuzz(5) → ["1", "2", "Fizz", "4", "Buzz"]
function fizzBuzz(n) {
  // твой код
}

// Задача 1.4 — Сумма положительных чисел
// sumPositive([1, -4, 7, 12]) → 20
// sumPositive([-1, -2, -3]) → 0
function sumPositive(arr) {
  // твой код
}

// ── 2. Кастомные методы массивов ────────────────────────────────────────────
// Реализуй методы массива с нуля — это лучший способ понять как они работают

// Задача 2.1 — myMap
// [1, 2, 3].myMap(x => x * 2) → [2, 4, 6]
Array.prototype.myMap = function (callback) {
  // твой код
};

// Задача 2.2 — myFilter
// [1, 2, 3, 4].myFilter(x => x % 2 === 0) → [2, 4]
Array.prototype.myFilter = function (callback) {
  // твой код
};

// Задача 2.3 — myReduce
// [1, 2, 3, 4].myReduce((acc, x) => acc + x, 0) → 10
Array.prototype.myReduce = function (callback, initialValue) {
  // твой код
};

// ── 3. Поиск в массиве ──────────────────────────────────────────────────────

// Задача 3.1 — Все индексы числа
// allIndices([5, 3, 5, 8, 5], 5) → [0, 2, 4]
function allIndices(arr, target) {
  // твой код
}

// Задача 3.2 — Первый дублирующийся элемент
// firstDuplicate([4, 7, 2, 7, 4, 9]) → 4
function firstDuplicate(arr) {
  // твой код
}

// Задача 3.3 — Все дублирующиеся элементы (только первые вхождения)
// findDuplicates([1, 2, 3, 2, 4, 3, 5]) → [2, 3]
function findDuplicates(arr) {
  // твой код
}

// ── 4. Работа с дубликатами ─────────────────────────────────────────────────

// Задача 4.1 — Убрать дубликаты (без Set)
// removeDuplicates([1, 2, 2, 3, 4, 4, 5]) → [1, 2, 3, 4, 5]
function removeDuplicates(arr) {
  // твой код
}

// Задача 4.2 — Оставь каждый элемент не более N раз
// deleteNth([1, 2, 3, 1, 2, 1, 2, 3], 2) → [1, 2, 3, 1, 2, 3]
function deleteNth(arr, n) {
  // твой код
}

// Задача 4.3 — Найди «одинокий» элемент (все остальные встречаются дважды)
// stray([17, 17, 3, 17, 17]) → 3
function stray(numbers) {
  // твой код
}

// ── 5. Трансформация массивов ────────────────────────────────────────────────

// Задача 5.1 — Разбей на чанки равного размера
// chunk([1, 2, 3, 4, 5], 2) → [[1, 2], [3, 4], [5]]
function chunk(arr, size) {
  // твой код
}

// Задача 5.2 — Разгладь массив на один уровень (без .flat())
// flatten([1, [2, 3], 4, [5]]) → [1, 2, 3, 4, 5]
function flatten(arr) {
  // твой код
}

// Задача 5.3 — Скользящее окно
// slidingWindow([1, 2, 3, 4, 5], 3) → [[1,2,3], [2,3,4], [3,4,5]]
// slidingWindow([1, 2], 5) → []
function slidingWindow(arr, size) {
  // твой код
}

// Задача 5.4 — Сгруппируй массив объектов по полю
// groupBy([{role:'dev',name:'Anna'},{role:'qa',name:'Bob'},{role:'dev',name:'Carl'}], 'role')
// → { dev: [{...Anna},{...Carl}], qa: [{...Bob}] }
function groupBy(arr, key) {
  // твой код
}

// ── 6. Подсчёт гласных ──────────────────────────────────────────────────────

// Задача 6.1 — Подсчитай количество гласных (a, e, i, o, u, регистр не важен)
// countVowels("JavaScript") → 3
// countVowels("sky") → 0
function countVowels(s) {
  // твой код
}

// ========================================
// Тесты (раскомментируй для проверки)
// ========================================

/*
console.log("=== 1. Базовые ===");
console.log(findMax([3, 7, 2, 9, 1]));         // 9
console.log(reverseArray([1, 2, 3, 4, 5]));    // [5, 4, 3, 2, 1]
console.log(fizzBuzz(5));                       // ["1", "2", "Fizz", "4", "Buzz"]
console.log(sumPositive([1, -4, 7, 12]));       // 20

console.log("=== 2. Кастомные методы ===");
console.log([1,2,3].myMap(x => x * 2));        // [2, 4, 6]
console.log([1,2,3,4].myFilter(x => x%2===0)); // [2, 4]
console.log([1,2,3,4].myReduce((a,x)=>a+x,0));// 10

console.log("=== 3. Поиск ===");
console.log(allIndices([5,3,5,8,5], 5));        // [0, 2, 4]
console.log(firstDuplicate([4,7,2,7,4,9]));    // 4
console.log(findDuplicates([1,2,3,2,4,3,5])); // [2, 3]

console.log("=== 4. Дубликаты ===");
console.log(removeDuplicates([1,2,2,3,4,4,5]));// [1, 2, 3, 4, 5]
console.log(deleteNth([1,2,3,1,2,1,2,3], 2));  // [1, 2, 3, 1, 2, 3]
console.log(stray([17,17,3,17,17]));            // 3

console.log("=== 5. Трансформация ===");
console.log(chunk([1,2,3,4,5], 2));             // [[1,2],[3,4],[5]]
console.log(flatten([1,[2,3],4,[5]]));          // [1,2,3,4,5]
console.log(slidingWindow([1,2,3,4,5], 3));     // [[1,2,3],[2,3,4],[3,4,5]]
console.log(countVowels("JavaScript"));         // 3
*/
