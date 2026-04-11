import { useState, useEffect, useCallback, useRef } from "react";

// ============================================================
// Задача 1: useCounter — хук счётчика
// ============================================================
// TODO: Реализуй хук useCounter(initialValue: number).
// Возвращает: { count, increment, decrement, reset }
function useCounter(_initialValue: number = 0) {
  // TODO: объяви состояние count
  // TODO: реализуй increment, decrement, reset

  return {
    count: 0, // TODO: заменить на реальное значение
    increment: () => {},
    decrement: () => {},
    reset: () => {},
  };
}

function Task1() {
  const { count, increment, decrement, reset } = useCounter(5);

  return (
    <div className="task">
      <h3>Задача 1: useCounter</h3>
      <p>Создай хук useCounter с начальным значением и методами управления.</p>
      <div className="task-controls">
        <button onClick={decrement}>−</button>
        <span className="task-value">{count}</span>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Сброс</button>
      </div>
    </div>
  );
}

// ============================================================
// Задача 2: useToggle — хук переключателя
// ============================================================
// TODO: Реализуй хук useToggle(initial: boolean = false).
// Возвращает: [value, toggle, setTrue, setFalse]
function useToggle(
  _initial: boolean = false,
): [boolean, () => void, () => void, () => void] {
  // TODO: реализуй хук
  return [false, () => {}, () => {}, () => {}];
}

function Task2() {
  const [isOpen, toggle, open, close] = useToggle(false);

  return (
    <div className="task">
      <h3>Задача 2: useToggle</h3>
      <p>
        Хук для управления булевым флагом с методами toggle, setTrue, setFalse.
      </p>
      <div className="task-controls">
        <button onClick={toggle}>Переключить</button>
        <button onClick={open}>Открыть</button>
        <button onClick={close}>Закрыть</button>
      </div>
      <p>
        Состояние: <strong>{isOpen ? "Открыто" : "Закрыто"}</strong>
      </p>
    </div>
  );
}

// ============================================================
// Задача 3: useLocalStorage — хук для localStorage
// ============================================================
// TODO: Реализуй хук useLocalStorage<T>(key: string, initialValue: T).
// При монтировании читает из localStorage, при изменении — сохраняет.
// Возвращает: [storedValue, setValue]
function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // TODO: попробуй прочитать из localStorage, иначе верни initialValue
    return initialValue;
  });

  const setValue = (value: T) => {
    // TODO: сохрани value в localStorage и обнови состояние
    setStoredValue(value);
  };

  return [storedValue, setValue];
}

function Task3() {
  const [username, setUsername] = useLocalStorage("ls-username", "");
  const [theme, setTheme] = useLocalStorage<"light" | "dark">(
    "ls-theme",
    "light",
  );

  return (
    <div className="task">
      <h3>Задача 3: useLocalStorage</h3>
      <p>
        Данные сохраняются в localStorage и восстанавливаются после
        перезагрузки.
      </p>
      <div className="task-controls">
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Имя пользователя..."
          className="task-input"
        />
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as "light" | "dark")}
        >
          <option value="light">Светлая</option>
          <option value="dark">Тёмная</option>
        </select>
      </div>
      <p>
        Привет, {username || "..."} | Тема: {theme}
      </p>
    </div>
  );
}

// ============================================================
// Задача 4: useDebounce — хук задержки значения
// ============================================================
// TODO: Реализуй хук useDebounce<T>(value: T, delay: number): T.
// Возвращает значение, которое обновляется только через delay мс после последнего изменения.
function useDebounce<T>(value: T, _delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // TODO: установи setTimeout, который обновит debouncedValue через delay
    // TODO: верни clearTimeout в cleanup
    setDebouncedValue(value); // убери эту строку когда реализуешь
  }, [value, _delay]);

  return debouncedValue;
}

function Task4() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);

  return (
    <div className="task">
      <h3>Задача 4: useDebounce</h3>
      <p>Значение обновляется только через 500мс после остановки ввода.</p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Введи текст..."
        className="task-input"
      />
      <p>Мгновенное: "{query}"</p>
      <p>С задержкой: "{debouncedQuery}"</p>
    </div>
  );
}

// ============================================================
// Задача 5: useFetch — хук для загрузки данных
// ============================================================
// TODO: Реализуй хук useFetch<T>(url: string).
// Возвращает: { data, loading, error }
// Используй AbortController для отмены запроса при смене url или размонтировании.
type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    // TODO: создай AbortController
    // TODO: установи loading: true
    // TODO: сделай fetch(url, { signal })
    // TODO: при успехе — установи data
    // TODO: при ошибке — установи error (проверь что не AbortError)
    // TODO: верни () => controller.abort() как cleanup
  }, [url]);

  return state;
}

type Post = { id: number; title: string; body: string };

function Task5() {
  const [postId, setPostId] = useState(1);
  const { data, loading, error } = useFetch<Post>(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );

  return (
    <div className="task">
      <h3>Задача 5: useFetch</h3>
      <p>
        Загружает данные с API, поддерживает отмену запроса через
        AbortController.
      </p>
      <div className="task-controls">
        <button onClick={() => setPostId((id) => Math.max(1, id - 1))}>
          ← Предыдущий
        </button>
        <span>Пост #{postId}</span>
        <button onClick={() => setPostId((id) => Math.min(100, id + 1))}>
          Следующий →
        </button>
      </div>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{ color: "red" }}>Ошибка: {error}</p>}
      {data && (
        <div className="card">
          <strong>{data.title}</strong>
          <p>{data.body}</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Задача 6: useClickOutside — клик вне элемента
// ============================================================
// TODO: Реализуй хук useClickOutside(ref, callback).
// Вызывает callback когда пользователь кликает вне элемента ref.
function useClickOutside(
  ref: React.RefObject<HTMLElement | null>,
  callback: () => void,
) {
  useEffect(() => {
    const handler = (event: MouseEvent) => {
      // TODO: если ref.current существует и не содержит event.target — вызови callback
    };

    // TODO: подпишись на document mousedown
    // TODO: верни функцию отписки

    return () => document.removeEventListener("mousedown", handler);
  }, [ref, callback]);
}

function Task6() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(menuRef, close);

  return (
    <div className="task">
      <h3>Задача 6: useClickOutside</h3>
      <p>Меню закрывается при клике вне его области.</p>
      <button onClick={() => setIsOpen((v) => !v)}>Открыть меню</button>
      {isOpen && (
        <div
          ref={menuRef}
          className="card"
          style={{ display: "inline-block", marginLeft: "8px" }}
        >
          <p>Я — выпадающее меню</p>
          <p>Кликни снаружи чтобы закрыть</p>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Главный компонент раздела
// ============================================================
export default function CustomHooks() {
  return (
    <div className="section">
      <h2>Кастомные хуки</h2>
      <p className="section-desc">
        useCounter, useToggle, useLocalStorage, useDebounce, useFetch,
        useClickOutside
      </p>
      <Task1 />
      <Task2 />
      <Task3 />
      <Task4 />
      <Task5 />
      <Task6 />
    </div>
  );
}
