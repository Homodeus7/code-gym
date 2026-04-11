# React Performance — Шпаргалка

## Когда React рендерит компонент

Компонент перерендеривается когда:
1. Изменился его **state** (через useState / useReducer)
2. Изменились его **props**
3. Перерендерился **родитель** (даже если props не изменились!)
4. Изменился **context**, на который подписан компонент

```
Родитель рендерится → все дочерние рендерятся (по умолчанию)
                                    ↑
                      Это можно оптимизировать
```

---

## React.memo

Мемоизирует компонент: пропускает рендер если пропсы не изменились (поверхностное сравнение).

```tsx
// Без memo: рендерится каждый раз при рендере родителя
function ExpensiveList({ items }: { items: string[] }) { ... }

// С memo: рендерится только если items изменился
const ExpensiveList = React.memo(function ExpensiveList({ items }: { items: string[] }) { ... })

// Кастомный компаратор (для объектных пропсов)
const Chart = React.memo(
  function Chart({ data, config }: ChartProps) { ... },
  (prevProps, nextProps) =>
    prevProps.data === nextProps.data &&
    prevProps.config.color === nextProps.config.color
)
```

**Когда использовать memo:**
- Компонент рендерится часто и его рендер дорогой
- Пропсы редко меняются
- Родитель рендерится часто по причинам, не связанным с этим компонентом

**Когда НЕ нужен memo:**
- Простые компоненты (рендер дешевле чем сравнение пропсов)
- Пропсы меняются при каждом рендере родителя (memo не поможет)
- Компонент почти никогда не перерендеривается

---

## useCallback

Мемоизирует функцию — возвращает одну и ту же ссылку пока не изменятся зависимости.

```tsx
// Проблема: handleAdd — новая функция каждый рендер → кнопка всегда перерендеривается
function Parent() {
  const [count, setCount] = useState(0)
  const handleAdd = () => setCount(c => c + 1)  // новая функция каждый рендер!
  return <MemoButton onClick={handleAdd} />
}

// Решение: стабильная ссылка на функцию
function Parent() {
  const [count, setCount] = useState(0)
  const handleAdd = useCallback(() => setCount(c => c + 1), [])  // [] = никогда не пересоздаётся
  return <MemoButton onClick={handleAdd} />
}
```

**Зависимости useCallback:**
```tsx
// Пересоздаётся только при смене userId
const fetchUser = useCallback(() => {
  getUser(userId)
}, [userId])
```

**Правило:** `useCallback` имеет смысл только если функция передаётся в:
- `React.memo`-компонент
- зависимости другого `useEffect` / `useCallback` / `useMemo`

---

## useMemo

Мемоизирует результат вычисления — пересчитывает только при изменении зависимостей.

```tsx
// Без useMemo: getPrimes вызывается при каждом рендере
const primes = getPrimes(limit)

// С useMemo: только при изменении limit
const primes = useMemo(() => getPrimes(limit), [limit])

// Мемоизация объекта/массива для стабильной ссылки (context value, config)
const contextValue = useMemo(
  () => ({ theme, locale, user }),
  [theme, locale, user]
)

// Фильтрация/сортировка больших списков
const sortedAndFiltered = useMemo(
  () => items
    .filter(item => item.name.includes(search))
    .sort((a, b) => a.name.localeCompare(b.name)),
  [items, search]
)
```

**Когда НЕ нужен useMemo:**
- Простые вычисления (сложение, конкатенация строк)
- Массив/объект, который не передаётся в memo-компоненты или хуки
- Преждевременная оптимизация "на всякий случай"

---

## Сравнение трёх инструментов

| | `React.memo` | `useCallback` | `useMemo` |
|---|---|---|---|
| Что мемоизирует | Компонент целиком | Функцию | Вычисленное значение |
| Где применяется | Объявление компонента | Внутри компонента | Внутри компонента |
| Сравнение | Props (поверхностно) | Зависимости | Зависимости |

---

## Типичные антипаттерны

```tsx
// Антипаттерн 1: объект в JSX создаётся заново каждый рендер
// → memo-дочерний компонент перерендеривается всегда!
<Child style={{ color: 'red' }} />  // новый объект каждый рендер

// Исправление:
const style = useMemo(() => ({ color: 'red' }), [])
<Child style={style} />

// Антипаттерн 2: анонимная функция в JSX
<Child onClick={() => handleClick(id)} />  // новая функция каждый рендер

// Исправление:
const handleChildClick = useCallback(() => handleClick(id), [id])
<Child onClick={handleChildClick} />

// Антипаттерн 3: memo без useCallback (не работает!)
const MemoChild = React.memo(Child)
// Но передаём нестабильную функцию — memo бесполезен
<MemoChild onClick={() => doSomething()} />
```

---

## Профилирование

```tsx
// React DevTools Profiler — лучший инструмент
// Запись → взаимодействие → анализ flame graph

// Измерение в коде
console.time('render')
// ... операция
console.timeEnd('render')

// Принудительный перерендер для тестирования
import { Profiler } from 'react'

<Profiler id="List" onRender={(id, phase, actualDuration) => {
  console.log(`${id} (${phase}): ${actualDuration.toFixed(2)}мс`)
}}>
  <ExpensiveList />
</Profiler>
```

---

## Чеклист оптимизации

1. **Сначала измерь** — React DevTools Profiler
2. **Вынеси компоненты** — разбей крупный компонент на мелкие
3. **Подними или опусти state** — чем ближе к использованию, тем меньше рендеров
4. **React.memo** — для дорогих дочерних компонентов
5. **useCallback** — для функций, передаваемых в memo-компоненты
6. **useMemo** — для дорогих вычислений
7. **Virtualization** — react-virtual / TanStack Virtual для длинных списков
8. **Lazy loading** — `React.lazy` + `Suspense` для разделения кода
