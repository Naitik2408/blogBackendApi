import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js"
import { generatePost, getAllEnablePosts, getPostById } from "../controllers/post.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router()

router.route("/getAllEnablePosts").get(getAllEnablePosts)

router.route("/getPostById/:id").get(getPostById);




export default router