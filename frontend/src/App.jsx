import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Notfound from "./pages/Notfound";
import Register from "./pages/Auth/Register";

import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import Privateroutes from "./components/Routes/Privateroutes";
import FrogetPassword from "./pages/Auth/FrogetPassword";
import Adminroutes from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory";
import CreateProduct from "./pages/Admin/CreateProduct";
import User from "./pages/Admin/User";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Frogot-password" element={<FrogetPassword />} />
        
   {/* Private Routes for User */}
   <Route path="/dashboard/user" element={<Privateroutes />}>
          <Route path="" element={<Dashboard />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={<Adminroutes />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="create-category" element={<CreateCategory />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="users" element={<User />} />

        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </>
  );
}

export default App;
