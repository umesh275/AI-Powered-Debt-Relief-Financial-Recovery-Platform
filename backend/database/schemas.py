from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    monthly_income: float
    monthly_expenses: float


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class LoanCreate(BaseModel):
    lender_name: str
    loan_type: str
    outstanding_amount: float
    interest_rate: float
    emi: float
    overdue_months: int


class UserUpdate(BaseModel):
    monthly_income: float
    monthly_expenses: float