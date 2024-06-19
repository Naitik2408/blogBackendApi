import { Router } from "express";
import { upload } from "../middleware/multer.middleware.js";
import { deletePost, enableOrDesablePosts, getAllPosts } from "../controllers/post.controller.js";
import { generatePost } from "../controllers/post.controller.js";
import { getAllUsers } from "../controllers/user.controller.js";


const router = Router()

router.route("/generatePost").post( 
    upload.fields([
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    generatePost
)

router.route("/enableOrDesablePost").post(enableOrDesablePosts)

router.route("/getAllPosts").get(getAllPosts)

router.route("/deletePost").post(deletePost)

router.route("/getAllUsers").get(getAllUsers)

// router.route('/deleteUser').post()


export default router