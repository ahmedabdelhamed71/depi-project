import React from 'react';
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { CiMenuBurger } from "react-icons/ci";
import { TbXboxX } from "react-icons/tb";
import { MdOutlineSwapCalls } from "react-icons/md";
import { Link } from 'react-router-dom';

function NavList() {
  return (
   <ul className="my-2 flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">

    <li>
    <Typography as={Link} to="/" className="p-1 font-medium hover:text-blue-500 transition-all duration-300">
      Home
    </Typography>
    </li>

    <li>
    <Typography as={Link} to="/discover" className="p-1 font-medium hover:text-blue-500 transition-all duration-300">
      Discover
    </Typography>
    </li>

    <li>
    <Typography as={Link} to="/contact" className="p-1 font-medium hover:text-blue-500 transition-all duration-300">
      Contact
    </Typography>
    </li>

    <li>
    <Typography as={Link} to="/aboutus" className="p-1 font-medium hover:text-blue-500 transition-all duration-300">
      About Us
    </Typography>
    </li>

</ul>
  );
}
const Header = () => {
   const [openNav, setOpenNav] = React.useState(false);
 
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);
 
  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
 
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
 
return (
  <Navbar
  className="w-full max-w-none px-6 py-3 sticky top-0 z-50 bg-white/70 border-b border-gray-200 backdrop-blur-md shadow-[0px_0px_2px_rgba(23,26,31,0.08),0px_0px_1px_rgba(23,26,31,0.05)]"
>
    
    <div className="w-full flex items-center justify-between text-blue-gray-900">

      {/* Logo */}
      <Typography
        as={Link}
        to="/"
        variant="h6"
        className="cursor-pointer py-1.5 text-blue-500 font-bold"
      >
        <div className="flex items-center gap-1 text-lg font-bold transition-all duration-300 hover:-translate-y-1 hover:translate-x-1 hover:rotate-2">
          <MdOutlineSwapCalls className="text-xl" />
          <span>
            Skill<span className="text-blue-900">Leek</span>
          </span>
        </div>
      </Typography>

      {/* Desktop Nav */}
      <div className="hidden lg:flex items-center gap-6">
        <NavList />

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <Link to="/login" onClick={() => setOpenNav(false)}>
            <button className="group px-4 py-2 rounded-2xl text-md text-black cursor-pointer active:scale-95 transition duration-300 hover:bg-gray-200 hover:text-black">
              <p className="relative h-6 overflow-hidden">
    
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            Log In
            </span>

            <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]">
            Log In
            </span>

           </p>
          </button>
          </Link>

          <Link to="/register">
            <button className="group px-4 py-2 bg-blue-500 rounded-2xl text-md text-black cursor-pointer active:scale-95 transition duration-300 hover:bg-blue-700">
            <p className="relative h-6 overflow-hidden">

                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                Register
                </span>

                <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]">
                Register
                </span>

            </p>
        </button>
          </Link>
        </div>
      </div>

      {/* Mobile Icon */}
      <IconButton
        aria-label="Toggle navigation"
        variant="text"
        className="lg:hidden h-6 w-6"
        ripple={false}
        onClick={() => setOpenNav(!openNav)}
      >
        {openNav ? (
          <TbXboxX className="h-6 w-6" />
        ) : (
          <CiMenuBurger className="h-6 w-6" />
        )}
      </IconButton>
    </div>

    {/* Mobile Menu */}
    <Collapse open={openNav}>
      <div className="flex flex-col gap-4 mt-4 text-black">

        <NavList />

      <div className="flex flex-col gap-2">
        <Link to="/login" className="w-full">
          <button className="w-full group px-4 py-2 rounded-2xl text-md text-black cursor-pointer active:scale-95 transition duration-300 hover:bg-gray-200 hover:text-black">
              <p className="relative h-6 overflow-hidden">
    
            <span className="block transition-transform duration-300 group-hover:-translate-y-full">
            Log In
            </span>

            <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]">
            Log In
            </span>

           </p>
          </button>
        </Link>

        <Link to="/register" className="w-full">
          <button className="w-full group px-4 py-2 bg-blue-500 rounded-2xl text-md text-black cursor-pointer active:scale-95 transition duration-300 hover:bg-blue-700">
            <p className="relative h-6 overflow-hidden">
              
                <span className="block transition-transform duration-300 group-hover:-translate-y-full">
                Register
                </span>

                <span className="absolute w-full top-full left-1/2 -translate-x-1/2 block transition-transform duration-300 group-hover:translate-y-[-100%]">
                Register
                </span>

            </p>
        </button>
        </Link>
      </div>

      </div>
    </Collapse>
  </Navbar>
);
}
export default Header