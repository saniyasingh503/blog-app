# Dockerized Node.js Application

## Overview
This project is a dockerized Node.js application that integrates MongoDB and Redis services. The setup is designed to be scalable, efficient, and configurable for different environments (development, testing, production).

## Features
- **Node.js**: Backend application written in Node.js.
- **MongoDB**: Database for storing structured data.
- **Redis**: In-memory data structure store for caching.
- **Environment Configuration**: Easily switch between environments using `.env` files.
- **Dockerized Setup**: Simplified deployment with Docker Compose.

---

## Prerequisites
Ensure you have the following installed:

1. [Docker](https://www.docker.com/)
2. [Docker Compose](https://docs.docker.com/compose/)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/saniyasingh503/blog-app.git
cd blog-app

### 2. Build and Start the Application
Use Docker Compose to build and start the services.

```bash
docker-compose up --build

### 3. Access the Application

Once the application is running, you can access the following APIs:

- **GET** `/api/posts` – Retrieve the list of posts.
- **POST** `/api/posts` – Create a new post.
- **GET** `/api/posts/:id` – Retrieve an existing post by ID.
- **PUT** `/api/posts/:id` – Update an existing post by ID.
- **DELETE** `/api/posts/:id` – Delete a post by ID.

All APIs are available at the following base URL:

- **URL**: [http://localhost:3000](http://localhost:3000)


## Directory Structure

```bash
.
├── blog-app-backend/          # Node.js application source code
├── db/                # MongoDB Docker build context
├── cache/             # Redis Docker build context
├── docker-compose.yml # Docker Compose configuration
├── .env               # Environment variables for development
├── .env.test          # Environment variables for testing
├── .env.prod          # Environment variables for production



## Managing Environments
To specify a different environment, use the `--env-file` flag when running Docker Compose:

```bash
docker-compose --env-file .env.prod up --build

## Stopping the Services
To stop and remove the containers, networks, and volumes, run the following command:

```bash
docker-compose down

## Health Checks
The setup includes health checks for MongoDB and Redis:

- **MongoDB**: Ensures connectivity using a ping command.
- **Redis**: Verifies service health with a PING command.

