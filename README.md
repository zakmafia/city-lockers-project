# 📦 City Lockers – Storage Unit Booking System

**City Lockers** is a full-stack booking system that allows users to view, filter, and reserve storage units while preventing booking conflicts. Users can create and manage storage units through a simple and intuitive interface.

---

## 🚀 Features

- 🔍 Filter units by location and size
- 🗓 Book units for a custom date range
- ❌ Prevents overlapping (double) bookings
- 📋 View all bookings or search by user
- ➕ Create storage units
- 🧼 Clean, responsive UI built with Tailwind CSS
- 🔒 RESTful API with validations and error handling

---

## 🧱 Tech Stack

| Layer       | Tech                         |
|-------------|------------------------------|
| Frontend    | Next.js (App Router), React, Tailwind CSS |
| Backend     | Node.js, Express.js          |
| ORM         | Prisma                       |
| Database    | PostgreSQL                   |

--- Steps

### 1. Clone the repo
(https://github.com/zakmafia/city-lockers-project.git)
cd city-lockers

### 2. Set up the backend
cd backend
npm install

### 3. Create a .env file in backend/
DATABASE_URL="postgresql://username:password@localhost:5432/citylockers" (create postgresql database named citylockers)

### 4. Run Prisma Migrate in backend/
npx prisma migrate dev --name init
node index.js

"Backend runs on http://localhost:4000"

### 5. Set up the frontend
cd ../frontend
npm install

### 6. Create a .env.local file in frontend/
NEXT_PUBLIC_BACKEND_URL=http://localhost:4000

### 7. Start the frontend
npm run dev

"Frontend runs on http://localhost:3000"

---

🌐 Accessing the App

Home: / – View & filter units

Book: /book – Select unit & date range

My Bookings: /my-bookings?userName=John – View your bookings

Units: /create-unit – Add new units

---

👨‍💻 Developed By
Zekarias Mesfin Biru
Full-Stack Software Developer 
📫 LinkedIn • GitHub • Portfolio




