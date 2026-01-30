🚀 HRMS Lite
HRMS Lite is a full-stack Human Resource Management System for managing employees and attendance efficiently. Built with FastAPI 🐍 for the backend and React ⚛️ for the frontend, it’s production-ready, deployable, and developer-friendly.
📋 Table of Contents
✨ Features
🛠️ Technology Stack
📂 Project Structure
⚡ Setup & Installation
🖥️ Backend Details
🎨 Frontend Details
☁️ Deployment
✅ Code Quality
🧪 Testing
📚 Documentation
🤝 Contribution
📄 License
✨ Features
👥 Employee Management
Add, view, update, delete employees
Track present days
🕒 Attendance Tracking
Mark daily attendance
Filter by employee & date
View detailed records
📊 Dashboard
Quick overview of statistics
Welcome & info cards
🧩 Reusable Components
Modal dialogs
Layout wrapper
📱 Responsive UI
Clean, minimal, and professional
🚀 Deployment Ready
Dockerized backend
Vercel-ready frontend
Env-based configuration
🛠️ Technology Stack
Backend
🐍 Python 3.11
⚡ FastAPI 0.109
🗄️ PostgreSQL
🛠️ SQLAlchemy 2.0
📦 Pydantic 2.5
🚀 Uvicorn
Frontend
⚛️ React 18
🌐 React Router DOM v6
💻 Axios 1.6
🎨 Pure CSS
🛠️ Vite 5
DevOps
☁️ Render / Railway (backend)
☁️ Vercel / Netlify (frontend)
🐳 Docker
🔗 Git / GitHub
📂 Project Structure
hrms-lite/
│
├── backend/          # FastAPI backend 🐍
├── frontend/         # React frontend ⚛️
├── README.md         # Project docs 📄
├── DEPLOYMENT.md     # Deployment guide ☁️
├── SUBMISSION.md     # Submission checklist ✅
├── setup.sh          # Linux/Mac setup ⚡
└── setup.bat         # Windows setup ⚡
Backend & frontend have their own README.md for detailed setup.
.env.example templates included for environment variables 🔑.
⚡ Setup & Installation
Prerequisites
Node.js 18+ 🟢
Python 3.11+ 🐍
PostgreSQL 🗄️
Git 🔗
Backend
cd backend
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
Frontend
cd frontend
npm install
cp .env.example .env
npm run dev
🖥️ Backend Details
Core Files
main.py – App setup, routes, CORS ⚡
database.py – DB connection & session management 🗄️
models.py – Employee & Attendance ORM models 👥🕒
schemas.py – Pydantic validation schemas ✅
API Routes
routers/employees.py – Employee CRUD
routers/attendance.py – Attendance management
Config
requirements.txt – Dependencies 📦
.env.example – Environment template 🔑
Dockerfile – Container setup 🐳
render.yaml – Render deployment ☁️
🎨 Frontend Details
Core Files
main.jsx – App entry point ⚛️
App.jsx – Routing & pages 🛣️
index.css – Global styles 🎨
Components
Layout.jsx – Navigation & layout 🧩
Modal.jsx – Reusable modal 💬
Pages
Dashboard.jsx – Overview & stats 📊
Employees.jsx – Employee management 👥
Attendance.jsx – Attendance tracking 🕒
Services
api.js – Axios API client 💻
Config
package.json – Dependencies & scripts 📦
vite.config.js – Build setup 🛠️
vercel.json – SPA routing ⚡
☁️ Deployment
Backend: Docker + Render / Railway 🐳☁️
Frontend: Vercel / Netlify ⚡☁️
Database: PostgreSQL 🗄️
Full deployment guide in DEPLOYMENT.md.
✅ Code Quality
Type hints & Pydantic validation 🐍✅
Proper HTTP status codes & error handling ⚡
SQL injection prevention with ORM 🔒
Reusable React components ⚛️🧩
Loading & error states handled ⏳❌
🧪 Testing
Manual scenarios included ✅
Input validation & edge cases handled ✔️
Loading & empty state handling 🕒⚠️
Automated tests are not included due to time constraints.
📚 Documentation
Full README & backend/frontend docs 📄
Deployment instructions ☁️
Troubleshooting guide 🔧
Submission checklist ✅
🤝 Contribution
Contributions, bug reports, and feature requests are welcome!
Fork the repo and create a pull request 🌟.
📄 License
Open-source under the MIT License 📝
