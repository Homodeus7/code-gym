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
  // твой код
}

// Задача 1.2 — Преобразуй Map обратно в обычный объект
// toObject(new Map([['a', 1], ['b', 2]])) → { a: 1, b: 2 }
function toObject(map) {
  // твой код
}

// Задача 1.3 — Объедини два Map (значения второго перезаписывают первый)
// mergeMaps(Map{a:1,b:2}, Map{b:99,c:3}) → Map{a:1,b:99,c:3}
function mergeMaps(mapA, mapB) {
  // твой код
}

// ── 2. Map как счётчик / хеш-таблица ────────────────────────────────────────

// Задача 2.1 — Счётчик частоты символов
// charFrequency("hello") → Map { 'h'=>1, 'e'=>1, 'l'=>2, 'o'=>1 }
function charFrequency(str) {
  // твой код
}

// Задача 2.2 — Счётчик слов
// wordCount("hello world hello") → Map { 'hello'=>2, 'world'=>1 }
function wordCount(str) {
  // твой код
}

// Задача 2.3 — Two Sum через Map (O(n))
// twoSum([2, 7, 11, 15], 9) → [0, 1]
// twoSum([3, 2, 4], 6) → [1, 2]
function twoSum(nums, target) {
  // твой код
  // Подсказка: для каждого nums[i] проверяй есть ли (target - nums[i]) в Map
}

// Задача 2.4 — Первый уникальный символ
// firstUniqChar("leetcode") → 0   // 'l'
// firstUniqChar("loveleetcode") → 2  // 'v'
// firstUniqChar("aabb") → -1
function firstUniqChar(s) {
  // твой код
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
