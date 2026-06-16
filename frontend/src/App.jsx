import { BrowserRouter, Routes, Route } from "react-router-dom";
import Billing from "./pages/Billing";
import Products from "./pages/Products";
import InvoicePage from "./pages/InvoicePage";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/invoice/:id" element={<InvoicePage />} />
      </Routes>
    </BrowserRouter>
  );
} 

export default App;