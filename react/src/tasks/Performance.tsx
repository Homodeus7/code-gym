import React, { useState, useCallback, useMemo, memo } from "react";

// ============================================================
// Задача 1: React.memo — предотвращение лишних рендеров
// ============================================================
// TODO: Оберни компонент ExpensiveChild в React.memo.
// Без memo он рендерится при каждом изменении родителя.
// С memo — только когда изменяются его пропсы.

let childRenderCount = 0;

type ExpensiveChildProps = {
  name: string;
};

// TODO: оберни в React.memo
function ExpensiveChild({ name }: ExpensiveChildProps) {
  childRenderCount++;
  return (
    <div className="card">
      <p>Дочерний компонент: {name}</p>
      <p>
        Рендеров дочернего: <strong>{childRenderCount}</strong>
      </p>
    </div>
  );
}

function Task1() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("Алиса");

  return (
    <div className="task">
      <h3>Задача 1: React.memo</h3>
      <p>
        Счётчик меняется, но дочерний компонент не должен перерендериваться если
        name не изменился.
      </p>
      <div className="task-controls">
        <button onClick={() => setCount((c) => c + 1)}>
          Родительский счётчик: {count}
        </button>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="task-input"
          placeholder="Имя..."
        />
      </div>
      <ExpensiveChild name={name} />
    </div>
  );
}

// ============================================================
// Задача 2: useCallback — стабилизация функций
// ============================================================
// TODO: Без useCallback функция onAdd пересоздаётся при каждом рендере,
// что приводит к лишнему рендеру мемоизированного дочернего компонента.
// Оберни onAdd в useCallback.

let btnRenderCount = 0;

type AddButtonProps = {
  onAdd: () => void;
};

const AddButton = memo(function AddButton({ onAdd }: AddButtonProps) {
  btnRenderCount++;
  return (
    <div className="card">
      <p>
        AddButton рендеров: <strong>{btnRenderCount}</strong>
      </p>
      <button onClick={onAdd}>Добавить</button>
    </div>
  );
});

