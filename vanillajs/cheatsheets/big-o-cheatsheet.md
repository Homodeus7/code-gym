# Шпаргалка по алгоритмической сложности (Big O)

## Что такое Big O?

Big O notation — это математическая нотация для описания **времени выполнения** или **использования памяти** алгоритма в зависимости от размера входных данных.

**Главная идея:** как изменяется производительность при увеличении размера данных n?

## Основные типы сложности

| Обозначение | Название        | Описание                                    | Пример                          |
|-------------|-----------------|---------------------------------------------|---------------------------------|
| O(1)        | Константная     | Время не зависит от размера входных данных  | Доступ к элементу массива       |
| O(log n)    | Логарифмическая | Делит задачу пополам на каждом шаге         | Бинарный поиск                  |
| O(n)        | Линейная        | Растет пропорционально n                    | Поиск в массиве                 |
| O(n log n)  | Линеарифметическая | Эффективная сортировка                   | Merge Sort, Quick Sort          |
| O(n²)       | Квадратичная    | Вложенные циклы                             | Bubble Sort, вложенные циклы    |
| O(n³)       | Кубическая      | Три вложенных цикла                         | Тройные вложенные циклы         |
| O(2ⁿ)       | Экспоненциальная| Удваивается с каждым элементом              | Рекурсия Фибоначчи (наивная)    |
| O(n!)       | Факториальная   | Все возможные перестановки                  | Задача коммивояжера (brute force)|

## Визуальное сравнение

```
Время выполнения ↑
                  |
                  |                                        O(n!)
                  |                                    /
                  |                                /
                  |                           O(2ⁿ)
                  |                        /
                  |                     /
                  |                  O(n²)
                  |               /
                  |           O(n log n)
                  |        O(n)
                  |     /
                  |  O(log n)
                  | O(1)
                  |________________
                                    Размер входных данных (n) →
```

## Детальные примеры

### O(1) - Константная сложность

Время выполнения НЕ зависит от размера данных.

```javascript
// Пример 1: Доступ к элементу массива
function getFirstElement(arr) {
  return arr[0];  // O(1)
}

// Пример 2: Простые математические операции
function addNumbers(a, b) {
  return a + b;  // O(1)
}

// Пример 3: Доступ к свойству объекта
function getName(user) {
  return user.name;  // O(1)
}

// Даже если внутри несколько операций - все равно O(1)
function example(arr) {
  const first = arr[0];      // O(1)
  const last = arr[arr.length - 1];  // O(1)
  return first + last;       // O(1)
  // Общая сложность: O(1)
}
```

**Характеристика:** Лучшая производительность. Не важно, 10 элементов или 10 миллионов.

---

### O(log n) - Логарифмическая сложность

Делим задачу пополам на каждом шаге.

```javascript
// Пример 1: Бинарный поиск
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
// Массив из 1000 элементов → максимум 10 итераций
// Массив из 1,000,000 элементов → максимум 20 итераций

// Пример 2: Поиск в сбалансированном бинарном дереве
function searchBST(root, value) {
  if (!root || root.val === value) return root;
  return value < root.val
    ? searchBST(root.left, value)   // Идем в одну половину
    : searchBST(root.right, value);  // Или в другую
}
```

**Характеристика:** Очень эффективно! Удвоение данных добавляет всего одну операцию.

| n        | Операции |
|----------|----------|
| 10       | ~3       |
| 100      | ~7       |
| 1,000    | ~10      |
| 1,000,000| ~20      |

---

### O(n) - Линейная сложность

Проходим по каждому элементу один раз.

```javascript
// Пример 1: Поиск в массиве
function findMax(arr) {
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {  // n итераций
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}

// Пример 2: Подсчет элементов
function countOccurrences(arr, target) {
  let count = 0;

  for (const item of arr) {  // n итераций
    if (item === target) count++;
  }

  return count;
}

// Пример 3: Методы массивов
const doubled = arr.map(x => x * 2);     // O(n)
const filtered = arr.filter(x => x > 0); // O(n)
const sum = arr.reduce((a, b) => a + b, 0); // O(n)
```

**Характеристика:** Удвоение данных удваивает время.

---

### O(n log n) - Линеарифметическая сложность

Эффективные алгоритмы сортировки.

```javascript
// Пример 1: Merge Sort
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));    // log n уровней
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);  // O(n) на каждом уровне
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  return result.concat(left.slice(i), right.slice(j));
}

// Пример 2: Quick Sort (в среднем)
function quickSort(arr) {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left = arr.filter((x, i) => x <= pivot && i < arr.length - 1);
  const right = arr.filter(x => x > pivot);

  return [...quickSort(left), pivot, ...quickSort(right)];
}

// Пример 3: Встроенная сортировка
arr.sort((a, b) => a - b);  // O(n log n) в большинстве движков
```

