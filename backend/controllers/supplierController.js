import Supplier from "../models/Supplier.js";


const addSupplier= async(req, res)=>{
    try{
        const {name, email, number, address} = req.body;

        const existingSupplier= await Supplier.findOne({email});

        if(existingCategory){
            return res.status(400).json({
                success: false,
                message: "Supplier Already Exists."
            })
        }

        const newSupplier = new Supplier({
            name,
            email,
            number,
            address,
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

export {addSupplier};