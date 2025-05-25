import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app = express();

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Database connection failed: ", error);
    process.exit(1);
  }
}

main().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
