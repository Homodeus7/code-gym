# Vue 3 Composition API — Шпаргалка

## Структура `<script setup>`

```vue
<script setup>
import { ref, reactive, computed, watch, watchEffect, onMounted } from "vue";
// Весь код доступен в шаблоне без явного return
</script>
```

---

## ref vs reactive

|                  | `ref`                                | `reactive`                       |
| ---------------- | ------------------------------------ | -------------------------------- |
| Тип данных       | примитивы, объекты                   | только объекты / массивы         |
| Доступ в JS      | `count.value`                        | `user.name`                      |
| Доступ в шаблоне | `{{ count }}` (автоматически unwrap) | `{{ user.name }}`                |
| Деструктуризация | теряет реактивность → `toRefs()`     | теряет реактивность → `toRefs()` |

```js
const count = ref(0);
count.value++;

const user = reactive({ name: "Иван", age: 25 });
user.age++;
```

---

## computed

```js
const double = computed(() => count.value * 2);

// Writable computed
const fullName = computed({
  get: () => `${first.value} ${last.value}`,
  set: (val) => {
    [first.value, last.value] = val.split(" ");
  },
});
```

---

## watch

```js
// Одно значение
watch(count, (newVal, oldVal) => { ... })

// Несколько значений
watch([a, b], ([newA, newB]) => { ... })

// Глубокое слежение
watch(user, (newUser) => { ... }, { deep: true })

// Немедленный запуск
watch(count, handler, { immediate: true })
```

## watchEffect

```js
// Автоматически отслеживает зависимости
watchEffect(() => {
  console.log(count.value) // подписывается на count
})

// Остановка
const stop = watchEffect(() => { ... })
stop() // отписаться
```

---

## Lifecycle Hooks

```js
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
} from "vue";

onMounted(() => {
  /* DOM готов */
});
onUnmounted(() => {
  /* очистка */
});
```

| Options API     | Composition API              |
| --------------- | ---------------------------- |
| `created`       | (нет аналога, код в setup()) |
| `mounted`       | `onMounted`                  |
| `updated`       | `onUpdated`                  |
| `unmounted`     | `onUnmounted`                |
| `beforeMount`   | `onBeforeMount`              |
| `beforeUpdate`  | `onBeforeUpdate`             |
| `beforeUnmount` | `onBeforeUnmount`            |

---

## Template Refs

```vue
<script setup>
import { ref, onMounted } from "vue";
const inputRef = ref(null);
onMounted(() => inputRef.value.focus());
</script>

<template>
  <input ref="inputRef" />
</template>
```

---

## nextTick

```js
import { nextTick } from "vue";

count.value++;
await nextTick();
// Теперь DOM обновлён
console.log(document.querySelector("#el").textContent);
```

---

## props & emits

```vue
<script setup>
const props = defineProps({
  title: { type: String, required: true },
  count: { type: Number, default: 0 },
});

const emit = defineEmits(["update", "close"]);
emit("update", newValue);
</script>
```

---

## provide / inject

```js
// Родитель
import { provide } from "vue";
provide("theme", "dark");

// Дочерний
import { inject } from "vue";
const theme = inject("theme", "light"); // второй аргумент — default
```

---

## toRefs / toRef

```js
import { reactive, toRefs, toRef } from "vue";

const state = reactive({ x: 0, y: 0 });

// Безопасная деструктуризация с сохранением реактивности
const { x, y } = toRefs(state);

// Один prop
const x = toRef(state, "x");
```

---

## v-model на компоненте

```vue
<!-- Использование -->
<MyInput v-model="text" />

<!-- Внутри MyInput.vue -->
<script setup>
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
```

---

## Полезные паттерны

```js
// Условный рендер с v-if / v-show
// v-if — удаляет из DOM, v-show — только display:none

// :key важен в v-for для правильного обновления DOM
// <li v-for="item in list" :key="item.id">

// Модификаторы событий
// @click.stop   — stopPropagation
// @click.prevent — preventDefault
// @keyup.enter  — только Enter

// Модификаторы v-model
// v-model.trim — обрезает пробелы
// v-model.number — приводит к числу
// v-model.lazy — обновляется на blur
```
