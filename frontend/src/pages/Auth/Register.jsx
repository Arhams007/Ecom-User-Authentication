import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import toast  from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Register = () => {
  

  const [data,setData] = useState({
    name:"",
    email:"",
        password:"",
        phone:"",
        address:"",
        answer:"",
  })
  const changeHandler =(e)=>{
   const {name , value} = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post( `${import.meta.env.VITE_APP_API}/api/v1/auth/register`, data
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        // toast.success("user Register succesfully 👍");
        navigate("/login");
      } else {
        toast.error(res.data.message);
        console.log(res.data);
      }
    } catch (error) {
      toast.error("Something went wrong 😓");
      console.log(error);
    }
  };

  return (
    <Layout title={"Register"}>
      <div className="flex flex-col -mt-6 items-center justify-center h-screen dark">
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={changeHandler}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              required
            />

            <input
              placeholder="Email"
              value={data.email}
              name="email"
              onChange={changeHandler}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              required
            />
            <input
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={changeHandler}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              required
            />
            <input
              placeholder="Phone number"
              name="phone"
              value={data.phone}
              onChange={changeHandler}

              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="text"
              required
            />
            <input
              placeholder="Address"
              name="address"
              value={data.address}
              onChange={changeHandler}

              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="Text"
              required
            />
            <input
              placeholder="what is your best sport"
              name="answer"
              value={data.answer}
              onChange={changeHandler}

              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="Text"
              required
            />
           

            <p className="text-white mt-4">
              Already have an account?
              <a
                className="text-sm mx-2 text-blue-500 -200 hover:underline mt-4"
                href="/login"
              >
                Login
              </a>
            </p>
            <button
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
