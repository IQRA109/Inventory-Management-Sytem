import React, {useState, useEffect} from 'react'
import axios from "axios";


const Suppliers = () => {
    const [addModal, setAddModal] = useState(null);
    const [editSupplier, setEditSupplier] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        number: "",
        address:"",
    });

    const handleChange = (e)=> {
        const {name,value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name] :value ,
        }))
    }

    const handleSubmit= async (e) =>{
        e.preventDefault();
        if(editSupplier)
        {
            try{
                const response = await axios.put(
                    `http://localhost:5000/api/supplier/${editSupplier}`,
                    formData,
                    {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
                        }});
                if(response.data.success){
                    fetchSuppliers();
                    alert("Supplier Edited Successfully..");
                    setAddModal(false);
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                    })
                } else{
                    //console.error("Error adding Supplier:",data);
                    alert("Error Adding Supplier. Please Try Again..")
                }
            } catch(error){
                console.error("Error adding Supplier:",error.message);
                alert("Error Adding Supplier. Please Try Again.")
            }
        }
        else{
            try{
                const response = await axios.post(
                    "http://localhost:5000/api/supplier/add",
                    formData,
                    {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
                        }});
                if(response.data.success){
                    fetchSuppliers()
                    alert("Supplier Added Successfully..");
                    setAddModal(false);
                    setFormData({
                        name: "",
                        email: "",
                        phone: "",
                        address: "",
                    })
                } else{
                    //console.error("Error adding Supplier:",data);
                    alert("Error Adding Supplier. Please Try Again..")
                }
            } catch(error){
                console.error("Error adding Supplier:",error.message);
                alert("Error Adding Supplier. Please Try Again.")
            }
        }
    }

    const [loading, setLoading] = useState(false);
    const [suppliers,setSuppliers] = useState([]);

    const fetchSuppliers= async()=>{
        setLoading(true)
                try{
                    const response = await axios.get("http://localhost:5000/api/supplier",{
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
                        }
                    });
                    setSuppliers(response.data.suppliers);
                } catch(error){
                    console.error("Error fetching suppliers:", error)
                    setLoading(false);
                }

                finally{
                    setLoading(false);
                }
    };
    
    useEffect(()=>{
        fetchSuppliers();
    }, [])

    const handleEdit = (supplier) => {
        setFormData({
        name: supplier.name,
        email: supplier.email,
        number: supplier.number,
        address:supplier.address,
        });
        setEditSupplier(supplier._id);
        setAddModal(true);
    }
    
    const closeModal =() =>{
        setAddModal(false);
        setFormData({
            name : "",
            email : "",
            phone : "",
            address : "",
        })
        setEditSupplier(null);
    }

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold ">Supplier Management</h1>
            <div className="flex justify-between items-center">
                <input type="text" placeholder="Search" className="border p-1 bg-white rounded px-4" />
                <button
                    className="px-4 py-1.5 bg-blue-600 text-white-rounded hover:bg-blue-600 hover:font-bold cursor-pointer"
                    onClick={()=> setAddModal(true)}
                >Add Supplier</button>
            
            </div>

            {loading ? <div> Loading.....</div> :
            (
                <table className= " w-full border-collapse border border-gray-300 mt-4">
                    <thead className= "">
                        <tr className="bg-gray-200">
                            <th className= "border border-gray-300 p-2">Serial No</th>
                            <th className= "border border-gray-300 p-2">Supplier Name</th>
                            <th className= "border border-gray-300 p-2">Email</th>
                            <th className= "border border-gray-300 p-2">Phone Number</th>
                            <th className= "border border-gray-300 p-2">Address</th>
                            <th className= "border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>

                    <tbody className= "">
                        {suppliers.map((supplier, index) =>(
                            <tr key={(supplier._id)}>
                                <td className = "border border-gray-300 p-2 text-center">{index +1}</td>
                                <td className = "border border-gray-300 p-2 text-center">{supplier.name}</td>
                                <td className = "border border-gray-300 p-2 text-center">{supplier.email}</td>
                                <td className = "border border-gray-300 p-2 text-center">{supplier.number}</td>
                                <td className = "border border-gray-300 p-2 text-center">{supplier.address}</td>
                                <td className = "border border-gray-300 p-2 text-center">
                                    <button className ="px-2 py-1 bg-blue-500 text-white rounded cursor-pointer mr-2"
                                        onClick={() => handleEdit(supplier)}>
                                        Edit
                                    </button>
                                    <button className ="px-2 py-1 bg-red-500 text-white rounded cursor-pointer">
                                        Delete
                                    </button>
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            )}

            {addModal && (
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-md w-1/3  relative">
                        <h1 className="text-xl font-bold "> Add Supplier </h1>
                        <button
                            className="absolute top-4 right-4 font-bold text-lg cursor-pointer"
                            onClick={closeModal}
                        >
                            X
                        </button>
                        <form className="flex flex-col gap-4 mt-4" onSubmit={handleSubmit}>
                            <input
                                type = "text"
                                name = "name"
                                value = {formData.name}
                                placeholder="Name"
                                onChange={handleChange}
                                className="border p-1 bg-white rounded px-4"
                                required
                            />
                            <input
                                type = "email"
                                name = "email"
                                value = {formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="border p-1 bg-white rounded px-4"
                            />
                            <input
                                type = "text"
                                name = "number"
                                value = {formData.number}
                                onChange={handleChange}
                                placeholder="Phone No."
                                className="border p-1 bg-white rounded px-4"
                            />
                            <input
                                type = "text"
                                name = "address"
                                value = {formData.address}
                                onChange={handleChange}
                                placeholder="Address"
                                className="border p-1 bg-white rounded px-4"
                            />
                            
                            <div className = "flex space-x-2">
                                <button type = "submit" className= " w-full mt-2 rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600">
                                    {editSupplier ? "Save Changes" : "Add Supplier"}
                                </button>
                        
                                { addModal && (
                                    <button
                                        type="button"
                                        className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                                        onClick={closeModal}
                                    >
                                    Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Suppliers
