# Dockerized Blog Application

## Overview
This project is a **blog application** that is fully containerized and integrates **MongoDB** and **Redis** as supporting services. The entire application stack is orchestrated using **Docker Compose**, with the services connected via a custom Docker network to enable seamless communication.

---

## Project Highlights
1. **Scalability and Efficiency**: The setup is designed to be scalable and optimized for performance, ensuring smooth operation across different environments such as development, testing, and production.
2. **Multi-Service Architecture**:
   - **Web Service**: A Node.js application that handles user requests and business logic.
   - **Database Service**: MongoDB for persistent data storage.
   - **Cache Service**: Redis for fast data retrieval through caching.

---

## Key Functionality
1. **Create Post (POST)**:
   - A new post is stored in the MongoDB database for long-term persistence.
   - The post is also cached in Redis for quick access.

2. **Retrieve Post (GET)**:
   - When retrieving a post, the application first checks the Redis cache.
   - If the post is found in the cache, it is returned immediately for faster response times.
   - If not, the application fetches the post from MongoDB, updates the cache, and returns the data to the user.

3. **Update Post (PUT)**:
   - Updates an existing post in the MongoDB database.
   - The updated post is also refreshed in the Redis cache to ensure consistency.

4. **Delete Post (DELETE)**:
   - Removes the post from the MongoDB database.
   - The corresponding entry in the Redis cache is also invalidated to prevent stale data.

---

## Features
- **Node.js**: Backend application written in Node.js.
- **MongoDB**: Database for storing structured data.
- **Redis**: In-memory data structure store for caching.
- **Environment Configuration**: Easily switch between environments using `.env` files.
- **Dockerized Setup**: Simplified deployment with Docker Compose.

---

## Technologies Used
- **Node.js**: Backend framework for handling business logic.
- **MongoDB**: NoSQL database for storing structured data.
- **Redis**: In-memory data store for caching and quick access.
- **Docker**: Containerization platform for running services.
- **Docker Compose**: Tool for defining and managing multi-container Docker applications.

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
```

### 2. Build and Start the Application
Use Docker Compose to build and start the services.

```bash
docker-compose up --build
```

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

```

## Managing Environments
To specify a different environment, use the `--env-file` flag when running Docker Compose:

```bash
docker-compose --env-file .env.prod up --build
```

## Stopping the Services
To stop and remove the containers, networks, and volumes, run the following command:

```bash
docker-compose down
```

## Health Checks
The setup includes health checks for MongoDB and Redis:

- **MongoDB**: Ensures connectivity using a ping command.
- **Redis**: Verifies service health with a PING command.

