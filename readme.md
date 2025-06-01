# One Word API

## What

A node API for my side project named One Word [(for more info)](https://github.com/mariobrusarosco/one-word).

## Why

- One word is a side project where I intend to validate new libraries, frameworks, and new things in general. This API will provide real endpoints and real requests so I have a grasp on what are their cons and pros as close as I can get in the real world.
- I can have a basic understanding of how a back-end structure supports a Front End Application.
- I can grasp some ORM concepts and see their benefits in action.
- I can learn and practice Typescript for an ORM (prisma).

## How

By using:

1. **Node** with **Express**
2. **Typescript**
3. **Prisma** as **ORM** connected to a Database
4. **Neon** as a **Postgres** database
5. **Socket.IO** as WebSocket Client
6. **Railway** as Host
7. Providing a swagger via **Postman**

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js**: Version 16 or higher

  - Download from [Node.js official website](https://nodejs.org/)
  - Verify installation: `node --version`

- **Yarn**: Package manager

  - Install with: `npm install -g yarn`
  - Verify installation: `yarn --version`

- **Docker**: For running PostgreSQL
  - Download from [Docker's official website](https://www.docker.com/get-started)
  - Make sure Docker is running before proceeding
  - Verify with: `docker --version`

## Getting Started

- Clone the project
- Open a **terminal**, go to the root level of the project, and install all dependencies by running:

```bash
yarn
```

- Build the image:

  ```bash
  docker-compose build
  ```

- Setup Environment Variables:
  // TODO

- Run the project:

```bash
yarn dev
```

- Run the project:

```bash
docker-compose up -d
```

Now, the **API** is exposed on _http://localhost:3000_

---

### Profiling and Logging

This project uses the _Sentry's Free Plan_

[URL](https://mario-79.sentry.io/issues/?project=4506356576747520&referrer=sidebar&statsPeriod=30d)

### Hosting the API

I'm using **Railway** to host the project. The url is [https://api-one-word.mariobrusarosco.com/](<[https://api-one-word.up.railway.app/](https://api-one-word.mariobrusarosco.com/)>)

---

### Swagger

[Postman URL](https://www.postman.com/mario-brusarosco/workspace/mario-brusarosco/collection/2930329-c069887a-c13d-4bee-8bda-e69e3f5b9163)

# Socket

## Local Connections

You can local socket connections by running:

```bash
yarn dev
```

Then openening a browsers tab at:

```
http://localhost:3000/socket.html
```

### Tables

### Games
