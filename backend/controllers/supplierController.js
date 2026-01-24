import Supplier from "../models/Supplier.js";


const addSupplier= async(req, res)=>{
    try{
        const {name, email, phone, address, product} = req.body;

        const existingSupplier= await Supplier.findOne({email});

        if(existingSupplier){
            return res.status(400).json({
                success: false,
                message: "Supplier Already Exists."
            })
        }

        const newSupplier = new Supplier({
            name,
            email,
            phone,
            address,
            product,
        })

        await newSupplier.save();
        return res.status(201).json({
            success: true,
            message: "Supplier Added Successfully"
        })
    } catch(error){
        console.error("error Adding Supplier: ", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

const getSuppliers = async(req,res) =>{
    try{
        const suppliers = await Supplier.find();
        return res.status(200).json({
            success: true,
            suppliers
        })

    } catch(error){
        console.error("Error fetching Suppliers: ", error);
        return res.status(500).json({
            success: false,
            message: "server error in suppliers"
        })
    }
}

const updateSupplier = async(req,res) =>{
    try{
        const{id} = req.params;
        const{name, email, phone, address, product} = req.body;

        const existingSupplier = await Supplier.findById(id);
        if(!existingSupplier){
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            })
        }

        const updatedSupplier = await Supplier.findByIdAndUpdate(
            id,
            { name, email, phone, address, product },
            { new: true }
        )
        return res.status(200).json({
            success: true,
            message: "Supplier Updated Successfully!"
        })

    } catch(error) {
        console.error("Error Updating Supplier:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

const deleteSupplier = async(req,res) =>{
    try{
        const{id} = req.params;
        const existingSupplier = await Supplier.findById(id);
        if(!existingSupplier){
            return res.status(404).json({
                success: false,
                message: "Supplier not found"
            })
        }
        await Supplier.findByIdAndDelete(id);
        return res.status(200).json({
            success: true,
            message: "Supplier Deleted Successfully!"
        })
    } catch(error){
        console.error("Error Deleting Supplier:", error);
        return res.status(500).json({
            success: false,
            message: "Server Error"
        })
    }
}

export {addSupplier, getSuppliers, updateSupplier, deleteSupplier};