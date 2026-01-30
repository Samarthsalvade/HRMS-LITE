from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from sqlalchemy import func
from typing import List

from database import get_db
from models import Employee, Attendance, AttendanceStatus
import schemas

router = APIRouter()


@router.post("/", response_model=schemas.Employee, status_code=status.HTTP_201_CREATED)
def create_employee(employee: schemas.EmployeeCreate, db: Session = Depends(get_db)):
    """Create a new employee"""
    
    # Check if employee_id already exists
    existing_employee = db.query(Employee).filter(
        Employee.employee_id == employee.employee_id
    ).first()
    
    if existing_employee:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Employee ID '{employee.employee_id}' already exists"
        )
    
    # Check if email already exists
    existing_email = db.query(Employee).filter(
        Employee.email == employee.email
    ).first()
    
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Email '{employee.email}' already exists"
        )
    
    try:
        db_employee = Employee(**employee.model_dump())
        db.add(db_employee)
        db.commit()
        db.refresh(db_employee)
        return db_employee
    except IntegrityError as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error creating employee. Please check your input."
        )


@router.get("/", response_model=List[schemas.EmployeeWithStats])
def get_employees(db: Session = Depends(get_db)):
    """Get all employees with attendance statistics"""
    
    employees = db.query(Employee).all()
    
    result = []
    for employee in employees:
        # Count present days
        present_days = db.query(func.count(Attendance.id)).filter(
            Attendance.employee_id == employee.id,
            Attendance.status == AttendanceStatus.PRESENT
        ).scalar()
        
        employee_dict = {
            "id": employee.id,
            "employee_id": employee.employee_id,
            "full_name": employee.full_name,
            "email": employee.email,
            "department": employee.department,
            "total_present_days": present_days or 0
        }
        result.append(employee_dict)
    
    return result


@router.get("/{employee_id}", response_model=schemas.EmployeeWithStats)
def get_employee(employee_id: int, db: Session = Depends(get_db)):
    """Get a specific employee by ID"""
    
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    
    # Count present days
    present_days = db.query(func.count(Attendance.id)).filter(
        Attendance.employee_id == employee.id,
        Attendance.status == AttendanceStatus.PRESENT
    ).scalar()
    
    return {
        "id": employee.id,
        "employee_id": employee.employee_id,
        "full_name": employee.full_name,
        "email": employee.email,
        "department": employee.department,
        "total_present_days": present_days or 0
    }


@router.delete("/{employee_id}", response_model=schemas.Message)
def delete_employee(employee_id: int, db: Session = Depends(get_db)):
    """Delete an employee"""
    
    employee = db.query(Employee).filter(Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {employee_id} not found"
        )
    
    try:
        db.delete(employee)
        db.commit()
        return {"message": f"Employee '{employee.full_name}' deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error deleting employee"
        )
