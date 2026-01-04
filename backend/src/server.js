import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import path from "path";
import router from "./routes/webhook.js";

const app=express();
const __dirname=path.resolve();

app.use(cors());
app.use("/api/webhook", express.raw({ type: "application/json" }), router);
app.use(express.json());

if (ENV.NODE_ENV==="production")
    app.use(express.static(path.join(__dirname,"../frontend/dist")))

const startServer=async ()=>{
    try{
        await connectDB();
        console.log("Backend running on port", ENV.PORT);
        app.listen(ENV.PORT);
    }
    catch(error){
        console.error("Eror starting the server", error);
    }
}

export default app;
startServer();