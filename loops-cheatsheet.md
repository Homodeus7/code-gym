# Шпаргалка по циклам JavaScript/TypeScript

## Основные циклы

| Цикл           | Когда использовать                      | Синтаксис                                | Пример                                                |
|----------------|-----------------------------------------|------------------------------------------|-------------------------------------------------------|
| `for`          | Когда известно количество итераций      | `for (init; condition; increment) { }`   | `for (let i = 0; i < 5; i++) { console.log(i); }`     |
| `while`        | Когда условие проверяется до итерации   | `while (condition) { }`                  | `while (i < 5) { console.log(i); i++; }`              |
| `do...while`   | Когда нужна хотя бы одна итерация       | `do { } while (condition);`              | `do { console.log(i); i++; } while (i < 5);`          |

## Циклы для итерируемых объектов

| Цикл           | Что итерирует                           | Синтаксис                                | Пример                                                 |
|----------------|-----------------------------------------|------------------------------------------|--------------------------------------------------------|
| `for...of`     | Значения итерируемых (массивы, строки)  | `for (const item of iterable) { }`       | `for (const num of [1,2,3]) { console.log(num); }`     |
| `for...in`     | Ключи объекта (и индексы массива)       | `for (const key in object) { }`          | `for (const key in obj) { console.log(key); }`         |
| `forEach()`    | Метод массива для каждого элемента      | `array.forEach((item, index) => { })`    | `[1,2,3].forEach(num => console.log(num));`            |

## Детальное сравнение

### for - классический цикл

```javascript
// Базовый синтаксис
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

// С шагом
for (let i = 0; i < 10; i += 2) {
  console.log(i); // 0, 2, 4, 6, 8
}

// Обратный порядок
for (let i = array.length - 1; i >= 0; i--) {
  console.log(array[i]);
}

// Несколько переменных
for (let i = 0, j = 10; i < j; i++, j--) {
  console.log(i, j);
}
```

**Плюсы:** полный контроль, производительность
**Минусы:** многословность, легко ошибиться с индексами
**Когда использовать:** нужен доступ к индексу, сложная логика итерации

---

### while - цикл с предусловием

```javascript
// Базовый синтаксис
let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

// Чтение данных до условия
let input = '';
while (input !== 'exit') {
  input = getUserInput();
}

// Бесконечный цикл с break
while (true) {
  if (condition) break;
  // код
}
```

**Плюсы:** простота, читаемость для условий
**Минусы:** легко забыть инкремент (бесконечный цикл)
**Когда использовать:** неизвестное количество итераций, зависит от условия

---

### do...while - цикл с постусловием

```javascript
// Базовый синтаксис
let i = 0;
do {
  console.log(i);
  i++;
} while (i < 5);

// Выполнится минимум 1 раз
let num = 10;
do {
  console.log('Выполнится один раз');
  num++;
} while (num < 5); // false, но код выполнился

// Валидация ввода
let password;
do {
  password = prompt('Введите пароль');
} while (password.length < 8);
```

**Плюсы:** гарантия хотя бы одной итерации
**Минусы:** менее распространен, легко пропустить условие
**Когда использовать:** нужна минимум одна итерация (валидация, меню)

---

### for...of - итерация по значениям

```javascript
// Массивы
for (const num of [1, 2, 3]) {
  console.log(num); // 1, 2, 3
}

// Строки
for (const char of 'hello') {
  console.log(char); // h, e, l, l, o
}

// Set
const set = new Set([1, 2, 3]);
for (const value of set) {
  console.log(value);
}

// Map
const map = new Map([['a', 1], ['b', 2]]);
for (const [key, value] of map) {
  console.log(key, value);
}

// С индексом через entries()
for (const [index, value] of array.entries()) {
  console.log(index, value);
}

// Объект (требует Object.entries/values)
for (const value of Object.values(obj)) {
  console.log(value);
}
```

**Плюсы:** чистый синтаксис, работает с итерируемыми
**Минусы:** нет прямого доступа к индексу, не работает с обычными объектами
**Когда использовать:** перебор значений массивов, строк, Set, Map

---

### for...in - итерация по ключам

```javascript
// Объекты
const obj = { a: 1, b: 2, c: 3 };
for (const key in obj) {
  console.log(key, obj[key]); // a 1, b 2, c 3
}

// Массивы (НЕ РЕКОМЕНДУЕТСЯ)
const arr = [10, 20, 30];
for (const index in arr) {
  console.log(index, arr[index]); // '0' 10, '1' 20, '2' 30
  // index это СТРОКА, не число!
}

// Проверка собственных свойств
for (const key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key, obj[key]);
  }
}
```

**Плюсы:** простой перебор ключей объекта
**Минусы:** итерирует и унаследованные свойства, для массивов возвращает строки
**Когда использовать:** перебор ключей обычных объектов (не массивов!)

⚠️ **Важно:** для массивов используйте `for...of`, `forEach()` или обычный `for`

---

### forEach() - метод массива

```javascript
// Базовый синтаксис
[1, 2, 3].forEach((value, index, array) => {
  console.log(value, index);
});

// Без индекса
['a', 'b', 'c'].forEach(item => {
  console.log(item);
});

// С контекстом this
const obj = {
  multiplier: 2,
  multiply: function(arr) {
    arr.forEach(function(num) {
      console.log(num * this.multiplier);
    }, this); // второй аргумент - контекст
  }
};

// Стрелочная функция (this из внешнего контекста)
arr.forEach(item => {
  console.log(this.value);
});
```

