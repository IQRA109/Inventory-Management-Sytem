import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Products = () => {
    const [openModal, setOpenModal] = useState(false);
    const [categories, setCategories] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        supplier: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const fetchInitialData = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
            }
        };

        try {
            const [catRes, supRes] = await Promise.all([
                axios.get("http://localhost:5000/api/category", config),
                axios.get("http://localhost:5000/api/supplier", config)
            ]);

            setCategories(catRes.data.categories || []);
            setSuppliers(supRes.data.suppliers || []);
        } catch (error) {
            console.error("Error fetching selection data:", error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/products", {
                headers: { Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}` }
            });
            setProducts(response.data.products || []);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    useEffect(() => {
        fetchInitialData();
        fetchProducts();
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: { Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}` }
            };
            
            const response = await axios.post("http://localhost:5000/api/products/add", formData, config);
            
            if (response.data.success) {
                alert("Product Added Successfully!");
                closeModal();
                fetchProducts(); 
            }
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Error: Product could not be added.");
        }
    };

    const closeModal = () => {
        setOpenModal(false);
        setEditProduct(null);
        setFormData({ name: "", description: "", price: "", stock: "", category: "", supplier: "" });
    };

return (
        <div className="w-full min-h-screen bg-[#f8fafc] p-4 md:p-8 flex flex-col gap-6">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">Inventory Products</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage, track, and update your stock levels in real-time.</p>
                </div>
                <button
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-100 active:scale-95 cursor-pointer ring-offset-2 focus:ring-2 focus:ring-blue-500"
                    onClick={() => setOpenModal(true)}
                >
                    <span className="text-xl">+</span> Add New Product
                </button>
            </div>
            <div className="flex bg-white p-4 rounded-xl shadow-sm border border-slate-100 items-center">
                <div className="relative w-full max-w-md">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input 
                        type="text" 
                        placeholder="Search by product name..." 
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-lg bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                    />
                </div>
            </div>


            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100 text-slate-600 text-xs uppercase font-bold tracking-widest">
                                <th className="p-5">Product Info</th>
                                <th className="p-5">Price</th>
                                <th className="p-5">Available Stock</th>
                                <th className="p-5">Category</th>
                                <th className="p-5 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-blue-50/40 transition-colors group">
                                    <td className="p-5">
                                        <div className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{product.name}</div>
                                        <div className="text-xs text-slate-400 max-w-[220px] truncate mt-0.5">{product.description || "No description provided"}</div>
                                    </td>
                                    <td className="p-5">
                                        <span className="font-bold text-slate-700 font-mono text-sm bg-slate-100 px-2 py-1 rounded">
                                            ৳{product.price}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-2 w-2 rounded-full ${product.stock > 5 ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`}></div>
                                            <span className="font-semibold text-slate-600 text-sm">{product.stock} Units</span>
                                        </div>
                                    </td>
                                    <td className="p-5">
                                        <span className="text-[10px] font-black px-2.5 py-1 rounded-md bg-blue-50 text-blue-600 border border-blue-100">
                                            {product.category?.name || "GENERAL"}
                                        </span>
                                    </td>
                                    <td className="p-5">
                                        <div className="flex justify-center gap-2">
                                            <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all active:scale-90">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                            </button>
                                            <button className="p-2 text-rose-600 hover:bg-rose-100 rounded-lg transition-all active:scale-90">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {products.length === 0 && (
                    <div className="py-24 text-center text-slate-400 font-medium">No products found in your database.</div>
                )}
            </div>


            {openModal && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px] flex justify-center items-center z-50 p-4 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg overflow-hidden transform animate-in zoom-in-95 duration-200">
                        
                        <div className="bg-slate-800 p-6 flex justify-between items-center text-white">
                            <div>
                                <h2 className="text-xl font-bold">{editProduct ? "Edit Existing Product" : "Create New Product"}</h2>
                                <p className="text-slate-400 text-xs mt-1">Fill in the details below to save.</p>
                            </div>
                            <button className="h-10 w-10 flex items-center justify-center hover:bg-slate-700 rounded-full transition-colors text-2xl font-light" onClick={closeModal}>×</button>
                        </div>
                        
                        <form className="p-8 flex flex-col gap-5" onSubmit={handleSubmit}>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Product Name</label>
                                    <input name="name" value={formData.name} onChange={handleChange} type="text" placeholder="e.g. Samsung Galaxy S24" className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all bg-slate-50/50" required />
                                </div>
                                
                                <div>
                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Product Description</label>
                                    <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter key features..." className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none bg-slate-50/50 h-24 resize-none transition-all" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Price (BDT)</label>
                                        <input name="price" value={formData.price} onChange={handleChange} type="number" placeholder="0" className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none bg-slate-50/50 transition-all font-bold" required />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Initial Stock</label>
                                        <input name="stock" value={formData.stock} onChange={handleChange} type="number" placeholder="0" className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none bg-slate-50/50 transition-all font-bold" required />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Category</label>
                                        <select name="category" value={formData.category} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none bg-slate-50/50 cursor-pointer transition-all appearance-none" required>
                                            <option value="">Select Category</option>
                                            {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 block">Supplier</label>
                                        <select name="supplier" value={formData.supplier} onChange={handleChange} className="w-full p-3.5 border border-slate-200 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none bg-slate-50/50 cursor-pointer transition-all appearance-none" required>
                                            <option value="">Select Supplier</option>
                                            {suppliers.map(sup => <option key={sup._id} value={sup._id}>{sup.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 mt-6 pt-6 border-t border-slate-100">
                                <button type="button" onClick={closeModal} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-colors active:scale-95">Cancel</button>
                                <button type="submit" className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">
                                    {editProduct ? "Confirm Update" : "Create Product"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Products;