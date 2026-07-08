import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

function SettlementPredictor() {

    const [predictions, setPredictions] = useState([]);
    const [timeline, setTimeline] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData = async () => {

        try {

            const predictionResponse = await api.get("/settlement-predictor");

            setPredictions(predictionResponse.data);

        }

        catch (error) {

            toast.error("Failed to Load Settlement Prediction");

        }

        try {

            const timelineResponse = await api.get("/debt-timeline");

            setTimeline(timelineResponse.data);

        }

        catch (error) {

            toast.error("Failed to Load Debt Timeline");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <Layout>

                <div className="dashboard">

                    <h2>Loading Settlement Prediction...</h2>

                </div>

            </Layout>

        );

    }

    console.log(timeline);

    return (

        <Layout>

            <div className="dashboard">

                <div className="dashboard-header">

                    <div>

                        <h1>Settlement Predictor</h1>

                        <p
                            style={{
                                color: "var(--text-secondary)",
                                marginTop: "8px"
                            }}
                        >
                            Analyze your loans and view AI-powered settlement recommendations.
                        </p>

                    </div>

                </div>

                {

    timeline?.repayment_timeline ? (

        <div
            className="card"
            style={{ marginTop: "20px" }}
        >

            <h3>Debt Repayment Timeline</h3>

            <p>
                Months Required: {timeline.months_required}
            </p>

            {

                timeline.repayment_timeline.map((item) => (

                    <p key={item.month}>
                        Month {item.month}: ₹{item.remaining_balance}
                    </p>

                ))

            }

        </div>

    ) : (

        <div
            className="card"
            style={{ marginTop: "20px" }}
        >

            <h3>Debt Repayment Timeline</h3>

            <p>

                {timeline?.message || "No repayment timeline available."}

            </p>

        </div>

    )

}

                {

                    predictions.length === 0 ? (

                        <div className="card">

                            <h3>No Settlement Predictions</h3>

                            <p>

                                Add a loan to receive AI-powered settlement recommendations.

                            </p>

                        </div>

                    ) : (

                        predictions.map((loan) => (

                            <div
                                key={loan.loan_id}
                                className="card"
                                style={{ marginTop: "20px" }}
                            >

                                <h3>{loan.lender_name}</h3>

                                <p>

                                    Recommended Settlement:
                                    {" "}
                                    ₹{loan.recommended_settlement_amount}

                                </p>

                                <p>

                                    Settlement Percentage:
                                    {" "}
                                    {loan.recommended_settlement_percent}%

                                </p>

                                <p>

                                    Risk Score:
                                    {" "}
                                    {loan.risk_score}

                                </p>

                                <p>

                                    Risk Category:
                                    {" "}
                                    {loan.risk_category}

                                </p>

                            </div>

                        ))

                    )

                }

            </div>

        </Layout>

    );

}

export default SettlementPredictor;