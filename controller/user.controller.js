const usermodel = require("../model/user.model")
const bcryptjs = require("bcryptjs")

const signup =  async(req, res) =>{
    try {
        const {username , email, password} = req.body
        if (!username || !email || !password) {
           return res.status(400).json({message:"All fields are mandatory", status:false}) 
        }
       const existuser =  await usermodel.findOne({email})
       if (existuser) {
           return res.status(400).json({message:"user already exist", status:false}) 
       }
      const hashedPassword = await bcryptjs(password, 10)
      console.log(hashedPassword);
      
      const createduser = await usermodel.create(req.body)
      if (createduser) {
           return res.status(200).json({message:"user signup successful", status:true}) 
      }
    } catch (error) {
     return res.status(500).json({message:error.message, status:false}) 
    }
}

module.exports = {signup}