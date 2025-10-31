/**
 * DAY 1: Основы работы с массивами и строками
 * Уровень: Очень легкий
 */

/**
 * Задача 1: Найти максимальное число в массиве
 *
 * Дан массив чисел. Верните максимальное число.
 *
 * Примеры:
 * findMax([1, 5, 3, 9, 2]) → 9
 * findMax([-1, -5, -3]) → -1
 * findMax([42]) → 42
 *
 * Ограничения:
 * - 1 <= arr.length <= 1000
 * - -10^4 <= arr[i] <= 10^4
 */
// function findMax(arr: number[]): number {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr.length; j++) {
//       if (arr[i] < arr[j]) {
//         arr[i] = arr[j];
//         arr[j] = arr[i];
//       }
//     }
//   }
//   return arr[arr.length - 1];
// }
/**
 * Задача 2: Подсчитать количество гласных в строке
 *
 * Дана строка. Посчитайте количество гласных букв (a, e, i, o, u).
 * Регистр не важен.
 *
 * Примеры:
 * countVowels("hello") → 2
 * countVowels("sky") → 0
 * countVowels("AEIOU") → 5
 * countVowels("JavaScript") → 3
 *
 * Ограничения:
 * - 0 <= s.length <= 1000
 * - s состоит только из английских букв
 */
// function countVowels(s: string): number {
//   const vowels = ["a", "e", "i", "o", "u"];
//   const arr = s.toLowerCase().split("");
//   let count = 0;
//   for (let i = 0; i < arr.length; i++) {
//     if (vowels.includes(arr[i])) {
//       count++;
//     }
//   }
//   return count;
// }
// function countVowels(s: string): number {
//   const vowels = ["a", "e", "i", "o", "u"];
//   let count = 0;
//   for (const char of s.toLowerCase()) {
//     if (vowels.includes(char)) count++;
//   }
//   return count;
// }
// function countVowels(s: string): number {
//   const vowels = ["a", "e", "i", "o", "u"];
//   return s
//     .toLowerCase()
//     .split("")
//     .reduce((count, char) => (vowels.includes(char) ? count + 1 : count), 0);
// }
/**
 * Задача 3: Перевернуть массив
 *
 * Дан массив. Верните новый массив с элементами в обратном порядке.
 * Не используйте встроенный метод reverse().
 *
 * Примеры:
 * reverseArray([1, 2, 3, 4, 5]) → [5, 4, 3, 2, 1]
 * reverseArray(["a", "b", "c"]) → ["c", "b", "a"]
 * reverseArray([42]) → [42]
 *
 * Ограничения:
 * - 0 <= arr.length <= 1000
 */
function reverseArray<T>(arr: T[]): T[] {
  // Ваше решение здесь
  return [];
}

// ========================================
// Тесты (раскомментируйте для проверки)
// ========================================

// console.log("=== Задача 1: Найти максимум ===");
// console.log(findMax([1, 5, 3, 9, 2])); // 9
// console.log(findMax([-1, -5, -3])); // -1
// console.log(findMax([42])); // 42

// console.log("\n=== Задача 2: Подсчитать гласные ===");
// console.log(countVowels("hello")); // 2
// console.log(countVowels("sky")); // 0
// console.log(countVowels("AEIOU")); // 5
// console.log(countVowels("JavaScript")); // 3
/*
console.log("\n=== Задача 3: Перевернуть массив ===");
console.log(reverseArray([1, 2, 3, 4, 5])); // [5, 4, 3, 2, 1]
console.log(reverseArray(["a", "b", "c"])); // ["c", "b", "a"]
console.log(reverseArray([42])); // [42]
*/
