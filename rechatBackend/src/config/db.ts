import mongoose from "mongoose";
// import { Error } from "mongoose";
export default async function connectDB() {
  try {
    await mongoose.connect("", {
      dbName: "RealTimeChat",
    });
  } catch (error) {
    process.exit(1);
  }
}
