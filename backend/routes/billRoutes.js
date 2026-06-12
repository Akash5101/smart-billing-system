const express = require("express");
const router = express.Router();

const {
  createBill,
  getAllBills,
  getBillById
} = require("../controllers/billController");

router.get("/", getAllBills);
router.get("/:id", getBillById);
router.post("/", createBill);

module.exports = router;