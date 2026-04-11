# Map и Set — краткий гайд

---

## MAP

Map — коллекция ключ-значение. Ключ может быть **любого типа** (объект, функция, примитив).

### Создание

```js
const map = new Map();

// Из массива пар
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
```

### Основные методы

| Метод              | Что делает                              |
| ------------------ | --------------------------------------- |
| `map.set(k, v)`    | Добавить/обновить пару                  |
| `map.get(k)`       | Получить значение по ключу              |
| `map.has(k)`       | Проверить наличие ключа → `true/false`  |
| `map.delete(k)`    | Удалить по ключу                        |
| `map.clear()`      | Очистить всё                            |
| `map.size`         | Количество пар (свойство, не метод!)    |

### Итерация

```js
map.keys()    // итератор ключей
map.values()  // итератор значений
map.entries() // итератор [key, value]

for (const [k, v] of map) { ... }      // то же что entries()
map.forEach((v, k) => { ... })         // ВАЖНО: сначала value, потом key!
```

### Map ↔ Object ↔ Array

```js
// Object → Map
const map = new Map(Object.entries(obj));

// Map → Object
const obj = Object.fromEntries(map);

// Map → Array пар
const arr = [...map];             // [[k,v], ...]
const keys = [...map.keys()];
const vals = [...map.values()];
```

### Типичный паттерн — подсчёт частоты

```js
function frequency(arr) {
  const map = new Map();
  for (const item of arr) {
    map.set(item, (map.get(item) ?? 0) + 1);
  }
  return map;
}
// frequency([1,2,2,3]) → Map { 1→1, 2→2, 3→1 }
```

### Типичный паттерн — группировка

```js
function groupBy(arr, keyFn) {
  const map = new Map();
  for (const item of arr) {
    const k = keyFn(item);
    if (!map.has(k)) map.set(k, []);
    map.get(k).push(item);
  }
  return map;
}
```

### Когда использовать Map вместо Object

- Ключи не строки (числа, объекты)
- Нужен порядок вставки (Map гарантирует, plain object — нет в старых средах)
- Часто добавляешь/удаляешь пары
- Нужен `.size`

---

## SET

Set — коллекция **уникальных** значений. Порядок вставки сохраняется.

### Создание

```js
const set = new Set();
const set = new Set([1, 2, 2, 3]); // → Set {1, 2, 3}
```

### Основные методы

| Метод           | Что делает                             |
| --------------- | -------------------------------------- |
| `set.add(v)`    | Добавить элемент (дубли игнорируются)  |
| `set.has(v)`    | Проверить наличие → `true/false` O(1)  |
| `set.delete(v)` | Удалить элемент                        |
| `set.clear()`   | Очистить всё                           |
| `set.size`      | Количество элементов                   |

### Итерация

```js
for (const v of set) { ... }
set.forEach((v) => { ... })
[...set]  // → массив
```

### Set ↔ Array

```js
// Array → Set (удалить дубли)
const unique = [...new Set(arr)];

// Set → Array
const arr = Array.from(set);
```

### Операции над множествами

```js
const a = new Set([1, 2, 3]);
const b = new Set([2, 3, 4]);

// Объединение (union)
const union = new Set([...a, ...b]);           // {1,2,3,4}

// Пересечение (intersection)
const inter = new Set([...a].filter(x => b.has(x)));  // {2,3}

// Разность (difference) — в a, но не в b
const diff = new Set([...a].filter(x => !b.has(x)));  // {1}

// Симметричная разность — в одном, но не в обоих
const sym = new Set(
  [...a, ...b].filter(x => !(a.has(x) && b.has(x)))
);  // {1,4}
```

### Типичные паттерны

```js
// Проверка уникальности всех элементов
const allUnique = arr.length === new Set(arr).size;

// Удалить дубли из строки
const unique = [...new Set("abracadabra")].join(""); // "abrcd"

// Посещённые вершины (BFS/DFS)
const visited = new Set();
visited.add(node);
if (!visited.has(next)) { ... }
```

---

## WeakMap / WeakSet — коротко

- Ключи (WeakMap) / элементы (WeakSet) — только **объекты**
- Не мешают сборщику мусора (weak reference)
- Нет итерации, нет `.size`
- Используются для приватных данных объектов и кэширования без утечек

```js
const cache = new WeakMap();
function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  const result = heavyCalc(obj);
  cache.set(obj, result);
  return result;
}
```

---

## Сравнение Map vs Object

| | Map | Object |
|---|---|---|
| Ключи | любой тип | строка / Symbol |
| Порядок | гарантирован | гарантирован (ES2015+) |
| Размер | `.size` | `Object.keys().length` |
| Итерация | for…of напрямую | нужен Object.entries() |
| JSON | ❌ (нужно вручную) | ✅ JSON.stringify |
| Производительность | лучше при частых add/delete | лучше для статичных данных |

## Сравнение Set vs Array

| | Set | Array |
|---|---|---|
| Уникальность | автоматически | вручную |
| `.has()` | O(1) | O(n) |
| Индекс | ❌ | ✅ |
| Порядок | вставки | позиции |
| Дубли | нет | есть |
