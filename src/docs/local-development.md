# Local Development Guide

## First time setup

1. Clone the repository:

   ```bash
   git clone https://github.com/mariobrusarosco/api-one-word.git
   cd api-one-word
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Set up environment variables:

   ```bash
   cp .example.env .env
   ```

   Then edit `.env` with your preferred settings. The default values should work for local development.

4. Start the database and API server:

   ```bash
   # Start PostgreSQL in the background
   docker-compose up -d

   # Start the development server
   yarn dev
   ```

The API will be available at `http://localhost:3000`.

## Getting back to development

1. Start the database and API server:

   ```bash
   # Start PostgreSQL in the background
   docker-compose up -d

   # Start the development server
   yarn dev
   ```
2. Check the API server logs:

   ```bash
   docker-compose logs api-one-word
   ```

3. If you have the Front End ready, you can check the Socker Dashboard:

* Check the `https://admin.socket.io/`
* Take a look at `src/docs/chatting.md` for more information


## Development Commands

Here are the most commonly used commands during development:

```bash
# Start the development server with hot reload
yarn dev

# Run tests
yarn test

# Run linter
yarn lint

# Format code
yarn format

# Generate Prisma client
yarn generate-schema

# Run database migrations
yarn db:migrate

# Seed the database
yarn seed

# Start Prisma Studio (database GUI)
yarn studio
```

## Database Setup

For detailed instructions on setting up and managing the database, please refer to our [Database Guide](database.md).

## Accessing the API

Once running, you can access:

- API endpoints at `http://localhost:3000`
- Swagger documentation at `http://localhost:3000/api-docs`
- Socket.IO test page at `http://localhost:3000/socket.html`

## Development Workflow

1. **Making Changes**

   - Create a new branch for your feature/fix
   - Make your changes
   - Run tests and linting before committing
   - Submit a pull request

2. **Database Changes**

   - Modify the Prisma schema in `src/prisma/schema.prisma`
   - Generate a new migration: `yarn db:migrate`
   - Update the Prisma client: `yarn generate-schema`

3. **Testing Changes**
   - Write tests for new features
   - Run the test suite: `yarn test`
   - Ensure all tests pass before submitting PR

## Troubleshooting

### Common Issues

1. **Port Conflicts**

   - Database (5432): Check if another PostgreSQL instance is running
   - API (3000): Check if the port is in use by another service

2. **Database Connection Issues**

   ```bash
   # Check database container status
   docker-compose ps

   # View database logs
   docker-compose logs postgres
   ```

3. **Node/Yarn Issues**
   ```bash
   # Clear node_modules and reinstall
   rm -rf node_modules
   yarn install
   ```

### Getting Help

If you encounter any issues:

1. Check the [Database Guide](database.md) for database-specific problems
2. Review Docker logs: `docker-compose logs`
3. Check the API server logs
4. Reach out to the team if problems persist

## Additional Resources

- [API Documentation](https://www.postman.com/mario-brusarosco/workspace/mario-brusarosco/collection/2930329-c069887a-c13d-4bee-8bda-e69e3f5b9163)
- [Database Guide](database.md)
- [Project README](../../readme.md)
