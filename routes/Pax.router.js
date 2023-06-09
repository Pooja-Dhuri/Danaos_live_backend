const { Router } = require("express");
const pax = Router();
const PaxInfo = require("../models/paxInfo.model");

pax.get("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await PaxInfo.findOne({ _id: id });
  res.send(user);
});

pax.post("/", async (req, res) => {
  try {
    const {
      fullName,
      email,
      dob,
      sex,
      type,
      cabin,
      country,
      personalAddress,
      mobileNo,
      paxManifestNo,
      nationality,
      issuePlace,
      issueDate,
      expiryDate,
    } = req.body;

    const count = await PaxInfo.find();
    // console.log("count", count);
    const PaxData = await PaxInfo.create({
      fullName,
      email,
      dob,
      sex,
      type,
      cabin,
      country,
      personalAddress,
      mobileNo,
      bookingNo: "22445565" + Number(count.length),
      paxManifestNo,
      nationality,
      issuePlace,
      issueDate,
      expiryDate,
    });
    return res.send(PaxData);
  } catch (err) {
    res.status(500).send(err);
  }
});

pax.get("/", async (req, res) => {
  try {
    const queryObject = {};
    let { fullName } = req.query;
    if (fullName) {
      queryObject.fullName = { $regex: fullName, $options: "i" };
    }
    const data = PaxInfo.find(queryObject);
    const paxApi = await data;
    console.log(paxApi);
    res.send(paxApi);
  } catch (err) {
    return res.status(500).send(err);
  }
});

pax.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user = await PaxInfo.findByIdAndRemove({ _id: id });
  res.send(user);
});

// pax.delete("/deleteAll", async (req, res) => {
//   try {
//     const deleteData = await PaxInfo.deleteMany();
//     res.send("deleteData");
//     //   res.send("Delete Item ");
//   } catch (error) {
//     console.log({ msg: "Something went wrong in delete item" });
//     console.log(error);
//   }
// });

module.exports = pax;
