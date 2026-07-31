import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startWith("Bearer")) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided"
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User Not found"
            });
        }

        res.user = user;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            messsage: "Invaild or expired token."
        });
    }
};

export default auth;