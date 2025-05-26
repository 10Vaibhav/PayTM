import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./routes/index.js"
import cors from "cors";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1',router); 

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
