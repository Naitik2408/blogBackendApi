import { apiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import { User } from "../models/users.models.js";

const verifyJWT = asyncHandler(async(req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        console.log("This is token : ", token)


        if (!token) {
            throw new apiError(401, "Unauthorized request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new apiError(401, "Invalid Access Token")
        }

    
        req.user = user;
        next()
    } catch (error) {
        throw new apiError(401, error?.message || "Invalid access token")
    }
    
})

const isAdmin = asyncHandler(async (req, res, next)=>{
    try {

        console.log("This is reqest user", req.user)
        const user = await User.findById(req.user?._id)

        if(!user){
            throw new apiError(400, "No such user exist in admin page")
        }

        console.log("This is user: ", user);
        console.log("This is user role: ", user.role)
        if(user.role !== "admin"){
            throw new apiError(400, "Only admin can access this link")
        }

        console.log("You are a admin")
        next()
    } catch (error) {
        throw new apiError(401, error?.message || "You are not a admin")   
        next()
    }
})


export {
    verifyJWT,
    isAdmin
}