# Vue 3 Composables — Шпаргалка

## Что такое composable

Composable — функция с именем `use*`, которая использует Vue Composition API
и инкапсулирует повторно используемую логику с состоянием.

```ts
// useCounter.ts
import { ref, readonly } from "vue";

export function useCounter(initial = 0) {
  const count = ref(initial);
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => (count.value = initial);

  // readonly — скрываем мутацию снаружи
  return { count: readonly(count), increment, decrement, reset };
}
```

```vue
<script setup lang="ts">
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
5. Возвращай `readonly()` для state, который не должен меняться снаружи

---

## useFetch — загрузка данных

```ts
import { ref, watchEffect, toValue, readonly } from "vue";
import type { MaybeRefOrGetter } from "vue";

export function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function execute() {
    loading.value = true;
    error.value = null;
    data.value = null;
    try {
      const res = await fetch(toValue(url)); // toValue поддерживает ref/getter/значение
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data.value = await res.json();
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      loading.value = false;
    }
  }

  // watchEffect автоматически перезапускается при изменении url
  watchEffect(execute);

  return { data: readonly(data), loading: readonly(loading), error: readonly(error), refetch: execute };
}
```

---

## useLocalStorage

```ts
import { ref, watch } from "vue";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key);
  const data = ref<T>(stored !== null ? JSON.parse(stored) : defaultValue);

  watch(data, (val) => {
    localStorage.setItem(key, JSON.stringify(val));
  }, { deep: true });

  return data;
}

// Использование
const theme = useLocalStorage("theme", "light");
theme.value = "dark"; // автоматически сохранится
```

---

## useEventListener

```ts
import { onMounted, onUnmounted } from "vue";

export function useEventListener<K extends keyof WindowEventMap>(
  target: Window | HTMLElement,
  event: K,
  handler: (e: WindowEventMap[K]) => void,
) {
  onMounted(() => target.addEventListener(event, handler as EventListener));
  onUnmounted(() => target.removeEventListener(event, handler as EventListener));
}

// Использование
useEventListener(window, "resize", () => console.log("resize"));
```

---

## useWindowSize

```ts
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

```ts
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

```ts
import { ref, watch } from "vue";
import type { Ref } from "vue";

export function useDebounce<T>(value: Ref<T>, delay = 300): Ref<T> {
  const debounced = ref(value.value) as Ref<T>;

  watch(value, (newVal) => {
    const timer = setTimeout(() => {
      debounced.value = newVal;
    }, delay);
    return () => clearTimeout(timer); // очистка при следующем срабатывании
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

```ts
import { ref } from "vue";

export function useToggle(initialValue = false) {
  const state = ref(initialValue);
  const toggle = () => (state.value = !state.value);
  return [state, toggle] as const;
}

// Использование
const [isOpen, toggleOpen] = useToggle();
```

---

## Передача реактивных аргументов

```ts
import { toValue, watchEffect } from "vue";
import type { MaybeRefOrGetter } from "vue";

// toValue() — нормализует Ref | getter | plain value
export function useTitle(titleSource: MaybeRefOrGetter<string>) {
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

## Options-паттерн для сложных composables

```ts
// Вместо множества аргументов — объект опций
interface UseFetchOptions {
  immediate?: boolean;
  onError?: (e: Error) => void;
}

export function useFetchAdvanced<T>(url: MaybeRefOrGetter<string>, options: UseFetchOptions = {}) {
  const { immediate = true, onError } = options;
  // ...
}

// Использование
useFetchAdvanced("/api/user", { immediate: false, onError: console.error });
```

---

## Структура папки composables

```
src/
  composables/
    useCounter.ts
    useFetch.ts
    useLocalStorage.ts
    useWindowSize.ts
    useEventListener.ts
    useToggle.ts
    useDebounce.ts
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
