
# 📚 Book Borrowing API

A Node.js + Express + MongoDB RESTful API for managing books and borrowing records. It supports book creation, listing, deletion, borrowing, and summary reporting.

## 🔴 Live Server

URL: https://mongoose-assignment3-server.vercel.app/

## ⚙️ Technologies Used

- Node.js

- Express.js

- TypeScript

- MongoDB with Mongoose

- dotenv (for secure environment variables)

- Postman (for testing)
## 📦 Installation & Setup

**1. Clone the repository**

```bash
git clone https://github.com/yeaminfoysal/Express_Mongoose_Assignment3
```

**2. Install dependencies**
```bash
npm install
```
**3. Configure environment variables**

Create a `.env` file in the root directory:
```bash
DB_USER=todosDB

DB_PASS=2QJNzR5O2ig7VBLO
```
## 🚀 Running the Server
```bash
npm run dev
```
Server will run on: http://localhost:3000

## 📂 Project Structure
```bash
src/app
    ├── models/
    ├── routes/
    ├── controllers/
    ├── interfaces/
    ├── app.ts
    ├── server.ts
    └── .env
```
## 📡 API Endpoints
**✅ POST  /api/books**

Create a new book.

*Body:*
```bash
{
  "title": "1984",
  "author": "George Orwell",
  "genre": "FICTION",
  "isbn": "9780451524935",
  "description": "Dystopian novel",
  "copies": 5
}
```

**✅ GET /api/books**

Get a list of books (with optional filters)

*Query Parameters:*

- ``` filter=FICTION ```

- ```sort=asc|desc ```

- ```sortBy=title|copies```

- ``` limit=10```

**✅ DELETE /api/books/:bookId**

Delete a book by ID.

**✅ PATCH /api/books/:bookId**

Update a book by ID.

```bash
{
  "copies": 50
}
```

**✅ POST /api/borrow**

Borrow a book.

*Body:*

```bash
{
  "book": "64ab3f9e2a4b5c6d7e8f9012",
  "quantity": 2,
  "dueDate": "2025-07-18T00:00:00.000Z"
}
```
Validations:
- Book must exist

- Quantity must be ≤ available copies

- Copies will decrease; availability updates automatically

**✅ GET /api/borrow**

Get summary of borrowed books using aggregation.

*Response:*

```bash
{
  "success": true,
  "message": "Borrowed books summary retrieved successfully",
  "data": [
    {
      "book": {
        "title": "The Theory of Everything",
        "isbn": "9780553380163"
      },
      "totalQuantity": 5
    }
  ]
}
```
## 🔐 Security

- Secrets managed with `.env`

- MongoDB credentials never hardcoded
## 📬 Contact

For any questions or feedback, contact yeaminfoysal14@gmail.com