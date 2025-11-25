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

## База данных 
В качестве БД используется sqlite.
