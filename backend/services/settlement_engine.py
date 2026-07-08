def predict_settlement(user, loans):
    """Predict settlement percentage and risk category"""

    total_emi = sum(loan.emi for loan in loans)
    total_outstanding = sum(loan.outstanding_amount for loan in loans)

    # Calculate EMI Ratio
    if user.monthly_income > 0:
        emi_ratio = (total_emi / user.monthly_income) * 100
    else:
        emi_ratio = 0

    # Calculate Debt-to-Income Ratio
    if user.monthly_income > 0:
        debt_to_income = (total_outstanding / user.monthly_income) * 100
    else:
        debt_to_income = 0

    settlement_results = []

    for loan in loans:

        # Base settlement = 50%
        settlement = 50.0
        risk_score = 0

        # +5% if overdue
        if loan.overdue_months > 0:
            settlement += 5
            risk_score += 20

        # +5% if EMI ratio > 50
        if emi_ratio > 50:
            settlement += 5
            risk_score += 15

        # +5% if interest rate > 12%
        if loan.interest_rate > 12:
            settlement += 5
            risk_score += 10

        # +5% if Debt-to-Income > 80%
        if debt_to_income > 80:
            settlement += 5
            risk_score += 15

        # Limit settlement percentage
        settlement = min(settlement, 75)

        # Risk Category
        if risk_score >= 40:
            risk_category = "High"
        elif risk_score >= 20:
            risk_category = "Medium"
        else:
            risk_category = "Low"

        settlement_results.append({
            "loan_id": loan.id,
            "lender_name": loan.lender_name,
            "recommended_settlement_percent": settlement,
            "recommended_settlement_amount": round(
                loan.outstanding_amount * settlement / 100, 2
            ),
            "risk_score": risk_score,
            "risk_category": risk_category
        })

    return settlement_results