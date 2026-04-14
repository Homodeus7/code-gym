<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  watch,
  watchEffect,
  toRef,
  toRefs,
  readonly,
  shallowRef,
  shallowReactive,
  provide,
  inject,
  defineComponent,
  h,
  Transition,
} from 'vue'

// ─────────────────────────────────────────────────────────────────────────────
// 1. ref vs reactive — в чём принципиальная разница
//
// ref<T>       — оборачивает любое значение в { value: T }.
//                Доступ в JS: count.value. В шаблоне автоматически unwrap.
//
// reactive<T>  — делает объект полностью реактивным (глубоко).
//                Доступ без .value — как обычный объект.
//                НО: при деструктуризации теряет реактивность!
// ─────────────────────────────────────────────────────────────────────────────

const count = ref(0) // примитив — только ref

// reactive для объекта с несколькими связанными полями
const user = reactive({
  name: 'Алексей',
  age: 28,
  role: 'developer',
})

// ❌ ДЕСТРУКТУРИЗАЦИЯ REACTIVE ЛОМАЕТ РЕАКТИВНОСТЬ:
// const { name } = user  →  name — это просто строка, не ref
// Изменение user.name не обновит шаблон через деструктурированную переменную

// ✅ ПРАВИЛЬНО — toRefs превращает каждое поле reactive-объекта в ref
const { name, age } = toRefs(user)
// Теперь name.value === user.name, и они связаны

// toRef — для одного конкретного поля
const role = toRef(user, 'role')

const userLog = ref<string[]>([])

watch(
  // watch принимает: ref, reactive, getter-функцию, или массив из них
  () => ({ ...user }), // getter-функция — следим за снимком объекта
  (newVal, oldVal) => {
    userLog.value.push(`${oldVal.name} → ${newVal.name}, возраст: ${newVal.age}`)
  },
  {
    // deep: true — следить за вложенными изменениями reactive/ref-объектов.
    // Для reactive Vue и так отслеживает глубоко, но для ref-объектов нужен deep.
    // deep: true,

    // immediate: true — запустить callback сразу при создании watch,
    // не ждать первого изменения. Полезно для инициализации.
    immediate: false,

    // flush: 'post' — callback после обновления DOM (по умолчанию 'pre' — до).
    // 'post' нужен если внутри callback обращаешься к DOM-элементам через templateRef.
    flush: 'pre',
  }
)

// ─────────────────────────────────────────────────────────────────────────────
// 2. watch vs watchEffect
//
// watch(source, cb, options)
//   + Явная зависимость — легко читать «слежу за X»
//   + Получает (newVal, oldVal)
//   + Не запускается сразу (если не immediate: true)
//   - Многословнее
//
// watchEffect(cb)
//   + Автоматически собирает зависимости при первом запуске
//   + Запускается сразу (нет immediate)
//   - Непредсказуемые зависимости (всё, что читается внутри cb)
//   - Нет доступа к предыдущему значению
// ─────────────────────────────────────────────────────────────────────────────

const effectLog = ref<string[]>([])
const ticker = ref(0)
const factor = ref(2)

// watchEffect запускается сразу и при изменении ticker ИЛИ factor
const stopEffect = watchEffect(() => {
  // Всё, что читается здесь — становится зависимостью автоматически
  effectLog.value.push(`ticker=${ticker.value} × factor=${factor.value} = ${ticker.value * factor.value}`)
})

// watchEffect возвращает функцию остановки — важно для динамических подписок
// stopEffect() — вызвать чтобы прекратить слежку

// ─────────────────────────────────────────────────────────────────────────────
// 3. computed с геттером и сеттером
//
// Обычно computed — только чтение. Но можно определить сеттер.
// Это полезно для «двусторонней» связи с трансформацией данных.
// ─────────────────────────────────────────────────────────────────────────────

const celsius = ref(20)

