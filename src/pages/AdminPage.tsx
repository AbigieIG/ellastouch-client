import React, { useState } from "react";
import UserTable from "../components/UserTable";
import BookingTable from "../components/BookingTable";
import Create from "../pages/Create";
import AdminService from "../components/AdminServices";
import Category from "../components/Category";
import Gallery from "../components/GalleryAdminPage";
import service from "../assets/data/service";


const AdminPage: React.FC = () => {
  const [active, setActive] = useState<string>("booking");

  const handleSubmit = () => {

  }

  return (
    <div className="h-screen overflow-auto p-6">
      <h1 className="text-lg font-bold text-slate-700 mb-6">Admin Dashboard</h1>
      <div className="flex overflow-x-auto items-center mb-4 justify-start md:justify-center w-full gap-2 border-b border-slate-300">
        {["booking", "user", "create", "service","gallery", "category"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium transition-colors duration-300 ${
              active === tab
                ? "border-b-2 border-sky-500 text-sky-500"
                : "text-gray-600 hover:text-sky-500"
            }`}
            onClick={() => setActive(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>
      <div>
        {active === "user" && <UserTable />}
        {active === "booking" && <BookingTable />}
        {active === "create" && <Create onSubmit={handleSubmit} service={service[0]} />}
        {active === "service" && <AdminService />}
        {active === "category" && <Category />}
        {active === "gallery" && <Gallery />}
      </div>
    </div>
  );
};

export default AdminPage;
