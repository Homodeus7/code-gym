import React, { createContext, useContext, useState, useReducer } from "react";

// ============================================================
// Задача 1: Базовый useContext — тема приложения
// ============================================================
// TODO: Создай контекст ThemeContext с типом 'light' | 'dark'.
// Создай ThemeProvider, который хранит тему в useState.
// Создай хук useTheme() для удобного доступа к контексту.

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

// TODO: создай ThemeContext через createContext
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  const toggleTheme = () => {
    // TODO: переключи тему между 'light' и 'dark'
  };

  // TODO: оберни children в ThemeContext.Provider и передай value
  return <>{children}</>;
}

function useTheme() {
  const ctx = useContext(ThemeContext);
  // TODO: если ctx === undefined — выброси ошибку (хук используется вне Provider)
  if (!ctx)
    throw new Error("useTheme должен использоваться внутри ThemeProvider");
  return ctx;
}

function ThemeDisplay() {
  const { theme, toggleTheme } = useTheme();
  const style: React.CSSProperties = {
    padding: "12px",
    background: theme === "dark" ? "#333" : "#fff",
    color: theme === "dark" ? "#fff" : "#333",
    borderRadius: "6px",
    border: "1px solid #ccc",
  };
  return (
    <div style={style}>
      <p>
        Текущая тема: <strong>{theme}</strong>
      </p>
      <button onClick={toggleTheme}>Переключить тему</button>
    </div>
  );
}

function Task1() {
  return (
    <div className="task">
      <h3>Задача 1: createContext + useContext — тема</h3>
      <p>Создай Provider для темы и получай её через кастомный хук useTheme.</p>
      {/* TODO: оберни ThemeDisplay в ThemeProvider */}
      <ThemeProvider>
        <ThemeDisplay />
      </ThemeProvider>
    </div>
  );
}

// ============================================================
// Задача 2: Context с несколькими потребителями
// ============================================================
// TODO: Создай UserContext с именем пользователя.
// Потребители — Header и Sidebar должны оба отображать имя.
// Смена имени в одном месте обновляет оба.

type UserContextType = {
  username: string;
  setUsername: (name: string) => void;
};

// TODO: создай UserContext
const UserContext = createContext<UserContextType | undefined>(undefined);

function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error("useUser должен использоваться внутри UserProvider");
  return ctx;
}

function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("Гость");
  // TODO: передай username и setUsername в контекст
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
}

function UserHeader() {
  const { username } = useUser();
  return (
    <div className="card">
      Шапка: Привет, <strong>{username}</strong>!
    </div>
  );
}

function UserSidebar() {
  const { username, setUsername } = useUser();
  return (
    <div className="card">
      <p>Боковая панель: {username}</p>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="task-input"
        placeholder="Изменить имя..."
      />
    </div>
  );
}

function Task2() {
  return (
    <div className="task">
      <h3>Задача 2: Context с несколькими потребителями</h3>
      <p>
        UserHeader и UserSidebar — оба читают из одного контекста. Измени имя в
        sidebar.
      </p>
      <UserProvider>
        <UserHeader />
        <UserSidebar />
      </UserProvider>
    </div>
  );
}

// ============================================================
// Задача 3: Context + useReducer — корзина
// ============================================================
// TODO: Вынеси логику корзины в контекст.
// CartContext хранит items[] и предоставляет dispatch.
// Любой дочерний компонент может добавлять/удалять товары.

type CartItem = { id: number; name: string; price: number };
type CartState = { items: CartItem[] };
type CartAction =
  | { type: "ADD"; item: CartItem }
  | { type: "REMOVE"; id: number };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD":
      // TODO: добавь item если его ещё нет
      return state;
    case "REMOVE":
      // TODO: удали по id
      return state;
    default:
      return state;
  }
}

type CartContextType = {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx)
    throw new Error("useCart должен использоваться внутри CartProvider");
  return ctx;
}

function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  // TODO: передай state и dispatch в контекст
  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

const SHOP_ITEMS: CartItem[] = [
  { id: 1, name: "Книга", price: 500 },
  { id: 2, name: "Ручка", price: 50 },
  { id: 3, name: "Блокнот", price: 150 },
];

function ShopCatalog() {
  const { dispatch } = useCart();
  return (
    <div>
      <strong>Каталог:</strong>
      <div className="task-controls">
        {SHOP_ITEMS.map((item) => (
          <button key={item.id} onClick={() => dispatch({ type: "ADD", item })}>
            + {item.name} ({item.price}₽)
          </button>
        ))}
      </div>
    </div>
  );
}

function ShopCart() {
  const { state, dispatch } = useCart();
  return (
    <div>
      <strong>Корзина ({state.items.length}):</strong>
      <ul>
        {state.items.map((item) => (
          <li key={item.id}>
            {item.name} — {item.price}₽
            <button
              onClick={() => dispatch({ type: "REMOVE", id: item.id })}
              style={{ marginLeft: "8px" }}
            >
              ✕
            </button>
          </li>
        ))}
        {state.items.length === 0 && <li>Корзина пуста</li>}
      </ul>
    </div>
  );
}

function Task3() {
  return (
    <div className="task">
      <h3>Задача 3: Context + useReducer — корзина</h3>
      <p>
        Каталог и корзина — разные компоненты, но оба используют CartContext.
      </p>
      <CartProvider>
        <ShopCatalog />
        <ShopCart />
      </CartProvider>
    </div>
  );
}

// ============================================================
// Задача 4: Вложенные провайдеры — композиция контекстов
// ============================================================
// TODO: Создай NotificationContext для показа уведомлений.
// Любой компонент может вызвать notify('Сообщение').
// Уведомления отображаются в NotificationList вверху.

type Notification = { id: number; message: string };
type NotificationContextType = {
  notifications: Notification[];
  notify: (message: string) => void;
  dismiss: (id: number) => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx)
    throw new Error(
      "useNotification должен использоваться внутри NotificationProvider",
    );
  return ctx;
}

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const notify = (message: string) => {
    // TODO: добавь уведомление с уникальным id
  };

  const dismiss = (id: number) => {
    // TODO: удали уведомление по id
  };

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
}

function NotificationList() {
  const { notifications, dismiss } = useNotification();
  if (notifications.length === 0) return null;
  return (
    <div style={{ position: "relative", marginBottom: "8px" }}>
      {notifications.map((n) => (
        <div
          key={n.id}
          className="card"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {n.message}
          <button onClick={() => dismiss(n.id)}>✕</button>
        </div>
      ))}
    </div>
  );
}

function NotifyButtons() {
  const { notify } = useNotification();
  return (
    <div className="task-controls">
      <button onClick={() => notify("Операция выполнена успешно!")}>
        Успех
      </button>
      <button onClick={() => notify("Произошла ошибка!")}>Ошибка</button>
      <button onClick={() => notify("Обновление доступно")}>Инфо</button>
    </div>
  );
}

function Task4() {
  return (
    <div className="task">
      <h3>Задача 4: NotificationContext — глобальные уведомления</h3>
      <p>notify() доступен в любом дочернем компоненте через контекст.</p>
      <NotificationProvider>
        <NotificationList />
        <NotifyButtons />
      </NotificationProvider>
    </div>
  );
}

// ============================================================
// Главный компонент раздела
// ============================================================
export default function Context() {
  return (
    <div className="section">
      <h2>Context API</h2>
      <p className="section-desc">
        createContext, useContext, Provider, вложенные контексты
      </p>
      <Task1 />
      <Task2 />
      <Task3 />
      <Task4 />
    </div>
  );
}
