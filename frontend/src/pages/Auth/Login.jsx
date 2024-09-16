import React, { useState } from 'react'
import Layout from '../../components/layout/Layout'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate,useLocation } from "react-router-dom";
import { useAuth } from '../../context/auth';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation()
const[auth,setAuth] = useAuth()
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    const changeHandler =(e)=>{
        const {name , value} = e.target
         setUser((prevData) => ({
           ...prevData,
           [name]: value,
         }));
       }

       const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post( `${import.meta.env.VITE_APP_API}/api/v1/auth/login`, user
          );
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token,
            })
            localStorage.setItem('auth',JSON.stringify(res.data))
            navigate(location.state||"/");
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

   
        <Layout>
<form onSubmit={handleSubmit}>

<div className="relative py-3 sm:max-w-xs sm:mx-auto">
  <div
    className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg"
    >
    <div className="flex flex-col justify-center items-center h-full select-none">
      <div className="flex flex-col items-center justify-center gap-2 mb-8">
        <div className="w-8 h-8 bg-gray-700" src=""></div>
        <p className="m-0 text-[16px] font-semibold dark:text-white">
          Login to your Account
        </p>
        <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]"
          >Get started with our app, just start section and enjoy experience.
        </span>
      </div>
      <div className="w-full flex flex-col gap-2">
        <label className="font-semibold text-xs text-gray-400">Username</label>
        <input
              placeholder="Email"
              value={user.email}
              name="email"
              onChange={changeHandler}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="email"
              required
            />
      </div>
    </div>
    <div className="w-full flex flex-col gap-2">
      <label className="font-semibold text-xs text-gray-400">Password</label>
      <input
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={changeHandler}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              type="password"
              required
            />
    </div>
    <div>

<div className='text-blue-600 mb-3'> <p className='cursor-pointer'  onClick={()=>{navigate('/frogot-password')}}>Froget Password</p></div>

      <button
        className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
        >
        Login
      </button>
    </div>
  </div>
</div>


          </form>
        </Layout>
   
  )
}

export default Login