import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";


export default function Privateroutes() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();


  useEffect(() => {
    const authCheck = async () => {
      try {
       
         const res = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/auth/user-auth`);
        if (typeof res.data === 'object' && res.data.ok) {
          setOk(true);
        } else {
          console.log('Unexpected response:', res.data);
          setOk(false);
        }
      } catch (error) {
        console.log('Auth Check Error:', error);
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  
  return ok ? <Outlet /> : <Spinner />;
}
