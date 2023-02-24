// const accountSid = "ACd6d6cef55220cb2891a9cda4e486f916";
// const authToken = "b1ef29134457a892da000e8d7506a0bb";
// const verifySid = "VA07377a316b03ac27f903dfdeb94227db";
// const client = require("twilio")(accountSid, authToken);

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
    let { cardNumber, mobileNo } = req.body;

    let paxCreate = await PaymentCardData.find({
      cardNumber: cardNumber,
    }).populate("AuthorId");

    console.log("paxCreate", paxCreate[0].AuthorId.mobileNo);
    const Mobile = paxCreate[0].AuthorId.mobileNo;

    const PaxCreate1 = await OtpData.create({
      cardNumber,
      mobileNo: Mobile,
    });

    res.send({ PaxCreate1 });

    // otp verification
    // client.verify.v2
    //   .services(verifySid)
    //   .verifications.create({ to: `+91${Mobile}`, channel: "sms" })
    //   .then((verification) => console.log(verification.status))
    //   .then(() => {
    //     const readline = require("readline").createInterface({
    //       input: process.stdin,
    //       output: process.stdout,
    //     });
    //     readline.question("Please enter the OTP:", (otpCode) => {
    //       client.verify.v2
    //         .services(verifySid)
    //         .verificationChecks.create({ to: `+91${Mobile}`, code: otpCode })
    //         .then((verification_check) =>
    //           console.log(verification_check.status)
    //         )
    //         .then(() => readline.close());
    //     });
    //   });

    // Download the helper library from https://www.twilio.com/docs/node/install
    // Set environment variables for your credentials
    // Read more at http://twil.io/secure
    const accountSid = "AC14fd0d0664e6739e95a691ac3ee24ba1";
    const authToken = "5db97ec508af8d22259499939d7ff871";
    const verifySid = "VA76f22837c30a058bc24dc44a4dc88dff";
    const client = require("twilio")(accountSid, authToken);

    client.verify.v2
      .services(verifySid)
      .verifications.create({ to: `+91${Mobile}`, channel: "sms" })
      .then((verification) => console.log(verification.status))
      .then(() => {
        const readline = require("readline").createInterface({
          input: process.stdin,
          output: process.stdout,
        });
        readline.question("Please enter the OTP:", (otpCode) => {
          client.verify.v2
            .services(verifySid)
            .verificationChecks.create({ to: `+91${Mobile}`, code: otpCode })
            .then((verification_check) =>
              console.log(verification_check.status)
            )
            .then(() => readline.close());
        });
      });
  } catch (err) {
    res.status(500).send(err);
  }
});

cardRouter.get("/verify", (req, res) => {
  try {
    if (req.query.mobileNo && req.query.code) {
      client.verify
        .services(verifySid)
        .verificationChecks.create({
          to: `+91${req.query.mobileNo}`,
          code: req.query.code,
        })
        .then((data) => {
          // console.log("vishal dtata");
          if (data.status === "approved") {
            res.status(200).send({
              message: "User is Verified!!",
              data,
            });
          } else {
            res.status(404).send({
              message: "Wrong phone number or code ",
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.status(400).send({
        message: "Wrong phone number or code :(",
        mobileNo: req.query.mobileNo,
        data,
      });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "something went wrong" });
  }
});

cardRouter.get("/otp", async (req, res) => {
  const otpInfo = await OtpData.find();
  res.send(otpInfo);
});

module.exports = cardRouter;
