<script setup lang="ts">
import { ref } from "vue";

// --- TASK 1 ---
// Создай дочерний компонент ChildBox (определён ниже через defineComponent).
// Передай ему prop title (строка). Дочерний компонент отображает title в заголовке.

// --- TASK 2 ---
// Дочерний компонент при клике на кнопку должен emit событие 'greet' с текстом.
// Родитель ловит событие и выводит его в lastMessage.

const lastMessage = ref("");

// --- TASK 3 ---
// Используй v-for для рендеринга списка items в ChildBox.

const items = ["Яблоко", "Банан", "Вишня", "Груша"];

// --- TASK 4 ---
// Используй slot в ChildBox для кастомного содержимого.

// Inline child component (single-file style via defineComponent)
import { defineComponent, h } from "vue";

const ChildBox = defineComponent({
  name: "ChildBox",
  props: {
    title: { type: String, required: true },
  },
  emits: ["greet"],
  setup(props, { emit, slots }) {
    return () =>
      h(
        "div",
        {
          style:
            "border:1px solid #a3c4f3;border-radius:8px;padding:1rem;margin-bottom:.5rem",
        },
        [
          h("h3", { style: "margin:0 0 .5rem;color:#2563eb" }, props.title),
          slots.default?.(),
          h(
            "button",
            {
              onClick: () => emit("greet", `Привет от «${props.title}»!`),
              style: "margin-top:.5rem;padding:3px 10px;cursor:pointer",
            },
            "Отправить событие",
          ),
        ],
      );
  },
});
</script>

<template>
  <div class="task-page">
    <h1>Задачи: Компоненты (props, emits, slots, v-for)</h1>

    <!-- TASK 1 + 2 -->
    <section>
      <h2>Задача 1–2 — props + emit</h2>
      <ChildBox title="Первый блок" @greet="(msg) => (lastMessage = msg)">
        <p style="color: #444">Это slot-контент родителя.</p>
      </ChildBox>
      <ChildBox title="Второй блок" @greet="(msg) => (lastMessage = msg)">
        <em>Другой slot-контент.</em>
      </ChildBox>
      <p v-if="lastMessage" style="color: green">Получено: {{ lastMessage }}</p>
    </section>

    <!-- TASK 3 -->
    <section>
      <h2>Задача 3 — v-for с ключом</h2>
      <ul>
        <li v-for="(item, i) in items" :key="i">{{ i + 1 }}. {{ item }}</li>
      </ul>
    </section>

    <!-- TASK 4 -->
    <section>
      <h2>Задача 4 — conditional rendering</h2>
      <p>
        Добавь переменную <code>showExtra</code> (ref) и кнопку-переключатель.
        По условию <code>v-if</code> показывай/скрывай дополнительный блок.
      </p>
      <!-- TODO: реализуй здесь v-if/v-show переключатель -->
    </section>

    <!-- TASK 5 -->
    <section>
      <h2>Задача 5 — v-model на кастомном компоненте</h2>
      <p>
        Создай компонент <code>MyInput</code>, который принимает
        <code>modelValue</code> через prop и эмитит
        <code>update:modelValue</code>. Используй его с <code>v-model</code> в
        родителе.
      </p>
      <!-- TODO: реализуй MyInput и v-model binding здесь -->
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
code {
  background: #f1f5f9;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 0.9em;
}
ul {
  margin: 0;
  padding-left: 1.2rem;
}
</style>
