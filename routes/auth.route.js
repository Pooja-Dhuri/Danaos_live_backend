const express = require("express");
const { createUser, loginUserCtrl } = require("../controller/auth");
const mgmtrouter = express.Router();

mgmtrouter.post("/register", createUser);
mgmtrouter.post("/login", loginUserCtrl);
module.exports = mgmtrouter;