**Плюсы:** чистый код, встроенный доступ к индексу и массиву
**Минусы:** нельзя использовать break/continue, всегда возвращает undefined
**Когда использовать:** простой перебор массива, когда не нужны break/continue

---

## Управление потоком выполнения

| Оператор    | Что делает                          | Работает в                                    | Пример                                |
|-------------|-------------------------------------|-----------------------------------------------|---------------------------------------|
| `break`     | Полностью прерывает цикл            | for, while, do...while, for...of, for...in    | `if (i === 5) break;`                |
| `continue`  | Пропускает текущую итерацию         | for, while, do...while, for...of, for...in    | `if (i % 2 === 0) continue;`         |
| `return`    | Выходит из функции                  | Везде (внутри функции)                        | `if (found) return item;`            |

**Важно:** `break` и `continue` НЕ работают в `forEach()`! Используйте обычный цикл для таких случаев.

```javascript
// ❌ Не работает
[1,2,3].forEach(num => {
  if (num === 2) break; // SyntaxError!
});

// ✅ Используйте for...of
for (const num of [1,2,3]) {
  if (num === 2) break; // Работает
}

// ✅ Или some/every для проверок
[1,2,3].some(num => {
  if (num === 2) return true; // Останавливает итерацию
  console.log(num);
});
```

## Специальные итерационные методы

| Метод        | Что делает                          | Возвращает                | Прерывается при return     |
|--------------|-------------------------------------|---------------------------|----------------------------|
| `map()`      | Преобразует каждый элемент          | Новый массив              | Нет                        |
| `filter()`   | Фильтрует по условию                | Новый массив              | Нет                        |
| `find()`     | Находит первый элемент              | Элемент или undefined     | Да (при true)              |
| `findIndex()`| Находит индекс первого элемента     | Индекс или -1             | Да (при true)              |
| `some()`     | Проверяет хотя бы один элемент      | boolean                   | Да (при true)              |
| `every()`    | Проверяет все элементы              | boolean                   | Да (при false)             |
| `reduce()`   | Сворачивает в одно значение         | Любой тип                 | Нет                        |

## Производительность

| Цикл           | Скорость  | Комментарий                                           |
|----------------|-----------|-------------------------------------------------------|
| `for`          | ⚡⚡⚡       | Самый быстрый, прямой доступ к индексам               |
| `while`        | ⚡⚡⚡       | Аналогично for, если правильно написан                |
| `for...of`     | ⚡⚡        | Немного медленнее из-за итератора                     |
| `forEach()`    | ⚡⚡        | Вызов функции на каждой итерации                      |
| `for...in`     | ⚡         | Самый медленный, проверяет цепочку прототипов         |

**Рекомендации:**
- Для критичной производительности: используйте `for` или `while`
- Для обычного кода: используйте `for...of` или `forEach()` (читаемость важнее)
- Избегайте `for...in` для массивов

## Выбор цикла: блок-схема

```
Нужно перебрать массив/строку?
├─ Да → Нужен break/continue?
│       ├─ Да → for...of
│       └─ Нет → forEach() или map/filter
│
└─ Нет → Это объект?
         ├─ Да → for...in (с hasOwnProperty)
         │       или Object.keys/values/entries + for...of
         │
         └─ Нет → Известно количество итераций?
                  ├─ Да → for
                  └─ Нет → while или do...while
```

## Частые паттерны

### Найти элемент и остановиться
```javascript
// ❌ Плохо
let found;
array.forEach(item => {
  if (item.id === targetId) {
    found = item;
  }
});

// ✅ Хорошо
const found = array.find(item => item.id === targetId);

// ✅ Или с циклом
let found;
for (const item of array) {
  if (item.id === targetId) {
    found = item;
    break;
  }
}
```

### Итерация с индексом
```javascript
// ✅ Классический for
for (let i = 0; i < array.length; i++) {
  console.log(i, array[i]);
}

// ✅ for...of с entries
for (const [index, value] of array.entries()) {
  console.log(index, value);
}

// ✅ forEach
array.forEach((value, index) => {
  console.log(index, value);
});
```

### Вложенные циклы
```javascript
// Матрица
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    console.log(matrix[i][j]);
  }
}

// С метками (labels) для break внешнего цикла
outer: for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    if (i * j > 10) break outer; // Выход из обоих циклов
    console.log(i, j);
  }
}
```

## Подводные камни

❌ **for...in для массивов**
```javascript
const arr = [1, 2, 3];
arr.custom = 'prop';

for (const i in arr) {
  console.log(i); // '0', '1', '2', 'custom' - нежелательно!
}
```

❌ **Изменение массива во время forEach**
```javascript
const arr = [1, 2, 3];
arr.forEach((item, i) => {
  if (item === 2) arr.splice(i, 1); // Может пропустить элементы!
});
```

❌ **Забытый инкремент в while**
```javascript
let i = 0;
while (i < 5) {
  console.log(i);
  // Забыли i++ → бесконечный цикл!
}
```

✅ **Правильный подход**
```javascript
// Используйте for...of или filter
const arr = [1, 2, 3];
const filtered = arr.filter(item => item !== 2);

// Или обратный for для удаления
for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] === 2) arr.splice(i, 1);
}
```
