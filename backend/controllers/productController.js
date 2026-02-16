import Supplier from "../models/Supplier.js"
import Category from "../models/Category.js"
import Product from "../models/Product.js";


const getProducts = async(req,res) =>{
    try{
        const products = await Product.find()
            .populate('category')
            .populate('supplier');
            
        res.status(200).json({ success: true, products });

    } catch(error){
        console.error("Error fetching Suppliers: ", error);
        return res.status(500).json({
            success: false,
            message: "server error in suppliers"
        })
    }
}

const addProduct= async(req, res)=>{
    try{
        const {name, description, price, stock, category, supplier} = req.body;

        

        const newProduct = new Product({
            name,
            description, price, stock, category, supplier
        })

        await newProduct.save();
        return res.status(201).json({
            success: true,
            message: "Product Added Successfully"
        })
    } catch(error){
        console.error("error Adding Product: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export {getProducts, addProduct};
