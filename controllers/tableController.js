const Table = require("../models/Table");

async function addTable(req, res) {
  try {
    const { name, lastHeight } = req.body;
    const newTable = new Table({ name, lastHeight });
    const savedTable = await newTable.save();
    res.status(201).json(savedTable);
  } catch (error) {
    console.error("Error adding table:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

async function updateTableHeight(req, res) {
  const { newHeight } = req.body;
  const tableId = req.params.id;
  try {
    await Table.updateOne(
      { _id: tableId },
      { lastHeight: parseInt(newHeight) }
    );
    const updatedTable = await Table.findById(tableId);
    res.json({ success: true, table: updatedTable });
  } catch (error) {
    console.error("Error updating height:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
}

async function getTables(req, res) {
  try {
    const tables = await Table.find();
    res.json(tables);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { addTable, updateTableHeight, getTables };