// computed с get + set — позволяет писать в fahrenheit и получать celsius
const fahrenheit = computed({
  get() {
    return +(celsius.value * 1.8 + 32).toFixed(1)
  },
  set(f: number) {
    // Запись в fahrenheit → пересчитываем celsius
    celsius.value = +((f - 32) / 1.8).toFixed(1)
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// 4. shallowRef / shallowReactive — оптимизация для больших объектов
//
// ref/reactive отслеживают изменения ГЛУБОКО (рекурсивно).
// Это дорого для больших структур (деревья, большие массивы).
//
// shallowRef — реактивен только сам ref (замена .value целиком).
//              Изменения внутри объекта .value НЕ отслеживаются.
//
// shallowReactive — реактивны только поля первого уровня объекта.
// ─────────────────────────────────────────────────────────────────────────────

const bigList = shallowRef([
  { id: 1, text: 'Задача 1', done: false },
  { id: 2, text: 'Задача 2', done: false },
])

// ❌ НЕ сработает — shallowRef не отслеживает изменения внутри массива
// bigList.value[0].done = true

// ✅ Правильно — заменяем весь массив (меняем .value целиком)
function toggleTask(id: number) {
  bigList.value = bigList.value.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. readonly — защита от мутаций
//
// Создаёт read-only прокси. Попытка изменить — warning в dev-режиме.
// Типичный кейс: публичный state из composable, который нельзя менять снаружи.
// ─────────────────────────────────────────────────────────────────────────────

const privateCount = ref(0)
const publicCount = readonly(privateCount) // снаружи только читаем
// publicCount.value++ — TypeError в рантайме + TypeScript-ошибка

function incrementPrivate() {
  privateCount.value++ // внутри — меняем через оригинальный ref
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. provide / inject — передача данных через дерево компонентов
//
// Решает проблему «prop drilling» — пробрасывания props через много уровней.
// provide(key, value) — в родителе (или любом предке)
// inject(key)         — в любом потомке, независимо от глубины
//
// Ключ — строка или Symbol (Symbol безопаснее, нет коллизий имён).
// ─────────────────────────────────────────────────────────────────────────────

// В реальном проекте ключ выносят в отдельный файл injection-keys.ts:
// export const ThemeKey = Symbol('theme') as InjectionKey<Ref<string>>
const ThemeKey = Symbol('theme')

const theme = ref<'light' | 'dark'>('light')

// provide делает theme доступным для ВСЕХ потомков этого компонента
provide(ThemeKey, theme)

// ─────────────────────────────────────────────────────────────────────────────
// 7. v-show vs v-if — когда что использовать
//
// v-if  — элемент УДАЛЯЕТСЯ/СОЗДАЁТСЯ в DOM. Дочерние компоненты
//         монтируются/размонтируются → срабатывают lifecycle-хуки.
//         Дорого при частом переключении. Используй для редких переключений.
//
// v-show — элемент ВСЕГДА в DOM, меняется только display: none.
//          Дочерние компоненты НЕ размонтируются — состояние сохраняется.
//          Используй для частых переключений (табы, аккордеон, тогглы).
// ─────────────────────────────────────────────────────────────────────────────

const showIf = ref(true)
const showShow = ref(true)
const mountLog = ref<string[]>([])

// Дочерний компонент для демонстрации (inline через defineComponent + h)
const LifecycleWatcher = defineComponent({
  props: { label: String },
  setup(props) {
    mountLog.value.push(`✅ onMounted: ${props.label}`)
    return () => h('span', { style: 'font-size:0.85rem;color:#16a34a' }, props.label)
  },
  unmounted() {
    mountLog.value.push(`❌ onUnmounted: ${this.$props.label}`)
  },
})

// ─────────────────────────────────────────────────────────────────────────────
// 8. Transitions — анимации появления/исчезновения
//
// <Transition name="fade"> добавляет CSS-классы:
//   .fade-enter-from   — начальное состояние появления
//   .fade-enter-active — активная фаза появления (transition/animation CSS)
//   .fade-enter-to     — конечное состояние появления
//   .fade-leave-from   — начальное состояние исчезновения
//   .fade-leave-active — активная фаза
//   .fade-leave-to     — конечное состояние
//
// mode="out-in" — сначала уходит старый элемент, потом появляется новый.
// ─────────────────────────────────────────────────────────────────────────────

const activeTab = ref<'alpha' | 'beta' | 'gamma'>('alpha')
const tabs = ['alpha', 'beta', 'gamma'] as const
</script>

<template>
  <div class="page">
    <h1>Шпаргалка: реактивность вглубь + коммуникация компонентов</h1>

    <!-- ──────────────────────────────────────────────────────────────────────
      1. ref / reactive / toRefs
    ─────────────────────────────────────────────────────────────────────── -->
    <section>
      <h2>1. ref vs reactive — деструктуризация и toRefs</h2>

      <div class="grid-2">
        <div>
          <p class="label">reactive-объект (user):</p>
          <code class="block">{{ user }}</code>
          <div class="controls">
            <input v-model="user.name" placeholder="Имя" class="inp" />
            <button @click="user.age++">Возраст +1</button>
          </div>
          <!--
            user.name в шаблоне работает напрямую — reactive объект реактивен.
            Но в JS: const { name } = user  →  строка, не ref, потеряет реактивность.
          -->
        </div>
        <div>
          <p class="label">Через toRefs (деструктурировано):</p>
          <p>
            name: <strong>{{ name }}</strong> · age: <strong>{{ age }}</strong> · role:
            <strong>{{ role }}</strong>
          </p>
          <!--
            name, age, role — это ref-ы, связанные с user.
            Изменение user.name автоматически отражается в name.value и наоборот.
            В шаблоне .value не нужен — Vue делает unwrap автоматически.
          -->
          <button @click="role = role === 'developer' ? 'designer' : 'developer'">
            Сменить роль (через toRef)
          </button>
          <div class="log-mini">
            <p v-for="(l, i) in userLog" :key="i">{{ l }}</p>
            <p v-if="!userLog.length" class="muted">Измени поля — сработает watch</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ──────────────────────────────────────────────────────────────────────
      2. watch vs watchEffect
    ─────────────────────────────────────────────────────────────────────── -->
    <section>
      <h2>2. watchEffect — автосбор зависимостей</h2>
      <p class="note">
        watchEffect запустился <strong>сразу</strong> и теперь следит за
        <code>ticker</code> и <code>factor</code> одновременно.
      </p>
      <div class="controls">
        <button @click="ticker++">ticker++ (сейчас: {{ ticker }})</button>
        <button @click="factor = factor === 2 ? 3 : 2">
          factor toggle (сейчас: {{ factor }})
        </button>
        <button @click="stopEffect(); effectLog.push('⛔ watchEffect остановлен')">
          stopEffect()
        </button>
      </div>
      <div class="log-mini">
        <p v-for="(l, i) in effectLog.slice(-5)" :key="i">{{ l }}</p>
      </div>
    </section>

    <!-- ──────────────────────────────────────────────────────────────────────
      3. computed с сеттером
    ─────────────────────────────────────────────────────────────────────── -->
    <section>
      <h2>3. computed get + set — конвертер температур</h2>
      <p class="note">
        <code>fahrenheit</code> — computed с сеттером. Запись в него пересчитывает
        <code>celsius</code>.
      </p>
      <div class="controls">
        <label>
          Цельсий:
          <!--
            v-model на computed работает только если у computed есть set().
            Без сеттера — Vue выдаст предупреждение "computed is readonly".
          -->
          <input v-model.number="celsius" type="number" class="inp-sm" /> °C
        </label>
        <span class="arrow">⇄</span>
        <label>
          Фаренгейт:
          <input v-model.number="fahrenheit" type="number" class="inp-sm" /> °F
        </label>
      </div>
    </section>

    <!-- ──────────────────────────────────────────────────────────────────────
      4. shallowRef — оптимизация
    ─────────────────────────────────────────────────────────────────────── -->
    <section>
      <h2>4. shallowRef — замена .value целиком</h2>
      <p class="note">
        Изменение поля внутри shallowRef НЕ триггерит ре-рендер. Нужно заменять
        <code>.value</code> целиком (иммутабельный стиль).
      </p>
      <ul class="task-list">
        <!--
          :key="task.id" — id не меняется при toggle, индекс бы «не заметил» смену done.
          :class с объектом: { 'done': task.done } — добавляет класс если true.
        -->
        <li
          v-for="task in bigList"
          :key="task.id"
          :class="{ done: task.done }"
          @click="toggleTask(task.id)"
        >
          {{ task.done ? '✓' : '○' }} {{ task.text }}
        </li>
      </ul>
    </section>

    <!-- ──────────────────────────────────────────────────────────────────────
      5. readonly
    ─────────────────────────────────────────────────────────────────────── -->
    <section>
      <h2>5. readonly — защита публичного состояния</h2>
      <p class="note">
        <code>publicCount</code> — readonly-прокси. Прочитать можно, изменить нельзя
        (TypeScript-ошибка + runtime warning). Меняем только через приватный ref.
      </p>
      <p>publicCount = <strong>{{ publicCount }}</strong></p>
      <button @click="incrementPrivate">Increment (через privateCount)</button>
    </section>

    <!-- ──────────────────────────────────────────────────────────────────────
      6. provide / inject
    ─────────────────────────────────────────────────────────────────────── -->
    <section>
      <h2>6. provide / inject — передача через дерево</h2>
      <p class="note">
        Текущий компонент предоставляет <code>theme</code> через <code>provide</code>.
        Любой потомок может получить его через <code>inject(ThemeKey)</code> — без props.
      </p>
      <div class="theme-demo" :class="theme">
        <p>Тема: <strong>{{ theme }}</strong></p>
        <button @click="theme = theme === 'light' ? 'dark' : 'light'">Переключить тему</button>
        <!--
          В реальном проекте дочерний компонент делает:
          const theme = inject(ThemeKey)  →  получает реактивный ref
          и перерисовывается при каждом изменении theme.value
        -->
        <p class="muted" style="font-size: 0.8rem">
          Дочерний компонент получит тему через inject(ThemeKey) без props
        </p>
      </div>
    </section>

    <!-- ──────────────────────────────────────────────────────────────────────
      7. v-if vs v-show
    ─────────────────────────────────────────────────────────────────────── -->
    <section>
      <h2>7. v-if vs v-show — lifecycle и DOM</h2>
      <div class="grid-2">
        <div>
          <p class="label">v-if — монтирует/размонтирует компонент:</p>
          <button @click="showIf = !showIf">{{ showIf ? 'Скрыть' : 'Показать' }} (v-if)</button>
          <!--
            При каждом showIf=true → onMounted срабатывает.
            При showIf=false → компонент уничтожается, DOM удаляется.
            Используй для: редких переключений, компонентов с дорогим setup.
          -->
          <div style="margin-top: 0.5rem; min-height: 28px">
            <LifecycleWatcher v-if="showIf" label="v-if компонент" />
          </div>
        </div>
        <div>
          <p class="label">v-show — только display:none:</p>
          <button @click="showShow = !showShow">
            {{ showShow ? 'Скрыть' : 'Показать' }} (v-show)
          </button>
          <!--
            Компонент смонтирован ОДИН РАЗ и остаётся в DOM всегда.
            Состояние (данные, позиция скролла) сохраняется при скрытии.
            Используй для: табов, модалок, аккордеонов — частое переключение.
          -->
          <div style="margin-top: 0.5rem; min-height: 28px">
            <LifecycleWatcher v-show="showShow" label="v-show компонент" />
          </div>
        </div>
      </div>
      <div class="log-mini" style="margin-top: 0.8rem">
        <p v-for="(l, i) in mountLog.slice(-6)" :key="i">{{ l }}</p>
        <p v-if="!mountLog.length" class="muted">Нажми кнопки — увидишь lifecycle в логе</p>
      </div>
    </section>

    <!-- ──────────────────────────────────────────────────────────────────────
      8. <Transition> — анимации
    ─────────────────────────────────────────────────────────────────────── -->
    <section>
      <h2>8. &lt;Transition&gt; — анимации переключения</h2>
      <p class="note">
        <code>mode="out-in"</code>: сначала уходит старый контент, потом появляется новый.
        CSS-классы: <code>.fade-enter-from</code>, <code>.fade-leave-to</code> и т.д.
      </p>
      <div class="tab-bar">
        <!--
          @click без () — ссылка на функцию Vue оптимизирует, не создаёт closure.
          Но здесь нам нужен аргумент — поэтому стрелка неизбежна.
        -->
        <button
          v-for="tab in tabs"
          :key="tab"
          :class="{ active: activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
      <!--
        <Transition> работает только с ОДНИМ дочерним элементом.
        Для списков — <TransitionGroup>.
        key на дочернем элементе заставляет Vue считать его новым при смене —
        это триггер для анимации даже если тег один и тот же.
      -->
      <Transition name="fade" mode="out-in">
        <div :key="activeTab" class="tab-content">
          <template v-if="activeTab === 'alpha'">
            <strong>Alpha</strong> — enter-from: opacity 0, translateY -8px
          </template>
          <template v-else-if="activeTab === 'beta'">
            <strong>Beta</strong> — анимация работает через CSS transition
          </template>
          <template v-else>
            <strong>Gamma</strong> — mode out-in: старый уходит, новый приходит
          </template>
        </div>
      </Transition>
    </section>
  </div>
</template>

<style scoped>
.page {
  max-width: 780px;
  margin: 0 auto;
  padding: 1.5rem;
  font-family: sans-serif;
}

h1 {
  font-size: 1.3rem;
  margin-bottom: 1.2rem;
}

h2 {
  font-size: 0.95rem;
  margin: 0 0 0.5rem;
  color: #334155;
}

section {
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 1rem 1.2rem;
  margin-bottom: 1rem;
  background: #fff;
}

.note {
  font-size: 0.82rem;
  color: #64748b;
  background: #f8fafc;
  border-left: 3px solid #16a34a;
  padding: 0.4rem 0.8rem;
  border-radius: 0 6px 6px 0;
  margin: 0 0 0.8rem;
}

.label {
  font-size: 0.82rem;
  color: #64748b;
  margin: 0 0 0.4rem;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin: 0.6rem 0;
  align-items: center;
}

button {
  padding: 4px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  background: #f8fafc;
  cursor: pointer;
  font-size: 0.85rem;
  color: #334155;
  transition: all 0.12s;
}

button:hover {
  border-color: #16a34a;
  color: #15803d;
  background: #f0fdf4;
}

button.active {
  background: #dcfce7;
  border-color: #16a34a;
  color: #15803d;
  font-weight: 600;
}

.inp {
  padding: 4px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.85rem;
  width: 130px;
}

.inp-sm {
  padding: 4px 6px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.85rem;
  width: 80px;
}

.arrow {
  font-size: 1.2rem;
  color: #94a3b8;
}

code {
  background: #f1f5f9;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 0.85em;
  color: #0f172a;
}

code.block {
  display: block;
  padding: 6px 10px;
  margin: 0 0 0.5rem;
  border-radius: 6px;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 0.78rem;
  color: #334155;
}

.log-mini {
  background: #0f172a;
  color: #94a3b8;
  border-radius: 6px;
  padding: 0.5rem 0.8rem;
  font-family: monospace;
  font-size: 0.78rem;
  min-height: 48px;
}

.log-mini p {
  margin: 2px 0;
  color: #7dd3a8;
}

.muted {
  color: #475569 !important;
  font-style: italic;
}

/* shallowRef task list */
.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 8px;
}

.task-list li {
  padding: 6px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.88rem;
  transition: all 0.15s;
}

.task-list li:hover {
  border-color: #16a34a;
}

.task-list li.done {
  background: #dcfce7;
  border-color: #16a34a;
  color: #15803d;
  text-decoration: line-through;
}

/* provide/inject theme demo */
.theme-demo {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
}

.theme-demo.light {
  background: #f8fafc;
  color: #1e293b;
}

.theme-demo.dark {
  background: #1e293b;
  color: #e2e8f0;
  border-color: #334155;
}

.theme-demo.dark button {
  background: #334155;
  border-color: #475569;
  color: #e2e8f0;
}

/* Tabs */
.tab-bar {
  display: flex;
  gap: 6px;
  margin-bottom: 0.6rem;
}

.tab-content {
  padding: 0.8rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  font-size: 0.9rem;
  min-height: 44px;
}

/* ─── Transition CSS-классы ───
   Vue добавляет их автоматически при name="fade":
   .fade-enter-from  — старт появления
   .fade-enter-active — время появления (тут CSS transition)
   .fade-enter-to    — конец появления
   .fade-leave-from  — старт исчезновения
   .fade-leave-active — время исчезновения
   .fade-leave-to    — конец исчезновения (opacity: 0)
*/
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(6px);
}
</style>
