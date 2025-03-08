# Database Guide for API One Word

This guide provides step-by-step instructions for setting up, starting, and visually managing the PostgreSQL database used in the API One Word project.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Starting the Local Database](#starting-the-local-database)
3. [Accessing the Database with a GUI](#accessing-the-database-with-a-gui)
4. [Common Database Operations](#common-database-operations)
5. [Troubleshooting](#troubleshooting)

## Prerequisites

Before starting, make sure you have the following installed:

- [Docker](https://www.docker.com/products/docker-desktop/)
- [Docker Compose](https://docs.docker.com/compose/install/) (usually included with Docker Desktop)
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Yarn](https://yarnpkg.com/getting-started/install)

## Starting the Local Database

### Step 1: Start the PostgreSQL Container

The project uses Docker to run a PostgreSQL database instance. Follow these steps to start it:

1. Navigate to the project root directory:

   ```bash
   cd api-one-word
   ```

2. Start the PostgreSQL container using Docker Compose:

   ```bash
   docker-compose up -d
   ```

   This command starts the database in detached mode, running in the background.

3. Verify that the container is running:

   ```bash
   docker-compose ps
   ```

   You should see the `postgres_db` container listed as running.

### Step 2: Initialize the Database

After starting the container, you need to set up the database schema and seed it with initial data:

1. Generate the Prisma client:

   ```bash
   yarn generate-schema
   ```

   or

   ```bash
   npx prisma generate --schema=./src/prisma/schema.prisma
   ```

2. Apply database migrations:

   ```bash
   yarn db:migrate
   ```

   or

   ```bash
   npx prisma migrate dev --schema=./src/prisma/schema.prisma
   ```

3. Seed the database with initial data:

   ```bash
   yarn seed
   ```

   This will populate your database with sample data for development.

## Accessing the Database with a GUI

There are several options for visually accessing and managing your PostgreSQL database:

### Option 1: Prisma Studio (Built-in)

Prisma Studio is a visual database editor that comes with Prisma. It's the easiest way to view and edit your data:

1. Start Prisma Studio:

   ```bash
   yarn studio
   ```

   or

   ```bash
   npx prisma studio --schema=./src/prisma/schema.prisma
   ```

2. Open your browser and navigate to:

   ```bash
   http://localhost:5555
   ```

Prisma Studio offers a user-friendly interface where you can:

- Browse all tables and records
- Filter and sort data
- Create, update, and delete records
- View relationships between records

### Option 2: pgAdmin (Third-party PostgreSQL GUI)

pgAdmin is a comprehensive PostgreSQL administration tool:

1. Download and install [pgAdmin](https://www.pgadmin.org/download/)

2. Launch pgAdmin

3. Add a new server with the following connection details:

   - Name: One Word Local
   - Host: localhost
   - Port: 5432
   - Username: postgres
   - Password: postgres
   - Database: postgres

4. Once connected, you can browse the database objects in the left panel and manage tables, run queries, etc.

### Option 3: DBeaver (Alternative GUI)

DBeaver is a universal database tool that works with many database types:

1. Download and install [DBeaver](https://dbeaver.io/download/)

2. Launch DBeaver and connect to your PostgreSQL database with these details:

   - Connection Type: PostgreSQL
   - Server Host: localhost
   - Port: 5432
   - Database: postgres
   - Username: postgres
   - Password: postgres

3. Use DBeaver's interface to browse tables, create queries, and manipulate data.

## Common Database Operations

### Viewing Table Structure

To explore the database schema:

- In Prisma Studio: Click on a model name to see its structure
- In pgAdmin: Expand Servers > One Word Local > Databases > postgres > Schemas > public > Tables, then right-click a table and select "Properties"
- In DBeaver: Expand Databases > postgres > Schemas > public > Tables, then select a table to view its columns

### Running SQL Queries

To execute custom SQL queries:

- In pgAdmin: Click Tools > Query Tool, then enter and execute your SQL
- In DBeaver: Right-click on the database connection and select "SQL Editor"

### Backup and Restore

To backup your local database:

```bash
docker exec -t postgres_db pg_dump -U postgres postgres > backup.sql
```

To restore from a backup:

```bash
cat backup.sql | docker exec -i postgres_db psql -U postgres -d postgres
```

## Troubleshooting

### Database Connection Issues

If you cannot connect to the database:

1. Check if the Docker container is running:

   ```bash
   docker-compose ps
   ```

2. View container logs for errors:

   ```bash
   docker-compose logs postgres
   ```

3. Ensure the database port is not already in use:

   ```bash
   lsof -i :5432
   ```

### Resetting the Database

If you need to reset your database to a clean state:

1. Stop and remove the containers:

   ```bash
   docker-compose down -v
   ```

   The `-v` flag removes the volumes, which deletes all data.

2. Start the containers again:

   ```bash
   docker-compose up -d
   ```

3. Reapply migrations and seed data:

   ```bash
   yarn generate-schema
   yarn db:migrate
   yarn seed
   ```

### Schema Changes Not Reflecting

If your schema changes aren't showing up:

1. Make sure you've saved your changes to the `schema.prisma` file

2. Regenerate the Prisma client:

   ```bash
   yarn generate-schema
   ```

3. Apply the database changes:

   ```bash
   yarn db:migrate
   ```

4. Restart your API server to ensure it uses the updated schema.
