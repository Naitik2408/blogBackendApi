import dotenv from "dotenv"
import { connectDatabase } from "./database/connection.database.js"
import { app } from "./app.js"



dotenv.config({
    path: './env'
})

connectDatabase()
.then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed in index file !!! ", err);
})