import mongoose from "mongoose";

export default class DBConnection {
  static async connect() {
    try {
      console.log("Connection in progress ...");
      await mongoose.connect(process.env.DATABASE_URL as string);
      console.log("Connected !");
    } catch (error) {
      console.log("Error connecting to database:", error);
    }
  }
}
