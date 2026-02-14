import Supplier from "../models/Supplier.js"
import Category from "../models/Category.js"


const getProducts = async(req,res) =>{
    try{
        const suppliers = await Supplier.find();
        const categories = await Category.find();
        return res.status(200).json({
            success: true,
            suppliers,
            categories
        })

    } catch(error){
        console.error("Error fetching Suppliers: ", error);
        return res.status(500).json({
            success: false,
            message: "server error in suppliers"
        })
    }
}

export {getProducts};
