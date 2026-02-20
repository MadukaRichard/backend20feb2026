const jwt = require("jsonwebtoken");

const Authmiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Token not found or invalid", status: false }); 
        }

        const token = authHeader.split(" ")[1];
        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(verifiedToken);
        
        req.user ={
            email: verifiedToken.email,
            id: verifiedToken.id
        }

        next();
        
    } catch (error) {
        return res.status(403).json({ message: error.message, status: false }); 
    }
}

module.exports = Authmiddleware;