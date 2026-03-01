# GoIT Node.js REST API

A REST API application for managing contacts built with Node.js, Express, and PostgreSQL using Sequelize ORM.

## Features

- Create, read, update, and delete contacts
- Update contact favorite status
- PostgreSQL database with Sequelize ORM
- Input validation using Joi
- CORS enabled

## Prerequisites

Before running this application, make sure you have:

- Node.js (v14 or higher)
- PostgreSQL database
- npm package manager

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd goit-node-rest-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory (see Environment Variables section below)

4. Start the application:

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will start on port 3000 by default.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_DIALECT=postgres
DATABASE_HOST=your-database-host
DATABASE_USERNAME=your-database-username
DATABASE_NAME=your-database-name
DATABASE_PASSWORD=your-database-password
DATABASE_PORT=5432
```

### Environment Variables Description

| Variable            | Description           | Example                             |
| ------------------- | --------------------- | ----------------------------------- |
| `DATABASE_DIALECT`  | Type of database      | `postgres`                          |
| `DATABASE_HOST`     | Database host address | `localhost` or `your-db-server.com` |
| `DATABASE_USERNAME` | Database username     | `postgres`                          |
| `DATABASE_NAME`     | Name of the database  | `contacts_db`                       |
| `DATABASE_PASSWORD` | Database password     | `your_secure_password`              |
| `DATABASE_PORT`     | Database port number  | `5432` (default for PostgreSQL)     |

## API Endpoints

Base URL: `http://localhost:3000/api/contacts`

### Get All Contacts

```http
GET /api/contacts
```

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "favorite": false,
    "createdAt": "2026-03-01T12:00:00.000Z",
    "updatedAt": "2026-03-01T12:00:00.000Z"
  }
]
```

### Get Contact by ID

```http
GET /api/contacts/:id
```

**Response:** `200 OK` or `404 Not Found`

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "favorite": false,
  "createdAt": "2026-03-01T12:00:00.000Z",
  "updatedAt": "2026-03-01T12:00:00.000Z"
}
```

### Create Contact

```http
POST /api/contacts
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

**Response:** `201 Created`

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "favorite": false,
  "createdAt": "2026-03-01T12:00:00.000Z",
  "updatedAt": "2026-03-01T12:00:00.000Z"
}
```

### Update Contact

```http
PUT /api/contacts/:id
```

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+0987654321"
}
```

**Response:** `200 OK` or `404 Not Found`

### Update Contact Favorite Status

```http
PUT /api/contacts/:id/favorite
```

**Request Body:**

```json
{
  "status": true
}
```

**Response:** `200 OK` or `404 Not Found`

### Delete Contact

```http
DELETE /api/contacts/:id
```

**Response:** `200 OK` or `404 Not Found`

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "favorite": false
}
```

## Error Responses

### 400 Bad Request

```json
{
  "message": "Validation error message"
}
```

### 404 Not Found

```json
{
  "message": "Not found"
}
```

### 500 Server Error

```json
{
  "message": "Server error"
}
```

## Technologies Used

- **Express.js** - Web framework
- **Sequelize** - ORM for PostgreSQL
- **PostgreSQL** - Database
- **Joi** - Schema validation
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment configuration

## Development

To run the application in development mode with auto-reload:

```bash
npm run dev
```

This uses nodemon to automatically restart the server when file changes are detected.
