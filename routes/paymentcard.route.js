const express = require("express");
const OtpData = require("../models/otp.model");
const PaxData = require("../models/paxInfo.model");
const PaymentCardData = require("../models/paymentcard.model");
const cardRouter = express.Router();

cardRouter.get("/", async (req, res) => {
  const cartInfo = await PaymentCardData.find();
  res.send(cartInfo);
});

cardRouter.get("/paxall", async (req, res) => {
  try {
    const data = await PaymentCardData.find().populate("AuthorId");
    console.log(data);
    res.send(data);
  } catch (err) {
    return res.status(500).send(err);
  }
});

cardRouter.post("/", async (req, res) => {
  try {
    let { cardNumber } = req.body;

    let paxCreate = await PaxData.find({ paxManifestNo: cardNumber });
    console.log("paxCreate", paxCreate);
    const PaxCreate1 = await PaymentCardData.create({
      ...req.body,
      AuthorId: paxCreate[0]._id,
    });

    return res.send(PaxCreate1);
  } catch (err) {
    res.status(500).send(err);
  }
});

cardRouter.delete("/deleteAll", async (req, res) => {
  try {
    const deleteData = await PaymentCardData.deleteMany();
    res.send("deleteData");
    //   res.send("Delete Item ");
  } catch (error) {
    console.log({ msg: "Something went wrong in delete item" });
    console.log(error);
  }
});

cardRouter.post("/otp", async (req, res) => {
  try {
    let { cardNumber } = req.body;

    let paxCreate = await PaymentCardData.find({
      cardNumber: cardNumber,
    }).populate("AuthorId");

    console.log("paxCreate", paxCreate[0].AuthorId.mobileNo);
    const Mobile = paxCreate[0].AuthorId.mobileNo;
    const PaxCreate1 = await OtpData.create({
      ...req.body,
    });

    return res.send({ PaxCreate1, Mobile });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = cardRouter;
