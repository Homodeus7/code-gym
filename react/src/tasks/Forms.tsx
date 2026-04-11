import { useState, useId } from "react";

// ============================================================
// Задача 1: Controlled input — управляемый инпут
// ============================================================
// TODO: Реализуй управляемый инпут. Значение хранится в state.
// При вводе показывай длину строки и предупреждение если > 50 символов.
function Task1() {
  const [value, setValue] = useState("");
  const MAX_LENGTH = 50;

  return (
    <div className="task">
      <h3>Задача 1: Controlled input</h3>
      <p>
        Привяжи input к useState. Покажи счётчик символов и предупреждение при
        превышении лимита.
      </p>
      <input
        value={value}
        onChange={(e) => {
          // TODO: обнови value через setValue
        }}
        className="task-input"
        placeholder="Введи текст..."
        style={{ borderColor: value.length > MAX_LENGTH ? "red" : undefined }}
      />
      <p style={{ color: value.length > MAX_LENGTH ? "red" : "inherit" }}>
        {value.length} / {MAX_LENGTH}
        {/* TODO: добавь предупреждение если value.length > MAX_LENGTH */}
      </p>
    </div>
  );
}

// ============================================================
// Задача 2: Форма регистрации с валидацией
// ============================================================
// TODO: Реализуй форму с полями email, password, confirmPassword.
// Валидируй при submit:
// - email должен содержать @
// - password минимум 8 символов
// - confirmPassword должен совпадать с password

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

type FormErrors = Partial<Record<keyof RegisterForm, string>>;

function validate(values: RegisterForm): FormErrors {
  const errors: FormErrors = {};

  // TODO: проверь email (должен содержать @)

  // TODO: проверь password (минимум 8 символов)

  // TODO: проверь что confirmPassword === password

  return errors;
}

