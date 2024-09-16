import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';

const DropdownMenu = ({ dropdown, setDropdown,auth }) => {
  // console.log('User Role:', auth?.user?.role);
  // console.log('Link URL:', `/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`);
  
  return(
    
    <div className="relative dropdown-container">
    <button onClick={() => setDropdown(!dropdown)} className="my-1">
      <Icon icon="fluent-emoji:person-light" width="1.5em" height="1.5em" />
    </button>
    <div className={`absolute top-6 left-3 rounded-lg border-[1px] shadow-xl bg-white p-4 w-40 ${dropdown ? 'block' : 'hidden'}`}>
      <Link to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} onClick={() => setDropdown(false)}>Dashboard</Link>
    </div>
  </div>
);

}
const Responsive = ({ auth, handleLogout}) => {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  console.log(auth?.user?.role); // Check what this logs

  return (
    <div className="relative">
      <button
        className=" md:hidden"
        >
        <label className="hamburger">
       
  <input type="checkbox" onClick={() => setOpen(!open)} />
  <svg viewBox="0 0 32 32">
    <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
    <path className="line" d="M7 16 27 16"></path>
  </svg>
</label>
      </button>
      <div className={`absolute top-10 rounded-lg right-0 bg-white border border-gray-300 shadow-lg p-4 w-64  ${open ? 'block transition-all ease-in-out duration-700' : 'hidden ease-in-out transition-all duration-700'} md:hidden`}>
        <button onClick={() => setOpen(false)} className="absolute top-2 right-2 text-gray-600">
        
        </button>
        <ul className="space-y-2">
          <li><Link to="/" onClick={() => setOpen(false)} className="block py-2">Home</Link></li>
          <li><Link to="/cart" onClick={() => setOpen(false)} className=" flex items-center py-2"> <Icon icon="noto-v1:shopping-cart" width="1.3em" height="1.3em" />
          <span>(0)</span></Link></li>
          <DropdownMenu dropdown={dropdown} setDropdown={setDropdown} auth={auth} />
          {!auth.user ? (
            <>
              <li><Link to="/register" onClick={() => setOpen(false)} className="block py-2">Register</Link></li>
              <li><Link to="/login" onClick={() => setOpen(false)} className="block py-2">Login</Link></li>
            </>
          ) : (
            <li><Link to="/" onClick={() => { handleLogout(); setOpen(false); }} className="block py-2">Logout</Link></li>
          )}
        </ul>
       

      </div>
    </div>
  );
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [auth, setAuth] = useAuth();
  const [show, setShow] = useState(window.innerWidth < 800);
  const [dropdown, setDropdown] = useState(false);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown && !event.target.closest('.dropdown-container')) {
        setDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdown]);

  const handleLogout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully");
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShow(window.innerWidth < 800);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`fixed py-2 px-4 flex items-center justify-around z-10 w-full transition-all duration-300 ${isScrolled ? "gg" : "kk"}`}>
      <div className="logo">
        <Link to="/" className="text-xl font-bold ">Logo</Link>
      </div>

      <div className="search">
       
       <div className="relative">
         <input
           placeholder="Search..."
           className="input focus:border-2 border-gray-300 px-5 py-1 rounded-xl w-56 transition-all focus:w-64 outline-none"
           name="search"
           type="search"
         />
         
       </div>
       
       
             </div>


      {show ? (
        <Responsive auth={auth} handleLogout={handleLogout} />
      ) : (
        <div className="flex items-center space-x-3">
          <Link className='' to="/"><Icon icon="openmoji:home-button" width="1.3em" height="1.3em" /></Link>
          <Link className=' flex items-center space-x-1' to="/cart">
            <Icon icon="noto-v1:shopping-cart" width="1.3em" height="1.3em" />
            <span>(0)</span>
          </Link>
          <DropdownMenu dropdown={dropdown} setDropdown={setDropdown} auth={auth} />
          {!auth.user ? (
            <>
              <Link className=' hidden md:block' to="/register">Register</Link>
              <Link className=' hidden md:block' to="/login">Login</Link>
            </>
          ) : (
            <Link className=' hidden md:block' onClick={handleLogout} to="/">Logout</Link>
          )}

        </div>
      )}

    </div>
  );
};

export default Header;
