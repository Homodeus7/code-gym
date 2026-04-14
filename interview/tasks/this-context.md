# this и контекст вызова

## Задача 5 — this в разных контекстах ⭐⭐

Что выведет каждый вызов?

```js
const obj = {
  name: "Alice",
  greet() {
    console.log(this.name);
  },
  greetArrow: () => {
    console.log(this?.name);
  },
  greetCallback() {
    setTimeout(function () {
      console.log(this?.name);
    }, 0);
  },
  greetArrowCallback() {
    setTimeout(() => {
      console.log(this.name);
    }, 0);
  },
};

obj.greet();
obj.greetArrow();
obj.greetCallback();
obj.greetArrowCallback();
```

<details>
<summary>Ответ</summary>

**Ответ:**

```
'Alice'       // obj.greet()
undefined     // obj.greetArrow()
undefined     // obj.greetCallback()
'Alice'       // obj.greetArrowCallback()
```

**Почему так:**

- `obj.greet()` — обычный метод, вызван через точку. `this` указывает на `obj`. Выводит `'Alice'`.
- `obj.greetArrow()` — стрелочная функция **не имеет собственного `this`**. Берёт `this` из лексического окружения, где была определена — это глобальная область (или `undefined` в строгом режиме / модулях ES). `this?.name` → `undefined`.
- `obj.greetCallback()` — внутри `setTimeout` передаётся обычная функция. При её вызове `this` — глобальный объект (`window` в браузере) или `undefined` в строгом режиме. `this?.name` → `undefined`.
- `obj.greetArrowCallback()` — внутри `setTimeout` стрелочная функция. Она захватывает `this` из `greetArrowCallback`, где `this === obj`. Выводит `'Alice'`.

</details>

---
