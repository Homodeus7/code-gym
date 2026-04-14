# Vue 3 Composition API — Шпаргалка

## Структура `<script setup>`

```vue
<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";
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

```ts
const count = ref(0); // Ref<number>
count.value++;

const user = reactive({ name: "Иван", age: 25 });
user.age++;

// shallowRef — нет глубокой реактивности, быстрее для больших объектов
const bigList = shallowRef<Item[]>([]);
bigList.value = newList; // триггерит обновление
```

> Предпочитай `ref` над `reactive` — проще в деструктуризации, явное `.value`.

---

## computed

```ts
const double = computed(() => count.value * 2);

// Writable computed
const fullName = computed({
  get: () => `${first.value} ${last.value}`,
  set: (val: string) => {
    [first.value, last.value] = val.split(" ");
  },
});
```

> Computed — только чистые вычисления, без side-эффектов и мутаций.

---

## watch

```ts
// Одно значение
watch(count, (newVal, oldVal) => { ... })

// Несколько значений
watch([a, b], ([newA, newB]) => { ... })

// Свойство объекта — через getter
watch(() => user.name, (newName) => { ... })

// Глубокое слежение
watch(user, (newUser) => { ... }, { deep: true })

// Немедленный запуск
watch(count, handler, { immediate: true })

// Очистка при следующем вызове / размонтировании (Vue 3.5+)
watch(id, (newId) => {
  const controller = new AbortController();
  fetch(`/api/${newId}`, { signal: controller.signal });
  onWatcherCleanup(() => controller.abort());
});
```

## watchEffect / watchPostEffect

```ts
// watchEffect — автоматически отслеживает зависимости
watchEffect(() => {
  console.log(count.value); // подписывается на count
});

// watchPostEffect — запускается после обновления DOM (аналог flush: 'post')
watchPostEffect(() => {
  console.log(inputRef.value?.scrollHeight);
});

// Остановка
const stop = watchEffect(() => { ... });
stop(); // отписаться
```

---

## Lifecycle Hooks

```ts
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
<script setup lang="ts">
import { ref, onMounted } from "vue";
const inputRef = ref<HTMLInputElement | null>(null);
onMounted(() => inputRef.value?.focus());
</script>

<template>
  <input ref="inputRef" />
</template>
```

---

## nextTick

```ts
import { nextTick } from "vue";

count.value++;
await nextTick();
// Теперь DOM обновлён
console.log(document.querySelector("#el")?.textContent);
```

---

## props & emits

```vue
<script setup lang="ts">
// TypeScript-синтаксис (рекомендуется)
const props = defineProps<{
  title: string;
  count?: number;
}>();

// Дефолтные значения через withDefaults
const props = withDefaults(defineProps<{
  title: string;
  count?: number;
}>(), {
  count: 0,
});

// TypeScript-синтаксис для emits
const emit = defineEmits<{
  update: [value: string];
  close: [];
}>();
emit("update", newValue);
</script>
```

---

## defineModel (Vue 3.4+)

```vue
<!-- Использование -->
<MyInput v-model="text" />
<MyInput v-model:label="label" />

<!-- Внутри MyInput.vue — вместо props + emit -->
<script setup lang="ts">
const model = defineModel<string>(); // заменяет modelValue + update:modelValue
const label = defineModel<string>("label");
</script>
<template>
  <input v-model="model" />
</template>
```

---

## provide / inject

```ts
// Используй Symbol-ключи для избежания коллизий
import type { InjectionKey } from "vue";

// keys.ts — общий файл ключей
export const themeKey = Symbol("theme") as InjectionKey<string>;

// Родитель
import { provide } from "vue";
provide(themeKey, "dark");

// Дочерний — типизирован автоматически
import { inject } from "vue";
const theme = inject(themeKey, "light"); // тип: string
```

---

## toRefs / toRef / toValue

```ts
import { reactive, toRefs, toRef, toValue } from "vue";

const state = reactive({ x: 0, y: 0 });

// Безопасная деструктуризация с сохранением реактивности
const { x, y } = toRefs(state);

// Один prop
const xRef = toRef(state, "x");

// toValue — нормализует ref | getter | значение (удобно в composables)
toValue(ref(42));    // 42
toValue(() => 42);   // 42
toValue(42);         // 42
```

---

## Полезные паттерны

```html
<!-- v-if — удаляет из DOM, v-show — только display:none -->
<!-- v-if НЕ использовать вместе с v-for на одном элементе -->

<!-- :key важен в v-for для правильного обновления DOM -->
<li v-for="item in sortedList" :key="item.id">

<!-- Модификаторы событий -->
<!-- @click.stop   — stopPropagation -->
<!-- @click.prevent — preventDefault -->
<!-- @keyup.enter  — только Enter -->
<!-- @click.exact  — только при точном совпадении модификаторов -->

<!-- Модификаторы v-model -->
<!-- v-model.trim — обрезает пробелы -->
<!-- v-model.number — приводит к числу -->
<!-- v-model.lazy — обновляется на blur -->
```
