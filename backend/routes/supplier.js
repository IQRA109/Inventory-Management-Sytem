import express from "express";
import {addSupplier, getSuppliers} from "../controllers/supplierController.js"

import authMiddleware from "../middleware/authMiddleware.js"

const router = express.Router();

router.post('/add',authMiddleware, addSupplier );
router.get('/',authMiddleware, getSuppliers );
//router.put('/:id',authMiddleware, updateCategory );
//router.delete('/:id',authMiddleware, deleteCategory );

export default router;