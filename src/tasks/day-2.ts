/**
 * DAY 2: Методы массивов
 * Уровень: Легкий
 */

/**
 * Задача 1: FizzBuzz
 *
 * Верните массив строк от 1 до n, где:
 * - Для чисел кратных 3 и 5 → "FizzBuzz"
 * - Для чисел кратных 3 → "Fizz"
 * - Для чисел кратных 5 → "Buzz"
 * - Для остальных → само число как строка
 *
 * Примеры:
 * fizzBuzz(5) → ["1", "2", "Fizz", "4", "Buzz"]
 * fizzBuzz(15) → ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]
 *
 * Ограничения:
 * - 1 <= n <= 10^4
 */
function fizzBuzz(n: number): string[] {
  // Ваше решение здесь
  return [];
}

/**
 * Задача 2: Удалить дубликаты из массива
 *
 * Дан массив чисел. Верните новый массив только с уникальными значениями.
 * Порядок должен сохраниться (первое вхождение).
 *
 * Примеры:
 * removeDuplicates([1, 2, 2, 3, 4, 4, 5]) → [1, 2, 3, 4, 5]
 * removeDuplicates([1, 1, 1, 1]) → [1]
 * removeDuplicates([5, 4, 3, 2, 1]) → [5, 4, 3, 2, 1]
 *
 * Ограничения:
 * - 0 <= arr.length <= 1000
 * - -10^4 <= arr[i] <= 10^4
 */
function removeDuplicates(arr: number[]): number[] {
  // Ваше решение здесь
  return [];
}

/**
 * Задача 3: Сумма положительных чисел
 *
 * Дан массив чисел. Верните сумму только положительных чисел.
 *
 * Примеры:
 * sumPositive([1, -4, 7, 12]) → 20
 * sumPositive([-1, -2, -3]) → 0
 * sumPositive([]) → 0
 * sumPositive([5, 5, 5]) → 15
 *
 * Ограничения:
 * - 0 <= arr.length <= 1000
 * - -10^4 <= arr[i] <= 10^4
 */
function sumPositive(arr: number[]): number {
  // Ваше решение здесь
  return 0;
}

/**
 * Задача 4: Найти индекс первого вхождения
 *
 * Даны две строки: haystack и needle.
 * Верните индекс первого вхождения needle в haystack, или -1 если не найдено.
 * Не используйте встроенный метод indexOf().
 *
 * Примеры:
 * strStr("hello", "ll") → 2
 * strStr("aaaaa", "bba") → -1
 * strStr("", "") → 0
 * strStr("mississippi", "issip") → 4
 *
 * Ограничения:
 * - 0 <= haystack.length, needle.length <= 1000
 */
function strStr(haystack: string, needle: string): number {
  // Ваше решение здесь
  return 0;
}

// ========================================
// Тесты (раскомментируйте для проверки)
// ========================================

/*
console.log("=== Задача 1: FizzBuzz ===");
console.log(fizzBuzz(5)); // ["1", "2", "Fizz", "4", "Buzz"]
console.log(fizzBuzz(15));

console.log("\n=== Задача 2: Удалить дубликаты ===");
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]
console.log(removeDuplicates([1, 1, 1, 1])); // [1]

console.log("\n=== Задача 3: Сумма положительных ===");
console.log(sumPositive([1, -4, 7, 12])); // 20
console.log(sumPositive([-1, -2, -3])); // 0

console.log("\n=== Задача 4: Индекс вхождения ===");
console.log(strStr("hello", "ll")); // 2
console.log(strStr("aaaaa", "bba")); // -1
console.log(strStr("mississippi", "issip")); // 4
*/
