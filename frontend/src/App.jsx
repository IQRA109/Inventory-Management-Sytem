import './App.css'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Root from "./utils/Root";
import Login from "./pages/Login.jsx";
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";
import Dashboard from './pages/Dashboard.jsx';
import Categories from './components/Categories.jsx';
import Suppliers from "./components/Suppliers.jsx";
import Products from "./components/Products.jsx";




function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path = "/" element = {<Root/>} />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoutes requireRole={["admin"]}>
                <Dashboard/>
              </ProtectedRoutes>
            }
          >
        <Route index element={<h1>Summary of Dashboard</h1>} />
        <Route path="products" element={<Products/>} />
        <Route path="suppliers" element={<Suppliers/>} />
        <Route path="orders" element={<h1>orders</h1>} />
        <Route path="users" element={<h1>users</h1>} />
        <Route path="categories" element={<Categories />} />
        <Route path="profile" element={<h1>profile</h1>} />
        
        
        
      </Route>


          <Route path="/employee-dashboard" element={
            <ProtectedRoutes requireRole={["employee"]}>
              <h1>Employee Dashboard</h1>
            </ProtectedRoutes>
          }/>
          <Route path="/customer-dashboard" element={ <h1>Customer Dashboard</h1>}/>

          <Route path = "/login" element = {<Login/>} />
          <Route path = "/unauthorized" element = {<h1> Unauthorized User</h1>} />

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
