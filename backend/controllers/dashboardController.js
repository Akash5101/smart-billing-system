const db = require("../config/db");

const getSummary = async (req, res) => {
  try {
    const [todaySales] = await db
      .promise()
      .query(`
        SELECT COALESCE(SUM(total_amount),0) AS todaySales
        FROM bills
        WHERE DATE(bill_date) = CURDATE()
      `);

    const [products] = await db
      .promise()
      .query(`
        SELECT COUNT(*) AS totalProducts
        FROM products
      `);

    const [lowStock] = await db
      .promise()
      .query(`
        SELECT COUNT(*) AS lowStockItems
        FROM products
        WHERE stock < 10
      `);

    const [totalRevenue] = await db
      .promise()
      .query(`
        SELECT COALESCE(SUM(total_amount),0) AS revenue
        FROM bills
      `);

    res.json({
      todaySales: todaySales[0].todaySales,
      totalProducts: products[0].totalProducts,
      lowStockItems: lowStock[0].lowStockItems,
      totalRevenue: totalRevenue[0].revenue
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Dashboard Error"
    });
  }
};

const getRecentBills = async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT
        id,
        total_amount,
        bill_date
      FROM bills
      ORDER BY bill_date DESC
      LIMIT 10
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getLowStockProducts = async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT
        id,
        name,
        stock
      FROM products
      WHERE stock < 10
      ORDER BY stock ASC
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

const getTopProducts = async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT
        p.name,
        SUM(bi.quantity) AS sold
      FROM bill_items bi
      JOIN products p
      ON bi.product_id = p.id
      GROUP BY p.id
      ORDER BY sold DESC
      LIMIT 5
    `);

    res.json(rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


module.exports = {
  getSummary,
  getRecentBills,
  getLowStockProducts,
  getTopProducts,
};