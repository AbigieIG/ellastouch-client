import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/images/profilepic.webp";
import { IoPersonCircleOutline, IoMenu, IoClose } from "react-icons/io5";
import sidebar from "../assets/data/sidebar";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-full z-50  top-0 bg-white ">
      <div className="container mx-auto flex items-center justify-between p-4 md:px-10">
        <NavLink to="/" className="flex items-center">
          <img className="w-10 h-10 rounded-full" src={logo} alt="logo" />
          <div className="ml-2">
            <h1 className="text-sm text-slate-600 font-semibold">Ellas Touch Mua</h1>
            <p className="text-xs text-gray-400">Satelite Town, Lagos, Nigeria</p>
          </div>
        </NavLink>
        <div className="hidden lg:flex items-center gap-4">
          <Link
            to="/user-login"
            className="flex items-center gap-2 text-sky-600 border px-4 py-2 rounded-full"
          >
            <IoPersonCircleOutline />
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="flex items-center gap-2 text-white bg-sky-600 px-4 py-2 rounded-full"
          >
            <IoPersonCircleOutline />
            <span>Sign Up</span>
          </Link>
        </div>
        <button
          className="lg:hidden flex items-center text-2xl text-gray-700"
          onClick={toggleMenu}
        >
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
          <button
            className="absolute top-4 right-4 text-2xl text-gray-700"
            onClick={toggleMenu}
          >
            <IoClose />
          </button>
          {sidebar.map((item, index) => (
            <NavLink
              key={index}
              to={item.link}
              className="py-2 text-gray-700 text-lg"
              onClick={() => setMenuOpen(false)}
            >
              {item.title}
            </NavLink>
          ))}
          <Link
            to="/user-login"
            className="mt-4 flex items-center gap-2 text-sky-600 border px-4 py-2 rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            <IoPersonCircleOutline />
            <span>Login</span>
          </Link>
          <Link
            to="/register"
            className="mt-4 flex items-center gap-2 text-white bg-sky-600 px-4 py-2 rounded-full"
            onClick={() => setMenuOpen(false)}
          >
            <IoPersonCircleOutline />
            <span>Sign Up</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
