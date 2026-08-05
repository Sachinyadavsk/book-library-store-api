import User from '../models/User.js';
import Book from '../models/Book.js';
import Borrow from '../models/Borrow.js';
import Order from '../models/Order.js';

export const adminDashboard = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBooks = await Book.countDocuments();
        const totalBorrows = await Borrow.countDocuments();
        const totalReturns = await Borrow.countDocuments({ returned: true });
        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalBooks,
                totalBorrows,
                totalReturns
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const userDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        const totalBorrows = await Borrow.countDocuments({ userId });
        const totalReturns = await Borrow.countDocuments({ userId, returned: true });
        res.status(200).json({
            success: true,
            data: {
                totalBorrows,
                totalReturns
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getStatistics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalBooks = await Book.countDocuments();
        const totalBorrows = await Borrow.countDocuments();
        const totalReturns = await Borrow.countDocuments({ returned: true });
        res.status(200).json({
            success: true,
            data: {
                totalUsers,
                totalBooks,
                totalBorrows,
                totalReturns
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getRecentOrders = async (req, res) => {
    try {
        const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5).populate('userId', 'name').populate('bookId', 'title');
        res.status(200).json({
            success: true,
            data: recentOrders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getTopBooks = async (req, res) => {
    try {
        const topBooks = await Borrow.aggregate([
            {
                $group: {
                    _id: "$bookId",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "book"
                }
            },
            {
                $unwind: "$book"
            }
        ]);
        res.status(200).json({
            success: true,
            data: topBooks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
