import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

function History() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {

        fetchHistory();

    }, []);

    const fetchHistory = async () => {

        try {

            const response = await api.get("/ai-history");

            setHistory(response.data);

        }

        catch (error) {

            toast.error("Failed to Load History");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return (

            <Layout>

                <div className="dashboard">

                    <h2>Loading History...</h2>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="dashboard">

                <div className="dashboard-header">

                    <div>

                        <h1>AI History</h1>

                        <p
                            style={{
                                color: "var(--text-secondary)",
                                marginTop: "8px"
                            }}
                        >
                            View all previously generated AI negotiation strategies and emails.
                        </p>

                    </div>

                </div>

                {

                    history.length === 0 ? (

                        <div className="card">

                            <h3>No History Found</h3>

                            <p>
                                Your AI-generated negotiation strategies and
                                emails will appear here.
                            </p>

                        </div>

                    ) : (

                        history.map((item) => (

                            <div
                                key={item.id}
                                className="card"
                                style={{ marginBottom: "20px" }}
                            >

                                <h3>
                                    Loan ID: {item.loan_id}
                                </h3>

                                <p>
                                    Created At: {item.created_at}
                                </p>

                                <button
                                    className="logout-btn"
                                    onClick={() =>
                                        setExpandedId(
                                            expandedId === item.id ? null : item.id
                                        )
                                    }
                                    style={{
                                        marginTop: "10px",
                                        marginBottom: "15px"
                                    }}
                                >

                                    {expandedId === item.id
                                        ? "Hide Details"
                                        : "View Details"}

                                </button>

                                {

                                    expandedId === item.id && (

                                        <>

                                            <p><b>Negotiation Strategy</b></p>

                                            <pre
                                                style={{
                                                    whiteSpace: "pre-wrap",
                                                    color: "white"
                                                }}
                                            >
                                                {item.negotiation_strategy}
                                            </pre>

                                            <br />

                                            <p><b>Negotiation Email</b></p>

                                            <pre
                                                style={{
                                                    whiteSpace: "pre-wrap",
                                                    color: "white"
                                                }}
                                            >
                                                {item.negotiation_letter}
                                            </pre>

                                        </>

                                    )

                                }

                            </div>

                        ))

                    )

                }

            </div>

        </Layout>

    );

}

export default History;