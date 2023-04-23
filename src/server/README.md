## Описание

Серверная часть веб-приложения "Зачётка.ру"

## Установка

```bash
$ cd src/server
$ npm install
```

## Запуск сервера

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Использование

```bash
# default api route
localhost:5001/api

# test api route
GET localhost:5001/api/testing/test

# swagger
localhost:5001/swagger
```

## Тесты

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
