import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "TaskManager",
    });
    console.log("successfully connected with database", connection.connection.name);
  } catch (error) {
    console.log("failed to connect with database", error);
  }
};
