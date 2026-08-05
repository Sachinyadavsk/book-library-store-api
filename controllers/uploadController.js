import multer from 'multer';
import cludinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import User from '../models/User';
import Book from '../models/Book';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const uploadImage = async (req, res) => {

}

export const uploadBookCover = async (req, res) => {

}

export const deleteImage = async (req, res) => {

}