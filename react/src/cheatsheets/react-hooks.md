# React Hooks — Шпаргалка

## useState

Хранит локальное состояние компонента. При изменении вызывает перерендер.

```tsx
const [count, setCount] = useState(0)
const [user, setUser] = useState<User | null>(null)

// Ленивая инициализация (функция вызывается только при монтировании)
const [data, setData] = useState(() => JSON.parse(localStorage.getItem('data') ?? 'null'))

// Функциональное обновление (использует предыдущее значение)
setCount(prev => prev + 1)

// Обновление объекта (spread обязателен — не мутируем state!)
setUser(prev => ({ ...prev, name: 'Алиса' }))
```

**Правила:**
- Никогда не мутируй state напрямую: `state.value = x` — неправильно
- Для объектов и массивов всегда создавай новые копии

---

## useEffect

Синхронизация с внешними системами: fetch, subscriptions, таймеры, DOM.

```tsx
// Запускается после каждого рендера
useEffect(() => { console.log('render') })

// Только при монтировании (пустой массив зависимостей)
useEffect(() => {
  fetchData()
}, [])

// При изменении userId
useEffect(() => {
  fetchUser(userId)
}, [userId])

// С cleanup — очистка при размонтировании или перед следующим запуском
useEffect(() => {
  const id = setInterval(() => tick(), 1000)
  return () => clearInterval(id) // cleanup
}, [])

// AbortController для отмены fetch
useEffect(() => {
  const controller = new AbortController()
  fetch(url, { signal: controller.signal })
    .then(res => res.json())
    .then(setData)
    .catch(err => { if (err.name !== 'AbortError') setError(err.message) })
  return () => controller.abort()
}, [url])
```

**Когда НЕ нужен useEffect:**
- Вычисление значений из state/props — используй `useMemo` или просто вычисляй в теле компонента
- Обработка событий — обрабатывай прямо в event handler

---

## useRef

Хранит мутируемое значение, которое НЕ вызывает перерендер при изменении.

```tsx
// Ссылка на DOM-элемент
const inputRef = useRef<HTMLInputElement>(null)
inputRef.current?.focus()

// Хранение значения без перерендера (например, предыдущее значение)
const prevCountRef = useRef(0)
useEffect(() => {
  prevCountRef.current = count
})

// Хранение таймера
const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
timerRef.current = setInterval(tick, 1000)
clearInterval(timerRef.current ?? undefined)
```

**ref vs state:**
| | `useRef` | `useState` |
|---|---|---|
| Вызывает рендер | Нет | Да |
| Доступ | `.current` | напрямую |
| Когда использовать | DOM, таймеры, предыдущие значения | UI-данные |

---

## useReducer

Альтернатива useState для сложной логики состояния.

```tsx
type State = { count: number; error: string | null }
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_ERROR'; payload: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT': return { ...state, count: state.count + 1 }
    case 'DECREMENT': return { ...state, count: state.count - 1 }
    case 'SET_ERROR': return { ...state, error: action.payload }
    default: return state
  }
}

const [state, dispatch] = useReducer(reducer, { count: 0, error: null })

dispatch({ type: 'INCREMENT' })
dispatch({ type: 'SET_ERROR', payload: 'Ошибка!' })
```

**Когда useReducer лучше useState:**
- Много взаимосвязанных полей в state
- Следующий state зависит от предыдущего
- Логика обновления сложная

---

## useContext

Читает значение из ближайшего Provider выше в дереве.

```tsx
const ThemeContext = createContext<'light' | 'dark'>('light')

// В Provider
<ThemeContext.Provider value="dark">
  <App />
</ThemeContext.Provider>

// В потребителе
const theme = useContext(ThemeContext)
```

---

## useCallback

Мемоизирует функцию — возвращает ту же ссылку при повторных рендерах.

```tsx
// Без useCallback: handleClick — новая функция каждый рендер
// С useCallback: handleClick стабильна, пока не изменится userId

const handleClick = useCallback(() => {
  fetchUser(userId)
}, [userId]) // пересоздаётся только когда изменится userId
```

**Нужен когда:** функция передаётся в `React.memo`-компонент или является зависимостью другого хука.

---

## useMemo

Мемоизирует результат вычисления.

```tsx
// Пересчитывается только при изменении items или filter
const filteredItems = useMemo(
  () => items.filter(item => item.name.includes(filter)),
  [items, filter]
)

// Мемоизация объекта для стабильной ссылки
const config = useMemo(
  () => ({ theme, locale }),
  [theme, locale]
)
```

---

## useId

Генерирует уникальный id, стабильный между рендерами (React 18+).

```tsx
function FormField({ label }: { label: string }) {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} />
    </div>
  )
}
```

---

## Правила хуков

1. Вызывай хуки только на верхнем уровне компонента (не внутри if/for/функций)
2. Вызывай хуки только из функциональных компонентов или кастомных хуков
3. Кастомный хук — обычная функция, имя которой начинается с `use`
