# AquaFresh Backend API

This backend provides the REST API for the AquaFresh water-delivery application. It manages delivery orders and stores them in MongoDB, with Express handling all CRUD operations.

## Overview

The API is designed for the AquaFresh dashboard and supports creating, retrieving, updating, and deleting orders. It validates MongoDB ObjectId values and enforces the allowed order statuses.

## Features

- Order CRUD endpoints
- MongoDB integration with Mongoose
- Status validation for Pending, In-Transit, and Delivered
- Automatic createdAt timestamps
- CORS enabled for frontend access
- Error handling for invalid IDs and missing records

## Tech stack

- Node.js
- Express 5
- TypeScript
- Mongoose
- MongoDB
- dotenv
- CORS

## Local setup

### Prerequisites

- Node.js 18+
- npm
- MongoDB Atlas connection string or a local MongoDB instance

### Install and run

```bash
cd backend
npm install
```

Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/aquafresh
```

Then start the server:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:5000
```

## Available scripts

```bash
npm run dev   # run the server with tsx watch
npm run build  # compile TypeScript
npm start     # run the compiled production build
```

## API endpoints

### Get all orders

```http
GET /orders
```

### Create an order

```http
POST /orders
Content-Type: application/json
```

Request body:

```json
{
  "customer": "Ali Khan",
  "packageSize": "19L Bottle x 2",
  "status": "Pending"
}
```

### Update an order status

```http
PATCH /orders/:id
Content-Type: application/json
```

Example:

```json
{
  "status": "In-Transit"
}
```

### Delete an order

```http
DELETE /orders/:id
```

## Order schema

```ts
export const STATUSES = ["Pending", "In-Transit", "Delivered"] as const;

const orderSchema = new Schema(
  {
    customer: { type: String, required: true, trim: true },
    packageSize: { type: String, required: true, trim: true },
    status: { type: String, enum: STATUSES, default: "Pending" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
```

## Project structure

```text
backend/
├── src/
│   ├── models/
│   │   └── Order.ts
│   ├── route/
│   │   └── order.ts
│   └── server.ts
├── package.json
├── tsconfig.json
├── readme.md
└── .env
```

## Sample response

```json
{
  "_id": "67d7d5f7d13b4d4e6f11aa23",
  "customer": "Ali Khan",
  "packageSize": "19L Bottle x 2",
  "status": "Pending",
  "createdAt": "2026-11-11T10:12:30.000Z"
}
```

## Notes

- The API validates all incoming IDs before update or delete actions.
- Missing or invalid MongoDB configuration will prevent the server from starting.
- This backend is intended to support the frontend order board and can be connected to the React app through the API endpoints.

## Author

Hussnain Iftikhar