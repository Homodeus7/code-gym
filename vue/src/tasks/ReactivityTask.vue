<script setup lang="ts">
import { ref, computed, watch, watchEffect } from "vue";

// --- TASK 1 ---
// Создай ref-переменную count и кнопки +/- для её изменения.
// Выведи значение на экран.

const count = ref(0);

// --- TASK 2 ---
// Создай ref-объект user с полями name и age.
// Предпочитай ref над reactive: проще деструктурировать, явное .value,
// работает с любым типом. reactive теряет реактивность при деструктуризации.

interface User {
  name: string;
  age: number;
}

const user = ref<User>({ name: "", age: 0 });

// --- TASK 3 ---
// Создай computed-свойство doubleCount, которое возвращает count * 2.

const doubleCount = computed(() => count.value * 2);

// --- TASK 4 ---
// Используй watch, чтобы выводить в консоль старое и новое значение count при каждом изменении.

watch(count, (newVal, oldVal) => {
  console.log(`count changed: ${oldVal} → ${newVal}`);
});

// --- TASK 5 ---
// Используй watchEffect, чтобы автоматически логировать user.name при каждом его изменении.

watchEffect(() => {
  console.log("user.name =", user.value.name);
});

// --- TASK 6 ---
// Создай computed fullInfo, который возвращает строку: "Имя: {name}, Возраст: {age}".

const fullInfo = computed(
  () => `Имя: ${user.value.name || "—"}, Возраст: ${user.value.age}`,
);
</script>

<template>
  <div class="task-page">
    <h1>Задачи: Реактивность (ref, reactive, computed, watch)</h1>

    <!-- TASK 1 -->
    <section>
      <h2>Задача 1 — ref + кнопки</h2>
      <p>
        Текущее значение count: <strong>{{ count }}</strong>
      </p>
      <button @click="count--">−</button>
      <button @click="count++">+</button>
    </section>

    <!-- TASK 2 -->
    <section>
      <h2>Задача 2 — ref-объект</h2>
      <!-- В шаблоне ref автоматически unwrap-ится: user.name, а не user.value.name -->
      <label>Имя: <input v-model="user.name" placeholder="Введи имя" /></label>
      <label>Возраст: <input v-model.number="user.age" type="number" /></label>
    </section>

    <!-- TASK 3 -->
    <section>
      <h2>Задача 3 — computed doubleCount</h2>
      <p>
        count × 2 = <strong>{{ doubleCount }}</strong>
      </p>
    </section>

    <!-- TASK 4 -->
    <section>
      <h2>Задача 4 — watch (смотри консоль)</h2>
      <p>Измени count кнопками из задачи 1 и смотри в консоль браузера.</p>
    </section>

    <!-- TASK 5 -->
    <section>
      <h2>Задача 5 — watchEffect (смотри консоль)</h2>
      <p>Изменяй поле «Имя» из задачи 2 — в консоли появится user.name.</p>
    </section>

    <!-- TASK 6 -->
    <section>
      <h2>Задача 6 — computed fullInfo</h2>
      <p>{{ fullInfo }}</p>
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
  padding: 4px 14px;
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
</style>
