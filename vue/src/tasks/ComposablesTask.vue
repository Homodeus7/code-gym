<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// --- TASK 1 ---
// Реализуй composable useCounter(initialValue) прямо здесь.
// Возвращает: count, increment, decrement, reset.

function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const increment = () => count.value++;
  const decrement = () => count.value--;
  const reset = () => (count.value = initialValue);
  return { count, increment, decrement, reset };
}

const counter1 = useCounter(0);
const counter2 = useCounter(10);

// --- TASK 2 ---
// Реализуй composable useLocalStorage(key, defaultValue).
// Синхронизирует ref с localStorage: при изменении ref — записывает, при инициализации — читает.

function useLocalStorage<T>(key: string, defaultValue: T) {
  const stored = localStorage.getItem(key);
  const data = ref<T>(stored !== null ? JSON.parse(stored) : defaultValue);

  function save() {
    localStorage.setItem(key, JSON.stringify(data.value));
  }

  return { data, save };
}

const { data: savedName, save: saveName } = useLocalStorage(
  "vue-task-name",
  "",
);

// --- TASK 3 ---
// Реализуй composable useWindowSize().
// Отслеживает ширину и высоту окна браузера в реальном времени.

function useWindowSize() {
  const width = ref(window.innerWidth);
  const height = ref(window.innerHeight);

  function onResize() {
    width.value = window.innerWidth;
    height.value = window.innerHeight;
  }

  onMounted(() => window.addEventListener("resize", onResize));
  onUnmounted(() => window.removeEventListener("resize", onResize));

  return { width, height };
}

const { width, height } = useWindowSize();

// --- TASK 4 ---
// Реализуй composable useFetch(url) с состояниями data / loading / error.

interface Post {
  id: number;
  title: string;
}

function useFetch(url: string) {
  const data = ref<Post[] | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function execute() {
    loading.value = true;
    error.value = null;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      data.value = await res.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : String(e);
    } finally {
      loading.value = false;
    }
  }

  onMounted(execute);

  return { data, loading, error, refetch: execute };
}

const {
  data: posts,
  loading,
  error,
  refetch,
} = useFetch("https://jsonplaceholder.typicode.com/posts?_limit=3");
</script>

<template>
  <div class="task-page">
    <h1>
      Задачи: Composables (useCounter, useLocalStorage, useWindowSize, useFetch)
    </h1>

    <!-- TASK 1 -->
    <section>
      <h2>Задача 1 — useCounter</h2>
      <p>
        Счётчик A (начало 0): <strong>{{ counter1.count }}</strong>
      </p>
      <button @click="counter1.decrement">−</button>
      <button @click="counter1.increment">+</button>
      <button @click="counter1.reset">Сброс</button>

      <p style="margin-top: 0.8rem">
        Счётчик B (начало 10): <strong>{{ counter2.count }}</strong>
      </p>
      <button @click="counter2.decrement">−</button>
      <button @click="counter2.increment">+</button>
      <button @click="counter2.reset">Сброс</button>
    </section>

    <!-- TASK 2 -->
    <section>
      <h2>Задача 2 — useLocalStorage</h2>
      <label>
        Сохранить имя:
        <input v-model="savedName" placeholder="Введи имя" />
      </label>
      <button @click="saveName">Сохранить в localStorage</button>
      <p>
        Значение в ref: <strong>{{ savedName || "—" }}</strong>
      </p>
      <small>Обнови страницу — значение должно сохраниться.</small>
    </section>

    <!-- TASK 3 -->
    <section>
      <h2>Задача 3 — useWindowSize</h2>
      <p>
        Ширина окна: <strong>{{ width }}px</strong>
      </p>
      <p>
        Высота окна: <strong>{{ height }}px</strong>
      </p>
      <small>Измени размер браузера — значения обновятся автоматически.</small>
    </section>

    <!-- TASK 4 -->
    <section>
      <h2>Задача 4 — useFetch</h2>
      <p v-if="loading">Загрузка...</p>
      <p v-else-if="error" style="color: red">Ошибка: {{ error }}</p>
      <ul v-else-if="posts">
        <li v-for="post in posts" :key="post.id">
          <strong>[{{ post.id }}]</strong> {{ post.title }}
        </li>
      </ul>
      <button @click="refetch">Перезагрузить</button>
    </section>
  </div>
</template>

<style scoped>
.task-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: sans-serif;
}
h1 {
  font-size: 1.4rem;
  margin-bottom: 1.2rem;
}
h2 {
  font-size: 1rem;
  margin: 1.2rem 0 0.4rem;
  color: #555;
}
section {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}
button {
  margin: 0 4px;
  padding: 4px 12px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #888;
}
input {
  margin-left: 6px;
  padding: 3px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
label {
  display: block;
  margin-bottom: 6px;
}
ul {
  margin: 0 0 0.6rem;
  padding-left: 1.2rem;
}
small {
  color: #888;
  font-size: 0.85rem;
}
</style>
