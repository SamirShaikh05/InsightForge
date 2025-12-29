import mongoose from "mongoose";
import dotenv from "dotenv";
import scrapeBeyondChats from "./scrapeBeyondChats.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("MongoDB connected for scraping");
  await scrapeBeyondChats();
  console.log("Scraping done");
  process.exit();
});
