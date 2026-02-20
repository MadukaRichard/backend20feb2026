const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    username:{type:String,trim:true, required:true},
    email:{type:String,trim:true, required:true, unique:true},
    password:{type:String, trim:true, required:true} 
},{timestamps:true})


const usermodel = mongoose.model("user_collection", userschema)

module.exports = usermodel