# Pinia — Шпаргалка

## Установка и подключение

```bash
npm install pinia
```

```js
// main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
```

---

## Определение store (Setup Store — рекомендуется)

```js
// stores/counter.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // state
  const count = ref(0);

  // getters
  const double = computed(() => count.value * 2);

  // actions
  function increment() {
    count.value++;
  }
  function reset() {
    count.value = 0;
  }

  return { count, double, increment, reset };
});
```

## Определение store (Options Store)

```js
export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

---

## Использование store

```vue
<script setup>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

const store = useCounterStore();

// storeToRefs — деструктуризация с сохранением реактивности (state + getters)
const { count, double } = storeToRefs(store);

// actions деструктурируются напрямую (они не реактивны)
const { increment, reset } = store;
</script>

<template>
  <p>{{ count }} × 2 = {{ double }}</p>
  <button @click="increment">+</button>
</template>
```

---

## $patch — прямое изменение state

```js
// Объект-патч
store.$patch({ count: 42 });

// Функция-патч (для сложных мутаций)
store.$patch((state) => {
  state.items.push({ id: 1, name: "Новый" });
  state.count++;
});
```

---

## $reset — сброс к начальному state

```js
// Работает только с Options Store
store.$reset();

// Для Setup Store нужно реализовать вручную:
function reset() {
  count.value = 0;
}
```

---

## $subscribe — подписка на изменения state

```js
store.$subscribe((mutation, state) => {
  console.log("mutation.type:", mutation.type); // 'direct' | 'patch object' | 'patch function'
  console.log("state:", state);
  localStorage.setItem("cart", JSON.stringify(state));
});
```

---

## $onAction — подписка на вызовы actions

```js
store.$onAction(({ name, args, after, onError }) => {
  console.log(`Action "${name}" вызвана с args:`, args);
  after((result) => console.log("Результат:", result));
  onError((error) => console.error("Ошибка:", error));
});
```

---

## Плагины Pinia

```js
// Простой плагин — добавляет свойство во все store
function myPlugin({ store }) {
  store.hello = "world";
}

const pinia = createPinia();
pinia.use(myPlugin);
```

---

## Pinia vs Vuex

|                   | Pinia                       | Vuex 4           |
| ----------------- | --------------------------- | ---------------- |
| TypeScript        | Отлично (из коробки)        | Требует усилий   |
| Мутации           | Нет (только actions)        | Обязательны      |
| Модули            | Нет (каждый store — модуль) | Вложенные модули |
| DevTools          | Да                          | Да               |
| Composables-style | Да (Setup Store)            | Нет              |
| Размер            | ~1 KB                       | ~10 KB           |

---

## Частые паттерны

```js
// Доступ к другому store внутри action
import { useAuthStore } from "./auth";

const useTodoStore = defineStore("todos", () => {
  async function fetchTodos() {
    const auth = useAuthStore();
    const res = await fetch("/api/todos", {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    return res.json();
  }
  return { fetchTodos };
});

// Персистентность через localStorage
store.$subscribe((_, state) => {
  localStorage.setItem("store-key", JSON.stringify(state));
});

// Восстановление при инициализации
const savedState = localStorage.getItem("store-key");
if (savedState) store.$patch(JSON.parse(savedState));
```
