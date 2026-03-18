# Dentist Appointment Scheduler

This repository hosts a full-stack Dentist Appointment Scheduler app.

- **Frontend:** React + Vite
- **Backend:** Express + MongoDB (Mongoose)

---

## 🚀 Getting Started

### 1) Backend (API)

From the `backend/` folder:

```bash
cd backend
npm install
npm run dev
```

This starts the API server on **http://localhost:5000** (unless `PORT` is set in `.env`).

### 2) Frontend

From the project root:

```bash
npm install
npm run dev
```

This starts the frontend on **http://localhost:5173** by default.

---

## 🔌 API Routes (Backend)

The backend exposes the following REST endpoints:

### Dentists

Base path: `GET/POST/PUT/DELETE http://localhost:5000/api/dentists`

#### List all dentists
- **GET** `/api/dentists`
- Response: `200` + array of dentist objects

#### Get a dentist by ID
- **GET** `/api/dentists/:id`
- Response: `200` + dentist object
- Errors: `404` if not found

#### Create a dentist
- **POST** `/api/dentists`
- Body (JSON):
  - `name` (string, required)
  - `photo` (string, required) – URL to image
  - `qualification` (string, required)
  - `experience` (number, required)
  - `clinicName` (string, required)
  - `address` (string, required)
  - `location` (string, required)
- Response: `201` + created dentist object

#### Update a dentist
- **PUT** `/api/dentists/:id`
- Body (JSON): any dentist fields to update
- Response: `200` + updated dentist object
- Errors: `404` if not found

#### Delete a dentist
- **DELETE** `/api/dentists/:id`
- Response: `204` (no content)
- Errors: `404` if not found

---

### Appointments

Base path: `GET/POST/PUT/DELETE http://localhost:5000/api/appointments`

#### List all appointments
- **GET** `/api/appointments`
- Response: `200` + array of appointments (each populates `dentist`)

#### Get an appointment by ID
- **GET** `/api/appointments/:id`
- Response: `200` + appointment object
- Errors: `404` if not found

#### Create an appointment
- **POST** `/api/appointments`
- Body (JSON):
  - `patientName` (string, required)
  - `age` (number, required)
  - `gender` (string, required; one of `Male`, `Female`, `Other`)
  - `appointmentDate` (ISO date string, required)
  - `dentist` (ObjectId of an existing dentist, required)
- Response: `201` + created appointment object
- Errors: `400` if the slot is already booked

#### Update an appointment
- **PUT** `/api/appointments/:id`
- Body (JSON): any appointment fields to update
- Response: `200` + updated appointment object
- Errors: `400` if updating would create a double-booked slot (same dentist/date)
- Errors: `404` if not found

#### Delete an appointment
- **DELETE** `/api/appointments/:id`
- Response: `204` (no content)
- Errors: `404` if not found

---

## 📦 Environment

Create a `.env` file in the `backend/` folder:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## 🧠 Notes

- The backend uses Mongoose for schema validation and population.
- Appointment routes populate the linked dentist document.
- The app uses simple JSON error responses (`{ message: '...' }`).
