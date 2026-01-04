import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    clerkId:{
        type:String,
        required:true,
        unique:true
    },
    profilePicUrl:{
        type:String,
        default:null
    }
},{timeStamps:true})

const User=mongoose.model("User", userSchema);
export default User;