**Характеристика:** Лучшее, что можно получить для сортировки сравнением.

---

### O(n²) - Квадратичная сложность

Вложенные циклы по всем элементам.

```javascript
// Пример 1: Bubble Sort
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {        // n итераций
    for (let j = 0; j < arr.length - i - 1; j++) {  // n итераций
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Пример 2: Поиск пар
function findPairsWithSum(arr, target) {
  const pairs = [];

  for (let i = 0; i < arr.length; i++) {        // n
    for (let j = i + 1; j < arr.length; j++) {  // n
      if (arr[i] + arr[j] === target) {
        pairs.push([arr[i], arr[j]]);
      }
    }
  }

  return pairs;
}

// Пример 3: Проверка дубликатов (неэффективно)
function hasDuplicates(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}
```

**Характеристика:** Становится медленным очень быстро.

| n    | Операции  |
|------|-----------|
| 10   | 100       |
| 100  | 10,000    |
| 1,000| 1,000,000 |

⚠️ **Избегайте O(n²) когда возможно!**

---

### O(2ⁿ) - Экспоненциальная сложность

Удваивается с каждым новым элементом.

```javascript
// Пример 1: Наивный Fibonacci
function fibonacci(n) {
  if (n <= 1) return n;

  return fibonacci(n - 1) + fibonacci(n - 2);  // Два рекурсивных вызова
}
// fibonacci(5): 15 вызовов
// fibonacci(10): 177 вызовов
// fibonacci(30): 2,692,537 вызовов!

// Пример 2: Все подмножества множества
function subsets(nums) {
  const result = [[]];

  for (const num of nums) {
    const len = result.length;
    for (let i = 0; i < len; i++) {  // Удваивается каждый раз
      result.push([...result[i], num]);
    }
  }

  return result;
}
// [1,2,3] → 8 подмножеств (2³)
// [1,2,3,4,5] → 32 подмножества (2⁵)
```

**Характеристика:** Непригодно для больших данных. Каждый +1 к n удваивает время!

---

### O(n!) - Факториальная сложность

Все возможные перестановки.

```javascript
// Пример: Генерация всех перестановок
function permutations(arr) {
  if (arr.length <= 1) return [arr];

  const result = [];

  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    const remaining = arr.slice(0, i).concat(arr.slice(i + 1));
    const perms = permutations(remaining);

    for (const perm of perms) {
      result.push([current, ...perm]);
    }
  }

  return result;
}
// [1,2,3] → 6 перестановок (3!)
// [1,2,3,4,5] → 120 перестановок (5!)
// [1,2,3,4,5,6,7,8,9,10] → 3,628,800 перестановок (10!)
```

**Характеристика:** Самая медленная. Пригодна только для очень малых n (< 10).

---

## Правила анализа сложности

### Правило 1: Отбрасываем константы

```javascript
// O(2n) → O(n)
function example1(arr) {
  for (let i = 0; i < arr.length; i++) {     // O(n)
    console.log(arr[i]);
  }
  for (let i = 0; i < arr.length; i++) {     // O(n)
    console.log(arr[i]);
  }
}
// Общая сложность: O(n) + O(n) = O(2n) → O(n)

// O(n + 100) → O(n)
function example2(arr) {
  for (let i = 0; i < 100; i++) {  // O(100) = O(1)
    console.log(i);
  }
  for (const item of arr) {        // O(n)
    console.log(item);
  }
}
// Общая сложность: O(100) + O(n) = O(n)
```

### Правило 2: Берем доминирующий член

```javascript
// O(n² + n) → O(n²)
function example3(arr) {
  for (let i = 0; i < arr.length; i++) {        // O(n)
    console.log(arr[i]);
  }

  for (let i = 0; i < arr.length; i++) {        // O(n²)
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}
// Общая сложность: O(n) + O(n²) → O(n²)

// O(n³ + n² + n + 1) → O(n³)
```

### Правило 3: Разные входные данные = разные переменные

```javascript
// O(a + b), НЕ O(n)
function example4(arr1, arr2) {
  for (const item of arr1) {    // O(a)
    console.log(item);
  }
  for (const item of arr2) {    // O(b)
    console.log(item);
  }
}

// O(a * b), НЕ O(n²)
function example5(arr1, arr2) {
  for (const item1 of arr1) {        // O(a)
    for (const item2 of arr2) {      // O(b)
      console.log(item1, item2);
    }
  }
}
```

### Правило 4: Последовательные операции складываются

```javascript
// O(n + m)
function example6(arr) {
  arr.forEach(x => console.log(x));  // O(n)
  arr.sort((a, b) => a - b);         // O(n log n)
}
// Общая сложность: O(n) + O(n log n) → O(n log n)
```

