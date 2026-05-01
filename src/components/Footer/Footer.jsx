import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { MdOutlineSwapCalls } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="pt-6 pb-4 px-6 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        <div className="flex gap-3 max-w-sm items-center">
          <MdOutlineSwapCalls
            role="img"
            className="text-3xl text-blue-500 mt-1"
            aria-label="SkillSwap logo"
          />
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold leading-snug text-blue-500">
              Share What You Want. <br />
              <span className="text-blue-900">Learn What You Need.</span>
            </h1>
          </div>
        </div>
        <ul className="flex flex-col gap-2 items-start">
        <h3 className="font-semibold text-gray-800">Navigation</h3>
        <li>
          <Typography
              as={Link}
              to="/"
              className="font-normal text-gray-500 text-base relative inline-block w-fit transition-all duration-300 hover:text-blue-500 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[1px] after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Home
          </Typography>
        </li>
        <li>
          <Typography
              as={Link}
              to="/aboutus"
              className="font-normal text-gray-500 text-base relative inline-block w-fit transition-all duration-300 hover:text-blue-500 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[1px] after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
              >
              About Us
          </Typography>
        </li>
        <li>
          <Typography
              as={Link}
              to="/contact"
              className="font-normal text-gray-500 text-base relative inline-block w-fit transition-all duration-300 hover:text-blue-500 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[2px] after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact Us
          </Typography>
        </li>
        </ul>

        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-gray-800">Quick Links</h3>
          
          <Link to="/login" className="font-normal text-gray-500 text-base relative inline-block w-fit transition-all duration-300 hover:text-blue-500 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[1px] after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">Login</Link>
          <Link to="/register" className="font-normal text-gray-500 text-base relative inline-block w-fit transition-all duration-300 hover:text-blue-500 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[1px] after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">Register</Link>
          <Link to="/privacy" className="font-normal text-gray-500 text-base relative inline-block w-fit transition-all duration-300 hover:text-blue-500 after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-[2px] after:h-[2px] after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full">Privacy</Link>

        </div>

      </div>
      <hr className="my-6 border-gray-200" />
      <Typography className="text-center font-normal text-gray-600">
        © {new Date().getFullYear()} SkillSwap. All rights reserved.
      </Typography>
    </footer>
  );
};

export default Footer;