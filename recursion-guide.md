# Полный гайд по рекурсии

## Что такое рекурсия?

**Рекурсия** — это когда функция вызывает сама себя для решения более простой версии той же задачи.

### Аналогия из жизни

Представьте, что вы ищете книгу в стопке:
- **Итеративный подход:** Просматриваете каждую книгу по очереди сверху вниз
- **Рекурсивный подход:** Смотрите на верхнюю книгу. Если это не та книга, убираете ее и повторяете для оставшейся стопки

## Структура рекурсивной функции

Каждая рекурсивная функция состоит из двух частей:

```javascript
function recursiveFunction(input) {
  // 1. BASE CASE (Базовый случай) - условие остановки
  if (условие_остановки) {
    return простой_ответ;
  }

  // 2. RECURSIVE CASE (Рекурсивный случай) - вызов самой себя
  return recursiveFunction(более_простой_input);
}
```

### Критически важно!

⚠️ **Без базового случая = бесконечная рекурсия = переполнение стека (stack overflow)**

---

## Базовые примеры

### Пример 1: Обратный отсчет

```javascript
// Итеративный подход
function countdownIterative(n) {
  for (let i = n; i >= 0; i--) {
    console.log(i);
  }
}

// Рекурсивный подход
function countdownRecursive(n) {
  // BASE CASE: остановиться на 0
  if (n < 0) {
    return;
  }

  console.log(n);

  // RECURSIVE CASE: вызов с n - 1
  countdownRecursive(n - 1);
}

countdownRecursive(5);
// Выведет: 5, 4, 3, 2, 1, 0
```

**Как это работает (стек вызовов):**
```
countdownRecursive(5)
  ├─ print 5
  └─ countdownRecursive(4)
      ├─ print 4
      └─ countdownRecursive(3)
          ├─ print 3
          └─ countdownRecursive(2)
              ├─ print 2
              └─ countdownRecursive(1)
                  ├─ print 1
                  └─ countdownRecursive(0)
                      ├─ print 0
                      └─ countdownRecursive(-1) → return (BASE CASE)
```

---

### Пример 2: Факториал

Факториал числа n: `n! = n × (n-1) × (n-2) × ... × 1`

```javascript
// Итеративный подход
function factorialIterative(n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Рекурсивный подход
function factorial(n) {
  // BASE CASE
  if (n <= 1) {
    return 1;
  }

  // RECURSIVE CASE: n! = n × (n-1)!
  return n * factorial(n - 1);
}

console.log(factorial(5));  // 120
```

**Визуализация для factorial(5):**
```
factorial(5)
  = 5 * factorial(4)
      = 4 * factorial(3)
          = 3 * factorial(2)
              = 2 * factorial(1)
                  = 1  ← BASE CASE

Раскрутка стека:
  = 2 * 1 = 2
  = 3 * 2 = 6
  = 4 * 6 = 24
  = 5 * 24 = 120
```

---

### Пример 3: Сумма массива

```javascript
// Итеративный подход
function sumIterative(arr) {
  let sum = 0;
  for (const num of arr) {
    sum += num;
  }
  return sum;
}

// Рекурсивный подход
function sumRecursive(arr) {
  // BASE CASE: пустой массив
  if (arr.length === 0) {
    return 0;
  }

  // RECURSIVE CASE: первый элемент + сумма остальных
  return arr[0] + sumRecursive(arr.slice(1));
}

console.log(sumRecursive([1, 2, 3, 4, 5]));  // 15
```

**Визуализация:**
```
sumRecursive([1, 2, 3, 4, 5])
  = 1 + sumRecursive([2, 3, 4, 5])
      = 2 + sumRecursive([3, 4, 5])
          = 3 + sumRecursive([4, 5])
              = 4 + sumRecursive([5])
                  = 5 + sumRecursive([])
                      = 0  ← BASE CASE

Раскрутка:
  = 5 + 0 = 5
  = 4 + 5 = 9
  = 3 + 9 = 12
  = 2 + 12 = 14
  = 1 + 14 = 15
```

---

## Типы рекурсии

### 1. Линейная рекурсия (Linear Recursion)

Функция вызывает себя **один раз**.

```javascript
function power(base, exponent) {
  // BASE CASE
  if (exponent === 0) {
    return 1;
  }

  // RECURSIVE CASE: один вызов
  return base * power(base, exponent - 1);
}

console.log(power(2, 5));  // 32
```

**Сложность:** O(n) время, O(n) память (стек)

---

