import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo1.jpg";
import { IoPersonCircleOutline, IoMenu, IoClose } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiHome4Fill } from "react-icons/ri";
import sidebar from "../assets/data/sidebar";
import Cookies from "js-cookie";
import apiClient from "../utils/axios";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const token = localStorage.getItem("token") 
  const user = localStorage.getItem("user") 
  const admin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();
  const location = useLocation();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logout = async () => {
    Cookies.remove("token");
    localStorage.clear();
    try {
      apiClient.post("/logout");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {}, [token, navigate, location, admin, user]);

  return (
    <nav className="w-full z-50  top-0 bg-white ">
      <div className="container mx-auto flex items-center justify-between p-4 md:px-10">
        <NavLink to="/" className="flex items-center">
          <img className="w-10 h-10 border border-slate-300 rounded-full" src={logo} alt="logo" />
          <div className="ml-2">
            <h1 className="text-sm text-slate-600 font-semibold">
              EllasTouch Makeover
            </h1>
            <p className="text-xs text-gray-400">
            satellite/amuwo/Festac/Ago
            </p>
          </div>
        </NavLink>
        {token ? (
          <div className=" hidden lg:flex items-center gap-4">
            {!user ? (
              <Link
                to="/admin"
                className="flex items-center gap-2 text-sky-600 border px-4 py-2 rounded-full"
              >
                <MdDashboard />
                <span>Dashboard</span>
              </Link>
            ) : (
             <button>
               <Link
                to="/user-page"
                className="flex items-center gap-2 text-sky-600 border px-4 py-2 rounded-full"
              >
                <RiHome4Fill size={17} />
                <span>Profile</span>
              </Link>
             </button>
            )}
            <button
              onClick={() => logout()}
              className="text-white bg-sky-600 px-4 py-2 rounded-full"
            >
              Logout
            </button>
          </div>
        ) : (
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
        )}
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
          {token ? (
            <div className="flex items-center gap-4 mt-4">
              {admin ? (
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sky-600 border px-4 py-2 rounded-full"
                >
                  <MdDashboard />
                  <span>Dashboard</span>
                </Link>
              ) : (
                <Link
                  to="/user-page"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sky-600 border px-4 py-2 rounded-full"
                >
                  <RiHome4Fill size={17} />
                  <span>Profile</span>
                </Link>
              )}
              <button
                onClick={() => logout()}
                className="text-white bg-sky-600 px-4 py-2 rounded-full"
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
