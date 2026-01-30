@echo off
echo Setting up HRMS Lite...

REM Backend setup
echo Setting up backend...
cd backend

REM Create virtual environment
python -m venv venv
call venv\Scripts\activate.bat

REM Install dependencies
pip install -r requirements.txt

REM Create .env if it doesn't exist
if not exist .env (
    copy .env.example .env
    echo Please update backend\.env with your database credentials
)

cd ..

REM Frontend setup
echo Setting up frontend...
cd frontend

REM Install dependencies
call npm install

REM Create .env if it doesn't exist
if not exist .env (
    copy .env.example .env
    echo Please update frontend\.env with your backend URL
)

cd ..

echo Setup complete!
echo.
echo Next steps:
echo 1. Update backend\.env with your PostgreSQL credentials
echo 2. Create database: CREATE DATABASE hrms_lite;
echo 3. Start backend: cd backend ^&^& venv\Scripts\activate ^&^& uvicorn main:app --reload
echo 4. Start frontend: cd frontend ^&^& npm run dev
echo.
echo Backend will run on: http://localhost:8000
echo Frontend will run on: http://localhost:3000

pause
