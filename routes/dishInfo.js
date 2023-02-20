const express = require("express");
const dishRouter = express.Router();
const dishData = require("../models/dishes");

dishRouter.get("/", async (req, res) => {
  try {
    const queryObject = {};
    let { type } = req.query;
    if (type) {
      queryObject.type = { $regex: type, $options: "i" };
    }
    const data = dishData.find(queryObject);
    const dishApi = await data;
    // console.log(dishApi);
    res.send(dishApi);
  } catch (err) {
    return res.status(500).send(err);
  }
});

dishRouter.post("/", async (req, res) => {
  let payload = req.body;
  try {
    let dishcreate = new dishData(payload);
    await dishcreate.save();
    res.send("Create Item ");
  } catch (error) {
    console.log({ msg: "Something went wrong in create item" });
    console.log(error);
  }
});

//   dishRouter.delete("/deletedish/:id", async (req, res) => {
//     let id = req.params.id;
//     try {
//       await dishData.findByIdAndDelete({ _id: id });
//       res.send("Delete Item ");
//     } catch (error) {
//       console.log({ msg: "Something went wrong in delete item" });
//       console.log(error);
//     }
//   });

module.exports = dishRouter;
