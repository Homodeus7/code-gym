/**
 * Пример задачи: Работа с массивами
 */

function findEvenNumbers(numbers: number[]): number[] {
  console.log('Входной массив:', numbers);

  const evenNumbers = numbers.filter(num => num % 2 === 0);

  console.log('Четные числа:', evenNumbers);
  console.log('Количество четных:', evenNumbers.length);

  return evenNumbers;
}

function sum(arr: number[]): number {
  const result = arr.reduce((acc, num) => acc + num, 0);
  console.log('Сумма элементов:', result);
  return result;
}

// Основной код
console.log('=== Задача: Фильтрация и подсчет ===\n');

const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = findEvenNumbers(testArray);
const total = sum(evenNumbers);

console.log('\n=== Результат ===');
console.log('Сумма четных чисел:', total);
