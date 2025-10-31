/**
 * DAY 3: Hash Tables (Объекты и Map)
 * Уровень: Легкий-Средний
 */

/**
 * Задача 1: Two Sum
 *
 * Дан массив чисел и целевое число target.
 * Верните индексы двух чисел, которые в сумме дают target.
 * Можно предположить, что всегда есть ровно одно решение.
 *
 * Примеры:
 * twoSum([2, 7, 11, 15], 9) → [0, 1]
 * twoSum([3, 2, 4], 6) → [1, 2]
 * twoSum([3, 3], 6) → [0, 1]
 *
 * Ограничения:
 * - 2 <= nums.length <= 10^4
 * - -10^9 <= nums[i] <= 10^9
 * - -10^9 <= target <= 10^9
 * - Только одно корректное решение
 *
 * Подсказка: Используйте hash table для O(n) решения
 */
function twoSum(nums: number[], target: number): number[] {
  // Ваше решение здесь
  return [];
}

/**
 * Задача 2: Первый уникальный символ
 *
 * Дана строка. Найдите индекс первого неповторяющегося символа.
 * Если такого нет, верните -1.
 *
 * Примеры:
 * firstUniqChar("leetcode") → 0  // 'l' встречается один раз
 * firstUniqChar("loveleetcode") → 2  // 'v' первый уникальный
 * firstUniqChar("aabb") → -1
 *
 * Ограничения:
 * - 1 <= s.length <= 10^5
 * - s состоит только из английских букв в нижнем регистре
 */
function firstUniqChar(s: string): number {
  // Ваше решение здесь
  return 0;
}

/**
 * Задача 3: Проверить анаграммы
 *
 * Даны две строки s и t.
 * Верните true, если t является анаграммой s, иначе false.
 * Анаграмма - слово, составленное перестановкой букв другого слова.
 *
 * Примеры:
 * isAnagram("anagram", "nagaram") → true
 * isAnagram("rat", "car") → false
 * isAnagram("listen", "silent") → true
 *
 * Ограничения:
 * - 1 <= s.length, t.length <= 5 * 10^4
 * - s и t состоят из английских букв в нижнем регистре
 */
function isAnagram(s: string, t: string): boolean {
  // Ваше решение здесь
  return false;
}

/**
 * Задача 4: Содержит дубликат
 *
 * Дан массив чисел.
 * Верните true, если любое значение появляется как минимум дважды.
 * Верните false, если все элементы уникальны.
 *
 * Примеры:
 * containsDuplicate([1, 2, 3, 1]) → true
 * containsDuplicate([1, 2, 3, 4]) → false
 * containsDuplicate([1, 1, 1, 3, 3, 4, 3, 2, 4, 2]) → true
 *
 * Ограничения:
 * - 1 <= nums.length <= 10^5
 * - -10^9 <= nums[i] <= 10^9
 */
function containsDuplicate(nums: number[]): boolean {
  // Ваше решение здесь
  return false;
}

// ========================================
// Тесты (раскомментируйте для проверки)
// ========================================

/*
console.log("=== Задача 1: Two Sum ===");
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6)); // [1, 2]
console.log(twoSum([3, 3], 6)); // [0, 1]

console.log("\n=== Задача 2: Первый уникальный символ ===");
console.log(firstUniqChar("leetcode")); // 0
console.log(firstUniqChar("loveleetcode")); // 2
console.log(firstUniqChar("aabb")); // -1

console.log("\n=== Задача 3: Анаграммы ===");
console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
console.log(isAnagram("listen", "silent")); // true

console.log("\n=== Задача 4: Содержит дубликат ===");
console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
*/
