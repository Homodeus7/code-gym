<script setup lang="ts">
import { ref } from 'vue'

interface User {
  id: number
  name: string
  email: string
}

interface Post {
  id: number
  title: string
  userId: number
}

interface Todo {
  id: number
  title: string
  completed: boolean
}

interface Album {
  id: number
  title: string
}

// --- TASK 1 ---
// Загрузи список пользователей с JSONPlaceholder API.
// Отобрази состояния: loading, error, данные.

const users = ref<User[]>([])
const usersLoading = ref(false)
const usersError = ref<string | null>(null)

async function fetchUsers() {
  usersLoading.value = true
  usersError.value = null
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    users.value = await res.json()
  } catch (e) {
    usersError.value = e instanceof Error ? e.message : String(e)
  } finally {
    usersLoading.value = false
  }
}

// --- TASK 2 ---
// Загрузи посты выбранного пользователя (зависимый запрос).

const selectedUserId = ref<number | null>(null)
const posts = ref<Post[]>([])
const postsLoading = ref(false)

async function fetchPostsByUser(userId: number) {
  selectedUserId.value = userId
  postsLoading.value = true
  posts.value = []
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}&_limit=5`,
    )
    posts.value = await res.json()
  } finally {
    postsLoading.value = false
  }
}

// --- TASK 3 ---
// Promise.all: загрузи todos и albums параллельно.

const parallel = ref<{ todos: Todo[]; albums: Album[] }>({ todos: [], albums: [] })
const parallelLoading = ref(false)
const parallelDone = ref(false)

async function fetchParallel() {
  parallelLoading.value = true
  parallelDone.value = false
  const [todosRes, albumsRes] = await Promise.all([
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=4'),
    fetch('https://jsonplaceholder.typicode.com/albums?_limit=4'),
  ])
  parallel.value.todos = await todosRes.json()
  parallel.value.albums = await albumsRes.json()
  parallelLoading.value = false
  parallelDone.value = true
}

// --- TASK 4 ---
// AbortController: отменяемый запрос с задержкой.

const abortResult = ref('')
let abortController: AbortController | null = null

async function startSlowRequest() {
  abortController = new AbortController()
  abortResult.value = 'Запрос выполняется...'
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      signal: abortController.signal,
    })
    const data = await res.json()
    abortResult.value = `Получено: "${data.title.slice(0, 40)}..."`
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') {
      abortResult.value = 'Запрос отменён пользователем.'
    } else {
      abortResult.value = `Ошибка: ${e instanceof Error ? e.message : String(e)}`
    }
  }
}

function cancelRequest() {
  abortController?.abort()
}
</script>

<template>
  <div class="task-page">
    <h1>Задачи: Async / Fetch (Promise, Promise.all, AbortController)</h1>

    <!-- TASK 1 -->
    <section>
      <h2>Задача 1 — загрузка списка пользователей</h2>
      <button @click="fetchUsers" :disabled="usersLoading">
        {{ usersLoading ? 'Загрузка...' : 'Загрузить пользователей' }}
      </button>
      <p v-if="usersError" style="color: red">Ошибка: {{ usersError }}</p>
      <ul v-else-if="users.length">
        <li v-for="u in users" :key="u.id">
          <strong>{{ u.name }}</strong> — {{ u.email }}
          <button class="small" @click="fetchPostsByUser(u.id)">Посты</button>
        </li>
      </ul>
    </section>

    <!-- TASK 2 -->
    <section>
      <h2>Задача 2 — зависимый запрос (посты пользователя)</h2>
      <p v-if="!selectedUserId" class="muted">Нажми «Посты» у любого пользователя выше.</p>
      <p v-else-if="postsLoading">Загрузка постов userId={{ selectedUserId }}...</p>
      <ul v-else-if="posts.length">
        <li v-for="p in posts" :key="p.id">{{ p.title }}</li>
      </ul>
    </section>

    <!-- TASK 3 -->
    <section>
      <h2>Задача 3 — Promise.all (параллельные запросы)</h2>
      <button @click="fetchParallel" :disabled="parallelLoading">
        {{ parallelLoading ? 'Загрузка...' : 'Загрузить todos + albums параллельно' }}
      </button>
      <div v-if="parallelDone" style="display: flex; gap: 1rem; margin-top: 0.6rem">
        <div>
          <strong>Todos:</strong>
          <ul>
            <li v-for="t in parallel.todos" :key="t.id">
              <span :style="t.completed ? 'text-decoration:line-through;color:#888' : ''">{{
                t.title
              }}</span>
            </li>
          </ul>
        </div>
        <div>
          <strong>Albums:</strong>
          <ul>
            <li v-for="a in parallel.albums" :key="a.id">{{ a.title }}</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- TASK 4 -->
    <section>
      <h2>Задача 4 — AbortController</h2>
      <button @click="startSlowRequest">Начать запрос</button>
      <button @click="cancelRequest">Отменить</button>
      <p style="margin-top: 0.5rem">{{ abortResult }}</p>
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
  padding: 5px 14px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #888;
}
button:disabled {
  opacity: 0.4;
  cursor: default;
}
button.small {
  font-size: 0.8rem;
  padding: 2px 8px;
  margin-left: 8px;
}
ul {
  margin: 0.5rem 0;
  padding-left: 1.2rem;
}
li {
  margin-bottom: 3px;
}
.muted {
  color: #888;
  font-size: 0.88rem;
}
</style>
