/**
 * DAY 4: Манипуляции со строками
 * Уровень: Средний
 */

/**
 * Задача 1: Валидная скобочная последовательность
 *
 * Дана строка s, содержащая только символы '(', ')', '{', '}', '[' и ']'.
 * Определите, является ли входная строка корректной.
 *
 * Строка корректна если:
 * - Открывающие скобки закрываются скобками того же типа
 * - Открывающие скобки закрываются в правильном порядке
 * - Каждой закрывающей скобке соответствует открывающая того же типа
 *
 * Примеры:
 * isValid("()") → true
 * isValid("()[]{}") → true
 * isValid("(]") → false
 * isValid("([)]") → false
 * isValid("{[]}") → true
 *
 * Ограничения:
 * - 1 <= s.length <= 10^4
 * - s состоит только из скобок '(){}[]'
 *
 * Подсказка: Используйте стек (массив)
 */
function isValid(s: string): boolean {
  // Ваше решение здесь
  return false;
}

/**
 * Задача 2: Палиндром (игнорируя регистр и не-буквы)
 *
 * Дана строка s.
 * Верните true, если это палиндром, игнорируя регистр и не алфавитно-цифровые символы.
 *
 * Примеры:
 * isPalindrome("A man, a plan, a canal: Panama") → true
 * isPalindrome("race a car") → false
 * isPalindrome(" ") → true
 *
 * Ограничения:
 * - 1 <= s.length <= 2 * 10^5
 * - s состоит из печатных ASCII символов
 */
function isPalindrome(s: string): boolean {
  // Ваше решение здесь
  return false;
}

/**
 * Задача 3: Длина последнего слова
 *
 * Дана строка s, состоящая из слов и пробелов.
 * Верните длину последнего слова в строке.
 * Слово - это максимальная подстрока, состоящая только из не-пробельных символов.
 *
 * Примеры:
 * lengthOfLastWord("Hello World") → 5
 * lengthOfLastWord("   fly me   to   the moon  ") → 4
 * lengthOfLastWord("luffy is still joyboy") → 6
 *
 * Ограничения:
 * - 1 <= s.length <= 10^4
 * - s состоит только из английских букв и пробелов
 * - В s есть хотя бы одно слово
 */
function lengthOfLastWord(s: string): number {
  // Ваше решение здесь
  return 0;
}

/**
 * Задача 4: Самый длинный общий префикс
 *
 * Дан массив строк.
 * Найдите самый длинный общий префикс среди всех строк.
 * Если общего префикса нет, верните пустую строку "".
 *
 * Примеры:
 * longestCommonPrefix(["flower", "flow", "flight"]) → "fl"
 * longestCommonPrefix(["dog", "racecar", "car"]) → ""
 * longestCommonPrefix(["interspecies", "interstellar", "interstate"]) → "inters"
 *
 * Ограничения:
 * - 1 <= strs.length <= 200
 * - 0 <= strs[i].length <= 200
 * - strs[i] состоит только из английских букв в нижнем регистре
 */
function longestCommonPrefix(strs: string[]): string {
  // Ваше решение здесь
  return "";
}

// ========================================
// Тесты (раскомментируйте для проверки)
// ========================================

/*
console.log("=== Задача 1: Валидные скобки ===");
console.log(isValid("()")); // true
console.log(isValid("()[]{}")); // true
console.log(isValid("(]")); // false
console.log(isValid("([)]")); // false
console.log(isValid("{[]}")); // true

console.log("\n=== Задача 2: Палиндром ===");
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false

console.log("\n=== Задача 3: Длина последнего слова ===");
console.log(lengthOfLastWord("Hello World")); // 5
console.log(lengthOfLastWord("   fly me   to   the moon  ")); // 4

console.log("\n=== Задача 4: Общий префикс ===");
console.log(longestCommonPrefix(["flower", "flow", "flight"])); // "fl"
console.log(longestCommonPrefix(["dog", "racecar", "car"])); // ""
*/
