import axios from 'axios';
import React, {useState, useEffect} from 'react'


const Products = () => {
    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const[suppliers, setSuppliers] = useState([]);
    const [editProduct, setEditProduct] = useState(null);

    const fetchProducts = async() =>{
                try{
                    const response = await axios.get("http://localhost:5000/api/products",{
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
                        }
                    });
                    setSuppliers(response.data.suppliers || []);
                    setCategories(response.data.categories || []);
                } catch(error){
                    console.error("Error fetching suppliers:", error)
                }
    }
    useEffect(() =>{
        fetchProducts();
    }, [])

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <h1 className="text-2xl font-bold ">Product Management</h1>
            <div className="flex justify-between items-center">
                <input type="text" placeholder="Search" className="border p-1 bg-white rounded px-4"
                //    onChange={handleSearch}
                />
                <button
                    className="px-4 py-1.5 bg-blue-600 text-white-rounded hover:bg-blue-600 hover:font-bold cursor-pointer"
                    onClick={() => setOpenModal(true)}
                    >Add Product</button>
            </div>

            { openModal &&(
                <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
                    <div className="bg-white p-4 rounded shadow-md w-1/3  relative">
                        <h1 className="text-xl font-bold "> {editProduct ? "Edit Product" : "Add Product"} </h1>
                        <button
                            className="absolute top-4 right-4 hover:font-bold text-lg cursor-pointer text-red-500"
                            onClick={() => {
                                setOpenModal(false);
                                setEditProduct(null);
                            }}
                        >
                            X
                        </button>
                        <form className="flex flex-col gap-4 mt-4">
                        
                            <input
                                type = "text"
                                name = "name"
                               // value = {formData.name}
                                placeholder="Name"
                                //onChange={handleChange}
                                className="border p-1 bg-white rounded px-4"
                                required
                            />
                            <input
                                type = "email"
                                name = "description"
                                //value = {formData.email}
                                //onChange={handleChange}
                                placeholder="Description"
                                className="border p-1 bg-white rounded px-4"
                            />
                            
                            <input
                                type = "number"
                                name = "price"
                                //value = {formData.address}
                                //onChange={handleChange}
                                placeholder="Enter Price"
                                className="border p-1 bg-white rounded px-4"
                            />

                            <input
                                type = "number"
                                name = "stock"
                                //value = {formData.product}
                                //onChange={handleChange}
                                placeholder="Enter Stock"
                                className="border p-1 bg-white rounded px-4"
                            />

                            <div>
                                <select name = "Category">
                                    <option value = "">Select Category</option>
                                    {
                                        categories && categories.map((category)=>(
                                            <option key={category._id} value ={category._id}>
                                                {category.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div>
                                <select name = "Supplier">
                                    <option value = "">Select Supplier</option>
                                    {
                                        suppliers && suppliers.map((supplier)=>(
                                            <option key={supplier._id} value ={supplier._id}>
                                                {supplier.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            
                            <div className = "flex space-x-2">
                                <button type = "submit" className= " w-full mt-2 rounded-md bg-green-500 text-white p-3 cursor-pointer hover:bg-green-600">
                                    Add Product
                                </button>
                        
                                
                                    <button
                                        type="button"
                                        className="w-full mt-2 rounded-md bg-red-500 text-white p-3 cursor-pointer hover:bg-red-600"
                                        onClick={setOpenModal(false)}
                                    >
                                    Cancel
                                    </button>
                            
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Products
