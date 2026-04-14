<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

// ─────────────────────────────────────────────────────────────────────────────
// ТИПЫ — всегда определяй интерфейс для данных из API.
// Это даёт автодополнение и ловит ошибки на этапе компиляции, не в рантайме.
// ─────────────────────────────────────────────────────────────────────────────
interface User {
  id: number
  name: string
  email: string
  phone: string
  website: string
  company: { name: string }
}

// ─────────────────────────────────────────────────────────────────────────────
// STATE — ref<T> с явным дженериком.
//
// Почему ref, а не reactive?
//   ref — для примитивов и одиночных значений (строка, число, null, массив).
//   reactive — для объектов с несколькими полями, которые логически связаны.
//   Правило: если тип — не объект или объект с одним смыслом — используй ref.
// ─────────────────────────────────────────────────────────────────────────────
const users = ref<User[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// ─────────────────────────────────────────────────────────────────────────────
// v-model под капотом = :value + @input.
// Для <input> Vue делает это автоматически через директиву v-model.
// Отдельный ref для строки поиска — это «источник правды» (single source of truth).
// ─────────────────────────────────────────────────────────────────────────────
const query = ref('')

// ─────────────────────────────────────────────────────────────────────────────
// Лог поиска — объявляем ДО watch, который его использует.
// ─────────────────────────────────────────────────────────────────────────────
const searchLog = ref('')

// ─────────────────────────────────────────────────────────────────────────────
// COMPUTED — кэшированное производное значение.
//
// Почему computed, а не метод?
//   computed пересчитывается только когда изменились его зависимости (query, users).
//   Метод вызывается заново при каждом ре-рендере шаблона, даже без изменений.
//   Для фильтрации списка — всегда computed.
// ─────────────────────────────────────────────────────────────────────────────
const filteredUsers = computed(() => {
  // trim() — не фильтровать по случайным пробелам.
  const q = query.value.trim().toLowerCase()

  // Пустой запрос — возвращаем всё без фильтрации.
  if (!q) return users.value

  return users.value.filter(
    (u) =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.company.name.toLowerCase().includes(q)
  )
})

// ─────────────────────────────────────────────────────────────────────────────
// WATCH vs watchEffect:
//
//   watch(source, cb)     — явная зависимость, callback получает (new, old).
//                           Используй когда нужно знать предыдущее значение
//                           или реагировать только на конкретный ref.
//
//   watchEffect(cb)       — автоматически отслеживает всё, что читает cb.
//                           Короче, но менее предсказуемо.
//
// Здесь watch на query — логируем для отладки и можно добавить debounce.
// В продакшне здесь был бы debounced API-запрос вместо computed-фильтрации.
// ─────────────────────────────────────────────────────────────────────────────
watch(query, (newVal, oldVal) => {
  // watch срабатывает только при изменении — проверка newVal !== oldVal лишняя.
  // newVal и oldVal — значения ДО и ПОСЛЕ изменения.
  searchLog.value = `Поиск: "${newVal}" (было: "${oldVal}")`
})

// ─────────────────────────────────────────────────────────────────────────────
// ПОЛУЧЕНИЕ ДАННЫХ — async функция, не async setup.
//
// Почему не делать setup() async?
//   async setup() требует <Suspense> у родителя.
//   Лучше: обычная async функция, вызываемая в onMounted или сразу.
//
// Паттерн: loading/error/data — «три состояния запроса».
//   loading = true  → показываем skeleton / spinner
//   error   ≠ null  → показываем сообщение об ошибке
//   data    ≠ null  → показываем данные
// ─────────────────────────────────────────────────────────────────────────────
async function fetchUsers() {
  loading.value = true
  error.value = null // сбрасываем ошибку перед новым запросом

  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users')

    // Всегда проверяй res.ok — fetch не бросает ошибку при 4xx/5xx.
    // fetch отклоняет Promise только при сетевых проблемах (нет сети и т.п.)
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)

    users.value = await res.json()
  } catch (e) {
    // catch (e) типизируется как unknown в strict-режиме.
    // Правильная проверка: instanceof Error перед .message
    error.value = e instanceof Error ? e.message : 'Неизвестная ошибка'
  } finally {
    // finally — выполняется всегда: и при успехе, и при ошибке.
    // Идеальное место для loading = false.
    loading.value = false
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// onMounted — запускаем fetch после монтирования компонента в DOM.
//
// Почему не вызывать fetchUsers() сразу в теле setup?
//   Технически работает, но onMounted явно выражает намерение:
//   «нужен DOM / нужно что компонент готов». Стандартный паттерн Vue.
//   Также: в SSR setup выполняется на сервере, onMounted — только на клиенте.
// ─────────────────────────────────────────────────────────────────────────────
onMounted(fetchUsers)

// ─────────────────────────────────────────────────────────────────────────────
// ВЫБОР ПОЛЬЗОВАТЕЛЯ — пример управляемого состояния выделения.
// selectedId, а не selectedUser — храним минимум (id), User берём через computed.
// ─────────────────────────────────────────────────────────────────────────────
const selectedId = ref<number | null>(null)

const selectedUser = computed(
  () => users.value.find((u) => u.id === selectedId.value) ?? null
)

function selectUser(id: number) {
  // Повторный клик — снимаем выделение (toggle).
  selectedId.value = selectedId.value === id ? null : id
}
</script>

<template>
  <div class="page">
    <h1>Шпаргалка: поиск, fetch, v-model, computed, watch</h1>

    <!-- ──────────────────────────────────────────────────────────────────────
      ПОИСК — v-model
      v-model на <input> эквивалентно:
        :value="query" @input="query = $event.target.value"
      Модификатор .trim убирает пробелы автоматически, но тогда нельзя
      искать с пробелом внутри — поэтому trim делаем вручную в computed.
    ─────────────────────────────────────────────────────────────────────── -->
    <div class="search-bar">
      <input
        v-model="query"
        type="search"
        placeholder="Поиск по имени, email, компании..."
        class="search-input"
        autocomplete="off"
      />
      <!--
        @click vs @click.prevent vs @click.stop:
          @click           — просто обработчик
          @click.prevent   — event.preventDefault() (отмена submit формы)
          @click.stop      — event.stopPropagation() (не даём событию всплыть)
      -->
      <button v-if="query" class="clear-btn" @click="query = ''">✕</button>
    </div>

    <!-- watch-лог (для отладки) -->
    <p v-if="searchLog" class="search-log">{{ searchLog }}</p>

    <!-- ──────────────────────────────────────────────────────────────────────
      СОСТОЯНИЯ ЗАГРУЗКИ — v-if / v-else-if / v-else
      Важен порядок: сначала loading, потом error, потом данные.
      v-if и v-else-if должны быть на соседних элементах.
    ─────────────────────────────────────────────────────────────────────── -->
    <div v-if="loading" class="state-message">Загрузка...</div>

    <div v-else-if="error" class="state-error">
      <p>Ошибка: {{ error }}</p>
      <!--
        @click="fetchUsers" — передаём ссылку на функцию, НЕ вызов.
        @click="fetchUsers()" — тоже работает, но создаёт лишнюю стрелку.
        Разница важна только если функция принимает аргументы:
          @click="selectUser(user.id)"  — нужен вызов с аргументом
          @click="fetchUsers"           — без аргументов — ссылка чище
      -->
      <button @click="fetchUsers">Повторить</button>
    </div>

    <template v-else>
      <!-- ────────────────────────────────────────────────────────────────────
        <template> без тега в DOM — группировка без лишнего div.
        Используй когда нужен v-if/v-for без обёртки.
      ─────────────────────────────────────────────────────────────────────── -->

      <div class="results-header">
        <span>Найдено: {{ filteredUsers.length }} из {{ users.length }}</span>
        <button @click="fetchUsers">Обновить</button>
      </div>

      <!-- ────────────────────────────────────────────────────────────────────
        :key — ПОЧЕМУ НЕ ИНДЕКС?

        Плохо:   v-for="(user, index) in filteredUsers" :key="index"
        Хорошо:  v-for="user in filteredUsers" :key="user.id"

        Vue использует :key для алгоритма reconciliation (диффинг VDOM).
        При удалении/перестановке элементов:
          - key=index: Vue думает что элемент с key=0 всё тот же,
            хотя реально это уже другой пользователь → ошибки состояния,
            анимации не работают, инпуты внутри получают не те данные.
          - key=id: Vue точно знает какой элемент исчез, какой переместился.

        Индекс допустим ТОЛЬКО если список:
          1. Статичный (не меняется, не фильтруется, не сортируется)
          2. Элементы без внутреннего состояния (нет вложенных инпутов)
      ─────────────────────────────────────────────────────────────────────── -->
      <ul v-if="filteredUsers.length" class="user-list">
        <li
          v-for="user in filteredUsers"
          :key="user.id"
          class="user-card"
          :class="{ selected: selectedId === user.id }"
          @click="selectUser(user.id)"
        >
          <div class="user-avatar">{{ user.name[0] }}</div>
          <div class="user-info">
            <strong>{{ user.name }}</strong>
            <span>{{ user.email }}</span>
            <span class="company">{{ user.company.name }}</span>
          </div>
        </li>
      </ul>

      <p v-else class="state-message">Ничего не найдено по «{{ query }}»</p>

      <!-- ────────────────────────────────────────────────────────────────────
        Детальная карточка — computed selectedUser.
        v-if на null — стандартная проверка наличия данных.
      ─────────────────────────────────────────────────────────────────────── -->
      <div v-if="selectedUser" class="detail-card">
        <h2>{{ selectedUser.name }}</h2>
        <dl>
          <dt>Email</dt>
          <dd>{{ selectedUser.email }}</dd>
          <dt>Телефон</dt>
          <dd>{{ selectedUser.phone }}</dd>
          <dt>Сайт</dt>
          <dd>{{ selectedUser.website }}</dd>
          <dt>Компания</dt>
          <dd>{{ selectedUser.company.name }}</dd>
        </dl>
        <button @click="selectedId = null">Закрыть</button>
      </div>
    </template>
  </div>
</template>

<style scoped>
/*
  scoped — стили применяются только к этому компоненту.
  Vue добавляет data-v-xxxxxxxx атрибут к элементам и селекторам.
  Для влияния на дочерние компоненты используй :deep(.class).
*/
.page {
  max-width: 720px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: sans-serif;
}

h1 {
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
}

.search-bar {
  display: flex;
  gap: 8px;
  margin-bottom: 0.5rem;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.15s;
}

.search-input:focus {
  border-color: #16a34a;
}

.clear-btn {
  padding: 6px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  cursor: pointer;
  color: #64748b;
}

.search-log {
  font-size: 0.8rem;
  color: #94a3b8;
  margin: 0 0 0.8rem;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: #64748b;
  margin-bottom: 0.6rem;
}

.results-header button {
  padding: 4px 10px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f8fafc;
  cursor: pointer;
  font-size: 0.82rem;
}

.user-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.user-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s;
  background: #fff;
}

