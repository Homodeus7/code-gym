# Async паттерны в Vue 3 — Шпаргалка

## Базовый fetch в компоненте

```vue
<script setup>
import { ref, onMounted } from "vue";

const data = ref(null);
const loading = ref(false);
const error = ref(null);

async function fetchData() {
  loading.value = true;
  error.value = null;
  try {
    const res = await fetch("https://api.example.com/items");
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    data.value = await res.json();
  } catch (e) {
    error.value = e.message;
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

```js
// Все запросы выполняются одновременно
const [users, posts, comments] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json()),
])

// Если хотя бы один упадёт — Promise.all отклонится
// Используй Promise.allSettled, чтобы получить все результаты независимо
const results = await Promise.allSettled([...])
results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value)
  if (r.status === 'rejected') console.error(r.reason)
})
```

---

## AbortController — отмена запросов

```js
let controller = null;

async function startFetch() {
  // Отменяем предыдущий запрос, если он ещё идёт
  controller?.abort();
  controller = new AbortController();

  try {
    const res = await fetch(url, { signal: controller.signal });
    data.value = await res.json();
  } catch (e) {
    if (e.name === "AbortError") {
      console.log("Запрос отменён");
    } else {
      throw e;
    }
  }
}

// Очищай в onUnmounted, чтобы избежать утечек
onUnmounted(() => controller?.abort());
```

---

## watch + fetch (зависимый запрос)

```js
const userId = ref(1);
const posts = ref([]);

watch(
  userId,
  async (id) => {
    const res = await fetch(`/api/posts?userId=${id}`);
    posts.value = await res.json();
  },
  { immediate: true },
);
```

---

## Дебаунс для поиска

```js
import { ref, watch } from "vue";

const search = ref("");
const results = ref([]);
let debounceTimer = null;

watch(search, (val) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    if (!val.trim()) {
      results.value = [];
      return;
    }
    const res = await fetch(`/api/search?q=${val}`);
    results.value = await res.json();
  }, 400);
});
```

---

## Suspense (экспериментально в Vue 3)

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

<!-- AsyncComponent.vue — async setup() -->
<script setup>
const data = await fetch("/api/data").then((r) => r.json());
// Suspense ждёт завершения async setup
</script>
```

---

## Обработка ошибок

```js
// Глобальный обработчик ошибок Vue
const app = createApp(App);
app.config.errorHandler = (err, instance, info) => {
  console.error("Vue Error:", err, info);
  // Отправь в Sentry или другой сервис
};

// onErrorCaptured в компоненте
import { onErrorCaptured } from "vue";
onErrorCaptured((err, instance, info) => {
  console.log("Поймана ошибка:", err);
  return false; // false — предотвращает дальнейшее распространение
});
```

---

## Polling (периодический запрос)

```js
const data = ref(null);
let pollInterval = null;

onMounted(() => {
  async function poll() {
    const res = await fetch("/api/status");
    data.value = await res.json();
  }

  poll(); // Сразу при монтировании
  pollInterval = setInterval(poll, 5000);
});

onUnmounted(() => clearInterval(pollInterval));
```

---

## Паттерны состояния запроса

```js
// Enum-стиль для состояния
const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};
const status = ref(STATUS.IDLE);

async function fetchData() {
  status.value = STATUS.LOADING;
  try {
    data.value = await api.getData();
    status.value = STATUS.SUCCESS;
  } catch (e) {
    error.value = e.message;
    status.value = STATUS.ERROR;
  }
}
```

```vue
<template>
  <div v-if="status === 'loading'">...</div>
  <div v-else-if="status === 'error'">...</div>
  <div v-else-if="status === 'success'">...</div>
  <div v-else>Нажмите для загрузки</div>
</template>
```

---

## Типичные ошибки

```js
// НЕПРАВИЛЬНО — setup не может быть async напрямую (только с Suspense)
// const res = await fetch(...)  <-- не делай так без Suspense

// ПРАВИЛЬНО — помещай async-логику в функции
onMounted(async () => {
  const res = await fetch(...)
})

// НЕПРАВИЛЬНО — забытый await
const data = fetch(url).json() // вернёт Promise, не данные

// ПРАВИЛЬНО
const res = await fetch(url)
const data = await res.json()

// НЕПРАВИЛЬНО — изменение ref после размонтирования (утечка памяти)
async function load() {
  const data = await fetch(...)
  data.value = data // компонент мог быть размонтирован
}

// ПРАВИЛЬНО — проверять или использовать AbortController
let mounted = true
onUnmounted(() => { mounted = false })
async function load() {
  const data = await fetch(...)
  if (mounted) data.value = data
}
```
