# One Word API - Setup Guide

This guide will help you set up the One Word API development environment on your local machine.

## Project Overview

One Word API is a Node.js backend service that powers the One Word application. It uses:

- **Node.js** with **Express** for the server
- **TypeScript** for type safety
- **Prisma** as an ORM for database interactions
- **PostgreSQL** database (via Docker)
- **Socket.IO** for real-time communications
- **JWT** for authentication

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js**: Version 16 or higher
  - Download from [Node.js official website](https://nodejs.org/)
  - Verify installation: `node --version`

- **Yarn**: Package manager
  - Install with: `npm install -g yarn`
  - Verify installation: `yarn --version`

- **Docker**: For running PostgreSQL locally
  - Download from [Docker's official website](https://www.docker.com/get-started)
  - Verify installation: `docker --version`

- **Git**: For cloning the repository
  - Download from [Git official website](https://git-scm.com/downloads)
  - Verify installation: `git --version`

## Step 1: Clone the Repository

```bash
git clone https://github.com/mariobrusarosco/api-one-word.git
cd api-one-word
```

## Step 2: Install Dependencies

Install all required dependencies using yarn:

```bash
yarn
```

## Step 3: Set Up the Database

1. Start the PostgreSQL container using Docker Compose:

```bash
docker-compose up -d
```

This will create and start a PostgreSQL container with the following credentials:
- User: postgres
- Password: postgres
- Database: postgres
- Port: 5432

2. Verify that the container is running:

```bash
docker ps
```

You should see a container named `postgres_db` in the list.

## Step 4: Set Up Environment Variables

1. Create a `.env` file in the root directory by copying the example file:

```bash
cp .example.env .env
```

2. The default values in the `.env` file should work for a local development environment, but you can customize them if needed:

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
API_VERSION=/api/v1
MEMBER_PUBLIC_ID_COOKIE=memberId
JWT_SECRET=mysecretkey
ACCESS_CONTROL_ALLOW_ORIGIN=http://localhost:5173
NODE_ENV=development
OKTA_AUTH_COOKIE_NAME=oktaAuth
DEMO_MEMBER_ID=1
```

## Step 5: Set Up the Database Schema

1. Generate the Prisma client:

```bash
yarn generate-schema
```

2. Push the database schema to your local PostgreSQL instance:

```bash
yarn db:push
```

3. (Optional) Seed the database with initial data:

```bash
yarn seed
```

## Step 6: Start the Development Server

Start the development server with auto-reloading:

```bash
yarn dev
```

The API will be accessible at http://localhost:3000.

## Step 7: Testing the Setup

### REST API
You can test that the API is working correctly by accessing: 
- http://localhost:3000/api/v1/health (should return a 200 OK status)

### Socket Connection

TO BE IMPLEMENTED
You can test the Socket.IO connection by opening:
- http://localhost:3000/socket.html

## Additional Commands

- **Start Prisma Studio** (database GUI):
  ```bash
  yarn studio
  ```
  This will start a web interface at http://localhost:5555 where you can browse and edit your database.

- **Run database migrations**:
  ```bash
  yarn db:migrate
  ```

- **Build for production**:
  ```bash
  yarn build
  ```

- **Start production server**:
  ```bash
  yarn start
  ```

## Troubleshooting

### Database Connection Issues
- Ensure Docker is running
- Check if the PostgreSQL container is up with `docker ps`
- Verify the DATABASE_URL in your .env file matches the Docker setup

### Application Won't Start
- Check if all dependencies are installed with `yarn`
- Ensure all environment variables are set correctly
- Make sure the required ports (3000, 5432) are not in use by other applications

### Prisma Issues
- Try regenerating the Prisma client with `yarn generate-schema`
- For schema sync issues, run `yarn db:push` again

## Next Steps

Once your local environment is set up, you might want to:

1. Explore the API documentation in the Postman collection
2. Check out the existing models in the Prisma schema
3. Understand the Socket.IO implementation for real-time features

## Resources

- [Project Repository](https://github.com/mariobrusarosco/api-one-word)
- [Postman Documentation](https://www.postman.com/mario-brusarosco/workspace/mario-brusarosco/collection/2930329-c069887a-c13d-4bee-8bda-e69e3f5b9163)
- [Sentry Dashboard](https://mario-79.sentry.io/issues/?project=4506356576747520&referrer=sidebar&statsPeriod=30d)
- [Hosted API](https://api-one-word.mariobrusarosco.com/)
