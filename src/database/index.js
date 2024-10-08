import mongoose from "mongoose";
import { DB_Name } from "../constant.js";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_Name}`
    );
    console.log(
      `MongoDb connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDb Connection Error", error);
    process.exit(1);
  }
};

export default connectDB;
