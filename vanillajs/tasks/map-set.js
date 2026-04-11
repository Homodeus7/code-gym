// ========================================
// ЗАДАЧИ: Map и Set
// ========================================
// Map  — как объект, но ключом может быть любой тип, сохраняет порядок вставки
// Set  — коллекция уникальных значений
// Когда Map лучше Object: ключи — не строки, частые добавления/удаления, порядок важен

// ── 1. Map: базовые операции ────────────────────────────────────────────────

// Задача 1.1 — Создай Map из объекта
// fromObject({ a: 1, b: 2 }) → Map { 'a' => 1, 'b' => 2 }
function fromObject(obj) {
  return new Map(obj);
}

// Задача 1.2 — Преобразуй Map обратно в обычный объект
// toObject(new Map([['a', 1], ['b', 2]])) → { a: 1, b: 2 }
function toObject(map) {
  return Object.fromEntries(map);
}

// Задача 1.3 — Объедини два Map (значения второго перезаписывают первый)
// mergeMaps(Map{a:1,b:2}, Map{b:99,c:3}) → Map{a:1,b:99,c:3}
function mergeMaps(mapA, mapB) {
  const result = new Map(mapA);
  for (const [k, v] of mapB) {
    result.set(k, v);
  }
  return result;
}

const mapA = new Map(Object.entries({ a: 1, b: 2 }));
const mapB = new Map(Object.entries({ b: 99, c: 3 }));

// console.log(mergeMaps(mapA, mapB));
// ── 2. Map как счётчик / хеш-таблица ────────────────────────────────────────

// Задача 2.1 — Счётчик частоты символов
// charFrequency("hello") → Map { 'h'=>1, 'e'=>1, 'l'=>2, 'o'=>1 }
function charFrequency(str) {
  const map = new Map();
  for (const char of str) {
    map.set(char, (map.get() ?? 0) + 1);
  }
  return map;
}

// Задача 2.2 — Счётчик слова
// wordCount("hello world hello") → Map { 'hello'=>2, 'world'=>1 }
function wordCount(str) {
  const map = new Map();
  const arr = str.split(" ");
  for (const word of arr) {
    map.set(word, (map.get(word) ?? 0) + 1);
  }
  return map;
}

// console.log(wordCount("hello world hello"));

// Задача 2.3 — Two Sum через Map (O(n))
// twoSum([2, 7, 11, 15], 9) → [0, 1]
// twoSum([3, 2, 4], 6) → [1, 2]
function twoSum(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }

    seen.set(nums[i], i);
  }
}

// Задача A — Разогрев (проще чем twoSum)
// Есть ли хоть одна пара с нужной суммой? Вернуть true/false
// hasPair([2, 7, 11, 15], 9)  → true
// hasPair([1, 2, 3], 10)      → false
function hasPair(nums, target) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (seen.has(complement)) {
      return true;
    }
    seen.set(nums[i], i);
  }
  return false;
}

// Задача B — Чуть сложнее
// Найти пару ЗНАЧЕНИЙ (не индексов), которые дают target
// findPair([2, 7, 11, 15], 9)  → [2, 7]
// findPair([3, 2, 4], 6)       → [2, 4]
function findPair(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) {
      return [complement, nums[i]];
    }
    seen.set(nums[i], i);
  }
}

// console.log(findPair([2, 7, 11, 15], 9));

// Задача C — Разность вместо суммы
// Найти два индекса где nums[j] - nums[i] = k (j > i)
// hasDiff([1, 5, 3, 4], 4)  → true   // 5 - 1 = 4
// hasDiff([1, 2, 3], 10)    → false
function hasDiff(nums, k) {
  const seen = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = nums[i] - k;
    if (seen.has(complement)) {
      return [seen.get(complement), i];
    }
    seen.set(nums[i], i);
  }
}
console.log(hasDiff([1, 5, 3, 4], 4));

//  Задача D — Посчитать все пары
// Сколько пар дают target? (каждая пара считается один раз)
// countPairs([1, 5, 3, 4, 2], 6)  → 2   // [1,5] и [2,4]
// countPairs([1, 1, 1], 2)        → 3   // [0,1],[0,2],[1,2]
function countPairs(nums, target) {
  const map = new Map();
  let count = 0;
  for (const num of nums) {
    const complement = target - num;
    if (map.has(complement)) {
      count += map.get(complement);
    }
    map.set(num, map.get(num ?? 0) + 1);
  }
  return count;
}

