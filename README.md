# Rentify Full Stack Web Application

## Overview

Rentify is a full-stack web application designed for property rentals. Users can register as either buyers or sellers. Buyers can view all properties listed by various sellers, while sellers have the ability to manage their own property listings, including adding, editing, and deleting properties.

## Features

- **User Authentication**: Register as a buyer or seller.
- **Property Listings**:
  - Buyers can view all properties.
  - Sellers can view, add, edit, and delete their own properties.
- **JWT Token Authentication** for secure login and logout.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Deployment**:
  - Frontend: Deployed on Netlify at [Rentify Frontend](https://rentify-mern-app.netlify.app)
  - Backend: Deployed on Render at [Rentify Backend](https://rentify-jf2q.onrender.com)

## Prerequisites

- Node.js installed on your local machine
- MongoDB instance running locally or a MongoDB Atlas account

## Getting Started

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Rentify/backend
   ```

2. Create a `config.env` file in the `backend/config` directory with the following contents:
   ```plaintext
   PORT=4000
   MONGO_URI=<your_mongo_uri>
   JWT_COOKIE_EXPIRE=10
   JWT_SECRET=<secret_value>
   FRONTEND_URL=http://localhost:5173
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend should be running on [http://localhost:4000](http://localhost:4000).

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Rentify/frontend
   ```

2. Create a `.env` file in the `frontend` directory with the following content:
   ```plaintext
   VITE_BASE_URL=http://localhost:4000
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the frontend server:
   ```bash
   npm run dev
   ```

   The frontend should be running on [http://localhost:5173](http://localhost:5173).

## Sample Credentials

Use the following sample credentials to log in as a buyer or seller:

### Buyer

- **Email**: buyer.test@gmail.com
- **Password**: buyertest123

### Seller

- **Email**: seller.test@gmail.com
- **Password**: sellertest123

## Running the Project

1. Ensure that both the backend and frontend servers are running.
2. Open your browser and navigate to [http://localhost:5173](http://localhost:5173).
3. Use the provided sample credentials to log in and explore the application.

## Contact

For any questions or issues, please contact the project maintainer.

---

Enjoy using Rentify!