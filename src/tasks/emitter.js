class EventEmitter {
  constructor() {
    this.events = {};
  }
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
    return this;
  }
  emit(eventName) {
    const handlers = this.events[eventName];

    if (!handlers) return this;

    handlers.forEach((cb) => cb());
    return this;
  }
  off(eventName, callback) {
    const handlers = this.events[eventName];

    if (!handlers) return this;
    this.events[eventName] = handlers.filter((cb) => cb != callback);
    return this;
  }
}

const emitter = new EventEmitter();

const cb1 = () => console.log("cb1");
const cb2 = () => console.log("cb2");

emitter
  .on("event", cb1) // подписать cb1
  .on("event", cb2) // подписать cb2
  .emit("event") // вызвать cb1 и cb2
  .off("event", cb2) // отписать cb2
  .emit("event"); // вызвать только cb1

class EventEmitter2 {
  constructor() {
    // Ключ = имя события, значение = массив колбэков
    this.events = new Map();
  }

  on(eventName, callback) {
    // Если события ещё нет — создаём пустой массив
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    // Добавляем обработчик
    this.events.get(eventName).push(callback);

    return this; // для чейнинга
  }

  emit(eventName) {
    const handlers = this.events.get(eventName);

    if (!handlers) return this;

    // Вызываем все обработчики и передаём аргументы
    handlers.forEach((cb) => cb());

    return this;
  }

  off(eventName, callback) {
    const handlers = this.events.get(eventName);

    if (!handlers) return this;

    // Удаляем конкретный обработчик
    const filtered = handlers.filter((cb) => cb !== callback);

    // Если обработчиков больше нет — можно вообще удалить событие
    if (filtered.length === 0) {
      this.events.delete(eventName);
    } else {
      this.events.set(eventName, filtered);
    }

    return this;
  }
}

// const emitter2 = new EventEmitter2();

// const cb_2_1 = () => console.log("cb_2_1");
// const cb_2_2_1 = () => console.log("cb_2_2_1");

// emitter2
//   .on("event", cb_2_1) // подписать cb_2_1
//   .on("event", cb_2_2_1) // подписать cb_2_2_1
//   .emit("event") // вызвать cb1 и cb_2_2_1
//   .off("event", cb_2_2_1) // отписать cb_2_2_1
//   .emit("event"); // вызвать только cb1
