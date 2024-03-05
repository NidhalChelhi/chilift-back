const express = require("express");
const router = express.Router();
const {
  addTable,
  updateTableHeight,
  getTables,
} = require("../controllers/tableController");

router.post("/", addTable);
router.put("/:id/updateHeight", updateTableHeight);
router.get("/", getTables);

module.exports = router;
