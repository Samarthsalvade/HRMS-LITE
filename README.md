# 🚀 HRMS Lite

**HRMS Lite** is a **full-stack Human Resource Management System** for managing employees and attendance efficiently.  
Built with **FastAPI** 🐍 for the backend and **React** ⚛️ for the frontend, it’s **production-ready**, **deployable**, and **developer-friendly**.

---

## 📋 Table of Contents
- ✨ Features
- 🛠️ Technology Stack
- 📂 Project Structure
- ⚡ Setup & Installation
- 🖥️ Backend Details
- 🎨 Frontend Details
- ☁️ Deployment
- ✅ Code Quality
- 🧪 Testing
- 📚 Documentation
- 🤝 Contribution
- 📄 License

---

## ✨ Features
- 👥 **Employee Management**
  - Add, view, update, delete employees
  - Track present days
- 🕒 **Attendance Tracking**
  - Mark daily attendance
  - Filter by employee & date
  - View detailed records
- 📊 **Dashboard**
  - Quick overview of statistics
  - Welcome & info cards
- 🧩 **Reusable Components**
  - Modal dialogs
  - Layout wrapper
- 📱 **Responsive UI**
  - Clean, minimal, and professional
- 🚀 **Deployment Ready**
  - Dockerized backend
  - Vercel-ready frontend
  - Env-based configuration

---

## 🛠️ Technology Stack

### Backend
- 🐍 Python 3.11
- ⚡ FastAPI 0.109
- 🗄️ PostgreSQL
- 🛠️ SQLAlchemy 2.0
- 📦 Pydantic 2.5
- 🚀 Uvicorn

### Frontend
- ⚛️ React 18
- 🌐 React Router DOM v6
- 💻 Axios 1.6
- 🎨 Pure CSS
- 🛠️ Vite 5

### DevOps
- ☁️ Render / Railway (Backend)
- ☁️ Vercel / Netlify (Frontend)
- 🐳 Docker
- 🔗 Git / GitHub

---

## 📂 Project Structure
hrms-lite/
│
├── backend/ # FastAPI backend 🐍
├── frontend/ # React frontend ⚛️
├── README.md # Project docs 📄
├── DEPLOYMENT.md # Deployment guide ☁️
├── SUBMISSION.md # Submission checklist ✅
├── setup.sh # Linux/Mac setup ⚡
└── setup.bat # Windows setup ⚡



---

## ⚡ Setup & Installation

### Prerequisites
- Node.js 18+ 🟢
- Python 3.11+ 🐍
- PostgreSQL 🗄️
- Git 🔗

### Backend Setup

-cd backend
-pip install -r requirements.txt
-cp .env
-uvicorn main:app --reload

### Frontend Setup
-cd frontend
-npm install
-cp .env
-npm run dev

## 🖥️ Backend Details

### Core Files
- `main.py`
  - FastAPI app setup
  - CORS middleware
  - Route inclusion
  - Health check endpoint ⚡

- `database.py`
  - PostgreSQL connection
  - Session management 🗄️

- `models.py`
  - Employee model 👥
  - Attendance model 🕒
  - Relationships & enums

- `schemas.py`
  - Pydantic validation schemas ✅
  - Request & response models

### API Routes
- `routers/employees.py`
  - Create employee
  - List employees
  - Get employee by ID
  - Delete employee
  - Present days calculation

- `routers/attendance.py`
  - Mark attendance
  - List attendance (filters supported)
  - Get attendance by ID
  - Delete attendance

### Configuration
- `requirements.txt` – Python dependencies 📦
- `.env` – Environment variable template 🔑
- `Dockerfile` – Docker container setup 🐳
- `render.yaml` – Render deployment config ☁️

---

## 🎨 Frontend Details

### Core Files
- `main.jsx`
  - React application entry point ⚛️

- `App.jsx`
  - Routing configuration
  - Page-level layout 🛣️

- `index.css`
  - Global styles
  - CSS variables 🎨

### Components
- `Layout.jsx`
  - Navigation bar
  - Page wrapper
  - Footer
  - Active route highlighting 🧩

- `Modal.jsx`
  - Reusable modal dialog 💬
  - Escape key handling
  - Click-outside-to-close

### Pages
- `Dashboard.jsx`
  - Statistics cards 📊
  - API data fetching
  - Loading states

- `Employees.jsx`
  - Employee table 👥
  - Add employee modal
  - Delete confirmation
  - Form validation

- `Attendance.jsx`
  - Attendance records 🕒
  - Filters (date & employee)
  - Mark attendance modal

### Services
- `api.js`
  - Axios instance 💻
  - Centralized API calls
  - Base URL configuration

### Configuration
- `package.json` – NPM dependencies & scripts 📦
- `vite.config.js` – Vite build configuration 🛠️
- `vercel.json` – SPA routing & deployment ⚡

---

## ☁️ Deployment
- Backend: Docker + Render / Railway 🐳☁️
- Frontend: Vercel / Netlify ⚡☁️
- Database: PostgreSQL 🗄️

📘 Refer to `DEPLOYMENT.md` for full deployment steps.

---

## ✅ Code Quality
- Strong typing & validation 🐍✅
- Proper HTTP status codes ⚡
- ORM-based SQL injection protection 🔒
- Reusable, clean React components ⚛️
- Loading & error states handled gracefully ⏳

---

## 🧪 Testing
- Manual testing scenarios included ✅
- Input validation & edge cases ✔️
- Empty & loading state handling ⚠️

---

## 📚 Documentation
- Comprehensive README 📄
- Backend & frontend docs 📘
- Deployment guide ☁️
- Submission checklist ✅

---

## 🤝 Contribution
Contributions are welcome!  
Fork the repository and open a pull request 🌟

---

## 📄 License
Licensed under the **MIT License** 📝




