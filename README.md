# CCC backend task 3 Job Portal Backend API

A complete backend service for a Job Portal application built with **Node.js**, **Express.js**, **PostgreSQL**, and **Redis**. 

This system allows job seekers (candidates) to search and apply for jobs, companies to post and manage job listings, and administrators to manage the platform.

---

## Features

- **Authentication & Security**
  - User registration and login (Candidates, Companies, and Admins).
  - Secure passwords using `bcryptjs`.
  - Token-based authorization using **JWT** (JSON Web Tokens) and cookies.
  - Security headers using `helmet` and API rate limiting using `express-rate-limit`.

- **Candidate Features**
  - Create and update candidate profiles.
  - Upload resumes and avatar images using **ImageKit**.
  - Browse available job listings.
  - Apply for jobs and view application history.

- **Company Features**
  - Create and manage company profile and logo.
  - Post new job listings, update existing job posts, or close job openings.
  - View candidates who applied for posted jobs and update their application status (Accepted, Rejected, Pending).

- **Job Listings**
  - Search, filter, and view details of jobs.
  - Fast response times with **Redis** caching for popular job searches.

- **Admin Features**
  - Manage users, companies, jobs, and job applications across the portal.

- **API Documentation**
  - Built-in interactive **Swagger UI** for testing all API endpoints.

---

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Caching**: Redis
- **File Storage**: ImageKit
- **Security & Auth**: JWT, bcryptjs, Helmet, CORS, Cookie Parser
- **API Docs**: Swagger UI (`swagger-ui-express`)

---

## 📋 Prerequisites

Make sure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) database
- [Redis](https://redis.io/) server

---

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/Siddharth01-tech/CCC-Backend-task-3.git
cd job_portal_backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory (you can copy `.env.example`):

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

JWT_SECRET=your_jwt_secret_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
REDIS_URL=redis://localhost:6379
```

### 4. Database Setup
Set up the database schema in PostgreSQL:
```bash
psql -U your_db_user -d your_db_name -f database/schema.sql
```

---

## 🏃 Running the Application

### Development Mode (with automatic reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will start running on `http://localhost:5000` (or the port specified in your `.env` file).

---

## 📚 API Documentation

Once the server is running, open your browser and navigate to:
```
http://localhost:5000/api-docs
```
Here you can explore and test all available API endpoints interactively.

---

## 📁 Key API Routes

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/jobs` - Get job listings
- `POST /api/jobs` - Post a new job (Companies only)
- `POST /api/applications` - Apply for a job (Candidates only)
- `GET /api/candidates/profile` - Get candidate profile
- `GET /api/companies/profile` - Get company profile
- `GET /api/admin` - Admin operations

---

## 📜 License

This project is licensed under the ISC License.
