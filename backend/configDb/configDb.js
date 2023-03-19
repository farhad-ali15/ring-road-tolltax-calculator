import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/tollRecord");
    console.log("Database connected");
  } catch (err) {
    console.error("Error connecting to database", err);
  }
};

export default dbConnect;