### Правило 5: Вложенные операции умножаются

```javascript
// O(n * m)
function example7(arr1, arr2) {
  for (const x of arr1) {       // O(n)
    for (const y of arr2) {     // O(m)
      console.log(x, y);
    }
  }
}
```

---

## Пространственная сложность (Space Complexity)

Сколько дополнительной памяти использует алгоритм?

```javascript
// O(1) - Константная память
function sum(arr) {
  let total = 0;  // Одна переменная
  for (const num of arr) {
    total += num;
  }
  return total;
}

// O(n) - Линейная память
function double(arr) {
  const result = [];  // Новый массив размера n
  for (const num of arr) {
    result.push(num * 2);
  }
  return result;
}

// O(n) - Рекурсия (стек вызовов)
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // n вызовов в стеке
}

// O(log n) - Бинарный поиск (стек вызовов)
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;

  const mid = Math.floor((left + right) / 2);

  if (arr[mid] === target) return mid;
  if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
  return binarySearchRecursive(arr, target, left, mid - 1);
}
// Глубина рекурсии: log n
```

---

## Практические примеры оптимизации

### Пример 1: Проверка дубликатов

```javascript
// ❌ Плохо: O(n²)
function hasDuplicatesSlow(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] === arr[j]) return true;
    }
  }
  return false;
}

// ✅ Хорошо: O(n)
function hasDuplicatesFast(arr) {
  const seen = new Set();
  for (const item of arr) {
    if (seen.has(item)) return true;
    seen.add(item);
  }
  return false;
}
```

### Пример 2: Поиск пар с суммой

```javascript
// ❌ Плохо: O(n²)
function twoSumSlow(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return [i, j];
      }
    }
  }
  return null;
}

// ✅ Хорошо: O(n)
function twoSumFast(arr, target) {
  const map = new Map();

  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(arr[i], i);
  }

  return null;
}
```

### Пример 3: Fibonacci

```javascript
// ❌ Плохо: O(2ⁿ)
function fibSlow(n) {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

// ✅ Хорошо: O(n) с мемоизацией
function fibFast(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];

  memo[n] = fibFast(n - 1, memo) + fibFast(n - 2, memo);
  return memo[n];
}

// ✅ Еще лучше: O(n), O(1) память
function fibIterative(n) {
  if (n <= 1) return n;

  let prev = 0, curr = 1;

  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }

  return curr;
}
```

---

## Сложность встроенных методов JavaScript

| Метод           | Сложность | Комментарий                                |
|-----------------|-----------|-------------------------------------------|
| `arr[i]`        | O(1)      | Прямой доступ                             |
| `arr.push()`    | O(1)      | Добавление в конец                        |
| `arr.pop()`     | O(1)      | Удаление с конца                          |
| `arr.shift()`   | O(n)      | Удаление с начала, сдвиг всех элементов   |
| `arr.unshift()` | O(n)      | Добавление в начало, сдвиг всех элементов |
| `arr.slice()`   | O(n)      | Копирование части массива                 |
| `arr.splice()`  | O(n)      | Удаление/вставка, сдвиг элементов         |
| `arr.concat()`  | O(n + m)  | Объединение массивов                      |
| `arr.map()`     | O(n)      | Применить функцию к каждому элементу      |
| `arr.filter()`  | O(n)      | Фильтрация                                |
| `arr.reduce()`  | O(n)      | Свертка                                   |
| `arr.find()`    | O(n)      | Поиск (в худшем случае весь массив)       |
| `arr.indexOf()` | O(n)      | Поиск индекса                             |
| `arr.includes()`| O(n)      | Проверка наличия                          |
| `arr.sort()`    | O(n log n)| Сортировка (TimSort в V8)                 |
| `arr.reverse()` | O(n)      | Переворот                                 |
| `Object.keys()` | O(n)      | Получить ключи объекта                    |
| `map.get()`     | O(1)      | Получить значение из Map                  |
| `map.set()`     | O(1)      | Установить значение в Map                 |
| `set.has()`     | O(1)      | Проверка в Set                            |
| `set.add()`     | O(1)      | Добавить в Set                            |

---

## Быстрая справка

**От лучшего к худшему:**

O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)

**Что искать в коде:**

- **Один цикл?** → Вероятно O(n)
- **Два вложенных цикла?** → Вероятно O(n²)
- **Делите пополам?** → Вероятно O(log n)
- **Рекурсия с двумя ветвями?** → Может быть O(2ⁿ)
- **Сортировка?** → Вероятно O(n log n)

**Советы:**

✅ Стремитесь к O(n) или лучше для больших данных
✅ O(n log n) приемлемо для сортировки
⚠️ Избегайте O(n²) для больших массивов
❌ O(2ⁿ) и O(n!) только для малых n