### 2. Множественная рекурсия (Multiple Recursion)

Функция вызывает себя **несколько раз**.

```javascript
// Числа Фибоначчи: 0, 1, 1, 2, 3, 5, 8, 13, 21...
function fibonacci(n) {
  // BASE CASES
  if (n <= 1) {
    return n;
  }

  // RECURSIVE CASE: ДВА вызова
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(7));  // 13
```

**Визуализация fibonacci(5):**
```
                    fib(5)
                   /      \
              fib(4)      fib(3)
             /     \       /    \
        fib(3)  fib(2) fib(2)  fib(1)
        /   \    /  \   /  \
    fib(2) fib(1) ...
    /  \
fib(1) fib(0)
```

⚠️ **Проблема:** Много повторяющихся вычислений!
- `fibonacci(5)`: ~15 вызовов
- `fibonacci(10)`: ~177 вызовов
- `fibonacci(30)`: ~2,692,537 вызовов

**Сложность:** O(2ⁿ) — очень медленно!

---

### 3. Хвостовая рекурсия (Tail Recursion)

Рекурсивный вызов — **последняя операция** в функции.

```javascript
// Обычная рекурсия (НЕ хвостовая)
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);  // Умножение ПОСЛЕ вызова
}

// Хвостовая рекурсия
function factorialTail(n, accumulator = 1) {
  if (n <= 1) return accumulator;
  return factorialTail(n - 1, n * accumulator);  // Вызов — последнее действие
}

console.log(factorialTail(5));  // 120
```

**Преимущество:** Некоторые языки/компиляторы оптимизируют хвостовую рекурсию (JavaScript не всегда).

---

## Рекурсия vs Итерация

| Аспект               | Рекурсия                          | Итерация                      |
|----------------------|-----------------------------------|-------------------------------|
| Читаемость          | Часто более понятна для задач     | Более привычна                |
| Производительность  | Медленнее (вызовы функций)        | Быстрее                       |
| Память              | Использует стек (риск переполнения)| Константная память            |
| Подходит для        | Деревья, графы, разделяй и властвуй| Простые циклы, массивы        |

### Когда использовать рекурсию?

✅ **Хорошо подходит:**
- Деревья (обход, поиск)
- Графы (DFS - поиск в глубину)
- Разделяй и властвуй (Merge Sort, Quick Sort)
- Задачи с естественной рекурсивной структурой (Фибоначчи, факториал)
- Генерация комбинаций/перестановок

❌ **Избегайте:**
- Простые циклы (for/while лучше)
- Очень большие n (риск переполнения стека)
- Когда производительность критична

---

## Продвинутые паттерны

### 1. Рекурсия с мемоизацией (Memoization)

Кэширование результатов для избежания повторных вычислений.

```javascript
// ❌ Медленный Fibonacci: O(2ⁿ)
function fibSlow(n) {
  if (n <= 1) return n;
  return fibSlow(n - 1) + fibSlow(n - 2);
}

// ✅ Быстрый Fibonacci с мемоизацией: O(n)
function fibFast(n, memo = {}) {
  // Проверяем кэш
  if (memo[n] !== undefined) {
    return memo[n];
  }

  // BASE CASE
  if (n <= 1) {
    return n;
  }

  // Сохраняем результат в кэш
  memo[n] = fibFast(n - 1, memo) + fibFast(n - 2, memo);
  return memo[n];
}

console.log(fibFast(50));  // Мгновенно!
console.log(fibSlow(50));  // Очень долго (не запускайте!)
```

**Результат:**
- `fibSlow(40)`: ~1 секунда
- `fibFast(40)`: ~0.001 секунды
- `fibFast(100)`: мгновенно!

---

### 2. Рекурсия для работы с деревьями

```javascript
// Структура дерева
const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null }
  },
  right: {
    value: 3,
    left: { value: 6, left: null, right: null },
    right: { value: 7, left: null, right: null }
  }
};

// Обход в глубину (DFS - Depth First Search)
function dfs(node) {
  // BASE CASE
  if (node === null) {
    return;
  }

  console.log(node.value);  // Обработка узла
  dfs(node.left);           // Рекурсия влево
  dfs(node.right);          // Рекурсия вправо
}

dfs(tree);
// Выведет: 1, 2, 4, 5, 3, 6, 7

// Сумма всех значений в дереве
function sumTree(node) {
  if (node === null) {
    return 0;
  }

  return node.value + sumTree(node.left) + sumTree(node.right);
}

console.log(sumTree(tree));  // 28

// Максимальная глубина дерева
function maxDepth(node) {
  if (node === null) {
    return 0;
  }

  const leftDepth = maxDepth(node.left);
  const rightDepth = maxDepth(node.right);

  return 1 + Math.max(leftDepth, rightDepth);
}

console.log(maxDepth(tree));  // 3
```

