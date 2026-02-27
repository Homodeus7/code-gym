// ========================================
// ЗАДАЧИ: РЕКУРСИЯ
// ========================================
// Каждая рекурсивная функция ОБЯЗАНА иметь:
// 1. BASE CASE  — условие остановки (без него → бесконечная рекурсия)
// 2. RECURSIVE CASE — вызов себя с более простым/меньшим входом

// ── 1. Числа ────────────────────────────────────────────────────────────────

// Задача 1.1 — Сумма чисел от 1 до n
// sumTo(1) = 1  (базовый случай)
// sumTo(n) = n + sumTo(n - 1)
// sumTo(5) → 15
function sumTo(n) {
  // твой код
}

// Задача 1.2 — Факториал
// factorial(0) = 1  (базовый случай)
// factorial(n) = n * factorial(n - 1)
// factorial(5) → 120
function factorial(n) {
  // твой код
}

// Задача 1.3 — Степень числа (без ** и Math.pow)
// power(base, 0) = 1  (базовый случай)
// power(base, n) = base * power(base, n - 1)
// power(2, 3) → 8
// power(5, 0) → 1
function power(base, exponent) {
  // твой код
}

// Задача 1.4 — Сумма цифр числа
// sumDigits(5) = 5   (базовый: однозначное)
// sumDigits(123) = 3 + sumDigits(12)
// Подсказка: последняя цифра = n % 10, остальные = Math.floor(n / 10)
// sumDigits(123) → 6
// sumDigits(99)  → 18
function sumDigits(n) {
  // твой код
}

// ── 2. Строки и массивы ──────────────────────────────────────────────────────

// Задача 2.1 — Перевернуть строку (без .reverse() и циклов)
// reverseString("") = ""  (базовый)
// reverseString("abc") = reverseString("bc") + "a"
// reverseString("hello") → "olleh"
function reverseString(s) {
  // твой код
}

// Задача 2.2 — Палиндром (рекурсивная проверка, игнорируй регистр)
// isPalindrome("") = true    (базовый)
// isPalindrome("a") = true   (базовый)
// Сравни первый и последний символ, затем проверь середину рекурсивно
// isPalindrome("racecar") → true
// isPalindrome("hello") → false
// isPalindrome("Noon") → true
function isPalindrome(s) {
  // твой код
}

// Задача 2.3 — Сумма элементов массива (без циклов и reduce)
// arraySum([]) = 0  (базовый)
// arraySum([1,2,3]) = 1 + arraySum([2,3])
// arraySum([1, 2, 3, 4, 5]) → 15
function arraySum(arr) {
  // твой код
}

// Задача 2.4 — Разгладить вложенный массив на любую глубину
// flattenDeep([1, [2, [3, [4]]]]) → [1, 2, 3, 4]
function flattenDeep(arr) {
  // твой код
}

// ── 3. Числа Фибоначчи ───────────────────────────────────────────────────────

// Задача 3.1 — Fibonacci БЕЗ мемоизации (медленно! для понимания)
// fib(0) = 0, fib(1) = 1
// fib(n) = fib(n-1) + fib(n-2)
// fib(5) → 5
// ⚠️ fib(40) → очень медленно (2^40 вызовов)!
function fib(n) {
  // твой код
}

// Задача 3.2 — Fibonacci С мемоизацией (быстро!)
// Сохраняй результаты в объект memo чтобы не считать дважды
// fibonacci(0) → 0
// fibonacci(10) → 55
// fibonacci(40) → 102334155 (мгновенно)
function fibonacci(n, memo = {}) {
  // твой код
}

// ── 4. Объекты ───────────────────────────────────────────────────────────────

// Задача 4.1 — Глубокое клонирование объекта рекурсией
// Если примитив → вернуть как есть
// Если массив → рекурсивно клонировать каждый элемент
// Если объект → рекурсивно клонировать каждое свойство
// deepClone({ a: { b: { c: 1 } } }) → новый объект, не связанный с исходным
function deepClone(obj) {
  // твой код
}