.user-card:hover {
  border-color: #16a34a;
  background: #f0fdf4;
}

.user-card.selected {
  border-color: #16a34a;
  background: #dcfce7;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #16a34a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 0.88rem;
  min-width: 0;
}

.user-info strong {
  font-size: 0.95rem;
}

.user-info span {
  color: #64748b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.company {
  font-size: 0.8rem !important;
  color: #94a3b8 !important;
}

.detail-card {
  margin-top: 1rem;
  padding: 1rem 1.2rem;
  border: 1px solid #16a34a;
  border-radius: 10px;
  background: #f0fdf4;
}

.detail-card h2 {
  margin: 0 0 0.8rem;
  font-size: 1.1rem;
}

dl {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 4px 12px;
  font-size: 0.88rem;
  margin: 0 0 0.8rem;
}

dt {
  color: #64748b;
  font-weight: 500;
}

dd {
  margin: 0;
  color: #1e293b;
}

.detail-card button {
  padding: 5px 14px;
  border: 1px solid #16a34a;
  border-radius: 6px;
  background: #fff;
  color: #15803d;
  cursor: pointer;
  font-size: 0.85rem;
}

.state-message {
  text-align: center;
  color: #94a3b8;
  padding: 2rem;
}

.state-error {
  text-align: center;
  color: #dc2626;
  padding: 1.5rem;
  border: 1px solid #fca5a5;
  border-radius: 8px;
  background: #fef2f2;
}
</style>
