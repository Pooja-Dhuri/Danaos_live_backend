const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { superMgmtModel } = require("../models/auth.model");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await superMgmtModel.findOne({ email });
  if (!findUser) {
    const newUser = await superMgmtModel.create(req.body);
    res.send({ newUser, status: true });
  } else {
    throw new Error("User Already Exists");
  }
});

const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const findUser = await superMgmtModel.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      status: true,
      _id: findUser?._id,
      firstname: findUser?.firstname,
      email: findUser?.email,
      role: findUser?.role,
      ar: findUser?.ar,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = { createUser, loginUserCtrl };
