import Category from "../models/Category.js";


const addCategory= async(req, res)=>{
    try{
        const {categoryName, categoryDescription} = req.body;

        console.log("Incoming Data:", req.body);

        if (!categoryName || !categoryDescription) {
            return res.status(400).json({
                success: false,
                message: "Category name and description are required."
            });
        }

        const existingCategory= await Category.findOne({categoryName});

        if(existingCategory){
            return res.status(400).json({
                success: false,
                message: "Category Already Exists."
            })
        }

        const newCategory = new Category({
            categoryName,
            categoryDescription,
        })

        await newCategory.save();
        return res.status(201).json({
            success: true,
            message: "Category Added Successfully"
        })
    } catch(error){
        console.error("error Adding Category: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

const getCategories = async(req, res)=>{
    try{
        const categories = await Category.find();
        return res.status(200).json({
            success: true,
            categories
        })

    } catch(error){
        console.error("Error fetching Categories: ", error);
        return res.status(500).json({
            success: false,
            message: "server error in categories"
        })
    }
}

export {addCategory, getCategories};