import mongoose from "mongoose";
import { seedAdmin } from "../seed/seedAdmin.js";

export const ConnectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        seedAdmin();
        console.log('mongoDB connected successfully..')
    }catch(err){
        console.error(err.message);
        process.exit(1)
    }
};

