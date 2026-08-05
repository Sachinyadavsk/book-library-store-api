import express from "express";
import auth from "../middleware/auth.js";
import { getUsers } from "../controllers/userController.js";


const router = express.Router();
router.get("/get-all-users", getUsers);

export default router;