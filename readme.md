# One Word API

## What

A node API for the my side project named One Word [(for more info)](https://github.com/mariobrusarosco/one-word).

## Why

- One word is a side project where I intend to validate new libraries, frameworks and new things in general. This API will provide real endpoints, real requests so I have a grasp on what are their cons and pros as close as I can get in the real word.
- I can have a basic understanding how a Back End structure supports a Front End Application.
- I can grasp some ORM concepts and see their benefits in action.
- I can learn and practice Typescript for an ORM (prisma).

## How

By using:

1. **Node** with **Express**
2. **Typescript**
3. **Prisma** as **ORM** connected to a Database
4. **PlanetScale** as a **MySQL** database
5. **Socket.IO** as WebSocket Client
6. **Railway** as Host
7. Providing a swagger via **Postman**

## Getting Started

- Clone the project
- Open a **terminal**, go the root level of the project and install all dependecies by running:

```bash
yarn
```

- Run the project:

```bash
yarn dev
```

Now, the **API** is exposed on _http://localhost:3000_

---

### Hosting the API

I'm using **Railway** to host the project. The url is [https://api-one-word.up.railway.app/](https://api-one-word.up.railway.app/)

---

### Swagger

[Postman URL](https://www.postman.com/mario-brusarosco/workspace/mario-brusarosco/collection/2930329-c069887a-c13d-4bee-8bda-e69e3f5b9163)

---

## A REST API made with express and Mongo DB

## Local Environment

This project is not using any local database storage.
When running it locally, you'll be pointed to a remote host (mongodb.com).

For now, we don't have security measures, so the credentials
are shared via .env file under the key of 'DB_CREDENTIALS'

## To access DB content

```
yarn prisma studio
```