function Task2() {
  const [items, setItems] = useState<string[]>([]);
  const [filter, setFilter] = useState("");

  // TODO: оберни в useCallback чтобы AddButton не ререндерился при смене filter
  const handleAdd = () => {
    setItems((prev) => [...prev, `Элемент ${prev.length + 1}`]);
  };

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <div className="task">
      <h3>Задача 2: useCallback — стабильная функция</h3>
      <p>
        При вводе в фильтр AddButton не должен перерендериваться (функция не
        меняется).
      </p>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="task-input"
        placeholder="Фильтр..."
      />
      <AddButton onAdd={handleAdd} />
      <ul>
        {filtered.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// Задача 3: useMemo — тяжёлое вычисление
// ============================================================
// TODO: Вычисление простых чисел в диапазоне [2..limit] — дорогая операция.
// Оберни getPrimes(limit) в useMemo, чтобы не считать при каждом рендере.

function getPrimes(limit: number): number[] {
  const primes: number[] = [];
  for (let i = 2; i <= limit; i++) {
    let isPrime = true;
    for (let j = 2; j < i; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) primes.push(i);
  }
  return primes;
}

function Task3() {
  const [limit, setLimit] = useState(50);
  const [unrelated, setUnrelated] = useState(0);

  // TODO: оберни в useMemo — пересчёт только при смене limit
  const primes = getPrimes(limit);

  return (
    <div className="task">
      <h3>Задача 3: useMemo — кэширование вычисления</h3>
      <p>
        Простые числа пересчитываются только при смене лимита, не при других
        изменениях.
      </p>
      <div className="task-controls">
        <label>
          Лимит: {limit}
          <input
            type="range"
            min={10}
            max={200}
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          />
        </label>
        <button onClick={() => setUnrelated((c) => c + 1)}>
          Несвязанный счётчик: {unrelated}
        </button>
      </div>
      <p>
        Найдено простых: <strong>{primes.length}</strong>
      </p>
      <p style={{ fontSize: "0.85em", wordBreak: "break-all" }}>
        {primes.slice(0, 30).join(", ")}
        {primes.length > 30 ? "..." : ""}
      </p>
    </div>
  );
}

// ============================================================
// Задача 4: useMemo — производный стейт
// ============================================================
// TODO: Есть список задач. Вычисли статистику (всего, выполнено, осталось)
// через useMemo — пересчёт только при изменении tasks.

type Task = { id: number; text: string; done: boolean };

function Task4() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Купить молоко", done: false },
    { id: 2, text: "Написать код", done: true },
    { id: 3, text: "Прочитать книгу", done: false },
  ]);
  const [newTask, setNewTask] = useState("");

  // TODO: оберни в useMemo
  const stats = {
    total: tasks.length,
    done: tasks.filter((t) => t.done).length,
    left: tasks.filter((t) => !t.done).length,
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), text: newTask, done: false },
    ]);
    setNewTask("");
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  };

  return (
    <div className="task">
      <h3>Задача 4: useMemo — производная статистика</h3>
      <p>
        Статистика пересчитывается только при изменении tasks через useMemo.
      </p>
      <div className="task-controls">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          className="task-input"
          placeholder="Новая задача..."
        />
        <button onClick={addTask}>Добавить</button>
      </div>
      <p>
        Всего: {stats.total} | Выполнено: {stats.done} | Осталось: {stats.left}
      </p>
      <ul>
        {tasks.map((t) => (
          <li
            key={t.id}
            onClick={() => toggleTask(t.id)}
            style={{
              cursor: "pointer",
              textDecoration: t.done ? "line-through" : "none",
            }}
          >
            {t.done ? "✓" : "○"} {t.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ============================================================
// Задача 5: Сравнение с кастомным компаратором в memo
// ============================================================
// TODO: Передаём объект как проп. Без кастомного компаратора memo не поможет,
// потому что объект пересоздаётся при каждом рендере.
// Передай второй аргумент в React.memo — функцию сравнения.

type Config = { color: string; size: number };

type ConfigDisplayProps = {
  config: Config;
};

// TODO: передай второй аргумент в React.memo для глубокого сравнения
let configRenderCount = 0;
const ConfigDisplay = memo(function ConfigDisplay({
  config,
}: ConfigDisplayProps) {
  configRenderCount++;
  return (
    <div
      className="card"
      style={{ backgroundColor: config.color, padding: "12px" }}
    >
      <p>
        ConfigDisplay рендеров: <strong>{configRenderCount}</strong>
      </p>
      <p>
        Цвет: {config.color}, Размер: {config.size}
      </p>
    </div>
  );
});
// Подсказка: React.memo(Component, (prev, next) => prev.config.color === next.config.color && ...)

function Task5() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState("#ffccaa");
  const [size, setSize] = useState(16);

  // Объект пересоздаётся каждый рендер — memo без компаратора не поможет
  const config: Config = { color, size };

  return (
    <div className="task">
      <h3>Задача 5: React.memo с кастомным компаратором</h3>
      <p>
        Передай второй аргумент в React.memo для ручного сравнения объектных
        пропсов.
      </p>
      <div className="task-controls">
        <button onClick={() => setCount((c) => c + 1)}>Счётчик: {count}</button>
        <label>
          Цвет:
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <label>
          Размер: {size}
          <input
            type="range"
            min={8}
            max={32}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </label>
      </div>
      <ConfigDisplay config={config} />
    </div>
  );
}

// ============================================================
// Главный компонент раздела
// ============================================================
export default function Performance() {
  return (
    <div className="section">
      <h2>Производительность</h2>
      <p className="section-desc">React.memo, useCallback, useMemo</p>
      <Task1 />
      <Task2 />
      <Task3 />
      <Task4 />
      <Task5 />
    </div>
  );
}
