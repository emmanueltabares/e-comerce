import dotenv from 'dotenv';

dotenv.config()

export default {
    PORT: process.env.PORT || '8080',
    HOST: process.env.HOST || 'localhost',

    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER,
    MONGO_ATLAS_PASS: process.env.MONGO_ATLAS_PASS,
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER,
    MONGO_ATLAS_DB: process.env.MONGO_ATLAS_DB,

    MONGO_DB: process.env.MONGO_DB,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_DB_PORT: process.env.MONGO_DB_PORT,

    SESSION_SECRET: process.env.SESSION_SECRET,
    SESSION_COOKIE_TIMEOUT_MIN: process.env.SESSION_COOKIE_TIMEOUT_MIN
}