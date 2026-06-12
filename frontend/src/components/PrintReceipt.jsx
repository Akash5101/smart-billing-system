function PrintReceipt({ bill }) {
  return (
    <div className="receipt">
      <h2>AKASH CLOTHING STORE</h2>

      <p>Bill No: {bill.id}</p>

      <p>Customer: {bill.customer_name}</p>

      <hr />

      {bill.items.map((item, index) => (
        <div key={index}>
          <p>
            {item.product_name}
          </p>

          <p>
            {item.quantity} × ₹{item.price}
          </p>
        </div>
      ))}

      <hr />

      <h3>Total: ₹{bill.total_amount}</h3>

      <p>Thank You Visit Again</p>
    </div>
  );
}

export default PrintReceipt;