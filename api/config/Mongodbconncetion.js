import mongoose from 'mongoose';
import dotenv from 'dotenv';
//========================================= config
dotenv.config();

//-========================================== Mongo db connncetion
const mongoDBconnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_SERVER);
    console.log(`Mongo DB conncetion Succesfully !`.bgGreen.black);
  } catch (error) {
    console.log(error.message);
  }
};

export default mongoDBconnection;
