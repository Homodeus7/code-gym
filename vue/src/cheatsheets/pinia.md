# Pinia — Шпаргалка

## Установка и подключение

```bash
npm install pinia
```

```ts
// main.ts
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

createApp(App).use(createPinia()).mount("#app");
```

---

## Определение store (Setup Store — рекомендуется)

```ts
// stores/counter.ts
import { defineStore, acceptHMRUpdate } from "pinia";
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

  // $reset для Setup Store — реализуй вручную
  function reset() {
    count.value = 0;
  }

  return { count, double, increment, reset };
});

// HMR — обязательно добавляй в каждый store
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot));
}
```

## Определение store (Options Store)

```ts
export const useCounterStore = defineStore("counter", {
  state: () => ({ count: 0 as number }),
  getters: {
    double: (state): number => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});

// $reset() работает с Options Store из коробки
```

---

## Использование store

```vue
<script setup lang="ts">
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

```ts
// Объект-патч
store.$patch({ count: 42 });

// Функция-патч (для сложных мутаций)
store.$patch((state) => {
  state.items.push({ id: 1, name: "Новый" });
  state.count++;
});
```

---

## $subscribe — подписка на изменения state

```ts
store.$subscribe((mutation, state) => {
  // mutation.type: 'direct' | 'patch object' | 'patch function'
  localStorage.setItem("cart", JSON.stringify(state));
});
```

---

## $onAction — подписка на вызовы actions

```ts
store.$onAction(({ name, args, after, onError }) => {
  console.log(`Action "${name}" вызвана с args:`, args);
  after((result) => console.log("Результат:", result));
  onError((error) => console.error("Ошибка:", error));
});
```

---

## Composables внутри stores

```ts
// VueUse и другие composables можно использовать в Setup Store
import { useLocalStorage } from "@vueuse/core";
import { useAuthStore } from "./auth";

export const useSettingsStore = defineStore("settings", () => {
  // composable как state
  const theme = useLocalStorage("theme", "light");

  // доступ к другому store внутри action
  async function fetchProfile() {
    const auth = useAuthStore(); // вызывай внутри action, не на верхнем уровне
    const res = await fetch("/api/profile", {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    return res.json();
  }

  return { theme, fetchProfile };
});
```

---

## Использование store вне компонентов

```ts
// router/index.ts — вызывай store внутри guard, не на уровне модуля
import { useAuthStore } from "@/stores/auth";

router.beforeEach((to) => {
  const auth = useAuthStore(); // ✅ Pinia уже инициализирована
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: "login" };
  }
});
```

---

## Плагины Pinia

```ts
import type { PiniaPluginContext } from "pinia";

function myPlugin({ store }: PiniaPluginContext) {
  // Добавляет свойство во все store
  store.hello = ref("world");
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

## Персистентность

```ts
// Сохранение в localStorage
store.$subscribe((_, state) => {
  localStorage.setItem("store-key", JSON.stringify(state));
});

// Восстановление при инициализации
const savedState = localStorage.getItem("store-key");
if (savedState) store.$patch(JSON.parse(savedState));
```
