# Блок 5 — Async

## 🤔 Вопрос 17: Что такое Promise?

**Вопрос:** Что такое Promise? Какие состояния у промиса?

**Ответ:**

Promise — объект, представляющий результат асинхронной операции, который будет получен в будущем. Позволяет избежать «callback hell».

**Три состояния (переход необратим):**

- `pending` — начальное, операция выполняется
- `fulfilled` — операция завершена успешно, есть результат
- `rejected` — операция завершена с ошибкой

```js
// Создание:
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success)
      resolve("данные"); // → fulfilled
    else reject(new Error("ошибка")); // → rejected
  }, 1000);
});

// Использование:
promise
  .then((data) => console.log(data)) // "данные"
  .catch((err) => console.error(err))
  .finally(() => console.log("done")); // вызывается всегда

// Цепочка промисов:
fetch("/api/user")
  .then((res) => res.json()) // возвращает новый Promise
  .then((user) => fetch(`/api/posts/${user.id}`))
  .then((res) => res.json())
  .catch((err) => console.error(err)); // ловит ошибки из всей цепочки

// Статические методы:
Promise.resolve(42); // уже fulfilled промис
Promise.reject(new Error()); // уже rejected промис
```

---

## 🤔 Вопрос 18: async/await под капотом

**Вопрос:** Как работает `async/await` под капотом?

**Ответ:**

`async/await` — синтаксический сахар над промисами. `async` функция всегда возвращает Promise. `await` приостанавливает выполнение функции до разрешения промиса, не блокируя основной поток.

```js
// async/await:
async function fetchUser(id) {
  const res = await fetch(`/api/user/${id}`);
  const user = await res.json();
  return user;
}

// Эквивалент на промисах:
function fetchUser(id) {
  return fetch(`/api/user/${id}`)
    .then((res) => res.json())
    .then((user) => user);
}

// Обработка ошибок:
async function getData() {
  try {
    const data = await fetchUser(1);
    console.log(data);
  } catch (err) {
    console.error(err); // ловит и rejected промисы, и обычные throw
  }
}

// async функция всегда возвращает Promise:
async function greet() {
  return "hello";
}
greet() instanceof Promise; // true
greet().then(console.log); // "hello"

// Параллельное выполнение (частая ошибка — делать await последовательно):
// Медленно:
const a = await fetchA();
const b = await fetchB(); // ждёт пока fetchA завершится

// Быстро — запускаем параллельно:
const [a, b] = await Promise.all([fetchA(), fetchB()]);
```

Под капотом `async/await` компилируется в генераторы + промисы (в старых транспиляторах).

---

## 🤔 Вопрос 19: Promise.all vs Promise.allSettled vs Promise.race

**Вопрос:** В чём разница между `Promise.all`, `Promise.allSettled` и `Promise.race`?

**Ответ:**

```js
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const pFail = Promise.reject(new Error("fail"));
```

**`Promise.all(promises)`** — ждёт все. Если хотя бы один rejected — сразу rejected:

```js
await Promise.all([p1, p2]); // [1, 2] — все fulfilled
await Promise.all([p1, pFail, p2]); // Error: "fail" — первый же reject останавливает всё
// Используй: когда нужны все результаты и один сбой = общий сбой
```

**`Promise.allSettled(promises)`** — ждёт все, никогда не rejected, возвращает статус каждого:

```js
await Promise.allSettled([p1, pFail, p2]);
// [
//   { status: "fulfilled", value: 1 },
//   { status: "rejected",  reason: Error("fail") },
//   { status: "fulfilled", value: 2 }
// ]
// Используй: когда нужно знать результат каждого независимо от ошибок
```

**`Promise.race(promises)`** — возвращает результат первого завершившегося (fulfilled или rejected):

```js
const slow = new Promise((resolve) => setTimeout(() => resolve("slow"), 1000));
const fast = new Promise((resolve) => setTimeout(() => resolve("fast"), 100));

await Promise.race([slow, fast]); // "fast"

// Типичный use case — timeout:
function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), ms),
  );
  return Promise.race([promise, timeout]);
}
```

**`Promise.any(promises)`** — возвращает первый **fulfilled**, игнорирует rejected (ES2021):

```js
await Promise.any([pFail, p1, p2]); // 1 — первый успешный
await Promise.any([pFail, pFail]); // AggregateError — все rejected
```

| Метод        | Завершается когда     | При ошибке                         |
| ------------ | --------------------- | ---------------------------------- |
| `all`        | все fulfilled         | сразу rejected                     |
| `allSettled` | все (любой статус)    | никогда не rejected                |
| `race`       | первый (любой статус) | если первый — rejected             |
| `any`        | первый fulfilled      | если все rejected — AggregateError |

---
