import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

function AddLoan() {

    const navigate = useNavigate();

    const [loan, setLoan] = useState({
        lender_name: "",
        loan_type: "",
        outstanding_amount: "",
        interest_rate: "",
        emi: "",
        overdue_months: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setLoan({
            ...loan,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            await api.post("/add-loan", loan);

            toast.success("Loan Added Successfully");

            setTimeout(() => {

                navigate("/dashboard");

            }, 1200);

        }

        catch (error) {

            toast.error("Failed to Add Loan");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <Layout>

            <div className="dashboard">

                <div className="dashboard-header">

                    <div>

                        <h1>Add Loan</h1>

                        <p
                            style={{
                                color: "var(--text-secondary)",
                                marginTop: "8px"
                            }}
                        >
                            Enter your loan details to receive AI-powered financial analysis.
                        </p>

                    </div>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="loan-form"
                >

                    <input
                        type="text"
                        name="lender_name"
                        placeholder="Lender Name"
                        value={loan.lender_name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="text"
                        name="loan_type"
                        placeholder="Loan Type"
                        value={loan.loan_type}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="outstanding_amount"
                        placeholder="Outstanding Amount"
                        value={loan.outstanding_amount}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="interest_rate"
                        placeholder="Interest Rate (%)"
                        value={loan.interest_rate}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="emi"
                        placeholder="Monthly EMI"
                        value={loan.emi}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="number"
                        name="overdue_months"
                        placeholder="Overdue Months"
                        value={loan.overdue_months}
                        onChange={handleChange}
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >

                        {loading ? "Adding Loan..." : "Add Loan"}

                    </button>

                </form>

            </div>

        </Layout>

    );

}

export default AddLoan;