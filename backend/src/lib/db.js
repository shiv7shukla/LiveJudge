import mongoose from "mongoose";
import { ENV } from './env.js';

export const connectDB=async ()=>{
    try{
        await mongoose.connect(ENV.DB_URL);
    }
    catch(error){
        console.error("Error connecting to databse", error);
    }
}