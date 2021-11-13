import mongoose from "mongoose";
import config from "../config/config";

export const connectToDB = async () => {
     const MONGODB_URI = config.MONGO_SRV; 
    try {
        const conection = await mongoose.connect(MONGODB_URI);

        return conection;
    } catch (error) {
        return error;
    }
}

