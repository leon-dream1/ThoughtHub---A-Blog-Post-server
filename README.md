<!-- # Car Store Backend

A backend application for managing car listings, built with TypeScript, Express.js, MongoDB, and Zod. This project uses the modular pattern for better scalability and maintainability.

# Features of the Car Store Backend Project

- Add new car entries with complete details such as brand, model, year, price, category, description, quantity, and stock status.
- Fetch all car listings stored in the database, including detailed information like price, category, availability, and more.
- Fetch details of a specific car by its unique identifier (carId).
- Update car details (e.g., price, quantity) based on its ID.
- Permanently remove a car entry from the database using its ID
- Customers can place an order for a car by providing their email, car ID, quantity, and total price.
- Provides the total revenue generated from all car orders.
- Codebase is organized into modules such as routes, controllers, services, models, and utils for better maintainability and scalability.
- Strongly-typed backend application ensuring fewer runtime errors and robust type-checking during development.
- Input validation using Zod for requests such as car creation, updates, and order placement.
- Efficient data storage and retrieval using Mongoose as the ODM for MongoDB.

# Prerequisites

Ensure you have the following installed on your local system:

- Node.js (v16 or above)
- npm (v8 or above)
- MongoDB (Running locally or a cloud instance like MongoDB Atlas)

# Getting Started

Follow these steps to set up and run the project locally:

# 1. Clone the Repository

```
git clone https://github.com/leon-dream1/car-store-backend.git
cd car-store-backend
```

# 2. Install Dependencies

Install all required dependencies using npm:

```
npm install

```

# 2. Configure Environment Variables

Create a .env file in the root directory and add the following environment variables:

```
PORT=5000
DATABASE_URL=your-mongodb-connection-string
```

Replace your-mongodb-connection-string with the connection URI for your MongoDB instance.

# 3. Run the Project

```
npm run start:dev

``` -->
