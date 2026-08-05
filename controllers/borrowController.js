import Borrow from '../models/Borrow.js';

export const borrowBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;
        const borrow = await Borrow.create({ userId, bookId });
        res.status(201).json({
            success: true,
            message: "Book borrowed successfully",
            borrow
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const returnBook = async (req, res) => {
    try {
        const { borrowId } = req.params;
        const borrow = await Borrow.findById(borrowId);
        if (!borrow) {
            return res.status(404).json({
                success: false,
                message: "Borrow record not found"
            });
        }
        await Borrow.findByIdAndDelete(borrowId);
        res.status(200).json({
            success: true,
            message: "Book returned successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const renewBook = async (req, res) => {
    try {
        const { borrowId } = req.params;
        const borrow = await Borrow.findById(borrowId);
        if (!borrow) {
            return res.status(404).json({
                success: false,
                message: "Borrow record not found"
            });
        }
        // Renew book logic here
        res.status(200).json({
            success: true,
            message: "Book renewed successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBorrowHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const borrowHistory = await Borrow.find({ userId });
        res.status(200).json({
            success: true,
            history: borrowHistory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBorrowedBooks = async (req, res) => {
    try {
        const { userId } = req.params;
        const borrowedBooks = await Borrow.find({ userId, returnDate: null });
        res.status(200).json({
            success: true,
            books: borrowedBooks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const calculateFine = async (req, res) => {
    try {
        const { borrowId } = req.params;
        const borrow = await Borrow.findById(borrowId);
        if (!borrow) {
            return res.status(404).json({
                success: false,
                message: "Borrow record not found"
            });
        }
        // Fine calculation logic here
        res.status(200).json({
            success: true,
            fine: calculatedFine
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
