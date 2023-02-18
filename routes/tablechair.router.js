const { Router } = require("express");
const TableModel = require("../models/tablechair.model");
const TableChairRouter = Router();

TableChairRouter.get("/", async (req, res) => {
  const user = await TableModel.find();
  res.send(user);
});

TableChairRouter.post("/", async (req, res) => {
  let payload = req.body;
  try {
    let Tablesave = new TableModel(payload);
    await Tablesave.save();
    res.send("Table saved successfully");
  } catch (error) {
    console.log({ msg: "Something went wrong in create post" });
    console.log(error);
  }
});

module.exports = TableChairRouter;
