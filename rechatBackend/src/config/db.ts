import mongoose from "mongoose";
// import { Error } from "mongoose";
export default async function connectDB() {
  try {
    await mongoose.connect(
      "mongodb+srv://margamvinay:vinay756@vinay.tch0oea.mongodb.net/?retryWrites=true&w=majority&appName=vinay",
      {
        dbName: "RealTimeChat",
      }
    );
  } catch (error) {
    process.exit(1);
  }
}
