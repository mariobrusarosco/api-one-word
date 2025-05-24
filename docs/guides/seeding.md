# Seeding Guide

This guide covers how to manage and work with database seeding in the One Word API.

## Overview

Seeding is the process of populating a database with an initial set of data. This is particularly useful for:
- Setting up development environments
- Creating demo data
- Running tests with consistent data
- Resetting the database to a known state

## Seed Files

### Main Seed File
- Location: `src/prisma/seed.ts`
- Purpose: Contains the main seeding logic for populating the database
- Usage: Run with `yarn seed`

### Demo Reset Script
- Location: `scripts/reset-demo.ts`
- Purpose: Resets the demo environment by clearing and reseeding the database
- Usage: Run with `yarn demo:reset`

## Available Commands

| Command | Description | Environment |
|---------|-------------|-------------|
| `yarn seed` | Runs the main seed file | Development |
| `yarn demo:reset` | Resets the demo environment | Demo |

## How Seeding Works

### Data Flow
1. Existing data is cleared (in the correct order to respect foreign key constraints)
2. New data is created using Prisma Client
3. Relationships between entities are established

### Data Types
Seeding handles the following entities:
- Members (Users)
- Tables
- Channels
- Table Seats

## Best Practices

1. **Idempotency**: Seed scripts should be safe to run multiple times without duplicating data
2. **Environment Awareness**: Always check the environment before running destructive operations
3. **Data Privacy**: Never include real user data in seed files
4. **Performance**: Use `createMany` for better performance when inserting multiple records

## Adding New Seed Data

1. Add new data to the appropriate section in `src/prisma/seed.ts`
2. Ensure any related data is created first (e.g., create users before tables)
3. Test the seed script locally before committing

## Troubleshooting

### Common Issues

#### Foreign Key Constraints
If you see foreign key errors, ensure you're deleting data in the correct order:
1. Table Seats
2. Channels
3. Tables
4. Members

#### Environment Variables
Make sure your `.env` or `.env.demo.local` file has the correct database connection string.

## Demo Environment

The demo environment can be reset using:
```bash
yarn demo:reset
```

This will:
1. Load environment variables from `.env.demo.local`
2. Clear all existing data
3. Re-seed the database with demo data

## Security Considerations

- Never commit sensitive data in seed files
- Be cautious when running seed scripts in production
- Always back up your database before running destructive operations
