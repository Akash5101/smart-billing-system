function TopProducts({ topProducts }) {
  return (
    <div className="dashboard-section">
      <h2>Top Selling Products</h2>

      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Product</th>
            <th>Sold</th>
          </tr>
        </thead>

        <tbody>
          {topProducts.map((product, index) => (
            <tr key={index}>
              <td>#{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopProducts;