# GoIT Node.js REST API

A REST API application for managing contacts built with Node.js, Express, and PostgreSQL using Sequelize ORM.

## Features

- User authentication (registration, login, logout)
- JWT token-based authorization
- User subscription management
- User avatar management (gravatar integration and custom uploads)
- Static file serving for avatars
- Create, read, update, and delete contacts (per user)
- Update contact favorite status
- Pagination and filtering for contacts
- PostgreSQL database with Sequelize ORM
- Input validation using Joi
- Password hashing with bcrypt
- File upload with Multer
- CORS enabled
- Unit tests with Jest

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

## Authentication Flow

1. **Register** a new user with email and password
2. **Login** to receive a JWT token
3. Use the token in the `Authorization: Bearer {token}` header for all protected endpoints
4. **Logout** to invalidate the token

### Token Expiration

JWT tokens expire after 24 hours. After expiration, users need to login again to get a new token.

## Database Models

### User Model

- `id` - Auto-generated unique identifier
- `email` - User email (unique, required)
- `password` - Hashed password (required)
- `subscription` - User subscription level: "starter" (default), "pro", or "business"
- `token` - Current JWT token (null when logged out)
- `avatarURL` - URL to user's avatar image (auto-generated via Gravatar on registration)

### Contact Model

- `id` - Auto-generated unique identifier
- `name` - Contact name (required)
- `email` - Contact email (required)
- `phone` - Contact phone number (required)
- `favorite` - Favorite status (boolean, default: false)
- `owner` - User ID who owns this contact (foreign key, required)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_DIALECT=postgres
DATABASE_HOST=your-database-host
DATABASE_USERNAME=your-database-username
DATABASE_NAME=your-database-name
DATABASE_PASSWORD=your-database-password
DATABASE_PORT=5432
JWT_SECRET=your-secret-key-for-jwt
```

### Environment Variables Description

| Variable            | Description                | Example                             |
| ------------------- | -------------------------- | ----------------------------------- |
| `DATABASE_DIALECT`  | Type of database           | `postgres`                          |
| `DATABASE_HOST`     | Database host address      | `localhost` or `your-db-server.com` |
| `DATABASE_USERNAME` | Database username          | `postgres`                          |
| `DATABASE_NAME`     | Name of the database       | `contacts_db`                       |
| `DATABASE_PASSWORD` | Database password          | `your_secure_password`              |
| `DATABASE_PORT`     | Database port number       | `5432` (default for PostgreSQL)     |
| `JWT_SECRET`        | Secret key for JWT signing | `your_random_secret_string`         |

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "example@example.com",
  "password": "examplepassword"
}
```

**Response:** `201 Created`

```json
{
  "user": {
    "email": "example@example,
    "avatarURL": "//www.gravatar.com/avatar/hash?s=100&d=retro"
  }
}
```

**Note:** Upon registration, a Gravatar avatar is automatically generated based on the user's email address.

````

**Error Responses:**

- `400 Bad Request` - Validation error
- `409 Conflict` - Email already in use

```json
{
  "message": "Email in use"
}
````

#### Login User

```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**

```json
{
  "email": "example@example.com",
  "password": "examplepassword"
}
```

**Response:** `200 OK`

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "example@example.com",
    "subscription": "starter"
  }
}
```

**Error Responses:**

- `400 Bad Request` - Validation error
- `401 Unauthorized` - Invalid credentials

```json
{
  "message": "Email or password is wrong"
}
```

#### Logout User

```http
POST /api/auth/logout
Authorization: Bearer {token}
```

**Response:** `204 No Content`

**Error Responses:**

- `401 Unauthorized` - Invalid or missing token

```json
{
  "message": "Not authorized"
}
```

#### Get Current User

```http
GET /api/auth/current
Authorization: Bearer {token}
```

**Response:** `200 OK`

```json
{
  "email": "example@example.com",
  "subscription": "starter"
}
```

**Error Responses:**

- `401 Unauthorized` - Invalid or missing token

```json
{
  "message": "Not authorized"
}
```

#### Update Subscription

```http
PATCH /api/auth/subscription
Authorization: Bearer {token}
Content-Type: application/json
```

**Request Body:**

```json
{
  "subscription": "pro"
}
```

**Allowed values:** `"starter"`, `"pro"`, `"business"`

**Response:** `200 OK`

```json
{
  "email": "example@example.com",
  "subscription": "pro"
}
```

#### Update Avatar

```http
PATCH /api/auth/avatars
Content-Type: multipart/form-data
Authorization: Bearer {token}
```

**Request Body:**

- Form field name: `avatar`
- File type: Image file (jpg, png, etc.)
- Max file size: 10MB

**Response:** `200 OK`

```json
{
  "avatarURL": "/avatars/1234567890_filename.jpg"
}
```

**Error Responses:**

- `401 Unauthorized` - Invalid or missing token
- `400 Bad Request` - Invalid file type or size

**Notes:**

- Uploaded files are stored in the `public/avatars` directory
- Files are given unique names to prevent conflicts
- Avatars are accessible via: `http://localhost:3000/avatars/<filename>`
  **Error Responses:**

- `400 Bad Request` - Invalid subscription value
- `401 Unauthorized` - Invalid or missing token

### Contacts

**Note:** All contact endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer {token}
```

#### Get All Contacts

```http
GET /api/contacts
GET /api/contacts?page=1&limit=20
GET /api/contacts?favorite=true
Authorization: Bearer {token}
```

**Query Parameters:**

- `page` (optional) - Page number for pagination (default: 1)
- `limit` (optional) - Number of items per page (default: 10, max: 100)
- `favorite` (optional) - Filter by favorite status (`true` or `false`)

**Response:** `200 OK`

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "favorite": false,
    "owner": 1,
    "createdAt": "2026-03-01T12:00:00.000Z",
    "updatedAt": "2026-03-01T12:00:00.000Z"
  }
]
```

Base URL: `http://localhost:3000/api/contacts`

### Get All Contacts

```http
GET /api/contacts
Authorization: Bearer {token}
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
Authorization: Bearer {token}
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
Authorization: Bearer {token}
Content-Type: application/json
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
Authorization: Bearer {token}
Content-Type: application/json
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
Authorization: Bearer {token}
Content-Type: application/json
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
Authorization: Bearer {token}
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

### 401 Unauthorized

```json
{
  "message": "Not authorized"
}
```

Run tests with coverage:

```bash
npm run coverage
```

The project includes unit tests for the login controller that verify:

- Status code 200 is returned
- A valid JWT token is returned
- User object with email and subscription fields is returned

## Development

To run the application in development mode with auto-reload:

```bash
npm run dev
```

This uses nodemon to automatically restart the server when file changes are detected.

## Static Files

Avatar images are served statically from the `public/avatars` directory. Access avatars via:

```
http://localhost:3000/avatars/<filename>
```

### 409 Conflict

```json
{
  "message": "Email in use"
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
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT token generation and verification
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment configuration

## Development

To run the application in development mode with auto-reload:

```bash
npm run dev
```

This uses nodemon to automatically restart the server when file changes are detected.
