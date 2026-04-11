<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  nextTick,
} from "vue";

// --- TASK 1 ---
// Отследи все хуки жизненного цикла и выводи лог в массив events.

const events = ref<string[]>([])
const count = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

function log(msg: string) {
  events.value.push(`[${new Date().toLocaleTimeString()}] ${msg}`);
}

onBeforeMount(() => log("onBeforeMount — DOM ещё не создан"));
onMounted(() => {
  log("onMounted — компонент смонтирован, DOM доступен");
  // Можно работать с DOM через ref
  if (inputRef.value) inputRef.value.focus();
});
onBeforeUpdate(() =>
  log(`onBeforeUpdate — count будет обновлён (текущее: ${count.value})`),
);
onUpdated(() => log(`onUpdated — DOM обновлён (новое: ${count.value})`));
onBeforeUnmount(() => log("onBeforeUnmount — компонент скоро будет уничтожен"));
onUnmounted(() => log("onUnmounted — компонент уничтожен"));

// --- TASK 2 ---
// nextTick: обнови count и сразу прочитай DOM-значение (до и после nextTick).

const domText = ref("");

async function updateAndRead() {
  count.value++;
  // До nextTick DOM ещё не обновлён
  domText.value = `До nextTick: ${document.querySelector("#count-display")?.textContent}`;
  await nextTick();
  // После nextTick DOM уже обновлён
  domText.value += ` | После nextTick: ${document.querySelector("#count-display")?.textContent}`;
}

// --- TASK 3 ---
// Имитация подписки / отписки (setInterval).

const timer = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  intervalId = setInterval(() => {
    timer.value++;
  }, 1000);
  log("onMounted — setInterval запущен");
});

onBeforeUnmount(() => {
  if (intervalId !== null) clearInterval(intervalId)
  log("onBeforeUnmount — setInterval очищен");
});
</script>

<template>
  <div class="task-page">
    <h1>Задачи: Lifecycle Hooks + nextTick</h1>

    <!-- TASK 1 -->
    <section>
      <h2>Задача 1 — лог хуков жизненного цикла</h2>
      <div class="log-box">
        <p v-for="(event, i) in events" :key="i" class="log-line">
          {{ event }}
        </p>
        <p v-if="!events.length" class="muted">Ждём событий...</p>
      </div>
      <p>
        count = <strong id="count-display">{{ count }}</strong>
      </p>
      <button @click="count++">
        Увеличить count (тригерит onBeforeUpdate/onUpdated)
      </button>
    </section>

    <!-- TASK 2 -->
    <section>
      <h2>Задача 2 — nextTick</h2>
      <button @click="updateAndRead">Обновить и прочитать DOM</button>
      <p
        v-if="domText"
        style="margin-top: 0.5rem; font-size: 0.9rem; color: #444"
      >
        {{ domText }}
      </p>
    </section>

    <!-- TASK 3 -->
    <section>
      <h2>Задача 3 — setInterval с очисткой в onBeforeUnmount</h2>
      <p>
        Таймер (секунды): <strong>{{ timer }}</strong>
      </p>
      <p class="muted">
        Таймер запускается в onMounted, очищается в onBeforeUnmount.
      </p>
    </section>

    <!-- TASK 4 -->
    <section>
      <h2>Задача 4 — доступ к DOM через template ref</h2>
      <input
        ref="inputRef"
        placeholder="Этот input получает focus при монтировании"
      />
      <p class="muted">
        Поле автоматически фокусируется через
        <code>inputRef.value.focus()</code> в onMounted.
      </p>
    </section>

    <!-- TASK 5 (TODO) -->
    <section>
      <h2>Задача 5 — дочерний компонент (самостоятельно)</h2>
      <p>
        Создай дочерний компонент <code>Child.vue</code> с собственным
        <code>onMounted</code> и <code>onUnmounted</code>. Переключай его через
        <code>v-if</code> и наблюдай порядок хуков в консоли.
      </p>
      <!-- TODO: добавь v-if переключатель для дочернего компонента -->
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
.log-box {
  background: #1e1e2e;
  color: #cdd6f4;
  border-radius: 6px;
  padding: 0.8rem;
  min-height: 80px;
  max-height: 180px;
  overflow-y: auto;
  font-size: 0.82rem;
  font-family: monospace;
}
.log-line {
  margin: 2px 0;
}
button {
  margin: 4px 4px 0 0;
  padding: 5px 12px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #888;
}
input {
  margin-left: 6px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 300px;
}
.muted {
  color: #888;
  font-size: 0.88rem;
}
code {
  background: #f1f5f9;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 0.9em;
}
</style>
