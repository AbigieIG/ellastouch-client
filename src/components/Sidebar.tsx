import { NavLink, useLocation } from "react-router-dom";
import sidebar from "../assets/data/sidebar";
import { useEffect, useState } from "react";
// import logo from "../assets/images/profilepic.webp"

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location]);

  return (
    <div className="px-10 mt-5 w-[25%] border-r hidden lg:flex flex-col">
      {/* <div className="px-4">
        <img className="w-[10rem] h-[10rem] rounded-full mb-4" src={logo} alt="logo" />
        <h1 className="text-lg">Ellas Touch Mua</h1>
      </div> */}
      {sidebar.map((item, i) => {
        return (
          <NavLink
            className={
              active === item.link
                ? "flex items-center px-4 bg-sky-200/50 rounded-md py-4 w-full gap-5 "
                : "flex items-center px-4 rounded-md py-4 w-full gap-5 hover:bg-slate-300/10"
            }
            to={item.link}
            key={i}
            onClick={() => setActive(item.link)}
          >
            <item.icon
              className={
                active === item.link ? "text-sky-500" : "text-slate-400"
              }
              size={20}
            />
            <p
              className={
                active === item.link
                  ? " capitalize text-slate-700"
                  : " capitalize text-gray-500"
              }
            >
              {item.title}
            </p>
          </NavLink>
        );
      })}
    </div>
  );
};

export default Sidebar;
