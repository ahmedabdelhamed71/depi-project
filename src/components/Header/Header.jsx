import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { CiMenuBurger } from "react-icons/ci";
import { TbXboxX } from "react-icons/tb";
import { MdOutlineSwapCalls } from "react-icons/md";
import { FaRegUser, FaRegMessage } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { PiGitPullRequest } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../pages/context/context";
import useTheme from "../../hooks/useTheme";

function NavList() {
  return (
    <ul className="my-2 flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
      <li>
        <Typography
          as={Link}
          to="/"
          className="p-1 font-medium hover:text-blue-500 transition-all duration-300"
        >
          Home
        </Typography>
      </li>

      <li>
        <Typography
          as={Link}
          to="/discover"
          className="p-1 font-medium hover:text-blue-500 transition-all duration-300"
        >
          Discover
        </Typography>
      </li>

      <li>
        <Typography
          as={Link}
          to="/contact"
          className="p-1 font-medium hover:text-blue-500 transition-all duration-300"
        >
          Contact
        </Typography>
      </li>

      <li>
        <Typography
          as={Link}
          to="/aboutus"
          className="p-1 font-medium hover:text-blue-500 transition-all duration-300"
        >
          About Us
        </Typography>
      </li>
    </ul>
  );
}

const Header = () => {
  const [openNav, setOpenNav] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";

  const { logged, user, loading, logout } = useAuth();
  const navigate = useNavigate();

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleTheme = toggleTheme;

  const handleLogout = async () => {
    await logout();
    setOpenProfile(false);
    setOpenNav(false);
    navigate("/login");
  };

  const ProfileDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setOpenProfile(!openProfile)}
        className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold cursor-pointer active:scale-95 transition duration-300 hover:bg-blue-700"
      >
        {user?.username?.charAt(0)?.toUpperCase() || <FaRegUser />}
      </button>
            {openProfile && (
        <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden z-50">
          <div className="flex items-center gap-3 p-4 border-b border-gray-100">
            <div className="w-11 h-11 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold">
              {user?.username?.charAt(0)?.toUpperCase() || <FaRegUser />}
            </div>

            <div>
              <h4 className="font-semibold text-gray-800">
                {user?.username || "User"}
              </h4>
              <p className="text-sm text-gray-500">
                {user?.email || "user@email.com"}
              </p>
            </div>
          </div>

          <div className="p-2">
            <Link
              to="/profile"
              onClick={() => setOpenProfile(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <FaRegUser />
              Profile
            </Link>

            <Link
              to="/dashboard"
              onClick={() => setOpenProfile(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <RxDashboard />
              Dashboard
            </Link>

            <Link
              to="/requests"
              onClick={() => setOpenProfile(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <PiGitPullRequest />
              Requests
            </Link>

            <Link
              to="/messages"
              onClick={() => setOpenProfile(false)}
              className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              <FaRegMessage />
              Messages
            </Link>

            <button
              onClick={handleTheme}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-gray-700 hover:bg-gray-100 transition"
            >
              {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <div className="p-3 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 transition"
            >
              <LuLogOut />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Navbar className="w-full max-w-none px-6 py-3 sticky top-0 z-50 bg-white/70 border-b border-gray-200 backdrop-blur-md shadow-[0px_0px_2px_rgba(23,26,31,0.08),0px_0px_1px_rgba(23,26,31,0.05)]">
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

          {/* Theme Toggle */}
          <IconButton
            aria-label="Toggle dark mode"
            variant="text"
            className="rounded-full"
            onClick={handleTheme}
          >
            {darkMode ? (
              <IoSunnyOutline className="h-5 w-5" />
            ) : (
              <IoMoonOutline className="h-5 w-5" />
            )}
          </IconButton>

          {/* Buttons */}
          {!loading &&
            (logged ? (
              <ProfileDropdown />
            ) : (
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
                  <button className="group px-4 py-2 bg-blue-500 rounded-2xl text-md text-white cursor-pointer active:scale-95 transition duration-300 hover:bg-blue-700">
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
            ))}
        </div>

        {/* Mobile Icons */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Theme Toggle */}
          <IconButton
            aria-label="Toggle dark mode"
            variant="text"
            className="h-6 w-6"
            ripple={false}
            onClick={handleTheme}
          >
            {darkMode ? (
              <IoSunnyOutline className="h-5 w-5" />
            ) : (
              <IoMoonOutline className="h-5 w-5" />
            )}
          </IconButton>

          <IconButton
            aria-label="Toggle navigation"
            variant="text"
            className="h-6 w-6"
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
      </div>

      {/* Mobile Menu */}
      <Collapse open={openNav}>
        <div className="flex flex-col gap-4 mt-4 text-black">
          <NavList />

          {!loading &&
            (logged ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/profile"
                  onClick={() => setOpenNav(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-gray-100"
                >
                  <FaRegUser />
                  Profile
                </Link>

                <Link
                  to="/dashboard"
                  onClick={() => setOpenNav(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-gray-100"
                >
                  <RxDashboard />
                  Dashboard
                </Link>

                <Link
                  to="/requests"
                  onClick={() => setOpenNav(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-gray-100"
                >
                  <PiGitPullRequest />
                  Requests
                </Link>

                <Link
                  to="/messages"
                  onClick={() => setOpenNav(false)}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-gray-100"
                >
                  <FaRegMessage />
                  Messages
                </Link>

                <button
                  onClick={handleTheme}
                  className="flex items-center gap-3 px-4 py-2 rounded-2xl hover:bg-gray-100"
                >
                  {darkMode ? <IoSunnyOutline /> : <IoMoonOutline />}
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </button>

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-4 py-2 rounded-2xl border border-gray-200 hover:bg-gray-100"
                >
                  <LuLogOut />
                  Logout
                </button>
              </div>
            ) : (
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
            ))}
        </div>
      </Collapse>
    </Navbar>
  );
};

export default Header;
