import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/billing.css";

function Billing() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState(1);


useEffect(() => {
  const loadProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/products"
      );

      const productsWithQty = res.data.map((product) => ({
        ...product,
        quantity: 0,
      }));

      setProducts(productsWithQty);
    } catch (error) {
      console.error(error);
    }
  };

  loadProducts();
}, []);

  const increaseQty = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: product.quantity + 1,
            }
          : product
      )
    );
  };

  const decreaseQty = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id && product.quantity > 0
          ? {
              ...product,
              quantity: product.quantity - 1,
            }
          : product
      )
    );
  };

  const getTotal = () => {
    return products.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );
  };

  const createBill = async () => {
    const items = products
      .filter((product) => product.quantity > 0)
      .map((product) => ({
        product_id: product.id,
        quantity: product.quantity,
      }));

    if (items.length === 0) {
      alert("Please select at least one product");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/bills",
        {
          customer_id: customerId,
          items,
        }
      );

      navigate(`/invoice/${res.data.bill_id}`);
    } catch (error) {
      console.error(error);
      alert("Failed to create bill");
    }
  };

  return (
    <div className="billing-container">
      <h1 className="billing-title">
        Create New Bill
      </h1>

      <div className="billing-card">
        <table className="billing-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Quantity</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>

                <td>₹{product.price}</td>

                <td>
                  <span
                    className={`stock-badge ${
                      product.stock === 0
                        ? "stock-out"
                        : product.stock <= 10
                        ? "stock-low"
                        : "stock-good"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>

                <td>
                  <div className="qty-control">
                    <button
                      className="qty-btn"
                      onClick={() =>
                        decreaseQty(product.id)
                      }
                    >
                      -
                    </button>

                    <span className="qty-value">
                      {product.quantity}
                    </span>

                    <button
                      className="qty-btn"
                      onClick={() =>
                        increaseQty(product.id)
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <div className="total-card">
            <div className="total-label">
              Total Amount
            </div>

            <div className="total-amount">
              ₹{getTotal().toFixed(2)}
            </div>
          </div>
        </div>

        <button
          className="create-bill-btn"
          onClick={createBill}
        >
          Create Bill
        </button>
      </div>
    </div>
  );
}

export default Billing;