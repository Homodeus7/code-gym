// ========================================
// ЗАДАЧИ: СТРОКИ
// ========================================

// ── 1. Поиск в строке ───────────────────────────────────────────────────────

// Задача 1.1 — Найди первое вхождение подстроки (без indexOf/includes)
// strStr("hello", "ll") → 2
// strStr("aaaaa", "bba") → -1
// strStr("", "") → 0
function strStr(haystack, needle) {
  if (needle.length === 0) return 0;

  for (let i = 0; i <= haystack.length - needle.length; i++) {
    if (haystack.slice(i, i + needle.length) === needle) return i;
  }

  return -1;
}

function strStr2(haystack, needle) {
  if (needle.length === 0) return 0;

  for (const [i, char] of [...haystack].entries()) {
    if (char === needle[0] && haystack.slice(i, i + needle.length) === needle)
      return i;
  }

  return -1;
}

// Задача 1.2 — Длина последнего слова
// lengthOfLastWord("Hello World") → 5
// lengthOfLastWord("   fly me   to   the moon  ") → 4
function lengthOfLastWord(s) {
  const last = s.split(" ");

  return last;
}

// console.log(lengthOfLastWord("   fly me   to   the moon  "));
// Задача 1.3 — Самый длинный общий префикс
// longestCommonPrefix(["flower", "flow", "flight"]) → "fl"
// longestCommonPrefix(["dog", "racecar", "car"]) → ""
function longestCommonPrefix(strs) {
  // твой код
}

// ── 2. Проверки ─────────────────────────────────────────────────────────────

// Задача 2.1 — Палиндром (игнорируй регистр и не-буквенно-цифровые символы)
// isPalindrome("A man, a plan, a canal: Panama") → true
// isPalindrome("race a car") → false
// isPalindrome(" ") → true
function isPalindrome(s) {
  // твой код
}

// Задача 2.2 — Анаграмма (одинаковые буквы в другом порядке)
// isAnagram("anagram", "nagaram") → true
// isAnagram("rat", "car") → false
// isAnagram("listen", "silent") → true
function isAnagram(s, t) {
  // твой код
}

// Задача 2.3 — Первый уникальный символ
// firstUniqChar("leetcode") → 0   // 'l' встречается один раз
// firstUniqChar("loveleetcode") → 2  // 'v' первый уникальный
// firstUniqChar("aabb") → -1
function firstUniqChar(s) {
  // твой код
}

// ── 3. Трансформация ────────────────────────────────────────────────────────

// Задача 3.1 — Сжатие строки (подряд идущие одинаковые символы)
// compress("aaabbc") → "a3b2c"
// compress("abc") → "abc"
// compress("aaa") → "a3"
function compress(str) {
  // твой код
}

// Задача 3.2 — Перевернуть строку (без .reverse())
// reverseStr("hello") → "olleh"
function reverseStr(s) {
  // твой код
}

// Задача 3.3 — Удалить пробелы
// removeSpaces("hello world") → "helloworld"
function removeSpaces(str) {
  // твой код
}

// ── 4. Скобки ───────────────────────────────────────────────────────────────

// Задача 4.1 — Валидная скобочная последовательность
// Символы: '(', ')', '{', '}', '[', ']'
// isValid("()[]{}") → true
// isValid("([)]") → false
// isValid("{[]}") → true
// Подсказка: стек (массив)
function isValid(s) {
  // твой код
}

// Задача 4.2 — Скобки с джокером J
// J может быть ( или ) или пустой строкой — заменяем на что угодно
// closed_brackets("(J))") → true    // J → (
// closed_brackets(")(") → false
// closed_brackets("J)(J") → true   // первый J → (, второй J → )
// closed_brackets("") → true
function closed_brackets(str) {
  // твой код
}

// ── 5. Разные строковые задачи ──────────────────────────────────────────────

// Задача 5.1 — Подсчёт гласных (a, e, i, o, u, регистр не важен)
// countVowels("JavaScript") → 3
// countVowels("sky") → 0
function countVowels(s) {
  // твой код
}

// Задача 5.2 — Перевести строку в camelCase
// toCamelCase("hello_world_foo") → "helloWorldFoo"
// toCamelCase("the-stealth-warrior") → "theStealthWarrior"
function toCamelCase(str) {
  // твой код
}

// Задача 5.3 — Перевести строку в snake_case
// toSnakeCase("helloWorldFoo") → "hello_world_foo"
function toSnakeCase(str) {
  // твой код
}

// ========================================
// Тесты (раскомментируй для проверки)
// ========================================

/*
console.log("=== 1. Поиск ===");
console.log(strStr("hello", "ll"));                // 2
console.log(strStr("aaaaa", "bba"));               // -1
console.log(lengthOfLastWord("Hello World"));       // 5
console.log(longestCommonPrefix(["flower","flow","flight"])); // "fl"

console.log("=== 2. Проверки ===");
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car"));           // false
console.log(isAnagram("anagram", "nagaram"));      // true
console.log(isAnagram("rat", "car"));              // false
console.log(firstUniqChar("leetcode"));            // 0
console.log(firstUniqChar("aabb"));                // -1

console.log("=== 3. Трансформация ===");
console.log(compress("aaabbc"));                   // "a3b2c"
console.log(compress("abc"));                      // "abc"
console.log(reverseStr("hello"));                  // "olleh"

console.log("=== 4. Скобки ===");
console.log(isValid("()[]{}")); // true
console.log(isValid("([)]"));   // false
console.log(isValid("{[]}"));   // true
console.log(closed_brackets("(J))"));  // true
console.log(closed_brackets("J)(J"));  // true
console.log(closed_brackets(")("));    // false

console.log("=== 5. Разное ===");
console.log(countVowels("JavaScript")); // 3
console.log(toCamelCase("hello_world_foo")); // "helloWorldFoo"
console.log(toSnakeCase("helloWorldFoo"));   // "hello_world_foo"
*/

function gimme(triplet) {
  const middleItem = [...triplet].sort((a, b) => a - b)[1];

  return triplet.indexOf(middleItem);
}

const sequenceSum = (begin, end, step) => {
  let sum = 0;
  if (begin > end) return 0;
  for (let i = begin; i <= end; i += step) {
    sum += i;
  }
  return sum;
};

var isAnagram = function (test, original) {
  const toSortedWord = (word) => word.split("").sort().join("");
  return toSortedWord(test) === toSortedWord(original);
};
// console.log("isAnagram:", isAnagram("foefet", "toffe"));

function maxProduct(arr) {
  let [max1, max2] = [0, 0];
  for (const n of arr) {
    if (n > max1) [max1, max2] = [n, max1];
    else if (n > max2) max2 = n;
  }
  return max1 * max2;
}

function twoOldestAges(ages) {
  let [max1, max2] = [0, 0];
  for (const age of ages) {
    if (age > max1) [max1, max2] = [age, max1];
    else if (age > max2) max2 = age;
  }
  return [max2, max1];
}

function solve(s) {
  const upper = [...s].filter((el) => el === el.toUpperCase()).length;
  const isLowercase = s.length - upper >= upper;

  return isLowercase ? s.toLowerCase() : s.toUpperCase();
}

// console.log("solve:", solve("coDe"));

const maxMultiple = (divisor, bound) => bound % divisor;

console.log(maxMultiple(10, 55));
