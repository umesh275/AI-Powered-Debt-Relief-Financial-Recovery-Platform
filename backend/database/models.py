from sqlalchemy import Column, Integer, String, Float
from .database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)

    email = Column(String, unique=True, nullable=False)

    password = Column(String, nullable=False)

    monthly_income = Column(Float, default=0)

    monthly_expenses = Column(Float, default=0)


class Loan(Base):
    __tablename__ = "loans"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False)

    lender_name = Column(String, nullable=False)

    loan_type = Column(String)

    outstanding_amount = Column(Float)

    interest_rate = Column(Float)

    emi = Column(Float)

    overdue_months = Column(Integer)


class FinancialProfile(Base):
    __tablename__ = "financial_profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False)

    emi_ratio = Column(Float)

    debt_to_income_ratio = Column(Float)

    monthly_surplus = Column(Float)

    stress_level = Column(String)


class SettlementRecord(Base):
    __tablename__ = "settlement_records"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False)

    loan_id = Column(Integer, nullable=False)

    settlement_percent = Column(Float)

    settlement_amount = Column(Float)

    risk_category = Column(String)


class AIHistory(Base):
    __tablename__ = "ai_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, nullable=False)

    loan_id = Column(Integer, nullable=False)

    negotiation_strategy = Column(String)

    negotiation_letter = Column(String)

    created_at = Column(String)