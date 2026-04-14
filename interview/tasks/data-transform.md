# Трансформация данных

## Задача 14 — Плоский массив в дерево ⭐⭐⭐⭐

Преобразуй плоский массив объектов в дерево на основе `id` / `parentId`.

```js
const items = [
  { id: 1, parentId: null },
  { id: 2, parentId: 1 },
  { id: 3, parentId: 1 },
  { id: 4, parentId: 2 },
];

function buildTree(items) {
  // твой код
}

// Ожидаемый результат:
// [
//   {
//     id: 1, parentId: null,
//     children: [
//       { id: 2, parentId: 1, children: [
//           { id: 4, parentId: 2, children: [] }
//         ]
//       },
//       { id: 3, parentId: 1, children: [] }
//     ]
//   }
// ]
```

<details>
<summary>Ответ</summary>

**Ответ:**

```js
function buildTree(items) {
  const map = {};
  const roots = [];

  for (const item of items) {
    map[item.id] = { ...item, children: [] };
  }

  for (const item of items) {
    if (item.parentId === null) {
      roots.push(map[item.id]);
    } else {
      map[item.parentId].children.push(map[item.id]);
    }
  }

  return roots;
}
```

**Почему так:**

Алгоритм за O(n):
1. Первый проход — индексируем все узлы по `id`, добавляем пустой `children`.
2. Второй проход — если `parentId === null`, это корень. Иначе находим родителя по `map[parentId]` и добавляем в его `children`.

</details>

---

## Задача 15 — Реализуй pipe ⭐⭐⭐⭐

Напиши функцию `pipe(f1, f2, ...fn)` — композиция функций слева направо. Каждая функция принимает результат предыдущей.

```js
function pipe(...fns) {
  // твой код
}

// Пример:
const process = pipe(
  (x) => x + 1,
  (x) => x * 2,
  (x) => x - 3
);

console.log(process(5)); // ((5+1)*2)-3 = 9
console.log(process(0)); // ((0+1)*2)-3 = -1
```

<details>
<summary>Ответ</summary>

**Ответ:**

```js
function pipe(...fns) {
  return function (value) {
    return fns.reduce((acc, fn) => fn(acc), value);
  };
}
```

**Почему так:**

`pipe` — левая-правая композиция. Каждая следующая функция получает результат предыдущей.

- `fns.reduce((acc, fn) => fn(acc), value)` — начинаем с `value`, применяем функции по очереди.
- `compose` — наоборот (справа налево): `const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)`

</details>

---
