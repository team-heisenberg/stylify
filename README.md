# Stylify

Capstone Project

## Overview

## Project Structure

- `/`: License and information aboout the project
- `api/`: Backend code
- `app`: React Native code
- `.github/`: CI/CD and Github config
- `.docker/`: Docker setup

## Development Setup

Install and run Docker: [Mac](https://docs.docker.com/desktop/install/mac-install/) | [Windows](https://docs.docker.com/desktop/install/windows-install/)

**Option 1**: 

__Intel__
```bash
sudo chmod +x ./setup.sh && ./setup.sh
```

__Apple Silicon__
```bash
sudo chmod +x ./setup.sh && ./setup.sh m1
```

**Option 2**:

Go to `app/` and `api/` folders and run:

```bash
npm install
```

To set MySQL locally run inside `api/`

__Intel__
```bash
npm run start:db
```

__Apple Silicon__
```bash
npm run start:db:m1
```

## Database

As for the database connection, we're using Prisma. Prisma is a ORM (Object-Relational Mapping) that will help ups to keep track on the schema changes and,
make it easier to query data from MySQL.

### How to create a table and handle data

[Prisma Docs](https://www.prisma.io/docs/getting-started/quickstart)

[Prisma Crud Reference](https://www.prisma.io/docs/concepts/components/prisma-client/crud)

### Creating a new Migration

In order to persist table changes run:

```bash
npm run prisma:migrate
```

and inform a name for the migration. E.g.:

- `business_table_email_field_added`
- `customer_table_created`


## Tech stack

- NodeJS
- MySQL
- TypeScript
- Express
- Expo (React Native)

## Cloud

- EC2
- S3
- Planetscale (MySQL)
- Upstash (Redis)

## Misc

- ChatGPT (?)