import {createContext, useState} from "react";

export const AuthContext = createContext();

export const AuthProvider= ({children}) =>{
    const[user, setUser] = useState(()=>{
        const storedUser = localStorage.getItem("inventory-system-user");
        return storedUser ? JSON.parse(storedUser): null;
    })

    const login = (userData,token)=>{
        setUser(userData);
        localStorage.setItem("inventory-system-user",JSON.stringify(userData));
        localStorage.setItem("inventory-system-user-token", token);
    }

    const logout= ()=>{
        setUser(null);
        localStorage.removeItem("inventory-system-user");
        localStorage.removeItem("inventory-system-user-token");
    }

    return(
        <AuthContext.Provider value = {{user, login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export  default AuthProvider;