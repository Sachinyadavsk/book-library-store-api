import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouters from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js'

dotenv.config();
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Book Library Store API");
});

app.use("/api/v2/users", userRouters);
app.use("/api/v2/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});