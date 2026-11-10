# AquaFresh Order API

REST API for AquaFresh Water Delivery. Staff use it to create, view, update and delete bottled-water delivery orders. This is **Task 2** of the AquaFresh Order Board project. The React front end (Task 1) will be connected to this API in Task 3.

## Tech stack

- Node.js
- Express
- MongoDB Atlas with Mongoose
- CORS and dotenv

## Getting started

### Requirements

- Node.js 18 or newer and npm
- A free MongoDB Atlas cluster (or a local MongoDB)

### Install and run

```bash
npm install
npm run dev
```

The API runs at `http://localhost:5000`.

### Environment variables

Create a `.env` file in the project root (see `.env.example`):

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Never commit your real `.env` file.

## Order schema

| Field | Type | Notes |
| --- | --- | --- |
| `customer` | String | Required |
| `packageSize` | String | Required |
| `status` | String | `Pending` (default), `In-Transit` or `Delivered` |
| `createdAt` | Date | Set automatically |

## API endpoints

| Method | Route | Description | Success | Errors |
| --- | --- | --- | --- | --- |
| GET | `/orders` | Get all orders | 200 | |
| POST | `/orders` | Create an order | 201 | 400 |
| PATCH | `/orders/:id` | Update an order's status | 200 | 400, 404 |
| DELETE | `/orders/:id` | Delete an order | 200 | 400, 404 |

Error responses are JSON, for example `{"error":"Order not found"}`.

## Testing with curl

**Get all orders**
```bash
curl http://localhost:5000/orders
```

**Create an order**
```bash
curl -X POST http://localhost:5000/orders \
  -H "Content-Type: application/json" \
  -d '{"customer":"Ali Khan","packageSize":"19L Bottle x 2"}'
```

**Update an order's status**
```bash
curl -X PATCH http://localhost:5000/orders/<id> \
  -H "Content-Type: application/json" \
  -d '{"status":"In-Transit"}'
```

**Delete an order**
```bash
curl -X DELETE http://localhost:5000/orders/<id>
```

Replace `<id>` with the `_id` from the create or get-all response.

### Example response (POST)

```json
{
  "_id": "6af3053b17a94dc2f91f244b",
  "customer": "Ali Khan",
  "packageSize": "19L Bottle x 2",
  "status": "Pending",
  "createdAt": "2026-11-10T11:51:23.619Z"
}
```

### Tested status codes

| Test | Result |
| --- | --- |
| POST with valid data | 201 |
| GET all orders | 200 |
| PATCH an existing order | 200 |
| DELETE an existing order | 200 |
| DELETE the same order again | 404 |
| DELETE with an invalid id | 400 |

## Project structure

Adjust this to match your folders:

```
src/
  models/Order     # Mongoose schema
  routes/orders    # CRUD routes
  server           # Express app and database connection
```

## What is not included yet

- Front-end connection and moving cards between columns (Task 3)
- Deployment (Task 3)
- Authentication and automated tests

## Author

Hussnain Iftikhar