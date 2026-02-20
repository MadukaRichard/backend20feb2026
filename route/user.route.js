const express = require("express")
const userrouter = express.Router()
const {signup} = require("../controller/user.controller")

userrouter.post("/signup",signup)


module.exports = userrouter