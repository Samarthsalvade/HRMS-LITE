# HRMS-LITE
HRMS Lite
HRMS Lite is a full-stack Human Resource Management System designed for fast and efficient management of employees and attendance. Built using FastAPI for the backend and React for the frontend, the application is production-ready, fully documented, and easily deployable.
Table of Contents
Features
Technology Stack
Project Structure
Setup & Installation
Backend Details
Frontend Details
Deployment
Code Quality
Testing
Documentation
Contribution
License
Features
Employee Management
Add, update, view, and delete employee records
View employee statistics such as present days
Attendance Tracking
Mark attendance daily
Filter attendance by employee and date
View detailed attendance records
Dashboard
Statistics overview
Welcome section
Reusable Components
Modal dialog
Layout wrapper
Responsive UI
Clean and minimal design
Active route highlighting
Deployment Ready
Dockerized backend
Vercel-ready frontend
Environment-based configuration
Technology Stack
Backend
Language: Python 3.11
Framework: FastAPI 0.109
Database: PostgreSQL
ORM: SQLAlchemy 2.0
Validation: Pydantic 2.5
Server: Uvicorn
Frontend
Language: JavaScript (ES6+)
Framework: React 18
Router: React Router DOM v6
HTTP Client: Axios 1.6
Styling: Pure CSS
Build Tool: Vite 5
DevOps
Backend Deployment: Render / Railway
Frontend Deployment: Vercel / Netlify
Containerization: Docker
Version Control: Git / GitHub
Project Structure
hrms-lite/
│
├── backend/          # FastAPI backend
├── frontend/         # React frontend
├── README.md         # Project documentation
├── DEPLOYMENT.md     # Deployment guide
├── SUBMISSION.md     # Submission checklist
├── setup.sh          # Linux/Mac setup script
└── setup.bat         # Windows setup script
Backend and frontend have their own README.md with specific setup and usage instructions.
.env.example files provide templates for environment configuration.
Setup & Installation
Prerequisites
Node.js 18+
Python 3.11+
PostgreSQL
Git
Backend
Navigate to the backend directory:
cd backend
Install dependencies:
pip install -r requirements.txt
Set up environment variables:
cp .env.example .env
Start the server:
uvicorn main:app --reload
Frontend
Navigate to the frontend directory:
cd frontend
Install dependencies:
npm install
Set up environment variables:
cp .env.example .env
Start the frontend:
npm run dev
Backend Details
Core Files
main.py – FastAPI app setup, CORS, routes, health check
database.py – Database connection and session management
models.py – Employee and Attendance ORM models
schemas.py – Pydantic validation schemas
API Routes
routers/employees.py – Employee CRUD operations
routers/attendance.py – Attendance management
Configuration
requirements.txt – Python dependencies
.env.example – Environment variable template
Dockerfile – Docker configuration
render.yaml – Render deployment config
Frontend Details
Core Files
main.jsx – React application entry point
App.jsx – App component with routing
index.css – Global styles
Components
Layout.jsx – Navigation bar, layout wrapper, footer
Modal.jsx – Reusable modal component
Pages
Dashboard.jsx – Overview and statistics
Employees.jsx – Employee management page
Attendance.jsx – Attendance tracking page
Services
api.js – Axios API client with all backend endpoints
Configuration
package.json – NPM dependencies and scripts
vite.config.js – Vite build config
vercel.json – Vercel SPA routing config
Deployment
Backend: Docker + Render / Railway
Frontend: Vercel / Netlify
Database: PostgreSQL hosted on Render
Deployment guides are included in DEPLOYMENT.md.
Code Quality
Type hints for Python
Proper HTTP status codes and error handling
Data validation using Pydantic
SQL injection prevention using ORM
Component-based, reusable React architecture
Loading states and error boundaries
Testing
Manual testing scenarios included
Input validation and edge case handling
Empty and loading state handling
Automated tests are not included due to time constraints.
Documentation
Comprehensive project README
Backend & frontend specific documentation
Deployment instructions
Troubleshooting guide
Submission checklist
Contribution
Contributions, bug reports, and feature requests are welcome!
Please fork the repository and create a pull request.
License
This project is open-source and available under the MIT License.
