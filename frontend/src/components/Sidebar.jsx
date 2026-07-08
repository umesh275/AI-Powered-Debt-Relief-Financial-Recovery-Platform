import { NavLink, useNavigate } from "react-router-dom";
import "../styles/sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <div className="sidebar">

            <h2 className="logo">

                FinRelief AI

            </h2>

            <nav>

                <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    🏠 Dashboard
                </NavLink>

                <NavLink
                    to="/add-loan"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    ➕ Add Loan
                </NavLink>

                <NavLink
                    to="/financial-health"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    📊 Financial Health
                </NavLink>

                <NavLink
                    to="/settlement"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    🎯 Settlement Predictor
                </NavLink>

                <NavLink
                    to="/negotiation-strategy"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    🤖 AI Strategy
                </NavLink>

                <NavLink
                    to="/negotiation"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    ✉️ AI Email
                </NavLink>

                <NavLink
                    to="/history"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    📜 History
                </NavLink>

                <NavLink
                    to="/rights"
                    className={({ isActive }) =>
                        isActive ? "active-link" : ""
                    }
                >
                    ⚖️ Know Your Rights
                </NavLink>

            </nav>

            <button
                className="logout-sidebar"
                onClick={logout}
            >
                🚪 Logout
            </button>

        </div>

    );

}

export default Sidebar;