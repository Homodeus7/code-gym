// ========================================
// ЗАДАЧИ: Типизация TypeScript
// ========================================
// Гайд: cheatsheets/typescript-types-guide.md

// ── 1. Базовые типы и объекты ────────────────────────────────────────────────

// Задача 1.1 — Типизируй функцию
// greet("Alice") → "Hello, Alice!"
// Добавь типы параметра и возврата
function greet(name: string) : string {
  return `Hello, ${name}!`;
}

// Задача 1.2 — Опишите интерфейс User
// У пользователя есть id (число), name (строка), email (строка, необязательно)
// Типизируй функцию formatUser — она принимает User и возвращает строку "id: 1 | Alice"
interface User {
  id: string
  name: string
}

function formatUser(user: User): string {
  return `id: ${user.id} | ${user.name}`;
}

// Задача 1.3 — Readonly объект
// Опиши тип Config: host (строка), port (число), readonly debug (boolean)
// При попытке изменить debug TypeScript должен выдавать ошибку
type Config = {
  // твой код
};

// Задача 1.4 — Record
// Напиши тип Inventory — словарь где ключ это название продукта (строка),
// а значение — количество (число)
// Типизируй функцию getStock, которая принимает Inventory и название,
// возвращает количество или 0 если нет
type Inventory = Record</* твой код */>;

function getStock(inv: Inventory, name: string): number {
  return inv[name] ?? 0;
}

// ── 2. Union и сужение типов ─────────────────────────────────────────────────

// Задача 2.1 — Union тип
// Напиши функцию stringify: принимает string | number | boolean,
// всегда возвращает строку
function stringify(val: /* твой код */): string {
  // твой код
}

// stringify(42)    → "42"
// stringify(true)  → "true"
// stringify("hi")  → "hi"

// Задача 2.2 — Discriminated union
// Есть три фигуры: circle (radius), rectangle (width, height), triangle (base, height)
// Опиши тип Shape как discriminated union с полем kind
// Напиши функцию area(shape: Shape): number
type Shape =
  // твой код

function area(shape: Shape): number {
  // твой код
}

// area({ kind: "circle", radius: 5 })              → ~78.54
// area({ kind: "rectangle", width: 4, height: 3 }) → 12
// area({ kind: "triangle", base: 6, height: 4 })   → 12

// Задача 2.3 — Type guard
// Напиши type guard функцию isUser(val: unknown): val is User
// User должен иметь id: number и name: string
// Используй typeof и "in" для проверки
function isUser(val: unknown): val is User {
  // твой код
}

// isUser({ id: 1, name: "Alice" })   → true
// isUser({ name: "Alice" })           → false (нет id)
// isUser("string")                    → false

// ── 3. Generics ──────────────────────────────────────────────────────────────

// Задача 3.1 — Generic identity
// Напиши функцию identity<T> которая возвращает то, что получила
// Без явного указания типа — TS должен вывести его сам
function identity(/* твой код */) {
  // твой код
}

// identity(42)      → 42 (тип: number)
// identity("hello") → "hello" (тип: string)
// identity([1,2,3]) → [1,2,3] (тип: number[])

// Задача 3.2 — Generic функция first
// first([1, 2, 3])       → 1 (тип: number | undefined)
// first(["a", "b"])      → "a" (тип: string | undefined)
// first([])              → undefined
function first(/* твой код */) {
  // твой код
}

// Задача 3.3 — Generic с ограничением
// Напиши функцию getLength<T> — принимает строку или массив, возвращает длину
// Ограничь T через extends чтобы у него точно было поле length
function getLength(/* твой код */): number {
  // твой код
}

// getLength("hello")   → 5
// getLength([1, 2, 3]) → 3
// getLength(42)        → ❌ Error — TypeScript должен запрещать числа

// Задача 3.4 — Generic интерфейс
// Опиши интерфейс ApiResponse<T>: data (T), error (строка | null), status (число)
// Типизируй функцию ok<T> которая создаёт успешный ответ (status: 200, error: null)
interface ApiResponse<T> {
  // твой код
}

