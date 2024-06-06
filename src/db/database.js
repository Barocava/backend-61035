import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({path:"../.env"});

const connectionString = `mongodb+srv://${process.env.user}:${process.env.pass}@cluster0.vjbxxzu.mongodb.net/ecommerce`;

export const initMongoDB = async() => {
  try {
    await mongoose.connect(connectionString);
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
}
