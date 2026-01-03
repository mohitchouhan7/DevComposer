
const jwt = require('jsonwebtoken');

const authenticate = (req,res,next)=>{
    const token = req.cookies.authToken;
    console.log(req.cookies); 
    if(!token){
        return res.status(401).json({error:"no token"});
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = data.id;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};
const generateToken = (data)=>{
        const token = jwt.sign(data,process.env.JWT_SECRET,{expiresIn:'1h'});
        return token;
}
module.exports = {authenticate,generateToken};
