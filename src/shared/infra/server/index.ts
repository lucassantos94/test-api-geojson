import app from './app';
import dotenv from 'dotenv';
if (process.env.NODE_ENV === 'development') dotenv.config();
export default app;
