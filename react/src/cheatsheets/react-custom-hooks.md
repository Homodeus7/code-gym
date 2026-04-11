# React Custom Hooks — Шпаргалка

## Паттерн кастомного хука

Кастомный хук — обычная JavaScript-функция, имя которой начинается с `use`.
Внутри можно использовать другие хуки. Логика изолирована и переиспользуется.

```
Компонент A  ──┐
               ├── useMyHook() ── [useState, useEffect, ...]
Компонент B  ──┘
```

**Структура хука:**
```tsx
function useMyHook(param: ParamType): ReturnType {
  // 1. Состояние
  const [state, setState] = useState(initialValue)

  // 2. Эффекты
  useEffect(() => {
    // логика
    return () => { /* cleanup */ }
  }, [param])

  // 3. Обработчики
  const handleSomething = useCallback(() => {
    setState(...)
  }, [])

  // 4. Возврат
  return { state, handleSomething }
}
```

---

## useCounter

```tsx
function useCounter(initialValue: number = 0, { min = -Infinity, max = Infinity } = {}) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => setCount(c => Math.min(max, c + 1)), [max])
  const decrement = useCallback(() => setCount(c => Math.max(min, c - 1)), [min])
  const reset = useCallback(() => setCount(initialValue), [initialValue])
  const set = useCallback((value: number) => setCount(Math.min(max, Math.max(min, value))), [min, max])

  return { count, increment, decrement, reset, set }
}

// Использование
const { count, increment, decrement, reset } = useCounter(0, { min: 0, max: 10 })
```

---

## useToggle

```tsx
function useToggle(initial: boolean = false) {
  const [value, setValue] = useState(initial)

  const toggle = useCallback(() => setValue(v => !v), [])
  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])

  return [value, toggle, setTrue, setFalse] as const
}

// Использование
const [isOpen, toggle, open, close] = useToggle()
```

---

## useLocalStorage

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue(prev => {
      const next = typeof value === 'function' ? (value as (prev: T) => T)(prev) : value
      try {
        localStorage.setItem(key, JSON.stringify(next))
      } catch {
        console.error('localStorage недоступен')
      }
      return next
    })
  }, [key])

  const remove = useCallback(() => {
    localStorage.removeItem(key)
    setStoredValue(initialValue)
  }, [key, initialValue])

  return [storedValue, setValue, remove] as const
}

// Использование
const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'light')
```

---

## useDebounce

```tsx
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Использование: поиск срабатывает через 500мс после остановки ввода
const [query, setQuery] = useState('')
const debouncedQuery = useDebounce(query, 500)

useEffect(() => {
  if (debouncedQuery) searchAPI(debouncedQuery)
}, [debouncedQuery])
```

---

## useFetch

```tsx
type FetchState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: false, error: null })

  useEffect(() => {
    if (!url) return
    const controller = new AbortController()
    setState({ data: null, loading: true, error: null })

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json() as Promise<T>
      })
      .then(data => setState({ data, loading: false, error: null }))
      .catch(err => {
        if (err.name !== 'AbortError') {
          setState({ data: null, loading: false, error: err.message })
        }
      })

    return () => controller.abort()
  }, [url])

  return state
}

// Использование
const { data, loading, error } = useFetch<User[]>('/api/users')
```

---

## useClickOutside

```tsx
function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void
) {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback()
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [ref, callback])
}

// Использование — закрытие выпадающего меню
const menuRef = useRef<HTMLDivElement>(null)
const close = useCallback(() => setIsOpen(false), [])
useClickOutside(menuRef, close)
```

---

## usePrevious

```tsx
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined)
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

// Использование
const prevCount = usePrevious(count)
console.log(`Было: ${prevCount}, стало: ${count}`)
```

---

## useWindowSize

```tsx
function useWindowSize() {
  const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  useEffect(() => {
    const handler = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  return size
}
```

---

## Советы

- Хук возвращает **объект** если полей много, **массив** (как useState) если их 2-3
- Используй `useCallback` для стабилизации функций, возвращаемых из хука
- Не забывай про **cleanup** в useEffect внутри хуков
- Хуки легко **комбинируются**: `useFetch` + `useDebounce` + `useLocalStorage`
