import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'your_default_secret_key',
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'your_default_refresh_secret_key',
  ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || '15m',
  REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '7d',
  MONGO_URI: process.env.MONGO_URI || 'mongodb_url_with_username_password',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  PORT: process.env.PORT || 3000,
};
