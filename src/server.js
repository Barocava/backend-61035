import 'dotenv/config';
import express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import { initMongoDB, storeConfig } from './db/connection.js';
import MainRouter from './routes/index.js';
const mainRouter = new MainRouter();
import cookieParser from "cookie-parser";
import session from "express-session";
import logger, { addLogger } from './utils/logger.js';

const app = express();

app
    .use(json())
    .use(urlencoded({ extended: true }))
    .use(addLogger)
    .use(morgan('dev'))
    .use(cookieParser())
    .use(session(storeConfig))
    .use('/api', mainRouter.getRouter())
    .use(errorHandler)
    
const PERSISTENCE = process.env.PERSISTENCE;

if(PERSISTENCE === 'MONGO') initMongoDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=>logger.info(`Server OK PORT: ${PORT}`));