import { useState, useEffect } from "react";
import apiClient from "../utils/axios";
import { ServiceType } from "../types/index";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { AxiosResponse } from "axios";

const Services = () => {
  const [active, setActive] = useState<number | null>(null);
  const toggleActive = (index: number) => {
    setActive(active === index ? null : index);
  };
  const navigate = useNavigate();

  const [services, setServices] = useState<ServiceType[] | null>([]);
  async function fetchServices() {
    try {
      const response = await apiClient.get("/services");
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  useEffect(() => {
    fetchServices();
  }, []);
  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    try {
      const res: AxiosResponse = await apiClient.delete(`/services/${id}`, {
        withCredentials: true,
      });
      if (res.status === 204) {
        setServices((prev) => {
          if (prev) {
            return prev.filter((dat) => dat.id !== id);
          }
          return prev;
        });
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="px-4 md:px-10 w-full h-full overflow-auto py-5 text-sm">
      <div>
        <h1 className="text-lg mb-4 font-semibold capitalize">Services</h1>
      </div>
      {services?.map((dat, i) => {
        const isActive = active === i;
        return (
          <div
            key={i}
            className="group cursor-pointer gap-3 border-b py-4 flex-col my-5"
          >
            <NavLink
              to={`/edit-ser/${dat.id}`}
              className="flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <span>{dat.name}</span>
              <div className="flex justify-between md:w-auto w-full items-center gap-3 text-gray-600">
                <div>
                  {" "}
                  <span>{dat.duration}. </span>
                  <span>₦{dat.price}</span>
                </div>
                <FaAngleRight
                  size={15}
                  className="text-gray-400 ml-7 group-hover:bg-sky-600 group-hover:rounded-full group-hover:w-5 group-hover:h-5 group-hover:p-1 group-hover:text-white"
                />
              </div>
            </NavLink>
            <div>
              <div className="flex items-center">
                {!isActive && (
                  <>
                    <p className="w-full pr-5 truncate text-xs text-gray-500">
                      {dat.description[0]}
                    </p>
                    <button
                      onClick={() => toggleActive(i)}
                      className="text-xs text-sky-600 mr-10"
                    >
                      more
                    </button>
                  </>
                )}
              </div>
              {isActive && (
                <div className="flex flex-col gap-4 w-full pr-5 truncate text-xs text-gray-500">
                  <ul className="flex text-slate-700 flex-col gap-1">
                    {dat.description.map((desc, j) => (
                      <li key={j}>{desc}</li>
                    ))}
                  </ul>
                  <ul className="flex text-slate-700 flex-col gap-1">
                    {dat.workingHours.map((hours, j) => (
                      <li key={j}>{hours}</li>
                    ))}
                  </ul>
                  <ul className="flex text-slate-700 flex-col gap-1">
                    {dat.extraCharges.map((charge, j) => (
                      <li key={j}>- {charge}</li>
                    ))}
                  </ul>
                  <ul className="flex text-slate-700 flex-col gap-1">
                    {dat.terms.map((term, j) => (
                      <li key={j}>- {term}</li>
                    ))}
                  </ul>
                  <div className="flex  md:flex-row items-start md:items-center gap-4 mt-5">
                    <button
                      onClick={() => navigate(`/edit-ser/${dat.id}`)}
                      className="bg-sky-600 text-white py-2 rounded px-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(dat.id)}
                      className="bg-red-600 text-white py-2 rounded px-4"
                    >
                      Delete
                    </button>
                  </div>
                  <div className="flex justify-end w-full relative">
                    <button
                      onClick={() => toggleActive(i)}
                      className="text-xs text-sky-600 mr-10"
                    >
                      less
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Services;
