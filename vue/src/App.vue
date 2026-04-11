<script setup lang="ts">
import { defineAsyncComponent, shallowRef } from "vue";

// Lazy-load task components
const taskComponents = {
  reactivity: defineAsyncComponent(() => import("./tasks/ReactivityTask.vue")),
  components: defineAsyncComponent(() => import("./tasks/ComponentsTask.vue")),
  pinia: defineAsyncComponent(() => import("./tasks/PiniaTask.vue")),
  composables: defineAsyncComponent(
    () => import("./tasks/ComposablesTask.vue"),
  ),
  forms: defineAsyncComponent(() => import("./tasks/FormsTask.vue")),
  lifecycle: defineAsyncComponent(() => import("./tasks/LifecycleTask.vue")),
  async: defineAsyncComponent(() => import("./tasks/AsyncTask.vue")),
};

const navItems: { key: TaskKey; label: string; emoji: string }[] = [
  { key: 'reactivity', label: 'Реактивность', emoji: '⚡' },
  { key: 'components', label: 'Компоненты', emoji: '🧩' },
  { key: 'pinia', label: 'Pinia', emoji: '🍍' },
  { key: 'composables', label: 'Composables', emoji: '🔧' },
  { key: 'forms', label: 'Формы', emoji: '📝' },
  { key: 'lifecycle', label: 'Lifecycle', emoji: '♻️' },
  { key: 'async', label: 'Async / Fetch', emoji: '🌐' },
]

const cheatsheets = [
  { key: "vue3", label: "Vue 3 Composition API" },
  { key: "pinia", label: "Pinia" },
  { key: "composables", label: "Composables" },
  { key: "async", label: "Async паттерны" },
];

type TaskKey = keyof typeof taskComponents

const activeTask = shallowRef<TaskKey | null>(null)
const ActiveComponent = shallowRef<(typeof taskComponents)[TaskKey] | null>(null)

function openTask(key: TaskKey) {
  activeTask.value = key
  ActiveComponent.value = taskComponents[key]
}

function goHome() {
  activeTask.value = null;
  ActiveComponent.value = null;
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <button class="logo-btn" @click="goHome">
        <span class="logo-icon">🟢</span>
        <span class="logo-text">Vue 3 Практика</span>
      </button>
      <nav class="top-nav">
        <button
          v-for="item in navItems"
          :key="item.key"
          class="nav-btn"
          :class="{ active: activeTask === item.key }"
          @click="openTask(item.key)"
        >
          {{ item.emoji }} {{ item.label }}
        </button>
      </nav>
    </header>

    <main class="app-main">
      <!-- Home screen -->
      <div v-if="!activeTask" class="home">
        <h1 class="home-title">Vue 3 + Pinia — Задачи и Шпаргалки</h1>
        <p class="home-subtitle">Выбери тему для практики</p>

        <section class="card-grid">
          <div
            v-for="item in navItems"
            :key="item.key"
            class="card"
            @click="openTask(item.key)"
          >
            <span class="card-emoji">{{ item.emoji }}</span>
            <span class="card-label">{{ item.label }}</span>
          </div>
        </section>

        <section class="cheatsheet-section">
          <h2>Шпаргалки (.md)</h2>
          <p class="muted">
            Открой файлы в <code>src/cheatsheets/</code> в редакторе с
            поддержкой Markdown.
          </p>
          <ul class="cheatsheet-list">
            <li v-for="cs in cheatsheets" :key="cs.key">
              <code
                >src/cheatsheets/{{
                  cs.key === "vue3"
                    ? "vue3-composition-api"
                    : cs.key === "pinia"
                      ? "pinia"
                      : cs.key === "composables"
                        ? "composables"
                        : "async-patterns"
                }}.md</code
              >
              — {{ cs.label }}
            </li>
          </ul>
        </section>
      </div>

      <!-- Task view -->
      <div v-else class="task-view">
        <button class="back-btn" @click="goHome">← Назад</button>
        <Suspense>
          <template #default>
            <component :is="ActiveComponent" />
          </template>
          <template #fallback>
            <div class="loading">Загрузка задания...</div>
          </template>
        </Suspense>
      </div>
    </main>
  </div>
</template>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background: #f8fafc;
  color: #1e293b;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.app-header {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 0.6rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.logo-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
}

.logo-icon {
  font-size: 1.4rem;
}
.logo-text {
  font-weight: 700;
  font-size: 1.05rem;
  color: #16a34a;
  white-space: nowrap;
}

.top-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
}

.nav-btn {
  padding: 0.3rem 0.7rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: #f8fafc;
  cursor: pointer;
  font-size: 0.82rem;
  color: #475569;
  transition: all 0.15s;
  white-space: nowrap;
}

.nav-btn:hover {
  background: #f1f5f9;
  border-color: #94a3b8;
  color: #1e293b;
}
.nav-btn.active {
  background: #dcfce7;
  border-color: #16a34a;
  color: #15803d;
  font-weight: 600;
}

/* Main */
.app-main {
  flex: 1;
  padding: 2rem 1.5rem;
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
}

/* Home */
.home-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 0.4rem;
}
.home-subtitle {
  color: #64748b;
  margin: 0 0 2rem;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.8rem;
  margin-bottom: 2.5rem;
}

.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.2rem 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.15s;
  text-align: center;
}

.card:hover {
  border-color: #16a34a;
  box-shadow: 0 4px 12px rgba(22, 163, 74, 0.12);
  transform: translateY(-2px);
}

.card-emoji {
  font-size: 2rem;
}
.card-label {
  font-size: 0.88rem;
  font-weight: 500;
  color: #334155;
}

/* Cheatsheets */
.cheatsheet-section {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
}
.cheatsheet-section h2 {
  margin: 0 0 0.4rem;
  font-size: 1.1rem;
}
.muted {
  color: #64748b;
  font-size: 0.9rem;
  margin: 0 0 0.8rem;
}
.cheatsheet-list {
  margin: 0;
  padding-left: 1.2rem;
}
.cheatsheet-list li {
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
}
code {
  background: #f1f5f9;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 0.88em;
  color: #0f172a;
}

/* Task view */
.task-view {
}
.back-btn {
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 0.4rem 0.9rem;
  cursor: pointer;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #475569;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
}
.back-btn:hover {
  background: #f1f5f9;
}

.loading {
  padding: 2rem;
  text-align: center;
  color: #64748b;
}
</style>
