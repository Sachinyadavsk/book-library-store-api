import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from 'cors';

// routes path 
import userRouters from './routes/userRoutes.js';
import authRoutes from './routes/authRoutes.js';
import AuthorRoutes from './routes/authorRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import borrowRoutes from './routes/borrowRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import reportRoutes from './routes/reportRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js'

dotenv.config();
const app = express();
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://book-library-store.vercel.app",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Book Library Store API");
});

app.use("/api/v2/users", userRouters);
app.use("/api/v2/auth", authRoutes);
app.use("/api/v2/author", AuthorRoutes);
app.use("/api/v2/book", bookRoutes);
app.use("/api/v2/borrow", borrowRoutes);
app.use("/api/v2/cart", cartRoutes);
app.use("/api/v2/category", categoryRoutes);
app.use("/api/v2/dashboard", dashboardRoutes);
app.use("/api/v2/notification", notificationRoutes);
app.use("/api/v2/order", orderRoutes);
app.use("/api/v2/report", reportRoutes);
app.use("/api/v2/review", reviewRoutes);
app.use("/api/v2/setting", settingsRoutes);
app.use("/api/v2/wishlist", wishlistRoutes);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});