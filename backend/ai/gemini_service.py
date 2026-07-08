import os
from dotenv import load_dotenv

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
print("API KEY LOADED:", bool(GOOGLE_API_KEY))

def fallback_strategy():
    """Default rule-based negotiation strategy"""

    return """
Settlement Strategy:
- Contact the lender politely.
- Explain your financial situation.
- Request a settlement between 50% and 70%.
- Ask for EMI restructuring if settlement is not possible.
- Maintain regular communication with the lender.
"""


def _call_gemini(prompt: str):
    """Call Google Gemini API"""

    if not GOOGLE_API_KEY:
        print("API KEY NOT FOUND")
        return None

    try:
        import google.generativeai as genai

        genai.configure(api_key=GOOGLE_API_KEY)

        model = genai.GenerativeModel("gemini-2.5-flash")

        print("Calling Gemini...")

        response = model.generate_content(prompt)

        print("Gemini Response:", response.text)

        return response.text

    except Exception as e:
        print("========== GEMINI ERROR ==========")
        print(e)
        print("==================================")
        return None


def generate_negotiation_strategy(user, loan):
    """Generate AI-powered negotiation strategy"""

    prompt = f"""
    Borrower Details:
    Monthly Income: {user.monthly_income}
    Monthly Expenses: {user.monthly_expenses}

    Loan Details:
    Lender: {loan.lender_name}
    Outstanding Amount: {loan.outstanding_amount}
    Interest Rate: {loan.interest_rate}
    Overdue Months: {loan.overdue_months}

    Generate:
    1. Settlement Strategy
    2. Negotiation Tips
    3. Recommended Settlement Percentage
    """

    if not GOOGLE_API_KEY:
        print("No Gemini API key found, using fallback strategy")
        return fallback_strategy()

    response = _call_gemini(prompt)

    if response is None:
        return fallback_strategy()

    return response


def fallback_letter(user, loan):
    """Default rule-based negotiation letter"""

    return f"""
Subject: Request for One-Time Settlement

Dear {loan.lender_name} Recovery Team,

I hope you are doing well.

I am writing to request your consideration for a One-Time Settlement (OTS) for my {loan.loan_type} loan. Due to my current financial difficulties, I am unable to continue making regular EMI payments.

Loan Details:
- Lender Name: {loan.lender_name}
- Loan Type: {loan.loan_type}
- Outstanding Amount: ₹{loan.outstanding_amount}
- Monthly EMI: ₹{loan.emi}
- Interest Rate: {loan.interest_rate}%
- Overdue Months: {loan.overdue_months}

Considering my current monthly income of ₹{user.monthly_income} and monthly expenses of ₹{user.monthly_expenses}, I sincerely request you to consider a reasonable settlement amount.

I assure you of my intention to resolve this loan responsibly and request you to kindly share the available settlement options.

Thank you for your time and understanding.

Regards,
{user.name}
"""


def generate_negotiation_letter(user, loan):
    """Generate lender negotiation letter"""

    prompt = f"""
    Write a professional loan settlement negotiation letter.

    Borrower Monthly Income: {user.monthly_income}
    Borrower Monthly Expenses: {user.monthly_expenses}

    Lender Name: {loan.lender_name}
    Outstanding Amount: {loan.outstanding_amount}
    Interest Rate: {loan.interest_rate}
    Overdue Months: {loan.overdue_months}

    Generate a professional settlement request letter.
    """

    if not GOOGLE_API_KEY:
        print("No Gemini API key found, using fallback letter")
        return fallback_letter(user, loan)

    response = _call_gemini(prompt)

    if response is None:
        return fallback_letter(user, loan)

    return response