import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import articleRoutes from "./routes/articleRoutes.js";


dotenv.config();
const app = express();
app.use(express.json());

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.error(err));

app.use("/api/articles", articleRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server Running On Port http://localhost:${port}`)
})