// Задача 2.4 — Первый уникальный символ
// firstUniqChar("leetcode") → 0   // 'l'
// firstUniqChar("loveleetcode") → 2  // 'v'
// firstUniqChar("aabb") → -1
function firstUniqChar(s) {
  const freq = new Map();

  for (const char in s) {
    freq.set(char, (freq.get(char) ?? 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }
  return -1;
}

// Задача 2.5 — Проверить анаграммы через Map
// isAnagram("anagram", "nagaram") → true
// isAnagram("rat", "car") → false
function isAnagram(s, t) {
  // твой код
}

// Задача 2.6 — Группировка анаграмм
// groupAnagrams(["eat","tea","tan","ate","nat","bat"])
// → [["eat","tea","ate"], ["tan","nat"], ["bat"]]
// Подсказка: ключ Map — отсортированная строка ("eat" → "aet")
function groupAnagrams(strs) {
  // твой код
}

// ── 3. Set: базовые операции ────────────────────────────────────────────────

// Задача 3.1 — Убрать дубликаты через Set (одна строка)
// unique([1, 2, 2, 3, 4, 4]) → [1, 2, 3, 4]
function unique(arr) {
  // твой код
}

// Задача 3.2 — Проверить наличие дубликатов через Set
// containsDuplicate([1, 2, 3, 1]) → true
// containsDuplicate([1, 2, 3, 4]) → false
function containsDuplicate(nums) {
  // твой код
}

// Задача 3.3 — Размер Set без дубликатов
// Сколько уникальных символов в строке?
// uniqueCharCount("hello") → 4  (h, e, l, o)
function uniqueCharCount(str) {
  // твой код
}

// ── 4. Set: операции над множествами ────────────────────────────────────────

// Задача 4.1 — Объединение (все уникальные элементы из обоих массивов)
// union([1, 2, 3], [2, 3, 4]) → [1, 2, 3, 4]
function union(a, b) {
  // твой код
}

// Задача 4.2 — Пересечение (только общие элементы)
// intersection([1, 2, 3], [2, 3, 4]) → [2, 3]
function intersection(a, b) {
  // твой код
}

// Задача 4.3 — Разность (элементы первого, которых нет во втором)
// difference([1, 2, 3], [2, 3, 4]) → [1]
function difference(a, b) {
  // твой код
}

// Задача 4.4 — Симметричная разность (есть в одном, но не в обоих)
// symmetricDiff([1, 2, 3], [2, 3, 4]) → [1, 4]
function symmetricDiff(a, b) {
  // твой код
}

// Задача 4.5 — Пересечение массивов с учётом кратности (не Set, а Map)
// intersectCounts([1, 2, 2, 1], [2, 2]) → [2, 2]
// intersectCounts([4, 9, 5], [9, 4, 9, 8, 4]) → [4, 9]
function intersectCounts(nums1, nums2) {
  // твой код
}

// ── 5. Паттерны с Map ───────────────────────────────────────────────────────

// Задача 5.1 — Мемоизация через Map
// memoize(fn) — возвращает кешированную версию fn
// Если аргумент уже вычислялся — вернуть из кеша без повторного вызова
// const slowDouble = x => { /* тяжёлые вычисления */ return x * 2 }
// const fastDouble = memoize(slowDouble)
// fastDouble(5) → 10  (вычислено)
// fastDouble(5) → 10  (из кеша, fn не вызвана)
function memoize(fn) {
  // твой код
}

// Задача 5.2 — LRU-кэш ограниченного размера
// Map хранит порядок вставки → самый старый элемент удаляем при переполнении
// const cache = createLRUCache(2)
// cache.set('a', 1); cache.set('b', 2)
// cache.get('a')      → 1
// cache.set('c', 3)   → удалит 'b' (самый давний)
// cache.get('b')      → undefined
function createLRUCache(maxSize) {
  // твой код
}

// ── 6. WeakMap и WeakSet (концептуальные вопросы) ───────────────────────────

// Задача 6.1 — Приватные данные через WeakMap
// WeakMap не удерживает объект от сборки мусора — ключи только объекты
// Реализуй паттерн "приватные поля" без # через WeakMap
// const counter = createPrivateCounter()
// counter.increment(); counter.increment()
// counter.value() → 2
function createPrivateCounter() {
  const _private = new WeakMap();

  function Counter() {
    _private.set(this, { count: 0 });
  }

  Counter.prototype.increment = function () {
    _private.get(this).count++;
  };
  Counter.prototype.value = function () {
    return _private.get(this).count;
  };

  return new Counter();
}

// ========================================
// Тесты (раскомментируй для проверки)
// ========================================

/*
console.log("=== 1. Map базовые ===");
console.log(fromObject({ a: 1, b: 2 }));    // Map { 'a' => 1, 'b' => 2 }
console.log(toObject(new Map([['a',1],['b',2]]))); // { a: 1, b: 2 }

console.log("=== 2. Map как счётчик ===");
console.log(charFrequency("hello"));         // Map { h:1, e:1, l:2, o:1 }
console.log(wordCount("hello world hello")); // Map { hello:2, world:1 }
console.log(twoSum([2,7,11,15], 9));         // [0, 1]
console.log(firstUniqChar("leetcode"));      // 0
console.log(isAnagram("anagram","nagaram")); // true
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));

console.log("=== 3. Set базовые ===");
console.log(unique([1,2,2,3,4,4]));          // [1, 2, 3, 4]
console.log(containsDuplicate([1,2,3,1]));   // true
console.log(uniqueCharCount("hello"));       // 4

console.log("=== 4. Операции над множествами ===");
console.log(union([1,2,3],[2,3,4]));         // [1,2,3,4]
console.log(intersection([1,2,3],[2,3,4]));  // [2,3]
console.log(difference([1,2,3],[2,3,4]));    // [1]
console.log(symmetricDiff([1,2,3],[2,3,4]));// [1,4]
console.log(intersectCounts([1,2,2,1],[2,2])); // [2,2]

console.log("=== 5. Паттерны ===");
const doubled = memoize(x => { console.log('computed'); return x * 2; });
doubled(5); // computed → 10
doubled(5); // (из кеша) → 10
*/

const n = 1;
