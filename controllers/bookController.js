import Book from '../models/bookModel.js';
import Order from '../models/Order.js';

export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            success: true,
            message: "Books fetched successfully",
            books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Book fetched successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const addBook = async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(201).json({
            success: true,
            message: "Book added successfully",
            book: newBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            book: deletedBook
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const searchBooks = async (req, res) => {
    try {
        const { title, author, genre } = req.query;
        const searchCriteria = {};

        if (title) {
            searchCriteria.title = { $regex: title, $options: "i" };
        }
        if (author) {
            searchCriteria.author = { $regex: author, $options: "i" };
        }
        if (genre) {
            searchCriteria.genre = { $regex: genre, $options: "i" };
        }

        const books = await Book.find(searchCriteria);
        res.status(200).json({
            success: true,
            message: "Books searched successfully",
            books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getFeaturedBooks = async (req, res) => {
    try {
        const featuredBooks = await Book.find({ isFeatured: true });
        res.status(200).json({
            success: true,
            message: "Featured books fetched successfully",
            books: featuredBooks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getLatestBooks = async (req, res) => {
    try {
        const latestBooks = await Book.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json({
            success: true,
            message: "Latest books fetched successfully",
            books: latestBooks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBestSellerBooks = async (req, res) => {
    try {
        const bestSellerBooks = await Book.find().sort({ sales: -1 }).limit(10);
        res.status(200).json({
            success: true,
            message: "Best seller books fetched successfully",
            books: bestSellerBooks
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBooksByCategory = async (req, res) => {
    try {
        const category = req.params.category;
        const booksByCategory = await Book.find({ category: category });
        res.status(200).json({
            success: true,
            message: "Books by category fetched successfully",
            books: booksByCategory
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBooksByAuthor = async (req, res) => {
    try {
        const author = req.params.author;
        const booksByAuthor = await Book.find({ author: author });
        res.status(200).json({
            success: true,
            message: "Books by author fetched successfully",
            books: booksByAuthor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getBooksByPriceRange = async (req, res) => {
    try {
        const { minPrice, maxPrice } = req.query;
        const booksByPriceRange = await Book.find({
            price: {
                $gte: minPrice,
                $lte: maxPrice
            }
        });
        res.status(200).json({
            success: true,
            message: "Books by price range fetched successfully",
            books: booksByPriceRange
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const uploadBookImage = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found"
            });
        }
        // Handle image upload logic here
        res.status(200).json({
            success: true,
            message: "Book image uploaded successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
