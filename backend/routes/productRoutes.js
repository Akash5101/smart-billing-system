const express = require("express");
const router = express.Router();

const {
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts
} = require("../controllers/productController");

router.post("/", addProduct);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/", getAllProducts);

module.exports = router;