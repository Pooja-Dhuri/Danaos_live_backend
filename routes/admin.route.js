const express = require("express");
const { createUser, loginUser ,homeRoute} = require("../controller/admin.controller");
const adminrouter = express.Router();

adminrouter.get("/",homeRoute)
adminrouter.post("/register", createUser);
adminrouter.post("/login", loginUser);
module.exports = adminrouter;
