/*import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.js'
import authRoutes from './routes/auth.js';//authRoutes

const app= express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);//authRoutes

app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log("Server is running on http://localhost:5000")
})
 */
import express from "express";
import cors from "cors";
import connectDB from './db/connection.js'
import authRoutes from './routes/auth.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, "0.0.0.0", () => {
    connectDB();
  console.log(`Server running on port ${PORT}`);
});
