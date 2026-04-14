# Блок 6 — HTTP

## 🤔 Вопрос 20: Что такое HTTP и как работает запрос/ответ?

**Вопрос:** Что такое HTTP? Из чего состоит HTTP-запрос и HTTP-ответ?

**Ответ:**

HTTP (HyperText Transfer Protocol) — протокол передачи данных поверх TCP/IP. Работает по модели «запрос — ответ»: клиент отправляет запрос, сервер возвращает ответ.

**HTTP-запрос:**
```
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer token123
```

Состоит из:
- Стартовая строка: `МЕТОД путь версия`
- Заголовки (Headers)
- Пустая строка
- Тело (Body) — для POST/PUT/PATCH

**HTTP-ответ:**
```
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 42

{"id": 1, "name": "Alice"}
```

Состоит из:
- Стартовая строка: `версия статус-код описание`
- Заголовки
- Пустая строка
- Тело

---

## 🤔 Вопрос 21: HTTP-методы — разница и когда использовать?

**Вопрос:** Перечисли HTTP-методы и объясни их разницу.

**Ответ:**

| Метод | Действие | Тело запроса | Идемпотентный | Безопасный |
|-------|----------|-------------|---------------|------------|
| GET | Получить ресурс | Нет | Да | Да |
| POST | Создать ресурс | Да | Нет | Нет |
| PUT | Заменить ресурс целиком | Да | Да | Нет |
| PATCH | Частично обновить | Да | Нет* | Нет |
| DELETE | Удалить ресурс | Нет | Да | Нет |
| HEAD | Как GET, но без тела | Нет | Да | Да |
| OPTIONS | Узнать доступные методы | Нет | Да | Да |

- **Идемпотентный** — повторный вызов даёт тот же результат (PUT на одни данные = то же состояние)
- **Безопасный** — не изменяет состояние сервера

```http
GET    /users/1        → получить пользователя
POST   /users          → создать нового
PUT    /users/1        → полностью заменить данные
PATCH  /users/1        → обновить только name
DELETE /users/1        → удалить
```

---

## 🤔 Вопрос 22: HTTP-статус коды — что означает каждая группа?

**Вопрос:** Что означают группы статус-кодов HTTP? Назови основные.

**Ответ:**

| Группа | Смысл | Примеры |
|--------|-------|---------|
| 1xx | Информационный | 100 Continue |
| 2xx | Успех | 200 OK, 201 Created, 204 No Content |
| 3xx | Перенаправление | 301 Moved Permanently, 302 Found, 304 Not Modified |
| 4xx | Ошибка клиента | 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Unprocessable Entity, 429 Too Many Requests |
| 5xx | Ошибка сервера | 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable |

Ключевые отличия:
```
200 — запрос выполнен
201 — ресурс создан (обычно после POST)
204 — выполнено, тела нет (обычно после DELETE)
301 — постоянный редирект (браузер запомнит)
302 — временный редирект
304 — ресурс не изменился, используй кэш
400 — ты прислал кривой запрос
401 — нужна аутентификация (не знаю кто ты)
403 — я знаю кто ты, но у тебя нет прав
404 — ресурс не найден
422 — запрос понят, но данные невалидны
500 — сервер сломался
```

---

## 🤔 Вопрос 23: Что такое CORS?

**Вопрос:** Что такое CORS? Почему он нужен и как работает?

**Ответ:**

CORS (Cross-Origin Resource Sharing) — механизм безопасности браузера, позволяющий или запрещающий запросы к ресурсам с другого источника (origin = протокол + домен + порт).

```
Браузер на http://frontend.com делает запрос к http://api.com
→ разные origin → браузер проверяет CORS-заголовки сервера
```

**Preflight-запрос (предварительный):**
Браузер автоматически отправляет `OPTIONS` для «сложных» запросов:

```http
OPTIONS /api/data HTTP/1.1
Origin: http://frontend.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type
```

Сервер должен ответить:
```http
HTTP/1.1 204
Access-Control-Allow-Origin: http://frontend.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: Content-Type
Access-Control-Max-Age: 3600
```

