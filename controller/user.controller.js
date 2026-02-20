const usermodel = require("../model/user.model")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
      const hashedPassword = await bcryptjs.hash(password, 10)
      console.log(hashedPassword);
      
      const createduser = await usermodel.create({
        username,
        email,
        password: hashedPassword
      })
      if (createduser) {
           return res.status(200).json({message:"user signup successful", status:true}) 
      }
    } catch (error) {
     return res.status(500).json({message:error.message, status:false}) 
    }
}

const login = async(req, res) =>{
    try {
        const {email, password} = req.body
if (!email || !password) {
    return res.status(400).json({message:"All fields are mandatory", status:false}) 
    }
   const existuser =  await usermodel.findOne({email})
   console.log(existuser);
if (!existuser) {
    return res.status(400).json({message:"user not found, please signup", status:false}) 
}
   const correctpassword = await bcryptjs.compare(password, existuser.password)
   
   if (existuser&& correctpassword) {
    console.log(process.env.JWT_SECRET_KEY);
    const token = await jwt.sign({email,id:existuser._id},process.env.JWT_SECRET_KEY||dodomido , {expiresIn:"7d"})
    
    return res.status(200).json({message:"user login successful", status:true,token})
   }  
   return res.status(400).json({message:"invalid credential", status:false}) 
}
   catch (error) {
     return res.status(500).json({message:error.message, status:false}) 
   }
}
const verifytoken = async(req, res) =>{
    try {
        console.log(req.user);
        const {email, id} = req.user
        const existuser = await usermodel.findById(id).select("-password")
        console.log(existuser);
        if(existuser){
            return res.status(200).json({message:"token verified", status:true, user:existuser})
        }
        
    } catch (error) {
        return res.status(500).json({message:error.message, status:false})
    }
}

module.exports = {signup, login,verifytoken}