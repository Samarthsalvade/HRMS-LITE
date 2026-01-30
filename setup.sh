#!/bin/bash

echo "🚀 Setting up HRMS Lite..."

# Backend setup
echo "📦 Setting up backend..."
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your database credentials"
fi

cd ..

# Frontend setup
echo "📦 Setting up frontend..."
cd frontend

# Install dependencies
npm install

# Create .env if it doesn't exist
if [ ! -f .env ]; then
    cp .env.example .env
    echo "⚠️  Please update frontend/.env with your backend URL"
fi

cd ..

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your PostgreSQL credentials"
echo "2. Create database: CREATE DATABASE hrms_lite;"
echo "3. Start backend: cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "Backend will run on: http://localhost:8000"
echo "Frontend will run on: http://localhost:3000"
