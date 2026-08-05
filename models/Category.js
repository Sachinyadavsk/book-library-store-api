import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide the name of the category"],
    },
    description: {
        type: String,
        required: [true, "Please provide the description of the category"],
    }
}, {
    timestamps: true,
});

const Category = mongoose.model("Category", categorySchema);
export default Category;