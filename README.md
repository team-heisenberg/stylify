# Stylify

Capstone Project

## Overview

## Project Structure

- `/`: Docker, license and information aboout the project
- `api/`: Backend code
- `app`: React Native code
- `.github/`: CI/CD and Github config

## Development Setup

Install and run Docker: [Mac](https://docs.docker.com/desktop/install/mac-install/) | [Windows](https://docs.docker.com/desktop/install/windows-install/)

**Option 1**: 

```bash
$ sudo chmod +x ./setup.sh && ./setup.sh
```

**Option 2**:

Go to `app/` and `api/` folders and run:

```bash
npm install
```

To set MySQL locally run inside `api/`

```bash
npm run start:docker
```

## Database

As for the database connection, we're using Prisma. Prisma is a ORM (Object-Relational Mapping) that will help ups to keep track on the schema changes and,
make it easier to query data from MySQL.

### How to create a table and handle data

[Prisma Docs](https://www.prisma.io/docs/getting-started/quickstart)

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