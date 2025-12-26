import express from "express";
import cors from "cors";
import connectDB from './db/connection.js'
import authRoutes from './routes/auth.js';
import dotenv from "dotenv";
dotenv.config();
import categoryRoutes from "./routes/category.js";
import supplierRoutes from "./routes/supplier.js"


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/supplier", supplierRoutes);

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
    connectDB();
  console.log(`Server running on port ${PORT}`);
});
