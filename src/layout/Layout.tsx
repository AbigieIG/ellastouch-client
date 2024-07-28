import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import LeftSidebar from "../components/LeftSidebar";
import Navbar from "../components/Navbar";
import Cookies from "js-cookie";

import Footer from "../components/Footer";
import { useEffect } from "react";
const token = Cookies.get("token");

const Layout = () => {
  const location = useLocation();

  useEffect(() => {
      if (!token) {
        localStorage.removeItem("admin");
      }
  }, [location]);
  return (
    <div className="h-screen w-screen lg:px-16">
      <Navbar />
      <div className="flex w-full h-full ">
        <Sidebar />
        <div className="h-full overflow-auto lg:w-[55%] w-full">
          <Outlet />
          <Footer />
        </div>
        <LeftSidebar />
      </div>
    </div>
  );
};

export default Layout;