// Задача 4.2 — deepFreeze: заморозить объект на всю глубину
// const obj = { a: 1, b: { c: 2 } }
// deepFreeze(obj)
// obj.a = 99        — ничего не произойдёт
// obj.b.c = 99      — ничего не произойдёт
function deepFreeze(obj) {
  // твой код
}

// Задача 4.3 — Подсчёт глубины вложенности объекта
// depth({}) → 1
// depth({ a: 1 }) → 1
// depth({ a: { b: 1 } }) → 2
// depth({ a: { b: { c: { d: 1 } } } }) → 4
function depth(obj) {
  // твой код
}

// ── 5. Деревья ───────────────────────────────────────────────────────────────

// Структура узла: { value, left, right }

// Задача 5.1 — Обход в глубину (DFS pre-order: корень → левый → правый)
// dfsPreOrder(дерево) → [1, 2, 4, 5, 3] для:
//       1
//      / \
//     2   3
//    / \
//   4   5
function dfsPreOrder(root) {
  // твой код
}

// Задача 5.2 — Обход в ширину (BFS, используй очередь — не рекурсию)
// bfs(дерево) → [1, 2, 3, 4, 5]
function bfs(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift();
    result.push(node.value);
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }

  return result;
}

// ── 6. Сложные задачи ────────────────────────────────────────────────────────

// Задача 6.1 * — Генерация скобочных последовательностей
// generateParenthesis(1) → ["()"]
// generateParenthesis(2) → ["(())", "()()"]
// generateParenthesis(3) → ["((()))", "(()())", "(())()", "()(())", "()()()"]
// Подсказка: добавляй "(" если открытых < n, добавляй ")" если закрытых < открытых
function generateParenthesis(n) {
  const result = [];

  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }
    if (open < n) backtrack(current + "(", open + 1, close);
    if (close < open) backtrack(current + ")", open, close + 1);
  }

  backtrack("", 0, 0);
  return result;
}

// Задача 6.2 * — Все перестановки массива
// permutations([1, 2, 3]) → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
function permutations(arr) {
  // твой код
}

// Задача 6.3 * — Все подмножества массива (powerSet)
// powerSet([1, 2]) → [[], [1], [2], [1, 2]]
// powerSet([1, 2, 3]) → 8 подмножеств
function powerSet(arr) {
  // твой код
}

// ========================================
// Тесты (раскомментируй для проверки)
// ========================================

/*
console.log("=== 1. Числа ===");
console.log(sumTo(5));           // 15
console.log(factorial(5));       // 120
console.log(power(2, 3));        // 8
console.log(power(5, 0));        // 1
console.log(sumDigits(123));     // 6
console.log(sumDigits(99));      // 18

console.log("=== 2. Строки и массивы ===");
console.log(reverseString("hello"));   // "olleh"
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("hello"));   // false
console.log(arraySum([1,2,3,4,5]));   // 15
console.log(flattenDeep([1,[2,[3,[4]]]])); // [1,2,3,4]

console.log("=== 3. Fibonacci ===");
console.log(fib(5));          // 5
console.log(fibonacci(0));    // 0
console.log(fibonacci(10));   // 55
console.log(fibonacci(40));   // 102334155

console.log("=== 4. Объекты ===");
const orig = { a: { b: { c: 1 } } };
const clone = deepClone(orig);
clone.a.b.c = 99;
console.log(orig.a.b.c);     // 1 (не изменился)
console.log(depth({}));       // 1
console.log(depth({ a: { b: { c: 1 } } })); // 3

console.log("=== 5. Деревья ===");
const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null },
  },
  right: { value: 3, left: null, right: null },
};
console.log(dfsPreOrder(tree)); // [1, 2, 4, 5, 3]
console.log(bfs(tree));         // [1, 2, 3, 4, 5]

console.log("=== 6. Сложные ===");
console.log(generateParenthesis(2)); // ["(())", "()()"]
console.log(permutations([1,2,3]).length); // 6
console.log(powerSet([1,2]).length);       // 4
*/
