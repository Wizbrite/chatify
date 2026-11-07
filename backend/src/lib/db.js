import mongoose from "mongoose";

import dotenv from "dotenv";

dotenv.config();

export const connectDB = async ()=>{
    try{

        const {OFFLINEMONGO_URI} = process.env;
        if(!OFFLINEMONGO_URI) throw new Error("MONGO_URI is not set")

        const conn = await mongoose.connect(process.env.OFFLINEMONGO_URI);
        // For production, consider using a logger like 'winston' instead of console.log
                console.log(`MongoDB connected successfully. Host: ${conn.connection.host}`);


    }catch(error){
        console.error("MongoDB connection failed:",error);

        console.log(process.env.MONGODB_URI);
        process.exit(1);
    }
};

