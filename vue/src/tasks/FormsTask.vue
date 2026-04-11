<script setup lang="ts">
import { ref, computed } from "vue";

// --- TASK 1 ---
// v-model с различными типами инпутов: text, number, checkbox, radio, select.

const textVal = ref("");
const numberVal = ref(0);
const checkVal = ref(false);
const radioVal = ref("");
const selectVal = ref("");
const multiSelect = ref([]);

// --- TASK 2 ---
// Модификаторы: .trim, .number, .lazy

const trimmed = ref("");
const lazyVal = ref("");
const numericInput = ref(0);

// --- TASK 3 ---
// Валидация формы

const form = ref({ username: "", email: "", password: "" });

const errors = computed(() => {
  const e: Partial<Record<'username' | 'email' | 'password', string>> = {}
  if (!form.value.username.trim()) e.username = 'Имя пользователя обязательно'
  if (!form.value.email.includes('@')) e.email = 'Введите корректный email'
  if (form.value.password.length < 6) e.password = 'Пароль не менее 6 символов'
  return e
})

const isValid = computed(() => Object.keys(errors.value).length === 0);
const submitted = ref(false);

function handleSubmit() {
  submitted.value = true;
  if (isValid.value) {
    alert(`Форма отправлена!\nПользователь: ${form.value.username}`);
  }
}

// --- TASK 4 ---
// Динамический список полей (добавление / удаление строк)

const dynamicList = ref([{ id: 1, value: "" }]);
let nextId = 2;

function addField() {
  dynamicList.value.push({ id: nextId++, value: "" });
}

function removeField(id: number) {
  dynamicList.value = dynamicList.value.filter((f) => f.id !== id);
}
</script>

<template>
  <div class="task-page">
    <h1>Задачи: Формы (v-model, модификаторы, валидация)</h1>

    <!-- TASK 1 -->
    <section>
      <h2>Задача 1 — типы инпутов с v-model</h2>

      <label>Text: <input v-model="textVal" /></label>
      <p>
        textVal = <code>{{ textVal }}</code>
      </p>

      <label>Number: <input v-model.number="numberVal" type="number" /></label>
      <p>
        numberVal = <code>{{ numberVal }}</code> (тип: {{ typeof numberVal }})
      </p>

      <label><input v-model="checkVal" type="checkbox" /> Checkbox</label>
      <p>
        checkVal = <code>{{ checkVal }}</code>
      </p>

      <fieldset>
        <legend>Radio:</legend>
        <label><input v-model="radioVal" type="radio" value="vue" /> Vue</label>
        <label
          ><input v-model="radioVal" type="radio" value="react" /> React</label
        >
        <label
          ><input v-model="radioVal" type="radio" value="svelte" />
          Svelte</label
        >
      </fieldset>
      <p>
        radioVal = <code>{{ radioVal }}</code>
      </p>

      <label>
        Select:
        <select v-model="selectVal">
          <option value="">— выбери —</option>
          <option value="js">JavaScript</option>
          <option value="ts">TypeScript</option>
          <option value="py">Python</option>
        </select>
      </label>
      <p>
        selectVal = <code>{{ selectVal }}</code>
      </p>

      <label>
        Multi-select (Ctrl+клик):
        <select v-model="multiSelect" multiple size="3">
          <option value="vue">Vue</option>
          <option value="pinia">Pinia</option>
          <option value="vite">Vite</option>
        </select>
      </label>
      <p>
        multiSelect = <code>{{ multiSelect }}</code>
      </p>
    </section>

    <!-- TASK 2 -->
    <section>
      <h2>Задача 2 — модификаторы .trim / .lazy / .number</h2>

      <label
        >.trim: <input v-model.trim="trimmed" placeholder="с пробелами"
      /></label>
      <p>«{{ trimmed }}» (длина: {{ trimmed.length }})</p>

      <label
        >.lazy (обновляется при blur): <input v-model.lazy="lazyVal"
      /></label>
      <p>
        lazyVal = <code>{{ lazyVal }}</code>
      </p>

      <label
        >.number: <input v-model.number="numericInput" type="text"
      /></label>
      <p>
        numericInput = <code>{{ numericInput }}</code> (тип:
        {{ typeof numericInput }})
      </p>
    </section>

    <!-- TASK 3 -->
    <section>
      <h2>Задача 3 — валидация формы</h2>
      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label
            >Имя пользователя:
            <input
              v-model="form.username"
              :class="{ invalid: submitted && errors.username }"
            />
          </label>
          <span v-if="submitted && errors.username" class="error">{{
            errors.username
          }}</span>
        </div>
        <div class="field">
          <label
            >Email:
            <input
              v-model="form.email"
              type="email"
              :class="{ invalid: submitted && errors.email }"
            />
          </label>
          <span v-if="submitted && errors.email" class="error">{{
            errors.email
          }}</span>
        </div>
        <div class="field">
          <label
            >Пароль:
            <input
              v-model="form.password"
              type="password"
              :class="{ invalid: submitted && errors.password }"
            />
          </label>
          <span v-if="submitted && errors.password" class="error">{{
            errors.password
          }}</span>
        </div>
        <button type="submit">Отправить</button>
        <span v-if="submitted && isValid" style="color: green; margin-left: 8px"
          >Форма валидна!</span
        >
      </form>
    </section>

    <!-- TASK 4 -->
    <section>
      <h2>Задача 4 — динамический список полей</h2>
      <div v-for="field in dynamicList" :key="field.id" class="dynamic-row">
        <input v-model="field.value" :placeholder="`Поле ${field.id}`" />
        <button
          @click="removeField(field.id)"
          :disabled="dynamicList.length === 1"
        >
          ✕
        </button>
      </div>
      <button @click="addField" style="margin-top: 0.5rem">
        + Добавить поле
      </button>
      <p>
        Значения: <code>{{ dynamicList.map((f) => f.value) }}</code>
      </p>
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
label {
  display: block;
  margin-bottom: 6px;
}
input,
select {
  margin-left: 6px;
  padding: 3px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
input.invalid {
  border-color: red;
}
button {
  margin: 0 4px;
  padding: 4px 12px;
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid #888;
}
button:disabled {
  opacity: 0.4;
  cursor: default;
}
code {
  background: #f1f5f9;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 0.9em;
}
.error {
  color: red;
  font-size: 0.85rem;
  margin-left: 6px;
}
.field {
  margin-bottom: 0.7rem;
}
.dynamic-row {
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
}
fieldset {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.4rem 0.8rem;
  margin: 0.4rem 0;
}
legend {
  font-size: 0.9rem;
  color: #555;
}
</style>
