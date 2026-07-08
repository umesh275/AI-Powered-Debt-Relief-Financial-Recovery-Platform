import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import "../styles/auth.css";

function Register() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        monthly_income: "",
        monthly_expenses: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleRegister = async () => {

        setLoading(true);

        try {

            const response = await api.post(
                "/register",
                form
            );

            toast.success(response.data.message);

            setTimeout(() => {

                navigate("/");

            }, 1200);

        }

        catch (error) {

            toast.error("Registration Failed");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-left">

                <h1>FinRelief AI</h1>

                <p>

                    AI Powered Loan Settlement
                    <br />
                    Financial Recovery Platform

                </p>

            </div>

            <div className="auth-right">

                <div className="auth-box">

                    <h2>Register</h2>

                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="monthly_income"
                        placeholder="Monthly Income"
                        value={form.monthly_income}
                        onChange={handleChange}
                    />

                    <input
                        type="number"
                        name="monthly_expenses"
                        placeholder="Monthly Expenses"
                        value={form.monthly_expenses}
                        onChange={handleChange}
                    />

                    <button
                        className="login-btn"
                        onClick={handleRegister}
                        disabled={loading}
                    >

                        {loading ? "Registering..." : "Register"}

                    </button>

                    <p>

                        Already have an account?{" "}

                        <Link to="/">
                            Login
                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;