function Task2() {
  const [values, setValues] = useState<RegisterForm>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // TODO: обнови поле values[name] через spread
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate(values);
    // TODO: если есть ошибки — установи их в state и выйди
    // TODO: иначе установи submitted = true
  };

  if (submitted) {
    return (
      <div className="task">
        <h3>Задача 2: Форма регистрации</h3>
        <div className="card" style={{ color: "green" }}>
          Регистрация прошла успешно! Email: {values.email}
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setValues({ email: "", password: "", confirmPassword: "" });
          }}
        >
          Сбросить
        </button>
      </div>
    );
  }

  return (
    <div className="task">
      <h3>Задача 2: Форма регистрации с валидацией</h3>
      <p>Валидируй поля при submit и показывай ошибки под каждым полем.</p>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "300px",
        }}
      >
        <div>
          <input
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            className="task-input"
            placeholder="Email"
          />
          {errors.email && (
            <p style={{ color: "red", margin: "2px 0" }}>{errors.email}</p>
          )}
        </div>
        <div>
          <input
            name="password"
            type="password"
            value={values.password}
            onChange={handleChange}
            className="task-input"
            placeholder="Пароль"
          />
          {errors.password && (
            <p style={{ color: "red", margin: "2px 0" }}>{errors.password}</p>
          )}
        </div>
        <div>
          <input
            name="confirmPassword"
            type="password"
            value={values.confirmPassword}
            onChange={handleChange}
            className="task-input"
            placeholder="Повторите пароль"
          />
          {errors.confirmPassword && (
            <p style={{ color: "red", margin: "2px 0" }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

// ============================================================
// Задача 3: Checkbox и radio — множественный выбор
// ============================================================
// TODO: Реализуй выбор интересов через checkboxes (можно несколько)
// и выбор уровня через radio (только один).

const INTERESTS = ["React", "TypeScript", "Node.js", "GraphQL", "Docker"];
const LEVELS = ["Начинающий", "Средний", "Продвинутый"];

function Task3() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [level, setLevel] = useState("");

  const toggleInterest = (interest: string) => {
    // TODO: добавь или убери interest из selectedInterests
  };

  return (
    <div className="task">
      <h3>Задача 3: Checkbox и Radio</h3>
      <p>Checkbox — множественный выбор, Radio — единственный выбор.</p>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
        <div>
          <strong>Интересы (checkbox):</strong>
          {INTERESTS.map((interest) => (
            <label
              key={interest}
              style={{ display: "block", cursor: "pointer" }}
            >
              <input
                type="checkbox"
                checked={selectedInterests.includes(interest)}
                onChange={() => toggleInterest(interest)}
              />{" "}
              {interest}
            </label>
          ))}
        </div>
        <div>
          <strong>Уровень (radio):</strong>
          {LEVELS.map((l) => (
            <label key={l} style={{ display: "block", cursor: "pointer" }}>
              <input
                type="radio"
                name="level"
                value={l}
                checked={level === l}
                onChange={() => {
                  // TODO: установи level
                }}
              />{" "}
              {l}
            </label>
          ))}
        </div>
      </div>
      <p style={{ marginTop: "8px" }}>
        Выбрано: {selectedInterests.join(", ") || "ничего"} | Уровень:{" "}
        {level || "не выбран"}
      </p>
    </div>
  );
}

// ============================================================
// Задача 4: Динамическая форма — список полей
// ============================================================
// TODO: Пользователь может добавлять и удалять поля ввода динамически.
// Начальное состояние — одно пустое поле. Итоговый список выводится ниже.

function Task4() {
  const [fields, setFields] = useState<string[]>([""]);

  const addField = () => {
    // TODO: добавь пустую строку в fields
  };

  const removeField = (index: number) => {
    // TODO: удали поле по index
  };

  const updateField = (index: number, value: string) => {
    // TODO: обнови fields[index] = value (через map)
  };

  return (
    <div className="task">
      <h3>Задача 4: Динамическая форма</h3>
      <p>Добавляй и удаляй поля ввода. Выводи список заполненных значений.</p>
      {fields.map((field, i) => (
        <div key={i} className="task-controls" style={{ marginBottom: "4px" }}>
          <input
            value={field}
            onChange={(e) => updateField(i, e.target.value)}
            className="task-input"
            placeholder={`Поле ${i + 1}...`}
          />
          <button onClick={() => removeField(i)} disabled={fields.length === 1}>
            ✕
          </button>
        </div>
      ))}
      <button onClick={addField}>+ Добавить поле</button>
      {fields.some((f) => f.trim()) && (
        <div style={{ marginTop: "8px" }}>
          <strong>Результат:</strong>
          <ul>
            {fields
              .filter((f) => f.trim())
              .map((f, i) => (
                <li key={i}>{f}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ============================================================
// Задача 5: useId и доступность (a11y)
// ============================================================
// TODO: Используй хук useId() для генерации уникальных id для label/input.
// Это важно для доступности: label должен быть связан с input через htmlFor/id.

function Task5() {
  const emailId = useId();
  const nameId = useId();
  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="task">
      <h3>Задача 5: useId — доступные формы</h3>
      <p>Используй useId() для связи label и input через htmlFor/id (a11y).</p>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          maxWidth: "280px",
        }}
      >
        <div>
          {/* TODO: добавь htmlFor={nameId} к label и id={nameId} к input */}
          <label>Имя:</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="task-input"
            placeholder="Введи имя..."
          />
        </div>
        <div>
          {/* TODO: добавь htmlFor={emailId} к label и id={emailId} к input */}
          <label>Email:</label>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="task-input"
            placeholder="Введи email..."
          />
        </div>
      </form>
      <p style={{ fontSize: "0.85em", color: "#888" }}>
        ID в DOM: {nameId}, {emailId}
      </p>
    </div>
  );
}

// ============================================================
// Задача 6: Форма с несколькими шагами (multi-step)
// ============================================================
// TODO: Реализуй форму из 3 шагов:
// Шаг 1: Личные данные (имя, фамилия)
// Шаг 2: Контакты (email, телефон)
// Шаг 3: Подтверждение — показываем все данные
// Кнопки «Назад» и «Далее», на последнем шаге — «Отправить».

type MultiStepData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

function Task6() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<MultiStepData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const update =
    (field: keyof MultiStepData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setData((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const next = () => setStep((s) => Math.min(3, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="task">
      <h3>Задача 6: Multi-step форма</h3>
      <p>Шаг {step} из 3</p>
      <div
        style={{
          height: "4px",
          background: "#eee",
          borderRadius: "2px",
          marginBottom: "12px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(step / 3) * 100}%`,
            background: "#646cff",
            borderRadius: "2px",
            transition: "width 0.3s",
          }}
        />
      </div>

      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h4>Личные данные</h4>
          <input
            value={data.firstName}
            onChange={update("firstName")}
            className="task-input"
            placeholder="Имя"
          />
          <input
            value={data.lastName}
            onChange={update("lastName")}
            className="task-input"
            placeholder="Фамилия"
          />
        </div>
      )}

      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <h4>Контакты</h4>
          <input
            value={data.email}
            onChange={update("email")}
            className="task-input"
            placeholder="Email"
          />
          <input
            value={data.phone}
            onChange={update("phone")}
            className="task-input"
            placeholder="Телефон"
          />
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h4>Подтверждение</h4>
          <p>
            Имя: {data.firstName} {data.lastName}
          </p>
          <p>Email: {data.email}</p>
          <p>Телефон: {data.phone}</p>
        </div>
      )}

      <div className="task-controls" style={{ marginTop: "12px" }}>
        {step > 1 && <button onClick={back}>← Назад</button>}
        {step < 3 && <button onClick={next}>Далее →</button>}
        {step === 3 && (
          <button onClick={() => alert("Отправлено!")}>Отправить</button>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Главный компонент раздела
// ============================================================
export default function Forms() {
  return (
    <div className="section">
      <h2>Формы</h2>
      <p className="section-desc">
        controlled inputs, валидация, checkbox/radio, multi-step
      </p>
      <Task1 />
      <Task2 />
      <Task3 />
      <Task4 />
      <Task5 />
      <Task6 />
    </div>
  );
}
