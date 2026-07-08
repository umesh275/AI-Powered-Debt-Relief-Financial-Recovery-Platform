import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

function FinancialHealth() {

    const [health, setHealth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchHealth();

    }, []);

    const fetchHealth = async () => {

        try {

            const response = await api.get("/financial-health");

            setHealth(response.data);

        }

        catch (error) {

            toast.error("Failed to Load Financial Health");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <Layout>

                <div className="dashboard">

                    <h2>Loading Financial Health...</h2>

                </div>

            </Layout>

        );

    }

    if (!health) {

        return (

            <Layout>

                <div className="dashboard">

                    <h2>No Financial Data Available</h2>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="dashboard">

                <div className="dashboard-header">

                    <div>

                        <h1>Financial Health</h1>

                        <p
                            style={{
                                color: "var(--text-secondary)",
                                marginTop: "8px"
                            }}
                        >
                            Monitor your financial stability and debt repayment capacity.
                        </p>

                    </div>

                </div>

                <div className="cards">

                    <div className="card">

                        <h3>Total EMI</h3>

                        <h2>₹{health.total_emi}</h2>

                    </div>

                    <div className="card">

                        <h3>Total Outstanding</h3>

                        <h2>₹{health.total_outstanding}</h2>

                    </div>

                    <div className="card">

                        <h3>Monthly Surplus</h3>

                        <h2>₹{health.surplus}</h2>

                    </div>

                    <div className="card">

                        <h3>EMI Ratio</h3>

                        <h2>{health.emi_ratio_percent}%</h2>

                    </div>

                    <div className="card">

                        <h3>Debt To Income</h3>

                        <h2>{health.debt_to_income_percent}%</h2>

                    </div>

                    <div className="card">

                        <h3>Stress Level</h3>

                        <h2>{health.stress_level}</h2>

                    </div>

                    <div className="card">

                        <h3>Financial Health Score</h3>

                        <h2>{health.financial_score}%</h2>

                        <progress
                            value={health.financial_score}
                            max="100"
                            style={{
                                width: "100%",
                                height: "18px",
                                marginTop: "15px"
                            }}
                        />

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default FinancialHealth;