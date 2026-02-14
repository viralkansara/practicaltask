# Practical Task - Full Stack Application

This project contains a **Frontend** built with **React** and a **Backend** built with **Node.js**, using **MySQL** database.

---

## Project Structure

```
practicaltask/
├── backend/    # Node.js + Express API
└── frontend/   # React Application
```

---

## Prerequisites

- **Node.js** (v18 or higher)
- **MySQL** (v8 or higher)

---

## Setup Instructions

### 1. Database Setup

Create a MySQL database:

```sql
-- Login to MySQL
mysql -u root -p

-- Create database
CREATE DATABASE practical_task;

-- Exit
EXIT;
```

---

### 2. Backend Setup

#### Step 1: Navigate to backend folder
```bash
cd backend
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Configure database connection

Create a `.env` file in the `backend` folder (copy from `.env.example`):

```env
PORT=5000
SALT_ROUNDS=10
JWT_SECRET_KEY="viralKansara"
DATABASE_NAME="practicaltask"
DATABASE_USER="root"
DATABASE_PASSWORD="yourpassowed"
DATABASE_HOST_NAME="localhost"
DATABASE_PORT=3306
```

**Note:** Update `DATABASE_PASSWORD` with your MySQL root password.

#### Step 4: Run backend server
```bash
npm run dev
```

Backend will run on: **http://localhost:5000**

---

### 3. Frontend Setup

#### Step 1: Navigate to frontend folder
```bash
cd frontend
```

#### Step 2: Install dependencies
```bash
npm install
```

#### Step 3: Run frontend server
```bash
npm run dev
```

Frontend will run on: **http://localhost:3000**

---

## How to Run the Application

1. **Start MySQL service**
2. **Run Backend** (Terminal 1):
   ```bash
   cd backend
   npm run dev
   ```
3. **Run Frontend** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
4. **Open browser** and go to: `http://localhost:3000`

---