---

### 3. Рекурсия для работы с массивами

```javascript
// Фильтрация массива
function filterRecursive(arr, predicate) {
  // BASE CASE
  if (arr.length === 0) {
    return [];
  }

  const [first, ...rest] = arr;
  const filtered = filterRecursive(rest, predicate);

  // Добавляем первый элемент, если он подходит
  return predicate(first) ? [first, ...filtered] : filtered;
}

const numbers = [1, 2, 3, 4, 5, 6];
console.log(filterRecursive(numbers, x => x % 2 === 0));  // [2, 4, 6]

// Разворот массива
function reverseRecursive(arr) {
  if (arr.length === 0) {
    return [];
  }

  const [first, ...rest] = arr;
  return [...reverseRecursive(rest), first];
}

console.log(reverseRecursive([1, 2, 3, 4, 5]));  // [5, 4, 3, 2, 1]

// Flatten (разворачивание вложенных массивов)
function flattenRecursive(arr) {
  let result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flattenRecursive(item));  // Рекурсия для вложенных
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flattenRecursive([1, [2, [3, [4]], 5]]));  // [1, 2, 3, 4, 5]
```

---

### 4. Генерация комбинаций и перестановок

```javascript
// Все подмножества массива
function subsets(arr) {
  // BASE CASE
  if (arr.length === 0) {
    return [[]];
  }

  const [first, ...rest] = arr;
  const subsetsWithoutFirst = subsets(rest);

  const subsetsWithFirst = subsetsWithoutFirst.map(subset => [first, ...subset]);

  return [...subsetsWithoutFirst, ...subsetsWithFirst];
}

console.log(subsets([1, 2, 3]));
// [[], [3], [2], [2,3], [1], [1,3], [1,2], [1,2,3]]

// Все перестановки массива
function permutations(arr) {
  // BASE CASE
  if (arr.length <= 1) {
    return [arr];
  }

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

console.log(permutations([1, 2, 3]));
// [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
```

---

## Разделяй и властвуй (Divide and Conquer)

Стратегия решения задач с помощью рекурсии:
1. **Divide:** Разделить задачу на подзадачи
2. **Conquer:** Решить подзадачи рекурсивно
3. **Combine:** Объединить результаты

### Пример: Merge Sort

```javascript
function mergeSort(arr) {
  // BASE CASE: массив из 0 или 1 элемента уже отсортирован
  if (arr.length <= 1) {
    return arr;
  }

  // DIVIDE: делим массив пополам
  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  // CONQUER: сортируем каждую половину
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  // COMBINE: объединяем отсортированные половины
  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i), right.slice(j));
}

console.log(mergeSort([64, 34, 25, 12, 22, 11, 90]));
// [11, 12, 22, 25, 34, 64, 90]
```

**Сложность:** O(n log n) — очень эффективно!

---

## Частые ошибки

### 1. Отсутствие базового случая

```javascript
// ❌ Бесконечная рекурсия!
function broken(n) {
  return broken(n - 1);  // Нет базового случая!
}

// ✅ Правильно
function fixed(n) {
  if (n <= 0) return;  // Базовый случай
  return fixed(n - 1);
}
```

### 2. Неправильный базовый случай

```javascript
// ❌ Никогда не достигнет базового случая
function countdown(n) {
  if (n === 0) return;  // Что если n отрицательное?
  console.log(n);
  countdown(n - 1);
}

countdown(-5);  // Stack overflow!

// ✅ Правильно
function countdownFixed(n) {
  if (n <= 0) return;  // Обрабатывает все случаи
  console.log(n);
  countdownFixed(n - 1);
}
```

### 3. Не приближаемся к базовому случаю

```javascript
// ❌ Бесконечная рекурсия
function broken(n) {
  if (n === 0) return;
  return broken(n);  // n не меняется!
}

// ✅ Правильно
function fixed(n) {
  if (n === 0) return;
  return fixed(n - 1);  // n уменьшается
}
```

### 4. Изменение исходных данных

