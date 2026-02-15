import React from "react";
import { FaBox, FaCog, FaHome, FaShoppingCart, FaSignOutAlt, FaTable, FaTruck, FaUsers } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    const menuItems = [
        { name: "Dashboard", path: "/admin-dashboard", icon: <FaHome />, isParent: true },
        { name: "Categories", path: "/admin-dashboard/categories", icon: <FaTable />, isParent: false },
        { name: "Products", path: "/admin-dashboard/products", icon: <FaBox />, isParent: false },
        { name: "Suppliers", path: "/admin-dashboard/suppliers", icon: <FaTruck />, isParent: false },
        { name: "Orders", path: "/admin-dashboard/orders", icon: <FaShoppingCart />, isParent: false },
        { name: "Users", path: "/admin-dashboard/users", icon: <FaUsers />, isParent: false },
        { name: "Profile", path: "/admin-dashboard/profile", icon: <FaCog />, isParent: false },
    ];

    const handleLogout = () => {
        localStorage.removeItem("inventory-system-user-token");
        navigate("/login");
    };

    return (
        <div className="flex flex-col h-screen bg-[#0f172a] text-slate-300 w-20 md:w-64 fixed border-r border-slate-800 shadow-2xl transition-all duration-300 z-50">
            
            <div className="h-20 flex items-center justify-center border-b border-slate-800/50 mb-4 px-4">
                <div className="bg-indigo-600 p-2 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-white text-xl font-black">IMS</span>
                </div>
                <span className="ml-3 hidden md:block text-xl font-extrabold tracking-tight text-white whitespace-nowrap">
                    Inventory<span className="text-indigo-500">Pro</span>
                </span>
            </div>

            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
                <ul className="space-y-1.5 px-3">
                    {menuItems.map((item) => (
                        <li key={item.name}>
                            <NavLink 
                                end={item.isParent}
                                to={item.path}
                                className={({ isActive }) => `
                                    flex items-center p-3 rounded-xl transition-all duration-200 group
                                    ${isActive 
                                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20" 
                                        : "hover:bg-slate-800 hover:text-white"}
                                `}
                            >
                                <div className="flex items-center justify-center w-6 h-6 shrink-0 transition-transform group-hover:scale-110">
                                    <span className="text-xl"> {item.icon}</span>
                                </div>
                                <span className="ml-4 hidden md:block font-medium tracking-wide">
                                    {item.name}
                                </span>
                                

                                <div className="ml-auto hidden md:block">
                                    <span className="isActive-dot">
                                        <NavLink to={item.path} className={({isActive}) => isActive ? "w-1.5 h-1.5 rounded-full bg-indigo-200 block" : "hidden"} />
                                    </span>
                                </div>
                            </NavLink>
                        </li>
                    ))}
                    
                    {/* Logout Button */}
                    <li>
                        <button 
                            onClick={handleLogout}
                            className="w-full flex items-center p-3 rounded-xl transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-500 group"
                        >
                            <div className="flex items-center justify-center w-6 h-6 shrink-0 transition-transform group-hover:scale-110 text-rose-400">
                                <FaSignOutAlt className="text-xl" />
                            </div>
                            <span className="ml-4 hidden md:block font-medium tracking-wide">Logout</span>
                        </button>
                    </li>
                </ul>
            </div>


            <div className="p-4 border-t border-slate-800 bg-[#0f172a]/50 mt-auto">
                <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                        A
                    </div>
                    <div className="hidden md:block overflow-hidden">
                        <p className="text-sm font-bold text-white leading-none truncate">Admin User</p>
                        <p className="text-[10px] text-slate-500 mt-1 truncate">admin@ims.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
