import mongoose from "mongoose";

import { ENV } from "./env.js";

export const connectDB = async ()=>{
    try{

        const {OFFLINEMONGO_URI} = ENV;
        if(!OFFLINEMONGO_URI) throw new Error("MONGO_URI is not set")

        const conn = await mongoose.connect(ENV.OFFLINEMONGO_URI);
        // For production, consider using a logger like 'winston' instead of console.log
                console.log(`MongoDB connected successfully. Host: ${conn.connection.host}`);


    }catch(error){
        console.error("MongoDB connection failed:",error);

        console.log(ENV.MONGODB_URI);
        process.exit(1);
    }
};

