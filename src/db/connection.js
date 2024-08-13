import 'dotenv/config.js';
import { connect } from 'mongoose';
import MongoStore from "connect-mongo";
import logger from '../utils/logger.js';

export const initMongoDB = async () => {
  try {
    await connect(process.env.MONGO_ATLAS_URL || process.env.MONGO_LOCAL_URL);
    logger.info('Conectado a la base de datos de MongoDB');
  } catch (error) {
    throw new Error(error);
  }
};

export const storeConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_ATLAS_URL || process.env.MONGO_LOCAL_URL,
    crypto: { secret: process.env.SECRET_KEY || "" },
    ttl: 180,
  }),
  secret: process.env.SECRET_KEY || "",
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 180000 },
};