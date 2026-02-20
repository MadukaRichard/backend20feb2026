const express = require("express")
const userrouter = express.Router()
const {signup,login, verifytoken} = require("../controller/user.controller")
const Authmiddleware = require("../middleware/Authmiddleware")
userrouter.post("/signup",signup)
userrouter.post("/login",login)
userrouter.get("/verifytoken",Authmiddleware,verifytoken)

module.exports = userrouter