function ok<T>(data: T): ApiResponse<T> {
  // твой код
}

// ok(42)        → { data: 42, error: null, status: 200 }
// ok("hello")   → { data: "hello", error: null, status: 200 }

// ── 4. Утилитарные типы ──────────────────────────────────────────────────────

// Задача 4.1 — Partial для обновления
// Есть интерфейс Product: id, name, price, inStock
// Напиши функцию updateProduct которая берёт продукт и частичные изменения
// и возвращает обновлённый продукт
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function updateProduct(product: Product, changes: /* твой код */): Product {
  return { ...product, ...changes };
}

// updateProduct({ id: 1, name: "book", price: 10, inStock: true }, { price: 15 })
// → { id: 1, name: "book", price: 15, inStock: true }

// Задача 4.2 — Pick и Omit
// Напиши два типа:
// ProductCard — только id и name (для отображения в каталоге)
// ProductInput — всё кроме id (для создания нового продукта)
type ProductCard = /* твой код */;
type ProductInput = /* твой код */;

// Задача 4.3 — ReturnType
// Напиши функцию createSession которая возвращает { token: string, expiresAt: Date }
// Затем выведи тип её возврата через ReturnType — без ручного описания
function createSession(userId: number) {
  return {
    token: Math.random().toString(36),
    expiresAt: new Date(Date.now() + 3600_000),
  };
}

type Session = /* твой код */; // используй ReturnType и typeof

// ── 5. as const и литеральные типы ──────────────────────────────────────────

// Задача 5.1 — as const для перечисления
// Создай массив STATUSES с вариантами "pending" | "active" | "banned"
// Выведи тип Status из этого массива через typeof и [number]
const STATUSES = /* твой код */;
type Status = /* твой код */;

// Задача 5.2 — Функция с литеральными параметрами
// Напиши функцию move(direction: Direction): string
// Direction выводится из const массива ["up","down","left","right"]
const DIRECTIONS = ["up", "down", "left", "right"] as const;
type Direction = (typeof DIRECTIONS)[number];

function move(direction: Direction): string {
  return `Moving ${direction}`;
}

// move("up")    → "Moving up"
// move("diagonal") → ❌ Error — TypeScript должен запрещать

// ========================================
// Тесты (раскомментируй для проверки)
// ========================================

/*
console.log("=== 1. Базовые ===" );
console.log(greet("Alice"));                        // "Hello, Alice!"
console.log(formatUser({ id: 1, name: "Alice" }));  // "id: 1 | Alice"
console.log(getStock({ apple: 5, banana: 3 }, "apple")); // 5
console.log(getStock({ apple: 5 }, "mango"));            // 0

console.log("=== 2. Union ===");
console.log(stringify(42));     // "42"
console.log(stringify(true));   // "true"
console.log(stringify("hi"));   // "hi"
console.log(area({ kind: "circle", radius: 5 }));              // ~78.54
console.log(area({ kind: "rectangle", width: 4, height: 3 })); // 12
console.log(area({ kind: "triangle", base: 6, height: 4 }));   // 12
console.log(isUser({ id: 1, name: "Alice" }));   // true
console.log(isUser({ name: "Alice" }));           // false
console.log(isUser("string"));                    // false

console.log("=== 3. Generics ===");
console.log(identity(42));        // 42
console.log(identity("hello"));   // "hello"
console.log(first([1, 2, 3]));    // 1
console.log(first([]));           // undefined
console.log(getLength("hello"));  // 5
console.log(getLength([1,2,3]));  // 3
console.log(ok(42));              // { data: 42, error: null, status: 200 }

console.log("=== 4. Утилиты ===");
console.log(updateProduct({ id: 1, name: "book", price: 10, inStock: true }, { price: 15 }));
console.log(move("up"));       // "Moving up"
console.log(move("down"));     // "Moving down"
*/
