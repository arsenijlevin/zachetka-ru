# **Инструкция по развёртыванию веб-приложения "Зачётка.ру"**

## **Предварительные шаги**  

### **1. Установить необходимое ПО**

[![NodeJS](https://img.shields.io/badge/node-%3E%3D%2018.6.0-brightgreen)](https://nodejs.org/en/blog/release/v18.6.0)

[![npm (v9.5.1+)](https://img.shields.io/badge/npm-9.5.1-brightgreen)](https://www.npmjs.com/package/npm/v/9.5.1)

[![postgres (PostgreSQL) 15.3](https://img.shields.io/badge/PostgreSQL-15.3-blue)](https://www.postgresql.org/download/)

### **2. Клонирование репозитория**
```bash
$ git clone https://github.com/arsenijlevin/zachetka-ru
$ cd zachetka-ru
```

### **3. Задание переменных окружения**

### *Сервер*

В директории `server`, создать `.env` файл, указав в нем адрес подключения к базе данных и ключ для генерации паролей:
```bash
DATABASE_URL=postgresql://<login>:<password>@<host>:<port>/<database>
JWT_SECRET=<secret>
```

### *Клиент*
  
В директории `client`, создать `.env` файл, указав в нем адрес back-end сервера:
```bash
NEXT_PUBLIC_API_HOST=<адрес back-end сервера>
```

### **4. Развёртывание**

### *Сервер*

```bash
# dir - zachetka-ru/src

$ npm run install:server

$ npm run build:prisma-push # Выполнить, только если в базе данных нет необходимых таблиц

$ npm run build:server

$ npm run start:server
```

### *Клиент*

```bash
# dir - zachetka-ru/src

$ npm run install:client

$ npm run build:client

$ npm run start:client
```