import mongoStore from "connect-mongo";
import dotenv from 'dotenv';

dotenv.config({path:"../.env"});

export const configSession = {
    store: new mongoStore({
        mongoUrl: process.env.MONGO_URL,
        //crypto: { secret: process.env.SECRET_KEY },
        ttl: 180,
    }),
    secret: process.env.SECRET_KEY,
    resave: false, // va en false ?
    saveUninitialized: true,
    cookie: { maxAge: 180000 }
  };