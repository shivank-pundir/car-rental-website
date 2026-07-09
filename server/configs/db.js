import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.ATLASDB_URL, {
      dbName: "car-rental",
    });

    console.log("✅ Database connected");
    console.log("Database Name:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;