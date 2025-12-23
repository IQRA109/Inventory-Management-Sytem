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

const deleteCategory = async(req,res) =>{
    try{
        const{id} = req.params;
        const existingCategory = await Category.findById(id);
        if(!existingCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }
        await Category.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Category Deleted Successfully!"
        })
    } catch(error){
        console.error("Error Deleting Category:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

const updateCategory = async(req,res) =>{
    try{
        const{id} = req.params;
        const{categoryName, categoryDescription} = req.body;

        const existingCategory = await Category.findById(id);
        if(!existingCategory){
            return res.status(404).json({
                success: false,
                message: "Category not found"
            })
        }

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            {
                categoryName, categoryDescription
            },
            { new: true }
        )
        return res.status(200).json({
            success: true,
            message: "Category Updated Successfully!"
        })

    } catch(error) {
        console.error("Error Updating Category:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export {addCategory, getCategories, updateCategory, deleteCategory};