# HRMS Lite Backend

FastAPI backend for the HRMS Lite application.

## Tech Stack

- **Framework**: FastAPI
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **Server**: Uvicorn

## Setup

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update database URL in `.env`:
```
DATABASE_URL=postgresql://username:password@localhost:5432/hrms_lite
```

5. Create database:
```sql
CREATE DATABASE hrms_lite;
```

6. Run the application:
```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Documentation

Once running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Database Schema

### Employees Table
- `id` (Primary Key)
- `employee_id` (Unique)
- `full_name`
- `email` (Unique)
- `department`

### Attendance Table
- `id` (Primary Key)
- `employee_id` (Foreign Key)
- `date`
- `status` (Present/Absent)

## Endpoints

### Employees
- `GET /api/employees` - List all employees
- `GET /api/employees/{id}` - Get employee details
- `POST /api/employees` - Create employee
- `DELETE /api/employees/{id}` - Delete employee

### Attendance
- `GET /api/attendance` - List attendance records
- `GET /api/attendance/{id}` - Get attendance details
- `POST /api/attendance` - Mark attendance
- `DELETE /api/attendance/{id}` - Delete attendance

## Deployment

### Using Docker:
```bash
docker build -t hrms-backend .
docker run -p 8000:8000 -e DATABASE_URL="your_db_url" hrms-backend
```

### Using Render/Railway:
1. Connect GitHub repository
2. Set environment variables
3. Deploy
