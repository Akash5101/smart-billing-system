import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "../styles/invoice.css";

function InvoicePage() {
  const { id } = useParams();

  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/bills/${id}`
        );

        setBill(res.data);
      } catch (error) {
        console.error("Error fetching bill:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);

  const downloadPDF = () => {
    if (!bill) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("AKASH CLOTHING STORE", 14, 20);

    doc.setFontSize(11);
    doc.text(`Invoice No: INV-${bill.id}`, 14, 35);
    doc.text(`Customer: ${bill.customer_name}`, 14, 42);
    doc.text(
      `Date: ${new Date(bill.bill_date).toLocaleDateString()}`,
      14,
      49
    );

    autoTable(doc, {
      startY: 60,
      head: [["Product", "Qty", "Price", "Subtotal"]],
      body: bill.items.map((item) => [
        item.product_name,
        item.quantity,
        `₹${item.price}`,
        `₹${(
          Number(item.price) *
          Number(item.quantity)
        ).toFixed(2)}`,
      ]),
    });

    const finalY = doc.lastAutoTable.finalY;

    doc.setFontSize(14);
    doc.text(
      `Grand Total: ₹${bill.total_amount}`,
      14,
      finalY + 15
    );

    doc.save(`invoice-${bill.id}.pdf`);
  };

  const printReceipt = () => {
    window.print();
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!bill) {
    return <h2>Invoice Not Found</h2>;
  }

  return (
    <div className="invoice-page">
      <div className="invoice-actions">
        <button onClick={downloadPDF}>
          Download PDF
        </button>

        <button onClick={printReceipt}>
          Print Receipt
        </button>
      </div>

      <div id="invoice">
        <div className="store-header">
          <h1>AKASH CLOTHING STORE</h1>
          <p>Kanyakumari, Tamil Nadu</p>
          <p>Phone: +91 XXXXX XXXXX</p>
        </div>

        <div className="invoice-info">
          <div className="info-box">
            <p>
              <strong>Customer:</strong>{" "}
              {bill.customer_name}
            </p>
          </div>

          <div className="info-box">
            <p>
              <strong>Invoice:</strong> INV-{bill.id}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                bill.bill_date
              ).toLocaleDateString()}
            </p>
          </div>
        </div>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {bill.items.map((item, index) => (
              <tr key={index}>
                <td>{item.product_name}</td>

                <td>{item.quantity}</td>

                <td>₹{item.price}</td>

                <td>
                  ₹
                  {(
                    Number(item.price) *
                    Number(item.quantity)
                  ).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-section">
          <div className="total-box">
            <div className="total-row grand-total">
              <span>Grand Total</span>
              <span>
                ₹{bill.total_amount}
              </span>
            </div>
          </div>
        </div>

        <div className="invoice-footer">
          <h3>Thank You For Shopping!</h3>
          <p>Please Visit Again</p>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;