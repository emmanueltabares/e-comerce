import mongoose from "mongoose";
import config from "../config/config";

const USER = config.MONGO_ATLAS_USER;
const PASS = config.MONGO_ATLAS_PASS;
const CLUSTER = config.MONGO_ATLAS_CLUSTER;
const DB = config.MONGO_ATLAS_DB;

export const connectToDB = async () => {
     const MONGODB_URI = `mongodb+srv://${USER}:${PASS}@${CLUSTER}/${DB}?retryWrites=true&w=majority`; 
    try {
        const conection = await mongoose.connect(MONGODB_URI);

        return conection;
    } catch (error) {
        return error;
    }
}

