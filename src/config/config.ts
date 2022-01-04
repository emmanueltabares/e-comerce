import dotenv from 'dotenv';

dotenv.config();

export default {

    PORT: process.env.PORT || '8080',
    HOST: process.env.HOST || 'localhost',

    MONGO_SRV: process.env.MONGO_SRV || 'mongosrv',

    SESSION_SECRET: process.env.SESSION_SECRET || 'miSecretKey',
    SESSION_COOKIE_TIMEOUT_MIN: Number(process.env.SESSION_COOKIE_TIMEOUT_MIN),

    ETHEREAL_NAME: process.env.ETHEREAL_NAME || 'GMAIL owner name',
    ETHEREAL_EMAIL: process.env.ETHEREAL_EMAIL || 'email@gmail.com',
    ETHEREAL_PASSWORD: process.env.ETHEREAL_PASSWORD || 'password',

    TOKEN_KEEP_ALIVE: process.env.TOKEN_KEEP_ALIVE || 6000,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secretKey'
}