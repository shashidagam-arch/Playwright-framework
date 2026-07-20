import dotenv from 'dotenv';

dotenv.config({
    path: `.env.${process.env.ENV || 'qa'}`
});

export const ENV = {
    BASE_URL: process.env.BASE_URL!,
    USERNAME: process.env.USERNAME!,
    PASSWORD: process.env.PASSWORD!
};