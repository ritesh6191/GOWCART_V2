import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const verifyJWT = async(req, res, next) => {

   try {
    const token = req.cookies?.accessToken;
 
    if(!token){
     return res.status(401).json({message : "Unauthorized Request"});
    }
 
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
 
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
 
    if(!user) return res.status(401).json({message: "Invalid Access Token"})
 
     req.user = user;
     next();
   } catch (error) {
        console.error("Error While Verifying The User:", error);
        return res.status(401).json({message: "Invalid Access Token"});
   }

}