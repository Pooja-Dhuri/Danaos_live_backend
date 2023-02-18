const { Schema, model } = require("mongoose");

const TableSchema = new Schema(
  {
    name: { type: String, required: true },
    status: { type: Boolean, required: true },
    tableno: { type: Number, required: true },
    tablefloor: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TableModel = model("chairtable", TableSchema);
module.exports = TableModel;
