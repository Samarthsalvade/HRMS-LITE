from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import List, Optional
from datetime import date

from database import get_db
from models import Attendance, Employee
import schemas

router = APIRouter()


@router.post("/", response_model=schemas.Attendance, status_code=status.HTTP_201_CREATED)
def mark_attendance(attendance: schemas.AttendanceCreate, db: Session = Depends(get_db)):
    """Mark attendance for an employee"""
    
    # Check if employee exists
    employee = db.query(Employee).filter(Employee.id == attendance.employee_id).first()
    
    if not employee:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Employee with ID {attendance.employee_id} not found"
        )
    
    # Check if attendance already exists for this date
    existing_attendance = db.query(Attendance).filter(
        Attendance.employee_id == attendance.employee_id,
        Attendance.date == attendance.date
    ).first()
    
    if existing_attendance:
        # Update existing attendance
        existing_attendance.status = attendance.status
        db.commit()
        db.refresh(existing_attendance)
        return existing_attendance
    
    try:
        db_attendance = Attendance(**attendance.model_dump())
        db.add(db_attendance)
        db.commit()
        db.refresh(db_attendance)
        return db_attendance
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Error marking attendance"
        )


@router.get("/", response_model=List[schemas.AttendanceWithEmployee])
def get_attendance_records(
    employee_id: Optional[int] = Query(None, description="Filter by employee ID"),
    date_from: Optional[date] = Query(None, description="Filter from date"),
    date_to: Optional[date] = Query(None, description="Filter to date"),
    db: Session = Depends(get_db)
):
    """Get attendance records with optional filters"""
    
    query = db.query(Attendance)
    
    if employee_id:
        # Verify employee exists
        employee = db.query(Employee).filter(Employee.id == employee_id).first()
        if not employee:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Employee with ID {employee_id} not found"
            )
        query = query.filter(Attendance.employee_id == employee_id)
    
    if date_from:
        query = query.filter(Attendance.date >= date_from)
    
    if date_to:
        query = query.filter(Attendance.date <= date_to)
    
    attendance_records = query.order_by(Attendance.date.desc()).all()
    
    # Build response with employee details
    result = []
    for record in attendance_records:
        result.append({
            "id": record.id,
            "employee_id": record.employee_id,
            "date": record.date,
            "status": record.status,
            "employee": {
                "id": record.employee.id,
                "employee_id": record.employee.employee_id,
                "full_name": record.employee.full_name,
                "email": record.employee.email,
                "department": record.employee.department
            }
        })
    
    return result


@router.get("/{attendance_id}", response_model=schemas.AttendanceWithEmployee)
def get_attendance(attendance_id: int, db: Session = Depends(get_db)):
    """Get a specific attendance record"""
    
    attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    
    if not attendance:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Attendance record with ID {attendance_id} not found"
        )
    
    return {
        "id": attendance.id,
        "employee_id": attendance.employee_id,
        "date": attendance.date,
        "status": attendance.status,
        "employee": {
            "id": attendance.employee.id,
            "employee_id": attendance.employee.employee_id,
            "full_name": attendance.employee.full_name,
            "email": attendance.employee.email,
            "department": attendance.employee.department
        }
    }


@router.delete("/{attendance_id}", response_model=schemas.Message)
def delete_attendance(attendance_id: int, db: Session = Depends(get_db)):
    """Delete an attendance record"""
    
    attendance = db.query(Attendance).filter(Attendance.id == attendance_id).first()
    
    if not attendance:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Attendance record with ID {attendance_id} not found"
        )
    
    try:
        db.delete(attendance)
        db.commit()
        return {"message": "Attendance record deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Error deleting attendance record"
        )
