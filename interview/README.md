# Mock Interview — JavaScript + HTTP

Материалы для самостоятельной подготовки к техническому собеседованию.

## Структура

```
interview/
├── theory/   — вопросы с ответами по темам (читать и повторять)
└── tasks/    — практические задачи с ответами под спойлером
```

**Порядок прохождения:**

1. `theory/js-types.md` → `tasks/types-coercion.md`
2. `theory/js-this.md` → `tasks/this-context.md`
3. `theory/js-closures.md` → `tasks/closures-scope.md`
4. `theory/js-prototypes.md`
5. `theory/js-async.md` → `tasks/event-loop.md`
6. `theory/http.md`
7. `theory/general.md`
8. `tasks/functions.md` → `tasks/objects-cloning.md` → `tasks/array-methods.md` → `tasks/data-transform.md`

---

## Алгоритм прохождения coding interview

1. **Уточни задачу** — переспроси edge-cases, ограничения по входным данным, ожидаемый формат вывода. Не приступай к коду сразу.
2. **Проговори подход вслух** — опиши идею словами до написания кода. Интервьюер должен понять твой ход мысли.
3. **Оцени сложность** — назови O(n) по времени и памяти ещё до реализации, сравни альтернативы.
4. **Пиши итеративно** — сначала brute-force, потом оптимизируй. Рабочее решение лучше незаконченного идеального.
5. **Называй переменные осмысленно** — избегай `a`, `b`, `x`. Код должен читаться как текст.
6. **Проверь вручную на примерах** — пройдись по своему коду с конкретным входом, включая пустой массив, ноль, отрицательные числа.
7. **Сам найди проблемы** — скажи «я вижу, что здесь может быть проблема с...» раньше, чем это скажет интервьюер. Это показывает зрелость.

---

## Темы

### theory/

| Файл               | Темы                                                          |
| ------------------ | ------------------------------------------------------------- |
| `js-types.md`      | NaN, null/undefined, parseInt, type coercion, truthy/falsy    |
| `js-this.md`       | this, стрелочные функции, call/apply/bind, потеря контекста   |
| `js-closures.md`   | Замыкания, цикл + setTimeout, IIFE, каррирование              |
| `js-prototypes.md` | Прототипная цепочка, `__proto__` vs `prototype`, class        |
| `js-async.md`      | Promise, async/await, Promise.all/allSettled/race/any         |
| `http.md`          | Методы, статусы, CORS, кэширование, Cookie vs Storage, HTTP/2 |
| `general.md`       | REST, XSS, CSRF                                               |

### tasks/

| Файл                 | Задачи                             | Сложность       |
| -------------------- | ---------------------------------- | --------------- |
| `types-coercion.md`  | typeof, сравнение, parseInt        | ⭐⭐            |
| `closures-scope.md`  | var/let в цикле с setTimeout       | ⭐⭐            |
| `this-context.md`    | this в разных контекстах           | ⭐⭐            |
| `functions.md`       | debounce, throttle                 | ⭐⭐⭐          |
| `objects-cloning.md` | deepClone, memoize                 | ⭐⭐⭐          |
| `event-loop.md`      | Event Loop, microtask vs macrotask | ⭐⭐⭐–⭐⭐⭐⭐ |
| `array-methods.md`   | Реализация map, filter, reduce     | ⭐⭐⭐⭐        |
| `data-transform.md`  | buildTree, pipe                    | ⭐⭐⭐⭐        |
