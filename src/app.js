import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

// const allowedOrigins = ['http://localhost:5173', 'http://example.com']; 

app.use(cors({
    // origin: process.env.CORS_ORIGIN,
    origin: true,
    // origin: function (origin, callback) {
    //     if (!origin || allowedOrigins.includes(origin)) {
    //         callback(null, true); // Reflect the requested origin, if it's allowed
    //     } else {
    //         callback(new Error('Not allowed by CORS'));
    //     }
    // },
    credentials: true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from "./routers/user.router.js"
import postRouter from "./routers/post.router.js"
import adminRouter from "./routers/admin.router.js"
import { isAdmin, verifyJWT } from "./middleware/auth.middleware.js"


app.use("/api/v1/users", userRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/admin",verifyJWT, isAdmin, adminRouter)




export { app }