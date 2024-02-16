import mongoose from "mongoose";

let isConnected: boolean = false;
export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("Mongo is connected");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URL || "");
    isConnected = true;
    console.log("Mongo is connected");
  } catch (err) {
    console.log(err);
  }
};
