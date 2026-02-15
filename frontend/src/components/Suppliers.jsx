import React, {useState, useEffect} from 'react'
import axios from "axios";


const Suppliers = () => {
    const [addModal, setAddModal] = useState(null);
    const [editSupplier, setEditSupplier] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address:"",
        product:"",
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
                        product:"",
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
                        product:"",
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
    const [filteredSuppliers, setFilteredSuppliers] = useState([]);

    const fetchSuppliers= async()=>{
        setLoading(true)
                try{
                    const response = await axios.get("http://localhost:5000/api/supplier",{
                        headers:{
                            Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
                        }
                    });
                    setSuppliers(response.data.suppliers);
                    setFilteredSuppliers(response.data.suppliers);
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
        phone: supplier.phone,
        address:supplier.address,
        product:supplier.product,
        });
        setEditSupplier(supplier._id);
        setAddModal(true);
    }
    const handleDelete = async(id) =>{
        const confirmDelete = window.confirm(`Are you sure you want to delete this supplier?`);
        if(confirmDelete){
            try{
                const response = await axios.delete (
                    `http://localhost:5000/api/supplier/${id}`,
                    { headers:{
                        Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
                    }}
                )

                if(response.data.success){
                    alert("Supplier Deleted Successfully!");
                    fetchSuppliers();

                } else{
                    //console.error("Error Deleting Supplier:", data);
                    alert("Error Deleting Supplier. Please Try again.")
                }

            } catch(error){
                    console.error("Error Deleting Supplier:", error);
                    alert("Error Deleting Supplier. Please Try again.")
            }
        }
    }
    /*const handleSearch = (e) =>{
        setFilteredSuppliers(
            suppliers.filter(supplier) =>
                supplier.name.toLowerCase.includes(e.target.value.toLowerCase())
        )
    } */
    const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = suppliers.filter((supplier) =>
        supplier.name.toLowerCase().includes(value) ||
        supplier.email.toLowerCase().includes(value)
    );
    setFilteredSuppliers(filtered);
};
    
    const closeModal =() =>{
        setAddModal(false);
        setFormData({
            name : "",
            email : "",
            phone : "",
            address : "",
            product : "",
        })
        setEditSupplier(null);
    }

    return (
        <div className= "w-full min-h-screen bg-gray-50 p-6 flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">Supplier Management</h1>
                    <p className="text-gray-500 text-sm">Manage your trusted vendors and their contact details.</p>
                </div>
                <button
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all font-bold shadow-lg shadow-indigo-100 active:scale-95 cursor-pointer"
                    onClick={() => setAddModal(true)}
                >
                    <span className="text-xl">+</span> Add New Supplier
                </button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <input type="text" placeholder="Search suppliers..." className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all sm:text-sm" onChange={handleSearch} />
                
            
            </div>

            {loading ? <div> Loading.....</div> :
            (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left bg-white w-full text-left border-collapse">
                    <thead >
                        <tr className="bg-gray-800 text-white text-sm uppercase tracking-wider">
                            <th className="p-4 font-semibold text-center w-16">SL</th>
                            <th className="p-4 font-semibold">Supplier Details</th>
                                <th className="p-4 font-semibold">Phone & Email</th>
                                <th className="p-4 font-semibold">Product</th>
                                <th className="p-4 font-semibold text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                            {filteredSuppliers.map((supplier, index) => (
                                <tr key={supplier._id} className="hover:bg-indigo-50/30 transition-colors group">
                                    <td className="p-4 text-center text-gray-500 font-medium">{index + 1}</td>
                                    <td className="p-4">
                                        <div className="font-bold text-gray-800 group-hover:text-indigo-600">{supplier.name}</div>
                                        <div className="text-xs text-gray-400 italic">{supplier.address || "No address provided"}</div>
                                    </td>
                                    <td className="p-4">
                                        <div className="text-sm font-semibold text-gray-700">{supplier.phone || supplier.number || "N/A"}</div>
                                        <div className="text-xs text-indigo-500 underline">{supplier.email}</div>
                                    </td>
                                    <td className="p-4">
                                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase">
                                            {supplier.product}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <div className="flex justify-center items-center gap-3">
                                            <button 
                                                className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-md hover:bg-blue-600 hover:text-blue transition-all text-sm font-bold shadow-sm"
                                                onClick={() => handleEdit(supplier)}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                className="bg-red-50 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-600 hover:text-blue transition-all text-sm font-bold shadow-sm"
                                                onClick={() => handleDelete(supplier._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                {filteredSuppliers.length === 0 && (
                    <div className="p-20 text-center text-gray-400 italic bg-white">
                        No suppliers found matching your criteria.
                    </div>
                )}
                </div>
            )}

            {addModal && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden transform transition-all scale-100">
                        <div className="bg-indigo-600 p-5 flex justify-between items-center text-white">
                            <h2 className="text-xl font-bold">{editSupplier ? "📝 Edit Supplier" : "🚀 Add New Supplier"}</h2>
                            <button className="hover:bg-indigo-500 p-1 rounded-full transition-colors text-2xl font-light" onClick={closeModal}>×</button>
                        </div>
                        
                        <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Full Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="John Doe" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-gray-50" required />
                                </div>
                                
                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Email</label>
                                    <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="john@example.com" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50" />
                                </div>

                                <div>
                                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Phone</label>
                                    <input name="phone" value={formData.phone} onChange={handleChange} type="text" placeholder="+880..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Product Type</label>
                                    <input name="product" value={formData.product} onChange={handleChange} type="text" placeholder="e.g. Electronics, Stationary" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50" />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="text-xs font-bold text-gray-400 uppercase mb-1 block">Address</label>
                                    <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Supplier's office address..." className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-gray-50 h-20 resize-none" />
                                </div>
                            </div>

                            <div className="flex gap-4 mt-4">
                                <button type="button" onClick={closeModal} className="flex-1 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all">Cancel</button>
                                <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all active:scale-95">
                                    {editSupplier ? "Save Changes" : "Create Supplier"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    )
}

export  default Suppliers;