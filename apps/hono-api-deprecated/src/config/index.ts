import dotenv from 'dotenv';
dotenv.config();

export const jwtSecretKey = process.env.JWT_SECRET || 'secret-key';
export const port = Number(process.env.PORT) || 4000;
export const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['*'];
