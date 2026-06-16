import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

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
          axios.get(
            "http://localhost:8000/api/dashboard/summary"
          ),
          axios.get(
            "http://localhost:8000/api/dashboard/recent-bills"
          ),
          axios.get(
            "http://localhost:8000/api/dashboard/low-stock"
          ),
          axios.get(
            "http://localhost:8000/api/dashboard/top-products"
          ),
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

      {/* Stats Cards */}

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Today's Sales</h3>
          <p>₹{summary.todaySales}</p>
        </div>

        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹{summary.totalRevenue}</p>
        </div>

        <div className="stat-card">
          <h3>Total Products</h3>
          <p>{summary.totalProducts}</p>
        </div>

        <div className="stat-card">
          <h3>Low Stock Items</h3>
          <p>{summary.lowStockItems}</p>
        </div>
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

      {/* Recent Bills */}

      <div className="dashboard-section">
        <h2>Recent Bills</h2>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Bill ID</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {recentBills.map((bill) => (
              <tr key={bill.id}>
                <td>
                  <button
                    className="invoice-link"
                    onClick={() =>
                      navigate(
                        `/invoice/${bill.id}`
                      )
                    }
                  >
                    #{bill.id}
                  </button>
                </td>

                <td>
                  ₹{bill.total_amount}
                </td>

                <td>
                  {new Date(
                    bill.bill_date
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Products */}

      <div className="dashboard-section">
        <h2>Top Selling Products</h2>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Sold</th>
            </tr>
          </thead>

          <tbody>
            {topProducts.map(
              (product, index) => (
                <tr key={index}>
                  <td>{product.name}</td>
                  <td>
                    {product.sold}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Low Stock Alerts */}

      <div className="dashboard-section">
        <h2>Low Stock Alerts</h2>

        {lowStock.length === 0 ? (
          <p>
            No low stock products 🎉
          </p>
        ) : (
          <table className="dashboard-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Stock Left</th>
              </tr>
            </thead>

            <tbody>
              {lowStock.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;