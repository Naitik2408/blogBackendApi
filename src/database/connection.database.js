import mongoose from "mongoose";
import { DATABASE_NAME } from "../constant.js";



export const connectDatabase = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_CONNECTION_URL}/${DATABASE_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`mongodb connection get faild while connecting ${error}`);
        process.exit(1)
    }
}

