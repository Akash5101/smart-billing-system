import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Billing from "./pages/Billing";
import InvoicePage from "./pages/InvoicePage";
import Customers from "./pages/Customers";
import Reports from "./pages/Reports";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* Billing */}
        <Route
          path="/billing"
          element={<Billing />}
        />

        {/* Customers */}
        <Route
          path="/customers"
          element={<Customers />}
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={<Reports />}
        />

        {/* Invoice */}
        <Route
          path="/invoice/:id"
          element={<InvoicePage />}
        />

        {/* 404 Page */}
        <Route
          path="*"
          element={
            <h1
              style={{
                textAlign: "center",
                marginTop: "100px",
              }}
            >
              404 - Page Not Found
            </h1>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;