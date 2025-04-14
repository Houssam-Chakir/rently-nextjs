import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  // IF Data base already connected, dont connect again
  if (connected) {
    console.log("MongoDB is already connected");
    return
  }

  // Connect to MongoDB
  try {
    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined in the environment variables");
    await mongoose.connect(process.env.MONGODB_URI);

    connected = true;
  } catch (error) {
    console.log("error: ", error);
  }
};

export default connectDB;
