import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import "../styles/auth.css";

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    };

    const handleLogin = async () => {

        setLoading(true);

        try {

            const response = await api.post("/login", form);

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            toast.success(response.data.message);

            setTimeout(() => {

                navigate("/dashboard");

            }, 1200);

        }

        catch (error) {

            toast.error("Invalid Email or Password");

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

                    <h2>Login</h2>

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

                    <button
                        className="login-btn"
                        onClick={handleLogin}
                        disabled={loading}
                    >

                        {loading ? "Logging In..." : "Login"}

                    </button>

                    <p>

                        Don't have an account?{" "}

                        <Link to="/register">

                            Register

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;