import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Comment } from "../models/comments.models.js"
import { response } from "express";


const generateComment = asyncHandler(async(req, res)=>{
    const { content, postId } = req.body

    if(!content || !postId){
        throw new apiError(400, "All fields are required")
    }

    const comment = await Comment.create({
        postId, 
        userId: req.user._id,
        content
    })

    console.log(comment)

    return res
    .status(200)
    .json(new apiResponse(
        200, 
        comment,
        "Comment created sucessfully"
    ))

})


export {
    generateComment
}