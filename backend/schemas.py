from pydantic import BaseModel, EmailStr, Field, field_validator
from datetime import date
from typing import Optional
from models import AttendanceStatus


# Employee Schemas
class EmployeeBase(BaseModel):
    employee_id: str = Field(..., min_length=1, max_length=50)
    full_name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    department: str = Field(..., min_length=1, max_length=100)

    @field_validator('employee_id', 'full_name', 'department')
    @classmethod
    def validate_not_empty(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError('Field cannot be empty or whitespace')
        return v.strip()


class EmployeeCreate(EmployeeBase):
    pass


class Employee(EmployeeBase):
    id: int

    class Config:
        from_attributes = True


# Attendance Schemas
class AttendanceBase(BaseModel):
    date: date
    status: AttendanceStatus


class AttendanceCreate(AttendanceBase):
    employee_id: int


class Attendance(AttendanceBase):
    id: int
    employee_id: int

    class Config:
        from_attributes = True


class AttendanceWithEmployee(Attendance):
    employee: Employee


# Response Schemas
class EmployeeWithStats(Employee):
    total_present_days: Optional[int] = 0


class Message(BaseModel):
    message: str


class ErrorResponse(BaseModel):
    detail: str
