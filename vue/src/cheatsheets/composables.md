# Vue 3 Composables — Шпаргалка

## Что такое composable

Composable — функция с именем `use*`, которая использует Vue Composition API
и инкапсулирует повторно используемую логику с состоянием.

```js
// useCounter.js
import { ref } from "vue";

export function useCounter(initial = 0) {
  const count = ref(initial);
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => (count.value = initial);
  return { count, increment, decrement, reset };
}
```

```vue
<script setup>
import { useCounter } from "@/composables/useCounter";
const { count, increment } = useCounter(10);
</script>
```

---

## Правила composables

1. Имя начинается с `use` — `useFetch`, `useAuth`, `useForm`
2. Вызываются **только внутри `<script setup>`** или другого composable
3. Нельзя вызывать в обычных функциях, условиях, циклах
4. Lifecycle hooks работают корректно, если вызваны синхронно в setup

---

## useFetch — загрузка данных

```js
import { ref, watchEffect, toValue } from "vue";

export function useFetch(url) {
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);

  async function execute() {
    loading.value = true;
    error.value = null;
    data.value = null;
    try {
      const res = await fetch(toValue(url)); // toValue поддерживает ref/getter/значение
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data.value = await res.json();
    } catch (e) {
      error.value = e.message;
    } finally {
      loading.value = false;
    }
  }

  // watchEffect автоматически перезапускается при изменении url (если ref)
  watchEffect(execute);

  return { data, loading, error, refetch: execute };
}
```

---

## useLocalStorage

```js
import { ref, watch } from "vue";

export function useLocalStorage(key, defaultValue) {
  const stored = localStorage.getItem(key);
  const data = ref(stored !== null ? JSON.parse(stored) : defaultValue);

  watch(
    data,
    (val) => {
      localStorage.setItem(key, JSON.stringify(val));
    },
    { deep: true },
  );

  return data;
}

// Использование
const theme = useLocalStorage("theme", "light");
theme.value = "dark"; // автоматически сохранится
```

---

## useEventListener

```js
import { onMounted, onUnmounted } from "vue";

export function useEventListener(target, event, handler) {
  onMounted(() => target.addEventListener(event, handler));
  onUnmounted(() => target.removeEventListener(event, handler));
}

// Использование
useEventListener(window, "resize", () => {
  console.log("resize");
});
```

---

## useWindowSize

```js
import { ref } from "vue";
import { useEventListener } from "./useEventListener";

export function useWindowSize() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  useEventListener(window, "resize", () => {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  });

  return { width, height };
}
```

---

## useMouse

```js
import { ref } from "vue";
import { useEventListener } from "./useEventListener";

export function useMouse() {
  const x = ref(0);
  const y = ref(0);

  useEventListener(window, "mousemove", (e) => {
    x.value = e.clientX;
    y.value = e.clientY;
  });

  return { x, y };
}
```

---

## useDebounce

```js
import { ref, watch } from "vue";

export function useDebounce(value, delay = 300) {
  const debounced = ref(value.value);

  watch(value, (newVal) => {
    const timer = setTimeout(() => {
      debounced.value = newVal;
    }, delay);
    return () => clearTimeout(timer);
  });

  return debounced;
}

// Использование
const search = ref("");
const debouncedSearch = useDebounce(search, 500);
watch(debouncedSearch, (val) => fetchResults(val));
```

---

## useToggle

```js
import { ref } from "vue";

export function useToggle(initialValue = false) {
  const state = ref(initialValue);
  const toggle = () => (state.value = !state.value);
  return [state, toggle];
}

// Использование
const [isOpen, toggleOpen] = useToggle();
```

---

## Передача реактивных аргументов

```js
import { toValue, watchEffect } from "vue";

// toValue() — нормализует ref | getter | plain value
export function useTitle(titleSource) {
  watchEffect(() => {
    document.title = toValue(titleSource);
  });
}

// Все варианты работают:
useTitle("Статичный заголовок");
useTitle(ref("Реактивный заголовок"));
useTitle(() => `Корзина (${cartCount.value})`);
```

---

## Структура папки composables

```
src/
  composables/
    useCounter.js
    useFetch.js
    useLocalStorage.js
    useWindowSize.js
    useEventListener.js
    useToggle.js
    useDebounce.js
```

---

## Composables vs Mixins

|                   | Composables              | Mixins         |
| ----------------- | ------------------------ | -------------- |
| Источник данных   | Явный (деструктуризация) | Неявный (this) |
| Конфликты имён    | Нет                      | Да             |
| Переиспользование | С параметрами            | Ограничено     |
| TypeScript        | Отлично                  | Сложно         |
| Vue версия        | Vue 3                    | Vue 2 / 3      |
