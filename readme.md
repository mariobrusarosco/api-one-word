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

- Setup Environment Variables:
  // TODO

- Run the project:

```bash
yarn dev
```

Now, the **API** is exposed on _http://localhost:3000_

---

# Local Database Setup Guide for the API One Word Project

This guide will help you set up a local PostgreSQL database for the API One Word project using Docker and Prisma. By following these steps, you will ensure that all developers are using the same database version and can easily manage migrations.

## Prerequisites

- **Docker**: Ensure that Docker is installed and running on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).
- **Node.js**: Make sure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

## Step 1: Clone the Repository

First, clone the API One Word repository to your local machine:

```bash
git clone https://github.com/mariobrusarosco/api-one-word.git
cd api-one-word
```

## Step 2: Update the Environment Variables

Open the `.env` file in the root of your project and set the `DATABASE_URL` variable to match your PostgreSQL configuration:

```env
DATABASE_URL=postgres://your_username:your_password@localhost:5432/your_database_name
```

> If you set `your_username` to `postgres`, `your_password` to `password`, and `your_database_name` to `api_one_word`, your `DATABASE_URL` would look like this:

```env
DATABASE_URL=postgres://postgres:password@localhost:5432/api_one_word
```

## Step 3: Start the PostgreSQL Container

Run the following command in your terminal to start the PostgreSQL container:

```bash
docker compose up -d
```

This command will start the PostgreSQL service in the background.

## Step 4: Configure Prisma

Ensure your `prisma/schema.prisma` file is set up correctly to use PostgreSQL. It should look like this:

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

## Step 5: Manage Migrations with Prisma

### Generate a New Migration

After making changes to your Prisma schema, run the following command to create a new migration:

```bash
npx prisma migrate dev --name your_migration_name
```

### Apply Migrations

To apply all pending migrations, run:

```bash
npx prisma migrate deploy
```

### Open Prisma Studio

You can also use Prisma Studio to interact with your database:

```bash
npx prisma studio
```

## Step 6: Stopping the PostgreSQL Container

When you no longer need the PostgreSQL container, you can stop it by running:

```bash
docker-compose down
```

If you want to reset the database and remove all data, you can run:

```bash
docker-compose down -v
```

## Additional Notes

- Ensure that your Docker service is running before executing the commands.
- If you encounter any issues, check the logs of the PostgreSQL container using:

```bash
docker-compose logs postgres
```

## Conclusion

By following this guide, you should have a fully functional local PostgreSQL database set up for the API One Word project. This setup allows for consistent development environments across all team members and simplifies the process of managing database migrations with Prisma. If you have any questions or need further assistance, feel free to reach out to the team!

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
