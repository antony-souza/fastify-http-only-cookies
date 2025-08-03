import dotenv from 'dotenv';
dotenv.config();

export const environment = {
  apiKey: process.env.API_KEY || 'default-api-key',
  tokenSecret: process.env.TOKEN_SECRET || 'default-secret',
  cookieSecret: process.env.COOKIE_SECRET || 'default-cookie-secret',
  port: parseInt(process.env.PORT || '3000'),
  mongoUrl: process.env.MONGO_URL ?? '',
};
