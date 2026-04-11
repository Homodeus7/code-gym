# Code Gym

Практика JavaScript/TypeScript через задачи — Vanilla JS, Vue 3, React.

## Структура

```
draft/
├── vanillajs/        # чистый JS/TS — алгоритмы, структуры данных
│   ├── tasks/        # задачи по темам
│   └── cheatsheets/  # шпаргалки
├── vue/              # задачи в контексте Vue 3
│   ├── src/tasks/
│   └── src/cheatsheets/
├── react/            # задачи в контексте React
│   ├── src/tasks/
│   └── src/cheatsheets/
├── package.json
└── pnpm-workspace.yaml
```

## Запуск

```bash
pnpm vue        # Vue 3 dev server
pnpm react      # React dev server
```

```bash
# vanillajs — запуск конкретного файла
cd vanillajs
pnpm task tasks/arrays.js
```

## Vanillajs — задачи

| Файл            | Тема          |
| --------------- | ------------- |
| `arrays.js`     | Массивы       |
| `strings.js`    | Строки        |
| `objects.js`    | Объекты       |
| `map-set.js`    | Map и Set     |
| `algorithms.js` | Алгоритмы     |
| `closures.js`   | Замыкания     |
| `recursion.js`  | Рекурсия      |
| `emitter.js`    | Event Emitter |

## Vanillajs — шпаргалки

| Файл                          | Тема                 |
| ----------------------------- | -------------------- |
| `array-methods-cheatsheet.md` | Методы массивов      |
| `loops-cheatsheet.md`         | Циклы                |
| `big-o-cheatsheet.md`         | Сложность алгоритмов |
| `recursion-guide.md`          | Рекурсия             |
| `typescript-types-guide.md`   | TypeScript типы      |

## Vue — задачи

| Файл             | Тема                                      |
| ---------------- | ----------------------------------------- |
| `reactivity.js`  | Реактивность: ref, reactive, computed     |
| `components.js`  | Компоненты, props, emits                  |
| `composables.js` | Composables / useXxx                      |
| `directives.js`  | v-if, v-for, v-model, кастомные директивы |
| `lifecycle.js`   | Хуки жизненного цикла                     |
| `pinia.js`       | Pinia — стейт менеджмент                  |

## React — задачи

| Файл               | Тема                                 |
| ------------------ | ------------------------------------ |
| `hooks.tsx`        | useState, useEffect, useRef, useMemo |
| `components.tsx`   | Компоненты, props, children          |
| `custom-hooks.tsx` | Кастомные хуки                       |
| `context.tsx`      | Context API                          |
| `performance.tsx`  | memo, useCallback, useMemo           |
| `forms.tsx`        | Управляемые формы                    |
