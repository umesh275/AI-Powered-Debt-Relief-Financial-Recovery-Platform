def calculate_financial_health(user, loans):
    """Calculate borrower financial health metrics"""

    total_emi = sum(loan.emi for loan in loans)
    total_outstanding = sum(loan.outstanding_amount for loan in loans)

    surplus = (
        user.monthly_income
        - user.monthly_expenses
        - total_emi
    )

    # EMI Ratio (%)
    if user.monthly_income > 0:
        emi_ratio = (total_emi / user.monthly_income) * 100
    else:
        emi_ratio = 0

    # Debt-to-Income Ratio (%)
    if user.monthly_income > 0:
        debt_to_income = (
            total_outstanding / user.monthly_income
        ) * 100
    else:
        debt_to_income = 0

    # Financial Stress Level
    if emi_ratio > 50:
        stress_level = "High"
    elif emi_ratio >= 30:
        stress_level = "Medium"
    else:
        stress_level = "Low"

        # Financial Health Score (0 - 100)

    financial_score = 100 - emi_ratio

    if financial_score < 0:
        financial_score = 0

    if financial_score > 100:
        financial_score = 100

    return {
        "total_emi": total_emi,
        "total_outstanding": total_outstanding,
        "surplus": surplus,
        "emi_ratio_percent": round(emi_ratio, 2),
        "debt_to_income_percent": round(debt_to_income, 2),
        "stress_level": stress_level,
        "financial_score": round(financial_score, 2),
        "total_loans": len(loans)
    }


def calculate_loan_priority(loans, emi_ratio=0):

    priority_list = []

    for loan in loans:

        is_overdue = loan.overdue_months > 0
        high_interest = loan.interest_rate > 12
        high_emi_ratio = emi_ratio > 50

        if is_overdue or high_interest or high_emi_ratio:
            priority = "High"

        elif loan.interest_rate > 8 or loan.overdue_months > 0:
            priority = "Medium"

        else:
            priority = "Low"

        priority_list.append({
            "loan_id": loan.id,
            "lender_name": loan.lender_name,
            "outstanding_amount": loan.outstanding_amount,
            "interest_rate": loan.interest_rate,
            "overdue_months": loan.overdue_months,
            "emi": loan.emi,
            "priority": priority
        })

    priority_order = {
        "High": 1,
        "Medium": 2,
        "Low": 3
    }

    priority_list.sort(
        key=lambda loan: priority_order[loan["priority"]]
    )

    return priority_list


def simulate_debt_repayment(total_outstanding, monthly_payment):

    months = 0
    balance = total_outstanding
    timeline = []

    while balance > 0:

        balance -= monthly_payment

        if balance < 0:
            balance = 0

        months += 1

        timeline.append({
            "month": months,
            "remaining_balance": round(balance, 2)
        })

    return {
        "months_required": months,
        "repayment_timeline": timeline
    }