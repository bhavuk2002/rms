# Railway Management System API

This is a Railway Management System API built using Node.js, Express, Sequelize, and MySQL. It provides functionalities to manage trains, book seats, and manage user roles (admin and user).

## Table of Contents

- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
  - [User Routes](#user-routes)
  - [Train Routes](#train-routes)
- [Authorization and Authentication](#authorization-and-authentication)
- [Error Handling](#error-handling)
- [Future Improvements](#future-improvements)

---

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- MySQL

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/bhavuk2002/rms.git
   cd rms
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Setup environment variables** : Create a `.env` file in the root directory and add the required variables (refer to the [Environment Variables](#environment-variables) section).

4. **Run the application** :

   ```bash
   npm start
   ```

---

# Environment Variables

Ensure you have a `.env` file with the following keys:

```
PORT=3000
JWT_TOKEN_SECRET=your-jwt-secret
ADMIN_API_KEY=your-api-key
DATABASE_NAME=your-database-name
DATABASE_USER=your-database-user
DATABASE_PASSWORD=your-database-pass
DATABASE_HOST=your-database-host
```

# Database Setup

1. Create a MySQL database named `rms` or `<any of your choice>`.
2. Configure the database connection in the `util/database.js` file.

# Project Structure

```bash
.
├── config
│   └── database.js       # Database configuration
├── controllers
│   └── auth.js           # Authentication logic
├── middleware
│   ├── auth.js           # Authentication and authorization middleware
├── models
│   ├── User.js           # User model
│   ├── Train.js          # Train model
│   ├── Booking.js        # Booking model
├── routes
│   ├── user.js           # User routes
│   ├── train.js          # Train routes
├── services
│   └── booking.js        # Booking service
└── app.js                # Main application entry point

```

# API Endpoints

## User Routes

### 1. Create a New User

- **URL**: `/createUser`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string",
    "role": "string" // Optional: defaults to 'user'
  }
  ```
- **Response**:

  ```json
  {
    "user": {
      "role": "string",
      "id": "integer",
      "username": "string"
    },
    "token": "string"
  }
  ```

- **Description**: Registers a new user and returns the user data along with a JWT token.

### 2. User Login

- **URL**: `/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response**:

  ```json
  {
    "user": {
      "id": "integer",
      "username": "string",
      "role": "string"
    },
    "token": "string"
  }
  ```

- **Description**: Authenticates a user and returns the user data along with a JWT token.

## Train Routes

### 3. Add a Train (Admin Only)

- **URL**: `/addTrain`
- **Method**: `POST`
- **Headers**:
  - `Authorization: Bearer <token>`
  - `x-api-key: <ADMIN_API_KEY>`
- **Request Body**:

  ```json
  {
    "name": "string",
    "source": "string",
    "destination": "string",
    "totalSeats": "integer",
    "availableSeats": "integer"
  }
  ```

- **Response**:

  ```json
  {
    "id": "integer",
    "name": "string",
    "source": "string",
    "destination": "string",
    "totalSeats": "integer",
    "availableSeats": "integer",
    "createdAt": "DATETIME",
    "updatedAt": "DATETIME"
  }
  ```

- **Description**: Adds a new train to the system. This endpoint is restricted to admin users.
