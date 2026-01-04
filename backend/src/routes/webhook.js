import express from "express";
import User from "../models/User.js";
import { Webhook } from "svix";
import { ENV } from "../lib/env.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const payload = req.body.toString();

    const headers = {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"],
    };

    const wh = new Webhook(ENV.WEBHOOK_SECRET);

    let evt;
    
    const eventType=evt.type;
    const {id, email_addresses, username, }=evt.data
    try {
        evt = wh.verify(payload, headers);
    } catch (err) {
        return res.status(400).json({ error: "Invalid signature" });
    }


    switch(eventType) {
        case "user.created":
            try{
                const existingUser = await User.findOne({ clerkUserId: id });
                if (existingUser)
                    res.status(409).json({msg:"user already exists"});
                else{
                    await User.create({
                        username:username, 
                        clerkId:id, 
                        email:email_addresses[0].email_address
                    });
                    res.status(200).json({ msg: "new user created" });
                }
            }
            catch(e){
                console.err("error while creating new user", e);
            }
            break;
        case "user.deleted":
            try{
                await User.deleteOne({clerkId:id}, {
                    username:username, 
                    email:email_addresses[0].email_address
                });
                res.status(200).json({ msg: "user deleted" });
            }
            catch(e){
                console.err("error while deleting a user", e);
            }
            break;
        case "user.updated":
            try{
                await User.updateOne({clerkId:id}, {
                    username:username, 
                    email:email_addresses[0].email_address
                });
                res.status(200).json({ msg: "user updated" });
            }
            catch(e){
                console.err("error while updating a user", e);
            }
            break;
    }
});

export default router;