// ========================================
// ПРАКТИКА: Закрепление TypeScript
// ========================================

// ── 1. Record ────────────────────────────────────────────────────────────────

// Задача 1.1 — Record
// Опиши тип ScoreBoard — словарь где ключ это имя игрока (строка),
// а значение — счёт (число)
// Типизируй функцию getTopPlayer: принимает ScoreBoard,
// возвращает имя игрока с наибольшим счётом
type ScoreBoard = Record<string, number>;

function getTopPlayer(board: ScoreBoard): string {
  return Object.entries(board).reduce((top, [name, score]) => 
    score > top[1] ? [name, score] : top
  )[0]
}

function getTopPlayer2(board: ScoreBoard): string {
  let topName = ''
  let topScore = -Infinity
  for (const [name, score] of Object.entries(board)) {
    if (score > topScore) {
      topScore = score
      topName = name
    }
  } 
  return topName
}

// getTopPlayer({ Alice: 120, Bob: 95, Carol: 140 }) → "Carol"

// Задача 1.2 — Record с union-ключами
// Опиши тип HttpStatus — словарь где ключи только "ok" | "notFound" | "error",
// а значения — числа
type HttpStatus = Record</* твой код */>;

const statuses: HttpStatus = {
  ok: 200,
  notFound: 404,
  error: 500,
};

// ── 2. Readonly ───────────────────────────────────────────────────────────────

// Задача 2.1 — Readonly поля
// Опиши тип Point: readonly x (число), readonly y (число)
// Напиши функцию translate: принимает Point и смещения dx, dy,
// возвращает НОВУЮ точку (не мутируя оригинал)
type Point = {
  // твой код
};

function translate(p: Point, dx: number, dy: number): Point {
  // твой код
}

// translate({ x: 1, y: 2 }, 3, 4) → { x: 4, y: 6 }

// Задача 2.2 — Readonly объект
// Опиши тип AppConfig: readonly apiUrl (строка), readonly timeout (число),
// retries (число, можно менять)
// Убедись что TypeScript запрещает менять apiUrl и timeout
type AppConfig = {
  // твой код
};

// ── 3. Discriminated union ────────────────────────────────────────────────────

// Задача 3.1 — Discriminated union
// Опиши тип Notification с полем kind:
//   "email"   — поля: to (строка), subject (строка)
//   "sms"     — поля: phone (строка)
//   "push"    — поля: deviceId (строка), title (строка)
// Напиши функцию send(n: Notification): string — возвращает описание отправки
type Notification =
  // твой код

function send(n: Notification): string {
  // твой код
}

// send({ kind: "email", to: "a@b.com", subject: "Hi" }) → "Email to a@b.com: Hi"
// send({ kind: "sms", phone: "+7999" })                  → "SMS to +7999"
// send({ kind: "push", deviceId: "abc", title: "Hey" })  → "Push to abc: Hey"

// Задача 3.2 — Discriminated union результат
// Опиши тип Result<T>:
//   success: true  — поле value (T)
//   success: false — поле error (строка)
// Напиши функцию unwrap<T>(r: Result<T>): T
// Если success: false — бросает ошибку с текстом из error
type Result<T> =
  // твой код

function unwrap<T>(r: Result<T>): T {
  // твой код
}

// unwrap({ success: true, value: 42 })          → 42
// unwrap({ success: false, error: "Not found" }) → throws "Not found"

// ── 4. Type guard ─────────────────────────────────────────────────────────────

// Задача 4.1 — Type guard
// Опиши интерфейс Product: id (число), name (строка), price (число)
// Напиши type guard isProduct(val: unknown): val is Product
interface Product {
  // твой код
}

function isProduct(val: unknown): val is Product {
  // твой код
}

// isProduct({ id: 1, name: "book", price: 10 }) → true
// isProduct({ id: 1, name: "book" })             → false (нет price)
// isProduct(null)                                → false

// Задача 4.2 — Type guard с union
// Напиши type guard isStringArray(val: unknown): val is string[]
// Массив строк — каждый элемент должен быть строкой
function isStringArray(val: unknown): val is string[] {
  // твой код
}

// isStringArray(["a", "b", "c"]) → true
// isStringArray(["a", 1, "c"])   → false
// isStringArray("abc")           → false

// ── 5. Generics ───────────────────────────────────────────────────────────────

// Задача 5.1 — Generic last
// Напиши функцию last<T> — возвращает последний элемент массива или undefined
function last(/* твой код */) {
  // твой код
}

// last([1, 2, 3])    → 3  (тип: number | undefined)
// last(["a", "b"])   → "b" (тип: string | undefined)
// last([])           → undefined

// Задача 5.2 — Generic pair
// Напиши функцию pair<A, B> — принимает два значения, возвращает кортеж [A, B]
function pair(/* твой код */) {
  // твой код
}

// pair(1, "hello")   → [1, "hello"]  (тип: [number, string])
// pair(true, 42)     → [true, 42]    (тип: [boolean, number])

// Задача 5.3 — Generic с ограничением
// Напиши функцию pluck<T, K extends keyof T>
// Принимает массив объектов и название поля, возвращает массив значений этого поля
function pluck(/* твой код */) {
  // твой код
}

// pluck([{ name: "Alice", age: 30 }, { name: "Bob", age: 25 }], "name")
// → ["Alice", "Bob"]  (тип: string[])

// ── 6. ReturnType и as const ──────────────────────────────────────────────────

// Задача 6.1 — ReturnType
// Напиши функцию createUser(name: string, role: string)
// которая возвращает { id: number, name: string, role: string, createdAt: Date }
// Выведи тип User через ReturnType — без ручного описания
function createUser(name: string, role: string) {
  // твой код
}

type User = /* твой код */;

// Задача 6.2 — as const + литеральные типы
// Создай массив ROLES с вариантами "admin" | "editor" | "viewer"
// Выведи тип Role из массива
// Напиши функцию hasAccess(role: Role, resource: string): boolean —
// admin имеет доступ всегда, editor — только к "posts", viewer — никогда
const ROLES = /* твой код */;
type Role = /* твой код */;

function hasAccess(role: Role, resource: string): boolean {
  // твой код
}

// hasAccess("admin", "settings")  → true
// hasAccess("editor", "posts")    → true
// hasAccess("editor", "settings") → false
// hasAccess("viewer", "posts")    → false

// Задача 6.3 — as const объект
// Создай объект COLORS as const с полями:
//   primary: "#3B82F6", secondary: "#6B7280", danger: "#EF4444"
// Выведи тип ColorKey (ключи объекта) и ColorValue (значения)
const COLORS = /* твой код */;
type ColorKey = /* твой код */;
type ColorValue = /* твой код */;
