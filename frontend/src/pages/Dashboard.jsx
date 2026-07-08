import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState(null);
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchDashboard();

    }, []);

    const fetchDashboard = async () => {

        try {

            const [dashboardResponse, loanResponse] = await Promise.all([
                api.get("/dashboard-data"),
                api.get("/loans")
            ]);

            setDashboard(dashboardResponse.data);
            setLoans(loanResponse.data);

        }

        catch (error) {

            toast.error("Failed to Load Dashboard");

        }

        finally {

            setLoading(false);

        }

    };

    const deleteLoan = async (loanId) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this loan?"
        );

        if (!confirmDelete) {

            return;

        }

        try {

            await api.delete(`/delete-loan/${loanId}`);

            toast.success("Loan Deleted Successfully");

            fetchDashboard();

        }

        catch (error) {

            toast.error("Failed to Delete Loan");

        }

    };

    if (loading) {

        return (

            <Layout>

                <div className="dashboard">

                    <h2>Loading Dashboard...</h2>

                </div>

            </Layout>

        );

    }

    if (!dashboard) {

        return (

            <Layout>

                <div className="dashboard">

                    <h2>Unable to Load Dashboard</h2>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="dashboard">

                <div className="dashboard-header">

                    <div>

                        <h1>

                            Welcome, {dashboard.user.name}

                        </h1>

                        <p
                            style={{
                                color: "var(--text-secondary)",
                                marginTop: "10px"
                            }}
                        >

                            AI Powered Loan Settlement Dashboard

                        </p>

                    </div>

                    <button
                        className="logout-btn"
                        onClick={() => navigate("/edit-profile")}
                    >

                        ✏️ Edit Profile

                    </button>

                </div>

                <div className="cards">

                    <div className="card">

                        <h3>Total Loans</h3>

                        <h2>{dashboard.total_loans}</h2>

                    </div>

                    <div className="card">

                        <h3>Total EMI</h3>

                        <h2>

                            ₹{dashboard.financial_health.total_emi}

                        </h2>

                    </div>

                    <div className="card">

                        <h3>Outstanding Amount</h3>

                        <h2>

                            ₹{dashboard.financial_health.total_outstanding}

                        </h2>

                    </div>

                    <div className="card">

                        <h3>Monthly Surplus</h3>

                        <h2>

                            ₹{dashboard.financial_health.surplus}

                        </h2>

                    </div>

                    <div className="card">

                        <h3>EMI Ratio</h3>

                        <h2>

                            {dashboard.financial_health.emi_ratio_percent}%

                        </h2>

                    </div>

                    <div className="card">

                        <h3>Stress Level</h3>

                        <h2>

                            {dashboard.financial_health.stress_level}

                        </h2>

                    </div>

                </div>

                <div className="dashboard-section">

                    <h2>Settlement Prediction</h2>
                                        {

                        dashboard.settlement_prediction.length === 0 ? (

                            <div className="card">

                                <h3>No Settlement Predictions</h3>

                                <p>

                                    Add a loan to receive AI-powered settlement recommendations.

                                </p>

                            </div>

                        ) : (

                            dashboard.settlement_prediction.map((loan) => (

                                <div
                                    key={loan.loan_id}
                                    className="card"
                                >

                                    <h3>{loan.lender_name}</h3>

                                    <p>

                                        Settlement:
                                        {" "}
                                        ₹{loan.recommended_settlement_amount}

                                    </p>

                                    <p>

                                        Settlement Percentage:
                                        {" "}
                                        {loan.recommended_settlement_percent}%

                                    </p>

                                    <p>

                                        Risk:
                                        {" "}
                                        {loan.risk_category}

                                    </p>

                                </div>

                            ))

                        )

                    }

                </div>

                <div className="dashboard-section">

                    <h2>Your Loans</h2>

                    {

                        loans.length === 0 ? (

                            <div className="card">

                                <h3>No Loans Available</h3>

                                <p>

                                    Add your first loan to begin AI-powered
                                    financial analysis and settlement prediction.

                                </p>

                            </div>

                        ) : (

                            <table className="loan-table">

                                <thead>

                                    <tr>

                                        <th>Lender</th>
                                        <th>Type</th>
                                        <th>Outstanding</th>
                                        <th>EMI</th>
                                        <th>Interest</th>
                                        <th>Delete</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {

                                        loans.map((loan) => (

                                            <tr key={loan.id}>

                                                <td>{loan.lender_name}</td>

                                                <td>{loan.loan_type}</td>

                                                <td>₹{loan.outstanding_amount}</td>

                                                <td>₹{loan.emi}</td>

                                                <td>{loan.interest_rate}%</td>

                                                <td>

                                                    <button
                                                        className="delete-btn"
                                                        onClick={() => deleteLoan(loan.id)}
                                                    >

                                                        🗑 Delete

                                                    </button>

                                                </td>

                                            </tr>

                                        ))

                                    }

                                </tbody>

                            </table>

                        )

                    }

                </div>

            </div>

        </Layout>

    );

}

export default Dashboard;