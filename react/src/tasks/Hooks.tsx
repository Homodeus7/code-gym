import { useState, useEffect, useRef, useReducer } from "react";

// ============================================================
// Задача 1: useState — счётчик с ограничением
// ============================================================
// TODO: Реализуй счётчик, который нельзя уменьшить ниже 0
// и нельзя увеличить выше 10. Добавь кнопку сброса.
function Task1() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // TODO: увеличить count, но не выше 10
  };

  const decrement = () => {
    // TODO: уменьшить count, но не ниже 0
  };

  const reset = () => {
    // TODO: сбросить count до 0
  };

  return (
    <div className="task">
      <h3>Задача 1: useState — счётчик с ограничением [0..10]</h3>
      <p>Реализуй increment/decrement/reset с ограничением диапазона.</p>
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
// Задача 2: useState — переключение темы
// ============================================================
// TODO: Реализуй переключение между светлой и тёмной темой.
// Используй булевое состояние. Измени стиль блока в зависимости от темы.
function Task2() {
  const [isDark, setIsDark] = useState(false);

  const toggle = () => {
    // TODO: переключить isDark
  };

  const style: React.CSSProperties = {
    // TODO: задай background и color в зависимости от isDark
    padding: "12px",
    borderRadius: "6px",
    transition: "all 0.3s",
  };

  return (
    <div className="task">
      <h3>Задача 2: useState — переключение темы</h3>
      <p>Переключай тему блока через булевое состояние.</p>
      <div style={style}>Текущая тема: {isDark ? "тёмная" : "светлая"}</div>
      <button onClick={toggle} style={{ marginTop: "8px" }}>
        Переключить
      </button>
    </div>
  );
}

// ============================================================
// Задача 3: useEffect — таймер
// ============================================================
// TODO: Запусти таймер с помощью useEffect.
// Каждую секунду увеличивай seconds на 1.
// Добавь кнопки старт/стоп. Не забудь очистить интервал в cleanup!
function Task3() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    // TODO: установи setInterval, который каждую секунду увеличивает seconds
    // TODO: верни функцию очистки clearInterval
  }, [isRunning]);

  return (
    <div className="task">
      <h3>Задача 3: useEffect — таймер</h3>
      <p>Запусти/останови таймер через useEffect с cleanup.</p>
      <div className="task-value">{seconds}с</div>
      <div className="task-controls">
        <button onClick={() => setIsRunning(true)}>Старт</button>
        <button onClick={() => setIsRunning(false)}>Стоп</button>
        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
        >
          Сброс
        </button>
      </div>
    </div>
  );
}

// ============================================================
// Задача 4: useEffect — синхронизация с localStorage
// ============================================================
// TODO: При каждом изменении name сохраняй его в localStorage под ключом 'user-name'.
// При монтировании — считывай сохранённое значение из localStorage.
function Task4() {
  const [name, setName] = useState("");

  useEffect(() => {
    // TODO: прочитай значение из localStorage и установи в name
  }, []);

  useEffect(() => {
    // TODO: сохраняй name в localStorage при каждом изменении
  }, [name]);

  return (
    <div className="task">
      <h3>Задача 4: useEffect — синхронизация с localStorage</h3>
      <p>Имя сохраняется и восстанавливается при перезагрузке страницы.</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Введи имя..."
        className="task-input"
      />
      <p>Привет, {name || "..."}</p>
    </div>
  );
}

// ============================================================
// Задача 5: useRef — фокус на инпуте
// ============================================================
// TODO: При нажатии кнопки «Фокус» программно установи фокус на поле ввода.
// Используй useRef для хранения ссылки на DOM-элемент.
function Task5() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    // TODO: вызови .focus() на inputRef.current
  };

  return (
    <div className="task">
      <h3>Задача 5: useRef — фокус на инпуте</h3>
      <p>По кнопке программно переводи фокус на поле ввода.</p>
      <div className="task-controls">
        <input
          ref={inputRef}
          className="task-input"
          placeholder="Кликни 'Фокус'..."
        />
        <button onClick={focusInput}>Фокус</button>
      </div>
    </div>
  );
}

// ============================================================
// Задача 6: useRef — хранение предыдущего значения
// ============================================================
// TODO: Используй useRef для хранения предыдущего значения счётчика.
// ref не вызывает перерендер — идеально для «прошлого» значения.
function Task6() {
  const [count, setCount] = useState(0);
  const prevCountRef = useRef<number>(0);

  useEffect(() => {
    // TODO: сохраняй предыдущее значение count в prevCountRef.current
  });

  return (
    <div className="task">
      <h3>Задача 6: useRef — предыдущее значение</h3>
      <p>Отображай текущее и предыдущее значение счётчика через useRef.</p>
      <p>
        Текущее: {count} | Предыдущее: {prevCountRef.current}
      </p>
      <div className="task-controls">
        <button onClick={() => setCount((c) => c - 1)}>−</button>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
      </div>
    </div>
  );
}

// ============================================================
// Задача 7: useReducer — корзина покупок
// ============================================================
// TODO: Реализуй простую корзину через useReducer.
// Действия: ADD_ITEM, REMOVE_ITEM, CLEAR_CART
type CartItem = { id: number; name: string; qty: number };
type CartState = { items: CartItem[] };
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      // TODO: добавь товар или увеличь qty если уже есть
      return state;
    case "REMOVE_ITEM":
      // TODO: удали товар по id
      return state;
    case "CLEAR_CART":
      // TODO: очисти корзину
      return state;
    default:
      return state;
  }
}

const PRODUCTS = [
  { id: 1, name: "Яблоко", qty: 1 },
  { id: 2, name: "Банан", qty: 1 },
  { id: 3, name: "Апельсин", qty: 1 },
];

function Task7() {
  const [cart, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <div className="task">
      <h3>Задача 7: useReducer — корзина покупок</h3>
      <p>Добавляй/удаляй товары через dispatch и reducer.</p>
      <div className="task-controls">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            onClick={() => dispatch({ type: "ADD_ITEM", payload: p })}
          >
            + {p.name}
          </button>
        ))}
        <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
          Очистить
        </button>
      </div>
      <ul>
        {cart.items.map((item) => (
          <li key={item.id}>
            {item.name} × {item.qty}
            <button
              onClick={() =>
                dispatch({ type: "REMOVE_ITEM", payload: item.id })
              }
            >
              ✕
            </button>
          </li>
        ))}
        {cart.items.length === 0 && <li>Корзина пуста</li>}
      </ul>
    </div>
  );
}

// ============================================================
// Главный компонент раздела
// ============================================================
export default function Hooks() {
  return (
    <div className="section">
      <h2>Хуки React</h2>
      <p className="section-desc">useState, useEffect, useRef, useReducer</p>
      <Task1 />
      <Task2 />
      <Task3 />
      <Task4 />
      <Task5 />
      <Task6 />
      <Task7 />
    </div>
  );
}
