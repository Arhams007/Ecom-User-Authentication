import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Spinner = ({path = "login"}) => {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCount((prevValue) => --prevValue);
      }, 1000);
      count === 0 &&
        navigate(`/${path}`, {
          state: location.pathname,
        });
      return () => clearInterval(interval);
    }, [count, navigate , location ,path]);
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-center mb-11 font-bold ">
          redirecting to you in {count} secound
        </h1>
  
        <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
}

export default Spinner