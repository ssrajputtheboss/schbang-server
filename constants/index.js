import dotenv from 'dotenv';
dotenv.config();
export const PORT = process.env.PORT || 4000;
export const SECRET = process.env.SECRET || 'secret';
export const DB_URL = process.env.DB_URL;