**«Простые» запросы** (без preflight): GET/HEAD/POST + только стандартные заголовки + `Content-Type: text/plain` или `application/x-www-form-urlencoded` или `multipart/form-data`.

CORS проверяется **только браузером** — серверные запросы, Postman, curl CORS не проверяют.

---

## 🤔 Вопрос 24: HTTP-кэширование — как работает?

**Вопрос:** Как работает кэширование в HTTP?

**Ответ:**

```http
// Сервер указывает как кэшировать:
Cache-Control: max-age=3600          // кэшировать 1 час
Cache-Control: no-cache              // проверять актуальность каждый раз (но хранить)
Cache-Control: no-store              // не кэшировать вообще
Cache-Control: public                // можно кэшировать в CDN/proxy
Cache-Control: private               // только в браузере (личные данные)
```

**Валидация кэша (conditional requests):**

```http
// Сервер отдаёт:
ETag: "abc123"                       // хэш ресурса
Last-Modified: Mon, 01 Jan 2024 00:00:00 GMT

// Браузер при следующем запросе:
If-None-Match: "abc123"
If-Modified-Since: Mon, 01 Jan 2024 00:00:00 GMT

// Если не изменился — сервер вернёт:
HTTP/1.1 304 Not Modified            // тела нет, берём из кэша
```

**Схема:**
1. Первый запрос → сервер отдаёт ресурс + `Cache-Control` + `ETag`
2. Повторный запрос в рамках `max-age` → берём из кэша без запроса к серверу
3. Кэш устарел → запрос с `If-None-Match` → 304 (кэш актуален) или 200 + новые данные

---

## 🤔 Вопрос 25: Cookie vs LocalStorage vs SessionStorage

**Вопрос:** В чём разница между Cookie, LocalStorage и SessionStorage?

**Ответ:**

| | Cookie | LocalStorage | SessionStorage |
|---|---|---|---|
| Объём | ~4 KB | ~5-10 MB | ~5 MB |
| Срок жизни | Задаётся явно / сессия | Без ограничений | До закрытия вкладки |
| Доступ с JS | Да (если нет HttpOnly) | Да | Да |
| Отправка на сервер | Автоматически | Нет | Нет |
| Доступен в другой вкладке | Да | Да | Нет |

```js
// LocalStorage:
localStorage.setItem('key', 'value')
localStorage.getItem('key')          // 'value'
localStorage.removeItem('key')
localStorage.clear()

// SessionStorage — тот же API, но данные живут только в текущей вкладке:
sessionStorage.setItem('key', 'value')

// Cookie через JS:
document.cookie = 'name=Alice; expires=...; path=/'
```

**Когда что использовать:**
- `Cookie` — токены аутентификации (с `HttpOnly + Secure + SameSite`) — JS не может украсть через XSS
- `LocalStorage` — настройки UI, несекретные данные
- `SessionStorage` — временный state в рамках сессии (форма, шаги wizard)

---

## 🤔 Вопрос 26: HTTP/1.1 vs HTTP/2 vs HTTP/3

**Вопрос:** Чем HTTP/2 отличается от HTTP/1.1?

**Ответ:**

**HTTP/1.1 (1997):**
- Одно соединение = один запрос за раз (можно pipeline, но с проблемами)
- Текстовый протокол
- Head-of-line blocking: один медленный ресурс блокирует остальные

**HTTP/2 (2015):**
- Мультиплексирование — несколько запросов/ответов одновременно в одном TCP-соединении
- Бинарный протокол — эффективнее парсинг
- Сжатие заголовков (HPACK)
- Server Push — сервер может отправить ресурсы до запроса клиента
- Приоритизация потоков

**HTTP/3 (2022):**
- Вместо TCP использует QUIC (поверх UDP)
- Устраняет head-of-line blocking на уровне транспорта
- Быстрое установление соединения (0-RTT)
- Лучше работает при потере пакетов

```
HTTP/1.1: req1 → res1 → req2 → res2 → req3 → res3  (последовательно)
HTTP/2:   req1, req2, req3 → res1, res3, res2        (мультиплекс, любой порядок)
```

---
