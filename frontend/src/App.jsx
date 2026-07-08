import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import FinancialHealth from "./pages/FinancialHealth";
import SettlementPredictor from "./pages/SettlementPredictor";
import NegotiationEmail from "./pages/NegotiationEmail";
import KnowRights from "./pages/KnowRights";
import History from "./pages/History";
import NegotiationStrategy from "./pages/NegotiationStrategy";
import ProtectedRoute from "./components/ProtectedRoute";
import AddLoan from "./pages/AddLoan";
import EditProfile from "./pages/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add-loan"
          element={
            <ProtectedRoute>
              <AddLoan />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settlement"
          element={
            <ProtectedRoute>
              <SettlementPredictor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/negotiation-strategy"
          element={
            <ProtectedRoute>
              <NegotiationStrategy />
            </ProtectedRoute>
          }
        />

        <Route
          path="/negotiation"
          element={
            <ProtectedRoute>
              <NegotiationEmail />
            </ProtectedRoute>
          }
        />

          <Route
              path="/edit-profile"
              element={<EditProfile />}
          />

        <Route
          path="/financial-health"
          element={
            <ProtectedRoute>
              <FinancialHealth />
            </ProtectedRoute>
          }
        />

        <Route
          path="/history"
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />

        <Route
          path="/rights"
          element={
            <ProtectedRoute>
              <KnowRights />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;