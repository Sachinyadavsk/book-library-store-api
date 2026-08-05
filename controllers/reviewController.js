import Review from '../models/reviewModel.js';

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find();
        res.status(200).json({
            success: true,
            reviews: reviews
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const addReview = async (req, res) => {
    try {
        const { bookId, userId, rating, comment } = req.body;
        const review = new Review({
            bookId,
            userId,
            rating,
            comment
        });
        await review.save();
        res.status(201).json({
            success: true,
            message: "Review added successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const { rating, comment } = req.body;
        const review = await Review.findByIdAndUpdate(reviewId, { rating, comment }, { new: true });
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Review updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findByIdAndDelete(reviewId);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Review deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const approveReview = async (req, res) => {
    try {
        const { reviewId } = req.params;
        const review = await Review.findByIdAndUpdate(reviewId, { approved: true }, { new: true });
        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Review approved successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
