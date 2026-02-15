import axios from 'axios';
import React, {useState, useEffect} from 'react'


const Categories = () => {

    const [categoryName , setCategoryName ] = useState("");
    const [categoryDescription , setCategoryDescription ] = useState("");
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState([]);
    const [editCategory, setEditCategory] = useState(null);

    const fetchCategories= async()=>{
        setLoading(true);
            try{
                const response = await axios.get("http://localhost:5000/api/category",{
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
                    }
                });
                //console.log(response.data.categories);
                setCategories(response.data.categories);
                setLoading(false);
            } catch(error){
                console.error("Error fetching categories:", error)
                setLoading(false);
            }
        };

    useEffect(()=>{
        
        fetchCategories();
    }, [])

    const handleSubmit= async(e) => {
        e.preventDefault();

        if(editCategory){
            const response = await axios.put(
                `http://localhost:5000/api/category/${editCategory}`,
                {
                    categoryName,
                    categoryDescription
                },
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
                    }
                }
            );
            if(response.data.success){
                alert("Category Edited Successfully..");
                setEditCategory(null);
                setCategoryName("");
                setCategoryDescription("");
                fetchCategories();
            } else{
                //console.error("Error Editing Category: ", data);
                alert("Error Editing Category. Please Try Again..")
            }
        } else{
            const response = await axios.post(
                "http://localhost:5000/api/category/add",
                {
                    categoryName,
                    categoryDescription
                },
                {
                    headers:{
                        Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
                    }
                }
            );
            if(response.data.success){
                alert("Category Added Successfully..");
                setCategoryName("");
                setCategoryDescription("");
                fetchCategories();
            } else{
                //console.error("Error adding Category: ", data);
                alert("Error Adding Category. Please Try Again..")
            }
        }
    }

    const handleEdit = async(category) =>{
        setEditCategory(category._id);
        setCategoryName(category.categoryName);
        setCategoryDescription(category.categoryDescription);


    }

    const handleCancel = async() =>{
        setEditCategory(null);
        setCategoryName("");
        setCategoryDescription("");
    }

    const handleDelete = async(id) =>{
        const confirmDelete = window.confirm(`Are you sure you want to delete this ${categoryName}`);
        if(confirmDelete){
            try{
                const response = await axios.delete (
                    `http://localhost:5000/api/category/${id}`,
                    { headers:{
                        Authorization: `Bearer ${localStorage.getItem("inventory-system-user-token")}`,
                    }}
                )

                if(response.data.success){
                    alert("Category Deleted Successfully!");
                    fetchCategories();

                } else{
                    //console.error("Error Deleting category:", data);
                    alert("Error Deleting category. Please Try again.")
                }

            } catch(error){
                    console.error("Error Deleting category:", error);
                    alert("Error Deleting category. Please Try again.")
            }
        }
    }

    if(loading){
        return <div> Loading..... </div>
    }
    



return (
        <div className="w-full h-full flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="flex justify-between items-center border-b pb-4">
                <h1 className="text-3xl font-extrabold text-gray-800">Category Management</h1>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                    Total: {categories.length}
                </span>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Form Section */}
                <div className="lg:w-1/3">
                    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
                        <h2 className="text-xl font-bold mb-6 text-gray-700 flex items-center gap-2">
                            {editCategory ? "📝 Edit Category" : "➕ Add New Category"}
                        </h2>
                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Category Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter category name"
                                    className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                                    value={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-600 mb-1">Description</label>
                                <textarea
                                    placeholder="Brief description..."
                                    className="border border-gray-300 w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all"
                                    rows="3"
                                    value={categoryDescription}
                                    onChange={(e) => setCategoryDescription(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <button 
                                    type="submit" 
                                    className={`w-full py-3 rounded-lg font-bold text-white transition-all shadow-md ${
                                        editCategory ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                >
                                    {editCategory ? "Update Category" : "Create Category"}
                                </button>

                                {editCategory && (
                                    <button
                                        type="button"
                                        className="w-full py-3 rounded-lg font-bold text-gray-600 bg-gray-200 hover:bg-gray-300 transition-all"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>

                {/* Table Section */}
                <div className="lg:w-2/3">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-4 text-sm font-semibold uppercase tracking-wider">SL</th>
                                    <th className="p-4 text-sm font-semibold uppercase tracking-wider">Category Name</th>
                                    <th className="p-4 text-sm font-semibold uppercase tracking-wider text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {categories.map((category, index) => (
                                    <tr key={category._id || index} className="hover:bg-blue-50 transition-colors">
                                        <td className="p-4 text-gray-600 font-medium">{index + 1}</td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-800">{category.categoryName}</div>
                                            <div className="text-xs text-gray-400 truncate max-w-xs">{category.categoryDescription}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center items-center gap-3">
                                                <button
                                                    className="flex items-center gap-1 bg-indigo-100 text-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-600 hover:text-white transition-all text-sm font-bold"
                                                    onClick={() => handleEdit(category)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1.5 rounded-md hover:bg-red-600 hover:text-white transition-all text-sm font-bold"
                                                    onClick={() => handleDelete(category._id)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {categories.length === 0 && (
                            <div className="p-10 text-center text-gray-400 italic">
                                No categories found. Start by adding one!
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
