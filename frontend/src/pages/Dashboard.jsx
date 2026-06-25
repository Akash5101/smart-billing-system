import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/dashboard.css";

import DashboardCard from "../components/dashboard/DashboardCard";
import RecentBills from "../components/dashboard/RecentBills";
import TopProducts from "../components/dashboard/TopProducts";
import LowStock from "../components/dashboard/LowStock";

import {
  FaMoneyBillWave,
  FaChartLine,
  FaBoxes,
  FaExclamationTriangle,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [summary, setSummary] = useState({});
  const [recentBills, setRecentBills] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [
          summaryRes,
          billsRes,
          lowStockRes,
          topProductsRes,
        ] = await Promise.all([
          axios.get("http://localhost:8000/api/dashboard/summary"),
          axios.get("http://localhost:8000/api/dashboard/recent-bills"),
          axios.get("http://localhost:8000/api/dashboard/low-stock"),
          axios.get("http://localhost:8000/api/dashboard/top-products"),
        ]);

        setSummary(summaryRes.data);
        setRecentBills(billsRes.data);
        setLowStock(lowStockRes.data);
        setTopProducts(topProductsRes.data);
      } catch (error) {
        console.error("Dashboard Error:", error);
      }
    };

    loadDashboard();
  }, []);

  return (
    <div className="dashboard-container">

      <h1 className="dashboard-title">
        Store Dashboard
      </h1>

      {/* Dashboard Cards */}

      <div className="stats-grid">

        <DashboardCard
          title="Today's Sales"
          value={`₹${summary.todaySales || 0}`}
          icon={<FaMoneyBillWave />}
          color="#27ae60"
        />

        <DashboardCard
          title="Total Revenue"
          value={`₹${summary.totalRevenue || 0}`}
          icon={<FaChartLine />}
          color="#3498db"
        />

        <DashboardCard
          title="Products"
          value={summary.totalProducts || 0}
          icon={<FaBoxes />}
          color="#9b59b6"
        />

        <DashboardCard
          title="Low Stock"
          value={summary.lowStockItems || 0}
          icon={<FaExclamationTriangle />}
          color="#e74c3c"
        />

      </div>

      {/* Quick Actions */}

      <div className="quick-actions">

        <button
          className="action-btn"
          onClick={() => navigate("/billing")}
        >
          ➕ Create Bill
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/products")}
        >
          📦 Products
        </button>

        <button
          className="action-btn"
          onClick={() => navigate("/customers")}
        >
          👥 Customers
        </button>

      </div>

      {/* Dashboard Grid */}

      <div className="dashboard-grid">

        <TopProducts
          topProducts={topProducts}
        />

        <RecentBills
          recentBills={recentBills}
        />

      </div>

      <LowStock
        lowStock={lowStock}
      />

    </div>
  );
}

export default Dashboard;