```javascript
// ❌ Изменяет исходный массив
function sumBad(arr) {
  if (arr.length === 0) return 0;
  const first = arr.shift();  // Мутирует arr!
  return first + sumBad(arr);
}

// ✅ Правильно: не изменяет исходный массив
function sumGood(arr) {
  if (arr.length === 0) return 0;
  return arr[0] + sumGood(arr.slice(1));
}
```

---

## Оптимизация рекурсии

### 1. Используйте мемоизацию

```javascript
// Обобщенная функция мемоизации
function memoize(fn) {
  const cache = {};

  return function(...args) {
    const key = JSON.stringify(args);

    if (cache[key] !== undefined) {
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Применяем к любой функции
const fibMemoized = memoize(function fib(n) {
  if (n <= 1) return n;
  return fibMemoized(n - 1) + fibMemoized(n - 2);
});

console.log(fibMemoized(100));  // Мгновенно!
```

### 2. Конвертируйте в итерацию (если возможно)

```javascript
// Рекурсия
function factorialRecursive(n) {
  if (n <= 1) return 1;
  return n * factorialRecursive(n - 1);
}

// Итерация (быстрее, меньше памяти)
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}
```

### 3. Используйте хвостовую рекурсию (если язык поддерживает)

```javascript
// Обычная рекурсия
function sum(n) {
  if (n <= 0) return 0;
  return n + sum(n - 1);
}

// Хвостовая рекурсия
function sumTail(n, acc = 0) {
  if (n <= 0) return acc;
  return sumTail(n - 1, acc + n);
}
```

---

## Визуализация: как работает стек вызовов

```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

factorial(4);
```

**Стек вызовов:**

```
Шаг 1: factorial(4) вызывает factorial(3)
┌─────────────────┐
│ factorial(4)    │ ← Ждет результата
│ return 4 * ?    │
└─────────────────┘

Шаг 2: factorial(3) вызывает factorial(2)
┌─────────────────┐
│ factorial(3)    │ ← Ждет результата
│ return 3 * ?    │
├─────────────────┤
│ factorial(4)    │
│ return 4 * ?    │
└─────────────────┘

Шаг 3: factorial(2) вызывает factorial(1)
┌─────────────────┐
│ factorial(2)    │ ← Ждет результата
│ return 2 * ?    │
├─────────────────┤
│ factorial(3)    │
│ return 3 * ?    │
├─────────────────┤
│ factorial(4)    │
│ return 4 * ?    │
└─────────────────┘

Шаг 4: factorial(1) возвращает 1 (базовый случай)
┌─────────────────┐
│ factorial(1)    │ ✓ Возвращает 1
│ return 1        │
├─────────────────┤
│ factorial(2)    │
│ return 2 * 1    │ ← Теперь может вычислить
├─────────────────┤
│ factorial(3)    │
│ return 3 * ?    │
├─────────────────┤
│ factorial(4)    │
│ return 4 * ?    │
└─────────────────┘

Раскрутка стека:
factorial(2) = 2 * 1 = 2
factorial(3) = 3 * 2 = 6
factorial(4) = 4 * 6 = 24
```

---

## Практические советы

✅ **DO:**
- Всегда определяйте четкий базовый случай
- Убедитесь, что рекурсия приближается к базовому случаю
- Используйте мемоизацию для дорогих вычислений
- Тестируйте на малых входных данных
- Продумайте ограничения (глубина стека ~10000-15000 в JavaScript)

❌ **DON'T:**
- Не используйте рекурсию для простых циклов
- Не забывайте про базовый случай
- Не мутируйте входные данные
- Не используйте наивную рекурсию для Fibonacci и подобных задач

---

## Чек-лист для написания рекурсии

1. [ ] Определил ли я базовый случай(ы)?
2. [ ] Приближается ли каждый рекурсивный вызов к базовому случаю?
3. [ ] Протестировал ли я на минимальном входе (например, пустой массив, 0)?
4. [ ] Не мутирую ли я исходные данные?
5. [ ] Нужна ли мемоизация для оптимизации?
6. [ ] Может ли эта задача быть решена итеративно (проще/быстрее)?

---

## Дополнительные ресурсы

**Визуализаторы:**
- [Python Tutor](http://pythontutor.com/) — визуализация стека вызовов
- [VisuAlgo](https://visualgo.net/) — визуализация алгоритмов

**Задачи для практики:**
1. Вычисление степени числа
2. Сумма цифр числа
3. Проверка палиндрома
4. Обход дерева
5. Генерация скобочных последовательностей
6. Задача о ханойских башнях
7. Поиск пути в лабиринте (backtracking)
