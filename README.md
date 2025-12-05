# Book Library API
Простое и эффективное REST API для управления личной библиотекой книг с аутентификацией JWT.

## Быстрый старт 
```bash
git clone https://github.com/aeroserg/nest-examples.git
cd nest-examples
npm install
npm run start:dev
```

## API Endpoints
### Регистрация пользователя
```
POST http://localhost:3000/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```
### Вход в систему 
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```
### Управление книгами 
#### Добавление книги 
```
POST http://localhost:3000/books
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald", 
  "description": "A classic American novel",
  "isRead": true,
  "rating": 5
}
```

#### Получение всех книг
```
GET http://localhost:3000/books
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Получение одной книги 
```
GET http://localhost:3000/books/1
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Обновление книги 
```
PATCH http://localhost:3000/books/1
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "rating": 4
}
```

#### Удаление книги 
```
DELETE http://localhost:3000/books/1
Authorization: Bearer YOUR_JWT_TOKEN
```

## Middleware и интерцепторы
- `RequestLoggerMiddleware` (`src/middleware/request-logger.middleware.ts`): назначает `x-request-id` запросу/ответу и логирует начало и завершение запроса с длительностью. Подключен в `AppModule` для всех маршрутов `books` (любые HTTP-методы).
- `MetricsInterceptor` (`src/interceptors/metrics.interceptor.ts`): измеряет время ответа и статус, выводит метрику в консоль. Применен ко всем хендлерам `BooksController`.
- `MetricsModule.forRoot()` подключен в `AppModule` и делает метрики глобально доступными. `MetricsModule.forFeature('books')` импортирован в `BooksModule`, чтобы добавить метку фичи к логам интерцептора.

## База данных 
В качестве БД используется sqlite 
