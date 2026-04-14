# Async паттерны в Vue 3 — Шпаргалка

## Базовый fetch в компоненте

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";

interface Item { id: number; title: string }

const data = ref<Item[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchData() {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch("https://api.example.com/items");
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    data.value = await res.json();
  } catch (e) {
    error.value = (e as Error).message;
  } finally {
    loading.value = false;
  }
}

onMounted(fetchData);
</script>

<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="error" style="color:red">{{ error }}</div>
  <ul v-else>
    <li v-for="item in data" :key="item.id">{{ item.title }}</li>
  </ul>
</template>
```

---

## Promise.all — параллельные запросы

```ts
// Все запросы выполняются одновременно
const [users, posts, comments] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json()),
]);

// Если хотя бы один упадёт — Promise.all отклонится
// Используй Promise.allSettled, чтобы получить все результаты независимо
const results = await Promise.allSettled([...]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  if (r.status === 'rejected') console.error(r.reason);
});
```

---

## AbortController — отмена запросов

```ts
// С onWatcherCleanup (Vue 3.5+) — автоматически при повторном срабатывании
import { watch, onWatcherCleanup } from "vue";

watch(userId, async (id) => {
  const controller = new AbortController();
  onWatcherCleanup(() => controller.abort()); // очистка перед следующим вызовом

  try {
    const res = await fetch(`/api/user/${id}`, { signal: controller.signal });
    data.value = await res.json();
  } catch (e) {
    if ((e as Error).name !== "AbortError") throw e;
  }
});
```

```ts
// Без watcher — вручную
let controller: AbortController | null = null;

async function startFetch(url: string) {
  controller?.abort();
  controller = new AbortController();
  try {
    const res = await fetch(url, { signal: controller.signal });
    data.value = await res.json();
  } catch (e) {
    if ((e as Error).name !== "AbortError") throw e;
  }
}

onUnmounted(() => controller?.abort());
```

---

## watch + fetch (зависимый запрос)

```ts
const userId = ref(1);
const posts = ref<Post[]>([]);

watch(
  userId,
  async (id) => {
    const controller = new AbortController();
    onWatcherCleanup(() => controller.abort());

    const res = await fetch(`/api/posts?userId=${id}`, { signal: controller.signal });
    posts.value = await res.json();
  },
  { immediate: true },
);
```

---

## Дебаунс для поиска

```ts
import { ref, watch } from "vue";

const search = ref("");
const results = ref<Result[]>([]);

watch(search, (val) => {
  const timer = setTimeout(async () => {
    if (!val.trim()) { results.value = []; return; }
    const res = await fetch(`/api/search?q=${encodeURIComponent(val)}`);
    results.value = await res.json();
  }, 400);

  return () => clearTimeout(timer); // onWatcherCleanup-стиль через return
});
```

---

## Suspense

```vue
<!-- Родитель -->
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>Загрузка...</div>
  </template>
</Suspense>

<!-- AsyncComponent.vue — top-level await в <script setup> -->
<script setup lang="ts">
// Suspense ждёт завершения async setup
const data = await fetch("/api/data").then((r) => r.json());
</script>
```

> Suspense стабилен в Vue 3.5+. При вложенных Suspense используй `:suspensible` на дочернем.

---

## Обработка ошибок

```ts
// Глобальный обработчик ошибок Vue
const app = createApp(App);
app.config.errorHandler = (err, instance, info) => {
  console.error("Vue Error:", err, info);
  // Отправь в Sentry или другой сервис
};

// onErrorCaptured в компоненте — ловит ошибки из дочерних компонентов
import { onErrorCaptured } from "vue";
onErrorCaptured((err, instance, info) => {
  console.log("Поймана ошибка:", err);
  return false; // false — предотвращает дальнейшее распространение
});
```

---

## Polling (периодический запрос)

```ts
const data = ref<Status | null>(null);
let pollInterval: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  async function poll() {
    const res = await fetch("/api/status");
    data.value = await res.json();
  }

  poll();
  pollInterval = setInterval(poll, 5000);
});

onUnmounted(() => {
  if (pollInterval) clearInterval(pollInterval);
});
```

---

## Паттерны состояния запроса

```ts
type Status = "idle" | "loading" | "success" | "error";
const status = ref<Status>("idle");

async function fetchData() {
  status.value = "loading";
  try {
    data.value = await api.getData();
    status.value = "success";
  } catch (e) {
    error.value = (e as Error).message;
    status.value = "error";
  }
}
```

```vue
<template>
  <div v-if="status === 'loading'">...</div>
  <div v-else-if="status === 'error'">{{ error }}</div>
  <div v-else-if="status === 'success'">...</div>
  <div v-else>Нажмите для загрузки</div>
</template>
```

---

## Типичные ошибки

```ts
// НЕПРАВИЛЬНО — top-level await без Suspense вызовет предупреждение
// const res = await fetch(...)

// ПРАВИЛЬНО — async-логика в функциях
onMounted(async () => {
  const res = await fetch(...);
});

// ПРАВИЛЬНО — top-level await с оборачивающим <Suspense>
const data = await fetch(...).then(r => r.json());

// НЕПРАВИЛЬНО — забытый await
const data = fetch(url).json(); // Promise, не данные

// ПРАВИЛЬНО
const res = await fetch(url);
const data = await res.json();

// НЕПРАВИЛЬНО — изменение ref после размонтирования
async function load() {
  const result = await fetch(...);
  data.value = result; // компонент мог быть размонтирован
}

// ПРАВИЛЬНО — использовать AbortController или onWatcherCleanup
```
