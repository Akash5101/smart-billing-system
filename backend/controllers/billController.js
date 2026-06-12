const db = require("../config/db");

//create bill
const createBill = async (req, res) => {
  try {
    const { customer_id, items } = req.body;

    let totalAmount = 0;

    for (const item of items) {
      const [product] = await db.promise().query(
        "SELECT * FROM products WHERE id = ?",
        [item.product_id]
      );

      if (product.length === 0) {
        return res.status(404).json({
          message: `Product ${item.product_id} not found`,
        });
      }

      totalAmount += product[0].price * item.quantity;
    }

    const [billResult] = await db.promise().query(
      "INSERT INTO bills (customer_id, total_amount) VALUES (?, ?)",
      [customer_id, totalAmount]
    );

    const billId = billResult.insertId;

    for (const item of items) {
      const [product] = await db.promise().query(
        "SELECT * FROM products WHERE id = ?",
        [item.product_id]
      );

      await db.promise().query(
        "INSERT INTO bill_items (bill_id, product_id, quantity, price) VALUES (?, ?, ?, ?)",
        [
          billId,
          item.product_id,
          item.quantity,
          product[0].price,
        ]
      );

      await db.promise().query(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [item.quantity, item.product_id]
      );
    }

    res.status(201).json({
      success: true,
      bill_id: billId,
      total_amount: totalAmount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

//get bill by id
const getBillById = async (req, res) => {
  try {
    const { id } = req.params;

    const [bill] = await db.promise().query(
      `SELECT
        bills.id,
        customers.name AS customer_name,
        bills.total_amount,
        bills.bill_date
      FROM bills
      LEFT JOIN customers
      ON bills.customer_id = customers.id
      WHERE bills.id = ?`,
      [id]
    );

    if (bill.length === 0) {
      return res.status(404).json({
        message: "Bill not found",
      });
    }

    const [items] = await db.promise().query(
      `SELECT
        products.name AS product_name,
        bill_items.quantity,
        bill_items.price
      FROM bill_items
      JOIN products
      ON bill_items.product_id = products.id
      WHERE bill_items.bill_id = ?`,
      [id]
    );

    res.status(200).json({
      ...bill[0],
      items,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// get all bills
const getAllBills = async (req, res) => {
  try {
    const [bills] = await db.promise().query(`
      SELECT
        bills.id,
        customers.name AS customer_name,
        bills.total_amount,
        bills.bill_date
      FROM bills
      LEFT JOIN customers
      ON bills.customer_id = customers.id
      ORDER BY bills.id DESC
    `);

    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createBill,
  getBillById,
  getAllBills,
};