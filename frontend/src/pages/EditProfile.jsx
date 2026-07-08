import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import Layout from "../components/Layout";
import "../styles/dashboard.css";

function EditProfile() {

    const navigate = useNavigate();

    const [monthly_income, setIncome] = useState("");
    const [monthly_expenses, setExpenses] = useState("");

    const [loading, setLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {

        fetchProfile();

    }, []);

    const fetchProfile = async () => {

        try {

            const response = await api.get("/dashboard-data");

            setIncome(response.data.user.income);
            setExpenses(response.data.user.expenses);

        }

        catch (error) {

            toast.error("Failed to Load Profile");

        }

        finally {

            setPageLoading(false);

        }

    };

    const updateProfile = async () => {

        setLoading(true);

        try {

            await api.put("/update-profile", {
                monthly_income,
                monthly_expenses
            });

            toast.success("Profile Updated Successfully");

            setTimeout(() => {

                navigate("/dashboard");

            }, 1000);

        }

        catch (error) {

            toast.error("Failed to Update Profile");

        }

        finally {

            setLoading(false);

        }

    };

    if (pageLoading) {

        return (

            <Layout>

                <div className="dashboard">

                    <h2>Loading Profile...</h2>

                </div>

            </Layout>

        );

    }

    return (

        <Layout>

            <div className="dashboard">

                <div className="dashboard-header">

                    <div>

                        <h1>Edit Profile</h1>

                        <p
                            style={{
                                color: "var(--text-secondary)",
                                marginTop: "8px"
                            }}
                        >
                            Update your monthly income and expenses.
                        </p>

                    </div>

                </div>

                <form className="loan-form">

                    <input
                        type="number"
                        placeholder="Monthly Income"
                        value={monthly_income}
                        onChange={(e) => setIncome(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Monthly Expenses"
                        value={monthly_expenses}
                        onChange={(e) => setExpenses(e.target.value)}
                    />

                    <button
                        type="button"
                        onClick={updateProfile}
                        disabled={loading}
                    >

                        {loading ? "Updating..." : "Update Profile"}

                    </button>

                </form>

            </div>

        </Layout>

    );

}

export default EditProfile;