const express = require("express")
const app = express()
require("dotenv").config()
const connect = require("./database/db.config")
const userrouter = require("./route/user.route")


// middleware
app.use(express.json())
app.use("/", userrouter)







connect()
const port = 5000
app.listen(port,()=>{
 console.log(`app started at port ${port}`);
 
})