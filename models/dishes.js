const { Schema, model } = require("mongoose");

const DishSchema = new Schema(
  {
    imageUrl: { type: String, required: true },
    dishName: { type: String, required: true },
    rating: { type: Number, required: true },
    price: { type: Number, required: true },
    type: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const DishesData = model("DishesData", DishSchema);
module.exports = DishesData;
