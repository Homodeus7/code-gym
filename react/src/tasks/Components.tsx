import React from "react";

// ============================================================
// Задача 1: Props — карточка пользователя
// ============================================================
// TODO: Создай компонент UserCard, который принимает props:
// name (string), age (number), role (string), avatarUrl? (string).
// Выведи их в красивой карточке. avatarUrl — необязательный.
type UserCardProps = {
  // TODO: объяви типы всех пропсов
};

function UserCard(_props: UserCardProps) {
  // TODO: деструктурируй props и выведи данные
  return (
    <div className="card">
      <p>Реализуй компонент UserCard</p>
    </div>
  );
}

function Task1() {
  return (
    <div className="task">
      <h3>Задача 1: Props — карточка пользователя</h3>
      <p>Объяви TypeScript-типы для пропсов и выведи данные карточки.</p>
      {/* TODO: передай нужные props */}
      <UserCard />
    </div>
  );
}

// ============================================================
// Задача 2: children — обёртка-контейнер
// ============================================================
// TODO: Создай компонент Card, который принимает children и title.
// Оберни children в div с рамкой. title — заголовок карточки.
type CardProps = {
  // TODO: добавь children и title
};

function Card(_props: CardProps) {
  // TODO: реализуй разметку
  return <div>Реализуй Card с children</div>;
}

function Task2() {
  return (
    <div className="task">
      <h3>Задача 2: children — обёртка-контейнер</h3>
      <p>Используй React.ReactNode для типизации children.</p>
      {/* TODO: используй Card с дочерними элементами */}
      <Card>
        <p>Вложенный контент</p>
        <button>Кнопка внутри</button>
      </Card>
    </div>
  );
}

// ============================================================
// Задача 3: Composition — список с рендер-элементом
// ============================================================
// TODO: Создай компонент List<T>, который принимает items и renderItem.
// renderItem — функция, которая получает элемент и возвращает JSX.
type ListProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

function List<T>({ items, renderItem }: ListProps<T>) {
  // TODO: пройдись по items и вызови renderItem для каждого
  return <ul>{/* TODO */}</ul>;
}

type Product = { id: number; name: string; price: number };
const products: Product[] = [
  { id: 1, name: "Ноутбук", price: 80000 },
  { id: 2, name: "Мышь", price: 2500 },
  { id: 3, name: "Клавиатура", price: 5000 },
];

function Task3() {
  return (
    <div className="task">
      <h3>Задача 3: Composition — generic список</h3>
      <p>
        Передай renderItem как функцию, возвращающую JSX для каждого элемента.
      </p>
      <List
        items={products}
        renderItem={(product, i) => (
          // TODO: выведи порядковый номер, name и price
          <li key={product.id}>#{i + 1} — реализуй вывод</li>
        )}
      />
    </div>
  );
}

// ============================================================
// Задача 4: Default props и необязательные пропсы
// ============================================================
// TODO: Создай компонент Button с пропсами:
// label (string), variant ('primary' | 'secondary' | 'danger'), disabled? (boolean).
// Задай variant по умолчанию = 'primary'.
type ButtonProps = {
  label: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onClick?: () => void;
};

function StyledButton({
  label,
  variant = "primary",
  disabled = false,
  onClick,
}: ButtonProps) {
  const colors: Record<string, string> = {
    // TODO: задай цвета для каждого variant
    primary: "",
    secondary: "",
    danger: "",
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        backgroundColor: colors[variant],
        // TODO: добавь стили: padding, color, border, cursor
      }}
    >
      {label}
    </button>
  );
}

function Task4() {
  return (
    <div className="task">
      <h3>Задача 4: Пропсы по умолчанию и union-типы</h3>
      <p>Создай кнопку с вариантами стилей через union-тип для variant.</p>
      <div className="task-controls">
        <StyledButton label="Основная" />
        <StyledButton label="Вторичная" variant="secondary" />
        <StyledButton label="Опасная" variant="danger" />
        <StyledButton label="Отключена" disabled />
      </div>
    </div>
  );
}

// ============================================================
// Задача 5: Prop drilling и передача callback
// ============================================================
// TODO: Есть три уровня: Parent → Middle → Child.
// В Parent хранится selectedId. Child рендерит кнопки и вызывает onSelect.
// Пробрось onSelect и selectedId через Middle в Child без изменений.

type ChildProps = {
  selectedId: number | null;
  onSelect: (id: number) => void;
};

function ChildComponent({ selectedId, onSelect }: ChildProps) {
  const items = [1, 2, 3];
  return (
    <div>
      {items.map((id) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          style={{
            fontWeight: selectedId === id ? "bold" : "normal",
            margin: "4px",
          }}
        >
          Вариант {id}
        </button>
      ))}
    </div>
  );
}

type MiddleProps = {
  // TODO: объяви пропсы для Middle (selectedId и onSelect)
};

function MiddleComponent(_props: MiddleProps) {
  // TODO: пробрось props в ChildComponent
  return (
    <div style={{ border: "1px dashed gray", padding: "8px" }}>
      <p>Middle (посредник)</p>
      {/* TODO: <ChildComponent ... /> */}
    </div>
  );
}

function Task5() {
  const [selectedId, setSelectedId] = React.useState<number | null>(null);

  return (
    <div className="task">
      <h3>Задача 5: Prop drilling — передача через несколько уровней</h3>
      <p>Пробрось selectedId и onSelect через Middle в Child.</p>
      <p>Выбрано: {selectedId ?? "ничего"}</p>
      {/* TODO: <MiddleComponent ... /> */}
      <MiddleComponent />
    </div>
  );
}

// ============================================================
// Задача 6: Компонент с рендер-пропом (render prop)
// ============================================================
// TODO: Создай компонент Toggle, который управляет булевым состоянием
// и передаёт { isOn, toggle } в render-проп children.
type ToggleChildrenProps = { isOn: boolean; toggle: () => void };
type ToggleProps = {
  children: (props: ToggleChildrenProps) => React.ReactNode;
};

function Toggle({ children }: ToggleProps) {
  const [isOn, setIsOn] = React.useState(false);
  // TODO: верни children({ isOn, toggle: () => setIsOn(v => !v) })
  return <>{/* TODO */}</>;
}

function Task6() {
  return (
    <div className="task">
      <h3>Задача 6: Render prop — паттерн Toggle</h3>
      <p>
        Компонент Toggle управляет состоянием и передаёт его через children как
        функцию.
      </p>
      <Toggle>
        {({ isOn, toggle }) => (
          <div>
            <p>Состояние: {isOn ? "Включено" : "Выключено"}</p>
            <button onClick={toggle}>{isOn ? "Выключить" : "Включить"}</button>
          </div>
        )}
      </Toggle>
    </div>
  );
}

// ============================================================
// Главный компонент раздела
// ============================================================
export default function Components() {
  return (
    <div className="section">
      <h2>Компоненты</h2>
      <p className="section-desc">props, children, composition, render props</p>
      <Task1 />
      <Task2 />
      <Task3 />
      <Task4 />
      <Task5 />
      <Task6 />
    </div>
  );
}
