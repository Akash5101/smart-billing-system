function LowStock({ lowStock }) {
  return (
    <div className="dashboard-section">
      <h2>Low Stock Alerts</h2>

      {lowStock.length === 0 ? (
        <p>No low stock products 🎉</p>
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
  );
}

export default LowStock;