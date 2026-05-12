# Project Title: Blog API

A production-ready RESTful API built with Node.js, Express, and MongoDB, designed to function as a "Second Brain" for creativity and knowledge organization.

Live URL: https://blog-api-kiir.onrender.com/auth/articles

Status: ![Deployed](https://img.shields.io/badge/Status-Deployed-success) ![v1.0.0](https://img.shields.io/badge/v1.0.0-blue)

---

## | Project Overview

This backend provides full CRUD functionality this application. It features advanced querying capabilities including text search across titles and content, category filtering, sorting, and pagination.

## | Tech Stack

- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB Atlas (Mongoose ODM)
- Validation: Joi / Mongoose Validation
- Hosting: Render.com

---

## | Installation & Setup

1.  **Clone the repository:**

        git clone https://github.com/Neekbillzz/blog-API

2.  **Install dependencies:**

        npm install

3.  **Configure Environment Variables (Create a .env file):**

        PORT=your_port_number

        MONGO_URI=your_mongodb_connection_string_here

        JWT_SECRET= your_string_secret

4.  **Start the server:**

        npm start

5.  **Endpoints**

All requests should be made to the following base URL: https://blog-api-kiir.onrender.com/auth/articles

### Articles Resource

| Method | Endpoint      | Description                | Query Parameters / Body                    |
| :----- | :------------ | :------------------------- | :----------------------------------------- |
| POST   | /articles     | Create a new article post  | Body: { title, content, category, tags }   |
| GET    | /articles     | Fetch all articles         | Query: page, limit, search, sort           |
| GET    | /articles/:id | Fetch a single article     | Params: id                                 |
| PUT    | /articles/:id | Update an existing article | Body: { title, content, author, category } |
| DELETE | /articles/:id | Remove an article          | Params: id                                 |

---

### Example Usage (Advanced Querying)

To search for articles about "Nodejs" in the "Backend" category, with pagination:

    GET /auth/articles?search=nodejs&category=Backend&page=1&limit=5

---

### | Validation

- **Validation:** Powered by **Joi**, ensuring data integrity with meaningful error messages for every request

---

## 🔐 Authentication Endpoints

Before accessing the articles, you must register a user and log in to receive a **JWT Bearer Token**.

| Feature           | Method | Endpoint              | Description                                          |
| :---------------- | :----- | :-------------------- | :--------------------------------------------------- |
| **User Register** | `POST` | `/auth/users/sign-up` | Create a new account with name, email, and password. |
| **User Login**    | `POST` | `/auth/users/login`   | Authenticates user and returns a JWT token.          |

### **Request Body Examples**

**Register / Login:**

{
"email": "nick@example.com",

"password": "password123"
}

## | API Reference & Postman Documentation

### 1. Create an Article (POST)

POST /auth/articles

---

### 2. Get All Articles (Advanced Querying)

GET /auth/articles

Supports the following query parameters:

| Parameter | Description                 | Example             |
| :-------- | :-------------------------- | :------------------ |
| page      | Page number for pagination  | ?page=2             |
| limit     | Items per page              | ?limit=5            |
| search    | Text search (title/content) | search?q=javascript |
| sort      | Field to sort by            | ?sort=-createdAt    |

### 3. Get Single Article (GET)

GET /auth/articles/:id

### 4. Update Article (PUT)

PUT /auth/articles/:id

### 5. Delete Article (DELETE)

DELETE /auth/articles/:id

---

## | Data Model

The Article schema is designed for performance with text indexing for search functionality.

json
{

"title": "String (Required, Indexed)",

"content": "String (Required, Indexed)",

"category": "String (Optional)",

"tags": "Array of Strings",

"createdAt": "Timestamp",

"updatedAt": "Timestamp"

}

## | Error Handling

The API implements standard HTTP status codes:

- 200 / 201 : Success

- 400 : Bad Request (Validation Failures)

- 404 : Not Found

- 500 : Internal Server Error

## Our API doc

[View API Documentation] (https://documenter.getpostman.com/view/52776554/2sBXqNoKWR)
