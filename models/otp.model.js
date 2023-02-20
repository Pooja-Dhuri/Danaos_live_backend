const { Schema, model, mongoose } = require("mongoose");

const OtpSchema = new Schema(
  {
    cardNumber: { type: Number, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const OtpData = model("OtpData", OtpSchema);
module.exports = OtpData;
