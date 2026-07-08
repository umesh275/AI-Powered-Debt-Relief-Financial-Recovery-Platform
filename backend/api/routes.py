from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from backend.database.database import get_db
from backend.database import models, schemas

from backend.services.financial_engine import (
    calculate_financial_health,
    simulate_debt_repayment
)

from backend.services.settlement_engine import (
    predict_settlement
)

from backend.ai.gemini_service import (
    generate_negotiation_strategy,
    generate_negotiation_letter
)

from backend.auth.security import (
    hash_password,
    verify_password
)

from backend.auth.auth import create_access_token
from backend.auth.dependencies import get_current_user

router = APIRouter()


@router.post("/register")
def register_user(
    user: schemas.UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:

        return {
            "message": "Email already registered"
        }

    new_user = models.User(
        name=user.name,
        email=user.email,
        password=hash_password(user.password),
        monthly_income=user.monthly_income,
        monthly_expenses=user.monthly_expenses
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "user_id": new_user.id
    }


@router.post("/login")
def login_user(
    user: schemas.UserLogin,
    db: Session = Depends(get_db)
):

    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user is None:

        return {
            "message": "Invalid email or password"
        }

    if not verify_password(
        user.password,
        existing_user.password
    ):

        return {
            "message": "Invalid email or password"
        }

    token = create_access_token(
        {
            "sub": str(existing_user.id)
        }
    )

    return {
        "message": "Login Successful",
        "access_token": token,
        "token_type": "bearer"
    }


@router.post("/add-loan")
def add_loan(
    loan: schemas.LoanCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    new_loan = models.Loan(
        user_id=user_id,
        lender_name=loan.lender_name,
        loan_type=loan.loan_type,
        outstanding_amount=loan.outstanding_amount,
        interest_rate=loan.interest_rate,
        emi=loan.emi,
        overdue_months=loan.overdue_months
    )

    db.add(new_loan)
    db.commit()
    db.refresh(new_loan)

    return {
        "message": "Loan Added Successfully",
        "loan_id": new_loan.id
    }


@router.get("/loans")
def get_loans(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == user_id
    ).all()

    return loans


@router.put("/update-profile")
def update_profile(
    profile: schemas.UserUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    if user is None:

        return {
            "message": "User not found"
        }

    user.monthly_income = profile.monthly_income
    user.monthly_expenses = profile.monthly_expenses

    db.commit()

    return {
        "message": "Profile Updated Successfully"
    }


@router.delete("/delete-loan/{loan_id}")
def delete_loan(
    loan_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    loan = db.query(models.Loan).filter(
        models.Loan.id == loan_id
    ).first()

    if loan is None:

        return {
            "message": "Loan not found"
        }

    if loan.user_id != user_id:

        return {
            "message": "Unauthorized"
        }

    db.delete(loan)
    db.commit()

    return {
        "message": "Loan Deleted Successfully"
    }


@router.get("/financial-health")
def get_financial_health(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    if user is None:

        return {
            "message": "User not found"
        }

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == user_id
    ).all()

    return calculate_financial_health(
        user,
        loans
    )


@router.get("/settlement-predictor")
def settlement_predictor(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    if user is None:

        return {
            "message": "User not found"
        }

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == user_id
    ).all()

    return predict_settlement(
        user,
        loans
    )


@router.get("/debt-timeline")
def debt_timeline(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == user_id
    ).all()

    if len(loans) == 0:

        return {
            "message": "No loans found"
        }

    total_outstanding = sum(
        loan.outstanding_amount for loan in loans
    )

    total_monthly_emi = sum(
        loan.emi for loan in loans
    )

    return simulate_debt_repayment(
        total_outstanding,
        total_monthly_emi
    )


@router.get("/ai-negotiation-strategy")
def ai_negotiation_strategy(
    loan_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    loan = db.query(models.Loan).filter(
        models.Loan.id == loan_id
    ).first()

    if loan is None:

        return {
            "message": "Loan not found"
        }

    if loan.user_id != user_id:

        return {
            "message": "Unauthorized"
        }

    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    strategy = generate_negotiation_strategy(
    user,
    loan
    )

    history = models.AIHistory(
        user_id=user_id,
        loan_id=loan.id,
        negotiation_strategy=strategy,
        negotiation_letter=""
    )

    db.add(history)
    db.commit()

    return {
        "strategy": strategy
    }


@router.get("/generate-negotiation-email/{loan_id}")
def generate_email(
    loan_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    loan = db.query(models.Loan).filter(
        models.Loan.id == loan_id
    ).first()

    if loan is None:

        return {
            "message": "Loan not found"
        }

    if loan.user_id != user_id:

        return {
            "message": "Unauthorized"
        }

    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    letter = generate_negotiation_letter(
    user,
    loan
    )

    history = models.AIHistory(
        user_id=user_id,
        loan_id=loan.id,
        negotiation_strategy="",
        negotiation_letter=letter
    )

    db.add(history)
    db.commit()

    return {
        "letter": letter
    }


@router.get("/ai-history")
def ai_history(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    history = db.query(models.AIHistory).filter(
        models.AIHistory.user_id == user_id
    ).all()

    return history


@router.get("/dashboard-data")
def dashboard_data(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    if user is None:

        return {
            "message": "User not found"
        }

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == user_id
    ).all()

    financial = calculate_financial_health(
        user,
        loans
    )

    settlement = predict_settlement(
        user,
        loans
    )

    return {
        "user": {
            "id": user.id,
            "name": user.name,
            "income": user.monthly_income,
            "expenses": user.monthly_expenses
        },
        "financial_health": financial,
        "settlement_prediction": settlement,
        "total_loans": len(loans)
    }


@router.get("/generate-email")
def generate_email(
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):

    user_id = int(current_user["sub"])

    user = db.query(models.User).filter(
        models.User.id == user_id
    ).first()

    loans = db.query(models.Loan).filter(
        models.Loan.user_id == user_id
    ).all()

    if len(loans) == 0:

        return {
            "email": "No active loans found."
        }

    loan = loans[0]

    email = f"""
Subject: Request for One-Time Settlement

Dear {loan.lender_name},

I am currently facing financial difficulties and kindly request you to consider a One-Time Settlement for my {loan.loan_type} loan.

Loan Outstanding : ₹{loan.outstanding_amount}

Monthly EMI : ₹{loan.emi}

I sincerely request your support in providing a reasonable settlement amount. I assure you that I am committed to resolving this loan at the earliest.

Thank you for your understanding.

Regards,

{user.name}
"""

    return {
        "email": email
    }