const db = require("../config/db");

// GET Product By ID
const getProductById = (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM products WHERE id = ?";

  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    res.status(200).json(results[0]);
  });
};

// ADD Product
const addProduct = (req, res) => {
  const {
    name,
    category,
    size,
    color,
    price,
    stock,
  } = req.body;

  const query = `
    INSERT INTO products
    (name, category, size, color, price, stock)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [name, category, size, color, price, stock],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Insert Failed",
        });
      }

      res.status(201).json({
        message: "Product Added",
        id: result.insertId,
      });
    }
  );
};

//UPDATE PRODUCT
const updateProduct = (req, res) => {
  const { id } = req.params;

  const {
    name,
    category,
    size,
    color,
    price,
    stock
  } = req.body;

  const query = `
    UPDATE products
    SET name=?,
        category=?,
        size=?,
        color=?,
        price=?,
        stock=?
    WHERE id=?
  `;

  db.query(
    query,
    [name, category, size, color, price, stock, id],
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Update Failed"
        });
      }

      res.json({
        message: "Product Updated"
      });
    }
  );
};

//DELETE PRODUCT
const deleteProduct = (req, res) => {
  const { id } = req.params;

  const query =
    "DELETE FROM products WHERE id=?";

  db.query(query, [id], (err) => {
    if (err) {
      return res.status(500).json({
        message: "Delete Failed"
      });
    }

    res.json({
      message: "Product Deleted"
    });
  });
};

//GET all products
const getAllProducts = (req, res) => {
  const query = "SELECT * FROM products";

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({
        message: "Database Error",
      });
    }

    res.status(200).json(results);
  });
};
module.exports = {
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
};