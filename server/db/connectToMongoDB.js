import mongoose from "mongoose";

const connectToMongoDB = async () => {
  const uri = process.env.MONGO_DB_URI;
  console.log("MongoDB URI:", uri); // Check if this logs the correct URI

  if (!uri) {
    throw new Error("MONGO_DB_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    throw error;
  }
};

export default connectToMongoDB;
