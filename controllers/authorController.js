import Author from '../models/Author.js';

export const getAuthors = async (req, res) => {
    try {
        const authors = await Author.find();
        res.status(200).json({
            success: true,
            message: "Authors fetched successfully",
            authors
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getAuthorById = async (req, res) => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Author fetched successfully",
            author
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const createAuthor = async (req, res) => {
    try {
        const { name, bio, slug } = req.body;
        const newAuthor = new Author({ name, bio, slug });
        await newAuthor.save();
        res.status(201).json({
            success: true,
            message: "Author created successfully",
            author: newAuthor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateAuthor = async (req, res) => {
    try {
        const { name, bio } = req.body;
        const updatedAuthor = await Author.findByIdAndUpdate(req.params.id, { name, bio }, { new: true });
        if (!updatedAuthor) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Author updated successfully",
            author: updatedAuthor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteAuthor = async (req, res) => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) {
            return res.status(404).json({
                success: false,
                message: "Author not found"
            });
        }
        res.status(200).json({
            success: true,
            message: "Author deleted successfully",
            author: deletedAuthor
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
