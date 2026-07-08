import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

function NegotiationEmail() {

    const [email, setEmail] = useState("");
    const [loans, setLoans] = useState([]);
    const [selectedLoan, setSelectedLoan] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        fetchLoans();

    }, []);

    const fetchLoans = async () => {

        try {

            const response = await api.get("/loans");

            setLoans(response.data);

            if (response.data.length > 0) {

                setSelectedLoan(response.data[0].id);

            }

        }

        catch (error) {

            toast.error("Failed to Load Loans");

        }

    };

    const generateEmail = async () => {

        if (!selectedLoan) {

            toast.error("Please Add a Loan First.");

            return;

        }

        setLoading(true);

        try {

            const response = await api.get(
                `/generate-negotiation-email/${selectedLoan}`
            );

            setEmail(response.data.letter);

            toast.success("Negotiation Email Generated Successfully");

        }

        catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Failed to Generate Email"
            );

        }

        finally {

            setLoading(false);

        }

    };

    const copyEmail = async () => {

        try {

            await navigator.clipboard.writeText(email);

            toast.success("Email Copied Successfully");

        }

        catch (error) {

            toast.error("Failed to Copy Email");

        }

    };

    const downloadEmail = () => {

        try {

            const element = document.createElement("a");

            const file = new Blob(
                [email],
                { type: "text/plain" }
            );

            element.href = URL.createObjectURL(file);

            element.download = "AI_Negotiation_Email.txt";

            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);

            URL.revokeObjectURL(element.href);

            toast.success("Email Downloaded Successfully");

        }

        catch (error) {

            toast.error("Failed to Download Email");

        }

    };

    return (

        <Layout>

            <div className="dashboard">

                <div className="dashboard-header">

                    <div>

                        <h1>AI Negotiation Email</h1>

                        <p
                            style={{
                                color: "var(--text-secondary)",
                                marginTop: "8px"
                            }}
                        >
                            Generate a professional negotiation email for your selected loan.
                        </p>

                    </div>

                </div>

                <div
                    style={{
                        marginTop: "20px",
                        marginBottom: "20px"
                    }}
                >

                    <label
                        style={{
                            color: "white",
                            display: "block",
                            marginBottom: "10px"
                        }}
                    >
                        Select Loan
                    </label>

                    <select
                        className="form-select"
                        value={selectedLoan}
                        onChange={(e) => setSelectedLoan(e.target.value)}
                    >

                        {

                            loans.length === 0 ? (

                                <option value="">
                                    No Loans Available
                                </option>

                            ) : (

                                loans.map((loan) => (

                                    <option
                                        key={loan.id}
                                        value={loan.id}
                                    >

                                        {loan.lender_name} - ₹{loan.outstanding_amount}

                                    </option>

                                ))

                            )

                        }

                    </select>

                </div>

                <button
                    className="logout-btn"
                    onClick={generateEmail}
                    disabled={loading || loans.length === 0}
                >

                    {loading ? "Generating..." : "Generate Email"}

                </button>

                <div
                    className="card"
                    style={{ marginTop: "20px" }}
                >

                    {

                        loading ? (

                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "20px"
                                }}
                            >

                                <h3>
                                    🤖 FinRelief AI is generating your negotiation email...
                                </h3>

                                <p>
                                    Please wait a few seconds.
                                </p>

                            </div>

                        ) : email ? (

                            <div>

                                <button
                                    className="logout-btn"
                                    onClick={copyEmail}
                                    style={{
                                        marginBottom: "15px"
                                    }}
                                >
                                    📋 Copy Email
                                </button>

                                <button
                                    className="logout-btn"
                                    onClick={downloadEmail}
                                    style={{
                                        marginBottom: "15px",
                                        marginLeft: "10px"
                                    }}
                                >
                                    📥 Download Email
                                </button>

                                <pre
                                    style={{
                                        whiteSpace: "pre-wrap",
                                        color: "white",
                                        background: "#111827",
                                        padding: "20px",
                                        borderRadius: "12px",
                                        border: "1px solid #374151",
                                        lineHeight: "1.8",
                                        maxHeight: "500px",
                                        overflowY: "auto"
                                    }}
                                >
                                    {email}
                                </pre>

                            </div>

                        ) : (

                            <div
                                style={{
                                    textAlign: "center",
                                    padding: "20px"
                                }}
                            >

                                <h3>
                                    AI Negotiation Email
                                </h3>

                                <p>
                                    Click <b>Generate Email</b> to create a professional
                                    AI-powered loan settlement negotiation email
                                    based on your financial profile and loan details.
                                </p>

                            </div>

                        )

                    }

                </div>

            </div>

        </Layout>

    );

}

export default NegotiationEmail;