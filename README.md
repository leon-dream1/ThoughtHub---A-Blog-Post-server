# 📝 Blog Platform Backend

A secure, scalable RESTful API for a blogging platform featuring role-based access control (RBAC), built with **TypeScript**, **Node.js**, and **MongoDB**.

---

## 🚀 Features

### **1. User Roles & Permissions**
- **User:**
  - Register and Login.
  - Create, Update, and Delete their own blogs.
- **Admin:**
  - Block users (stops them from creating/modifying content).
  - Delete **any** blog post for moderation.
  - *Note: Admins cannot update blogs.*

### **2. Public Blog API**
- Search blogs by **Title** or **Content**.
- Sort blogs by specific fields (e.g., `createdAt`, `title`).
- Filter blogs by **Author ID**.
- Supports `asc` and `desc` sorting orders.

### **3. Security & Validation**
- **JWT Authentication:** Secure login system using JSON Web Tokens.
- **Bcrypt:** Password hashing to ensure data security.
- **Zod Validation:** Strict request body validation for all endpoints.
- **Role Guards:** Middleware to protect routes based on user roles.

---

## 🛠️ Tech Stack

- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [Express.js](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Validation:** [Zod](https://zod.dev/)
- **Auth:** JWT (JSON Web Token)

---

## 🚦 API Endpoints

### **Authentication**
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate user & get token |

### **Blog Management**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/blogs` | User | Create a blog |
| `GET` | `/api/blogs` | Public | Get all blogs (Search/Sort/Filter) |
| `PATCH` | `/api/blogs/:id` | User | Update own blog |
| `DELETE` | `/api/blogs/:id` | User | Delete own blog |

### **Admin Actions**
| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `PATCH` | `/api/admin/users/:userId/block` | Admin | Block a user |
| `DELETE` | `/api/admin/blogs/:id` | Admin | Delete any blog |

---

## ⚙️ Installation & Setup

1. **Clone the Project:**
   ```bash
   git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
   cd your-repo-name
   ```bash

2. **Install Dependencies:**
   ```bash
   npm install
   ```bash

3. **Environment Configuration: Create a .env file in the root directory and add:**
   ```bash
   PORT=5000
   DATABASE_URL=your_mongodb_uri
   JWT_ACCESS_SECRET=your_jwt_secret
   NODE_ENV=development
   ```bash

4. **Run the Application:**
   ```bash
   # Development mode
     npm run dev

  # Build for production
     npm run build
   ```bash


---

## ⚠️ Error Handling

The API implements a centralized error-handling mechanism to ensure consistent responses. Each error response follows a standard structure, providing clarity for debugging.

### **Error Response Structure**
```json
{
  "success": false,
  "message": "Error message describing the issue",
  "statusCode": 400,
  "error": { "details": "Additional error info" },
  "stack": "Error stack trace (visible only in development)"
}