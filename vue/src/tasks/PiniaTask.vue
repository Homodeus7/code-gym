<script setup lang="ts">
import { defineStore, storeToRefs } from "pinia";
import { ref, computed } from "vue";

// --- TASK 1 ---
// Определи Pinia store useCounterStore прямо в этом файле (для учебных целей).
// Store содержит: state count (ref), getter double (computed), actions increment / decrement / reset.

const useCounterStore = defineStore("counter", () => {
  const count = ref(0);
  const double = computed(() => count.value * 2);

  function increment() {
    count.value++;
  }
  function decrement() {
    count.value--;
  }
  function reset() {
    count.value = 0;
  }

  return { count, double, increment, decrement, reset };
});

// --- TASK 2 ---
// Определи useCartStore: массив items (ref), computed total (сумма price * qty).
// Действия: addItem(item), removeItem(id).

const useCartStore = defineStore("cart", () => {
  const items = ref([
    { id: 1, name: "Кофе", price: 120, qty: 1 },
    { id: 2, name: "Круассан", price: 85, qty: 2 },
  ]);

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.qty, 0),
  );

  function addItem(item: {
    id: number;
    name: string;
    price: number;
    qty?: number;
  }) {
    const existing = items.value.find((i) => i.id === item.id);
    if (existing) existing.qty++;
    else items.value.push({ ...item, qty: 1 });
  }

  function removeItem(id: number) {
    items.value = items.value.filter((i) => i.id !== id);
  }

  return { items, total, addItem, removeItem };
});

// --- Использование store ---
const counter = useCounterStore();
const cart = useCartStore();

// storeToRefs сохраняет реактивность при деструктуризации
const { count, double } = storeToRefs(counter);
const { items, total } = storeToRefs(cart);

// --- TASK 3 ---
// Новый товар для добавления
const newItem = ref({ id: 3, name: "Чай", price: 60 });
</script>

<template>
  <div class="task-page">
    <h1>Задачи: Pinia (store, getters, actions, storeToRefs)</h1>

    <!-- TASK 1 -->
    <section>
      <h2>Задача 1 — useCounterStore</h2>
      <p>
        count = <strong>{{ count }}</strong> | double =
        <strong>{{ double }}</strong>
      </p>
      <button @click="counter.decrement">−</button>
      <button @click="counter.increment">+</button>
      <button @click="counter.reset">Сбросить</button>
    </section>

    <!-- TASK 2 -->
    <section>
      <h2>Задача 2 — useCartStore (корзина)</h2>
      <table>
        <thead>
          <tr>
            <th>Товар</th>
            <th>Цена</th>
            <th>Кол-во</th>
            <th>Сумма</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id">
            <td>{{ item.name }}</td>
            <td>{{ item.price }} ₽</td>
            <td>{{ item.qty }}</td>
            <td>{{ item.price * item.qty }} ₽</td>
            <td><button @click="cart.removeItem(item.id)">✕</button></td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3"><strong>Итого:</strong></td>
            <td colspan="2">
              <strong>{{ total }} ₽</strong>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>

    <!-- TASK 3 -->
    <section>
      <h2>Задача 3 — добавление товара</h2>
      <label
        >ID:
        <input v-model.number="newItem.id" type="number" style="width: 50px"
      /></label>
      <label>Название: <input v-model="newItem.name" /></label>
      <label
        >Цена:
        <input v-model.number="newItem.price" type="number" style="width: 70px"
      /></label>
      <button @click="cart.addItem(newItem)">Добавить</button>
    </section>

    <!-- TASK 4 (TODO) -->
    <section>
      <h2>Задача 4 — $patch (самостоятельно)</h2>
      <p>
        Используй <code>counter.$patch({ count: 42 })</code> для прямого
        изменения state. Добавь кнопку «Установить 42» и реализуй её через
        <code>$patch</code>.
      </p>
      <!-- TODO: реализуй здесь -->
    </section>
  </div>
</template>

<style scoped>
.task-page {
  max-width: 750px;
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
  margin: 0 6px;
  padding: 3px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
label {
  display: inline-block;
  margin: 4px 6px 4px 0;
}
table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}
th,
td {
  border: 1px solid #ddd;
  padding: 6px 10px;
  text-align: left;
}
th {
  background: #f5f7fa;
}
code {
  background: #f1f5f9;
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 0.9em;
}
</style>
