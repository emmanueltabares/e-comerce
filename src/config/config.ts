import dotenv from 'dotenv';

dotenv.config()

export default {
    PORT: process.env.PORT || '8080',
    HOST: process.env.HOST || 'localhost',

    MONGO_SRV: process.env.MONGO_SRV || 'mongosrv',

    SESSION_SECRET: process.env.SESSION_SECRET || 'miSecretKey',
    SESSION_COOKIE_TIMEOUT_MIN: process.env.SESSION_COOKIE_TIMEOUT_MIN
}