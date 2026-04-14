# Event Loop

## Задача 9 — Event Loop: микс setTimeout, Promise, async/await ⭐⭐⭐

Что выведет этот код и в каком порядке?

```js
console.log("1");

setTimeout(() => console.log("2"), 0);

Promise.resolve().then(() => console.log("3"));

async function foo() {
  console.log("4");
  await Promise.resolve();
  console.log("5");
}

foo();

queueMicrotask(() => console.log("6"));

console.log("7");
```

<details>
<summary>Ответ</summary>

**Ответ:** порядок вывода:

```
1
4
7
3
6
5
2
```

**Порядок выполнения по шагам:**

1. `console.log('1')` — синхронно, **выводит `1`**
2. `setTimeout(...)` — регистрирует макрозадачу, колбэк в macrotask queue
3. `Promise.resolve().then(...)` — регистрирует микрозадачу `.then(() => '3')`
4. `foo()` вызывается:
   - `console.log('4')` — синхронно, **выводит `4`**
   - `await Promise.resolve()` — приостанавливает `foo`, регистрирует продолжение как микрозадачу
5. `queueMicrotask(...)` — добавляет `() => '6'` в microtask queue
6. `console.log('7')` — синхронно, **выводит `7`**
7. Стек пуст, обрабатываем microtask queue по порядку:
   - `.then(() => '3')` — **выводит `3`**
   - продолжение `foo` после первого `await` — **выводит `5`**... стоп. `queueMicrotask` зарегистрирован **до** `foo()`, значит очередь: `3`, `6`, `5`
   - `queueMicrotask(() => '6')` — **выводит `6`**
   - продолжение `foo` — **выводит `5`**
8. Macrotask queue: `setTimeout` — **выводит `2`**

> Примечание: `await Promise.resolve()` в async-функции приостанавливает и ставит продолжение в конец текущей microtask queue. Поэтому `5` выводится после `6`.

</details>

---

## Задача 16 — Сложный Event Loop ⭐⭐⭐⭐

Что выведет этот код? Укажи полный порядок вывода.

```js
console.log('start');

setTimeout(() => console.log('timeout 1'), 0);

Promise.resolve()
  .then(() => {
    console.log('promise 1');
    setTimeout(() => console.log('timeout 2'), 0);
    return Promise.resolve();
  })
  .then(() => console.log('promise 2'));

async function bar() {
  console.log('bar start');
  await null;
  console.log('bar after await');
  await Promise.resolve();
  console.log('bar end');
}

bar();

queueMicrotask(() => console.log('microtask'));

console.log('end');
```

<details>
<summary>Ответ</summary>

**Ответ:** порядок вывода:

```
start
bar start
end
promise 1
microtask
bar after await
promise 2
bar end
timeout 1
timeout 2
```

**Порядок выполнения по шагам:**

**Синхронная фаза:**
1. `console.log('start')` → **`start`**
2. `setTimeout(() => 'timeout 1')` → macrotask queue: `[timeout 1]`
3. `Promise.resolve().then(...)` → microtask queue: `[promise1_handler]`
4. `bar()` вызывается: `console.log('bar start')` → **`bar start`**, `await null` → продолжение в microtask queue: `[promise1_handler, bar_resume_1]`
5. `queueMicrotask(...)` → microtask queue: `[promise1_handler, bar_resume_1, microtask_cb]`
6. `console.log('end')` → **`end`**

**Очистка microtask queue:**
7. `promise1_handler`: **`promise 1`**, `setTimeout('timeout 2')` → macrotask: `[timeout 1, timeout 2]`, `return Promise.resolve()` → `[bar_resume_1, microtask_cb, promise2_handler]`
8. `bar_resume_1`: **`bar after await`**, `await Promise.resolve()` → `[microtask_cb, promise2_handler, bar_resume_2]`
9. `microtask_cb`: **`microtask`**
10. `promise2_handler`: **`promise 2`**
11. `bar_resume_2`: **`bar end`**

**Macrotask queue:**
12. `timeout 1` → **`timeout 1`**
13. `timeout 2` → **`timeout 2`**

</details>

---

## Задача 17 — Macrotask vs Microtask ⭐⭐⭐⭐

Объясни разницу между macrotask (задача) и microtask (микрозадача) в Event Loop.

- Что такое очередь макрозадач? Что туда попадает?
- Что такое очередь микрозадач? Что туда попадает?
- В каком порядке они выполняются?
- Что произойдёт, если microtask порождает новую microtask?

```js
// Предскажи порядок вывода и объясни почему:
setTimeout(() => console.log('macro 1'), 0);
setTimeout(() => console.log('macro 2'), 0);

Promise.resolve().then(() => {
  console.log('micro 1');
  Promise.resolve().then(() => console.log('micro 2'));
});

console.log('sync');
```

<details>
<summary>Ответ</summary>

**Ответ:**

**Macrotask:** `setTimeout`, `setInterval`, события DOM (`click`, `keydown`), загрузка скриптов — каждый тик Event Loop выполняет **одну** макрозадачу.

**Microtask:** `Promise.then/catch/finally`, `queueMicrotask`, `MutationObserver` — выполняются **сразу после** текущей задачи, **перед** следующей макрозадачей. Вся очередь очищается за раз, включая новые микрозадачи добавленные в процессе.

**Порядок цикла:**
```
1. Выполнить одну макрозадачу
2. Опустошить всю microtask queue (включая новые!)
3. Обновить рендеринг (браузер)
4. Повторить
```

**Ответ на код задачи:**
```
sync
micro 1
micro 2
macro 1
macro 2
```

**Шаги:**
1. `setTimeout x2` → macrotask: `[macro 1, macro 2]`
2. `Promise.resolve().then(...)` → microtask: `[micro1_handler]`
3. `console.log('sync')` → **`sync`**
4. microtask: `micro1_handler` → **`micro 1`**, добавляет `micro2_handler` → `[micro2_handler]`
5. microtask: `micro2_handler` → **`micro 2`**
6. macrotask: **`macro 1`**
7. macrotask: **`macro 2`**

</details>

---
