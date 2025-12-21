import jwt from "jsonwebtoken";
import User from "../models/User.js";




const authMiddleware= async(req, res, next) =>{
    try{
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token provided or unauthorized access."
            });
        }
        const token= authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({
                success: false,
                message: "Invalid Token.."
            })
        }

        const user = await User.findById({_id: decoded.id});

        if(!user){
            return res.json(401).json({
                success: false,
                message: "user Not Found."
            })
        }
        req.user= user;
        next();
    } catch(error){
        console.log("Error in Middleware:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token Expired. Please login again." });
        }
        return res.status(500).json({
            success: false,
            message: "Internal Server Error in Middleware."
        })
    }
}

export default authMiddleware;