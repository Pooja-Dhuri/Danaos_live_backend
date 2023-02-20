const { Schema, model, mongoose } = require("mongoose");

const PaymentCardSchema = new Schema(
  {
    cardNumber: { type: Number, required: true },
    balance: { type: Number, required: true },
    nameOfCard: { type: String, required: true },
    expiryDate: { type: String, required: true },
    time: { type: String, required: true },
    AuthorId:{type:mongoose.Schema.ObjectId,ref:"paxdata",required:true},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const PaymentCardData = model("paymentCardData", PaymentCardSchema);
module.exports = PaymentCardData;