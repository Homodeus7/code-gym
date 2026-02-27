// ========================================
// ЗАДАЧИ: ЗАМЫКАНИЯ И ФУНКЦИИ
// ========================================
// Замыкание — функция, которая "запоминает" переменные из внешней области видимости
// даже после того, как эта область завершила выполнение.

// ── 1. Замыкания и состояние ────────────────────────────────────────────────

// Задача 1.1 — Счётчик с тремя методами
// const counter = createCounter(5)
// counter.increment() → 6
// counter.increment() → 7
// counter.reset()     → 5
// counter.decrement() → 4
function createCounter(init) {
  // твой код
}

// Задача 1.2 — Стек через замыкание
// const stack = createStack()
// stack.push(1); stack.push(2)
// stack.pop()     → 2
// stack.peek()    → 1
// stack.isEmpty() → false
// stack.size()    → 1
function createStack() {
  // твой код
}

// Задача 1.3 — Очередь через замыкание
// const q = createQueue()
// q.enqueue('a'); q.enqueue('b')
// q.dequeue()  → 'a'
// q.peek()     → 'b'
// q.size()     → 1
function createQueue() {
  // твой код
}

// Задача 1.4 — Аккумулятор
// makeAdder(5)(3) → 8
// makeAdder(10)(1)(2)(3) → 16  (цепочка вызовов)
function makeAdder(initialValue) {
  // твой код
}

// ── 2. Функции высшего порядка ──────────────────────────────────────────────

// Задача 2.1 — once: вызывается только один раз, потом возвращает undefined
// const greet = once(name => `Hello, ${name}!`)
// greet("Alice") → "Hello, Alice!"
// greet("Bob")   → undefined
function once(fn) {
  // твой код
}

// Задача 2.2 — debounce: вызывает fn только если прошло delay мс с последнего вызова
// const save = debounce(() => console.log('saved'), 1000)
// save(); save(); save()  // через 1 сек — одно 'saved'
function debounce(fn, delay) {
  // твой код
}

// Задача 2.3 — throttle: вызывает fn не чаще раза в interval мс
// const scroll = throttle(() => console.log('scroll'), 300)
// 10 быстрых вызовов → только первый (остальные игнорируются до истечения interval)
function throttle(fn, interval) {
  // твой код
}

// Задача 2.4 — memoize: кэшировать результаты по аргументам
// const fib = memoize(n => n <= 1 ? n : fib(n-1) + fib(n-2))
// fib(40) → быстро (без мемоизации: 2^40 вызовов)
function memoize(fn) {
  // твой код
}

// ── 3. Каррирование и композиция ────────────────────────────────────────────

// Задача 3.1 — curry: f(a, b) → f(a)(b)
// const add = (a, b) => a + b
// curry(add)(1)(2) → 3
// curry(add)(1, 2) → 3  (можно передать оба аргумента сразу)
function curry(fn) {
  // твой код
}

// Задача 3.2 — pipe: применяет функции слева направо
// pipe(x => x + 1, x => x * 2)(3) → 8   (3+1=4, 4*2=8)
// pipe()(5) → 5  (без функций — возвращает значение)
function pipe(...fns) {
  // твой код
}

// Задача 3.3 — compose: применяет функции справа налево
// compose(x => x + 1, x => x * 2)(3) → 7  (3*2=6, 6+1=7)
function compose(...fns) {
  // твой код
}

// Задача 3.4 — partial: частичное применение
// const multiply = (a, b) => a * b
// const double = partial(multiply, 2)
// double(5) → 10
// double(10) → 20
function partial(fn, ...presetArgs) {
  // твой код
}

// ── 4. Паттерн: Builder / цепочка методов ───────────────────────────────────

// Задача 4.1 — Построитель URL через цепочку методов
// buildUrl('https://api.example.com')
//   .path('/users')
//   .query('page', 1)
//   .query('limit', 10)
//   .build()
// → "https://api.example.com/users?page=1&limit=10"
function buildUrl(base) {
  // твой код
}

// Задача 4.2 — Обработчик событий (паттерн EventEmitter через замыкание)
// const emitter = createEmitter()
// emitter.on('click', data => console.log('click:', data))
// emitter.on('click', data => console.log('second:', data))
// emitter.emit('click', { x: 10, y: 20 })
// → click: { x: 10, y: 20 }
// → second: { x: 10, y: 20 }
// emitter.off('click')  // удалить все слушатели события
function createEmitter() {
  // твой код
}

// ── 5. Примеры: решённые паттерны ───────────────────────────────────────────

// Пример: Цепочка методов DOM (Builder pattern)
// $('selector').addClass('foo').toggleClass('bar').css({ color: 'red' }).html('<p>hi</p>')
function $(selector) {
  const els =
    typeof document !== "undefined"
      ? document.querySelectorAll(selector)
      : [];

  return {
    els,
    addClass(className) {
      this.els.forEach((el) => el.classList.add(className));
      return this;
    },
    toggleClass(className) {
      this.els.forEach((el) => el.classList.toggle(className));
      return this;
    },
    removeClass(className) {
      this.els.forEach((el) => el.classList.remove(className));
      return this;
    },
    css(styles) {
      this.els.forEach((el) => Object.assign(el.style, styles));
      return this;
    },
    html(content) {
      this.els.forEach((el) => (el.innerHTML = content));
      return this;
    },
  };
}

// ========================================
// Тесты (раскомментируй для проверки)
// ========================================

/*
console.log("=== 1. Замыкания и состояние ===");
const counter = createCounter(5);
console.log(counter.increment()); // 6
console.log(counter.increment()); // 7
console.log(counter.reset());     // 5
console.log(counter.decrement()); // 4

const stack = createStack();
stack.push(1); stack.push(2);
console.log(stack.pop());         // 2
console.log(stack.peek());        // 1

console.log(makeAdder(5)(3));     // 8

console.log("=== 2. HOF ===");
const greet = once(name => `Hello, ${name}!`);
console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet("Bob"));   // undefined

console.log("=== 3. Curry и compose ===");
const add = (a, b) => a + b;
console.log(curry(add)(1)(2));    // 3
console.log(curry(add)(1, 2));    // 3

console.log(pipe(x => x + 1, x => x * 2)(3));     // 8
console.log(compose(x => x + 1, x => x * 2)(3));  // 7

const double = partial((a, b) => a * b, 2);
console.log(double(5));  // 10

console.log("=== 4. Builder ===");
const url = buildUrl('https://api.example.com')
  .path('/users')
  .query('page', 1)
  .query('limit', 10)
  .build();
console.log(url); // "https://api.example.com/users?page=1&limit=10"
*/
