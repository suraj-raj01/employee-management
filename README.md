# Employee Management System (NestJS)


---

## Features

- JWT based authentication (Login)
- Employee CRUD (Create, Read, Update, Delete)
- Google Maps integration (Address → Latitude & Longitude)
- Protected routes using Guards 

---

## Tech Stack

- Backend Framework: NestJS
- Database: PostgreSQL local
- ORM: TypeORM
- Authentication: Passport + JWT
- Maps: Google Maps Geocoding API
- Language: TypeScript

---

## clarify the folder structure
- /client -> frontend
- /employee-management -> backend

## Folder Structure for Backend (NestJS)
- This is folder structure where i have make all the APIs inside modules folder.

```bash
src/
├── app.module.ts
├── main.ts
│
├── config/
│   ├── database.config.ts
│   └── jwt.config.ts
│
├── common/
│   └── guards/
│       └── jwt-auth.guard.ts
│
├── modules/
│   ├── auth/
│   │   ├── dto/
│   │   │   └──login.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.module.ts
│   │   └── jwt.strategy.ts
│   │
│   ├── employee/
│   │   ├── dto/
│   │   │   ├── create-employee.dto.ts
│   │   │   └── update-employee.dto.ts
│   │   ├── employee.controller.ts
│   │   ├── employee.service.ts
│   │   ├── employee.module.ts
│   │   └── entities/employee.entity.ts
│   │
│   └── map/
│       ├── dto/
│       │   └── geocode.dto.ts
│       ├── map.module.ts
│       └── map.service.ts
│
├── utils/
│   └── password.util.ts
```

---

## Environment Variables

Create a .env file in the root directory:

```env

PORT=3000
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASS=employee
DB_NAME=employee_db

JWT_SECRET=mysecretkey
GOOGLE_MAPS_API_KEY=your_google_api_key

```

---

## Google Maps Integration

- Frontend sends **address** as a string
- Backend uses **Google Geocoding API**
- Latitude & Longitude are extracted and stored in DB

---

## Authentication Flow

1) User logs in using email & password
2) Server validates credentials
3) JWT token is generated
4) Token is required for protected routes 

---

## Sample API Endpoints

### Auth

- `POST /auth/login`

### Employee

- `POST /employees`
- `GET /employees`
- `GET /employees/:id`
- `PATCH /employees/:id`
- `DELETE /employees/:id`

(All employee routes are protected) -> 
### Note :
(I have comment the @UseGuards(JwtAuthGuard) in employee.controller.ts to apply the protected route please comment out it.)

---

## Run Project

```bash
npm install
npm run start:dev
```
---

# Frontend (Client)

## project setup
```bash
clone this repo
npm install
npm run dev

```
---

## UI SETUP

- display the all employee
- apply pagination with backend
- searching (name, designation)
- login (store token in local storage)
- CRUD UI
- FORM HANDLE for create and update employee
- Dashboard restriction (Without login user can not access dashboard)

---