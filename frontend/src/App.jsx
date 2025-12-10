import './App.css'
import {BrowserRouter as Router , Routes, Route} from 'react-router-dom';
import Root from "./utils/Root";
import Login from "./pages/Login.jsx";
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";


function App() {
  
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path = "/" element = {<Root/>} />
          <Route path = "/admin/dashboard" element = {
            <ProtectedRoutes requireRole = {["admin"]}>
              <h1>Admin Dashboard</h1>
            </ProtectedRoutes>
            }/>
          <Route path="/employee/dashboard" element={
            <ProtectedRoutes requireRole={["employee"]}>
              <h1>Employee Dashboard</h1>
            </ProtectedRoutes>
          }/>
          <Route path="/customer/dashboard" element={
            <ProtectedRoutes requireRole={["customer"]}>
              <h1>Customer Dashboard</h1>
            </ProtectedRoutes>
          }/>
          <Route path = "/login" element = {<Login/>} />
          <Route path = "/unauthorized" element = {<h1> Unauthorized User</h1>} />

        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
