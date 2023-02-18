const asyncHandler = require("express-async-handler");
const { generateToken } = require("../config/jwtToken");
const { adminModel } = require("../models/admin.model");

const homeRoute = asyncHandler(async (req, res) => {
  const findUser = await adminModel.find();
  res.send(findUser);
});

const homeRouteByID = asyncHandler(async (req, res) => {
  const findUser = await adminModel.findById(req.params.id);
  res.send(findUser);
});

const homeRouteByIdAndUpdate = asyncHandler(async (req, res) => {
  const updateUser = await adminModel.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  if (updateUser) {
    const user = { _id: req.params.id, ...req.body };
    res.send(user);
  }
});

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await adminModel.findOne({ email });
  if (!findUser) {
    const newUser = await adminModel.create(req.body);
    res.send({ newUser, status: true });
  } else {
    throw new Error("User Already Exists");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log(email, password,"admin controlle");
  const findUser = await adminModel.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    res.json({
      status: true,
      _id: findUser?._id,
      name: findUser?.name,
      email: findUser?.email,
      role: findUser?.role,
      accessroutes: findUser?.accessroutes,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});

module.exports = {
  createUser,
  loginUser,
  homeRoute,
  homeRouteByID,
  homeRouteByIdAndUpdate,
};
