import { useNavigate } from "react-router-dom";

function RecentBills({ recentBills }) {
  const navigate = useNavigate();

  return (
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
                    navigate(`/invoice/${bill.id}`)
                  }
                >
                  #{bill.id}
                </button>
              </td>

              <td>₹{bill.total_amount}</td>

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
  );
}

export default RecentBills;