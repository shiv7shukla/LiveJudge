import dotenv from "dotenv";

dotenv.config({quiet:true});

export const ENV={
    PORT:process.env.PORT, 
    DB_URL:process.env.DB_URL, 
    NODE_ENV:process.env.NODE_ENV, 
    VITE_CLERK_PUBLISHABLE_KEY:process.env.VITE_CLERK_PUBLISHABLE_KEY, 
    WEBHOOK_SECRET:process.env.WEBHOOK_SECRET, 
    ACCESS_KEY_ID:process.env.ACCESS_KEY_ID, 
    SECRET_ACCESS_KEY_ID:process.env.SECRET_ACCESS_KEY_ID, 
    S3_API:process.env.S3_API
};