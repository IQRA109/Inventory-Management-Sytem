import express from "express";
import { addCategory, getCategories, updateCategory } from "../controllers/categoryController.js";
import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post('/add',authMiddleware, addCategory );
router.get('/',authMiddleware, getCategories );
router.get('/:id',authMiddleware, updateCategory );

export default router;