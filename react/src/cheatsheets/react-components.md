# React Components — Шпаргалка

## Props и TypeScript

```tsx
// Базовый компонент с типизированными пропсами
type ButtonProps = {
  label: string
  variant?: 'primary' | 'secondary' | 'danger'  // union type
  disabled?: boolean                              // необязательный
  onClick?: () => void
}

function Button({ label, variant = 'primary', disabled = false, onClick }: ButtonProps) {
  return <button disabled={disabled} onClick={onClick}>{label}</button>
}
```

### Пропсы с children

```tsx
// React.ReactNode — любой JSX-контент
type CardProps = {
  title: string
  children: React.ReactNode
}

function Card({ title, children }: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  )
}

// Использование
<Card title="Привет">
  <p>Любой вложенный контент</p>
</Card>
```

### Типы для children

| Тип | Описание |
|---|---|
| `React.ReactNode` | Любой JSX: строки, числа, JSX, null, массивы |
| `React.ReactElement` | Только JSX-элемент (не строка, не null) |
| `React.FC<Props>` | Функциональный компонент (не рекомендуется в React 18+) |

---

## Generic компоненты

```tsx
type ListProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  keyExtractor: (item: T) => string | number
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={keyExtractor(item)}>{renderItem(item, i)}</li>
      ))}
    </ul>
  )
}

// Использование — TypeScript выводит T автоматически
<List
  items={[{ id: 1, name: 'Ноутбук' }]}
  keyExtractor={item => item.id}
  renderItem={item => <span>{item.name}</span>}
/>
```

---

## Composition patterns

### Render prop

```tsx
type ToggleProps = {
  children: (props: { isOn: boolean; toggle: () => void }) => React.ReactNode
}

function Toggle({ children }: ToggleProps) {
  const [isOn, setIsOn] = useState(false)
  return <>{children({ isOn, toggle: () => setIsOn(v => !v) })}</>
}

// Использование
<Toggle>
  {({ isOn, toggle }) => (
    <button onClick={toggle}>{isOn ? 'Вкл' : 'Выкл'}</button>
  )}
</Toggle>
```

### Compound components (составные компоненты)

```tsx
// Родительский компонент с контекстом
const TabsContext = createContext<{ active: string; setActive: (id: string) => void } | null>(null)

function Tabs({ children, defaultTab }: { children: React.ReactNode; defaultTab: string }) {
  const [active, setActive] = useState(defaultTab)
  return <TabsContext.Provider value={{ active, setActive }}>{children}</TabsContext.Provider>
}

function Tab({ id, label }: { id: string; label: string }) {
  const ctx = useContext(TabsContext)!
  return <button onClick={() => ctx.setActive(id)} style={{ fontWeight: ctx.active === id ? 'bold' : 'normal' }}>{label}</button>
}

function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const ctx = useContext(TabsContext)!
  return ctx.active === id ? <div>{children}</div> : null
}

// Неймспейс для удобства
Tabs.Tab = Tab
Tabs.Panel = TabPanel

// Использование
<Tabs defaultTab="home">
  <Tabs.Tab id="home" label="Главная" />
  <Tabs.Tab id="about" label="О нас" />
  <Tabs.Panel id="home"><p>Главная страница</p></Tabs.Panel>
  <Tabs.Panel id="about"><p>О нас</p></Tabs.Panel>
</Tabs>
```

---

## forwardRef

Позволяет родителю получить доступ к DOM-элементу дочернего компонента.

```tsx
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => (
  <div>
    {label && <label>{label}</label>}
    <input ref={ref} {...props} />
  </div>
))

Input.displayName = 'Input' // для DevTools

// Использование
const inputRef = useRef<HTMLInputElement>(null)
<Input ref={inputRef} label="Поиск" placeholder="Введи текст..." />
// Теперь можно: inputRef.current?.focus()
```

---

## Spread props и HTMLAttributes

```tsx
// Принимаем все стандартные атрибуты button + свои
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary'
}

function Button({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} ${className ?? ''}`}
      {...rest} // передаём onClick, disabled, type и т.д.
    >
      {children}
    </button>
  )
}
```

---

## Условный рендеринг

```tsx
// Оператор &&  (осторожно: 0 отрендерится как "0"!)
{isLoggedIn && <Dashboard />}
{count > 0 && <p>{count} элементов</p>}  // безопасно (булевое условие)

// Тернарный оператор
{isLoggedIn ? <Dashboard /> : <Login />}

// Ранний возврат
function Component({ isLoading }: { isLoading: boolean }) {
  if (isLoading) return <Spinner />
  return <Content />
}
```

---

## Ключи (key) в списках

```tsx
// Правильно: уникальный стабильный ключ
{items.map(item => <Item key={item.id} {...item} />)}

// Неправильно: индекс (при сортировке/удалении ломает state)
{items.map((item, i) => <Item key={i} {...item} />)}  // избегай
```
