const express = require("express");
const { createUser, loginUser ,homeRoute, homeRouteByID, homeRouteByIdAndUpdate} = require("../controller/admin.controller");
const adminrouter = express.Router();

adminrouter.get("/",homeRoute);
adminrouter.get("/:id",homeRouteByID);
adminrouter.post("/:id",homeRouteByIdAndUpdate)
adminrouter.post("/register", createUser);
adminrouter.post("/login", loginUser);
module.exports = adminrouter;
