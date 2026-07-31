
import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register Users

export const register = async (req, res) => {
    try {
        const { name, email, mobile, password, role } = req.body;
        if (!name || !email || !mobile || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Fill the all fields required"
            })
        }

        const EmailIdAlready = await User.findOne({ email });
        if (EmailIdAlready) {
            return res.status(401).json({
                status: false,
                message: "Email id Already exits"
            })
        }

        const MobileUnique = await User.findOne({ mobile });
        if (MobileUnique) {
            return res.status(401).json({
                status: false,
                message: "Mobile number Already exits"
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashPassword,
            role,
            mobile
        });

        res.status(201).json({
            status: "success",
            message: "Create the user successfully",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message
        })
    }

}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(401).json({
                success: false,
                message: "All Field required please fill me"
            });
        }

        // find the email 

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invaild email and password"
            });
        }

        // Compare password 
        const PasswordMatched = await bcrypt.compare(password, user.password);
        if (!PasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password"
            });
        }

        // check role
        if (user.role !== role) {
            return res.status(403).json({
                success: false,
                message: "Invaild role"
            });
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successfully",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const profile = async (req, res) => {
    console.log("profile");
}