const express = require("express");

const router = express.Router();

const {
  getSummary,
  getRecentBills,
  getLowStockProducts,
  getTopProducts,
} = require("../controllers/dashboardController");

router.get("/top-products",getTopProducts);
router.get("/summary", getSummary);
router.get("/recent-bills", getRecentBills);
router.get("/low-stock", getLowStockProducts);

module.exports = router;