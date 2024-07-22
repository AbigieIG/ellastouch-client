import { useEffect, useState } from "react";
// import services from "../assets/data/service";
import { FaAngleRight } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import apiClient from "../utils/axios";

interface ServiceType {
  id: string;
  name: string;
  duration: string;
  price: number;
  description: string[];
  workingHours: string[];
  extraCharges: string[];
  terms: string[];
}
const Services = () => {

  const [ services, setServices ] = useState<ServiceType[] | null >([]);
  async function fetchUsers() {
    try {
      const response = await apiClient.get("/services");
      setServices(response.data)

    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);



  const [active, setActive] = useState<number | null>(null);
  const toggleActive = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <div className="px-10 w-full  h-full overflow-auto py-5 text-sm">
      <div>
        <h1 className="text-lg mb-4 font-semibold capitalize">Services</h1>
        <p> STUDIO WALK-IN SESSION</p>
      </div>
      {services?.map((dat, i) => {
        const isActive = active === i;
        return (
          <div
            key={i}
            className="flex group cursor-pointer gap-3 border-b py-4 flex-col my-5"
          >
            <NavLink
              to={`/book-appointment/${dat?.id}`}
              className="flex items-center justify-between"
            >
              <span>{dat.name}</span>
              <div className="flex items-center gap-3 text-gray-600">
                <span>{dat.duration}. </span>
                <span>₦{dat.price}</span>
                <FaAngleRight
                  size={15}
                  className="text-gray-400 ml-7  group-hover:bg-sky-600 group-hover:rounded-full group-hover:w-5 group-hover:h-5  group-hover:p-1 group-hover:text-white"
                />
              </div>
            </NavLink>
            <div>
              <div className="flex items-center">
                {isActive ? null : (
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
                <div className=" flex flex-col gap-4  w-full pr-5 truncate text-xs text-gray-500">
                  <ul className="flex text-slate-700 flex-col gap-1">
                    {dat.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                  <ul className="flex text-slate-700 flex-col gap-1">
                    {dat.workingHours.map((hours, i) => (
                      <li key={i}>{hours}</li>
                    ))}
                  </ul>
                  <ul className="flex text-slate-700 flex-col gap-1">
                    {dat.extraCharges.map((charge, i) => (
                      <li key={i}>- {charge}</li>
                    ))}
                  </ul>
                  <ul className="flex text-slate-700 flex-col gap-1">
                    {dat.terms.map((term, i) => (
                      <li key={i}>- {term}</li>
                    ))}
                    <div className="flex justify-end w-full relative">
                      <button
                        onClick={() => toggleActive(i)}
                        className="text-xs text-sky-600 mr-10"
                      >
                        less
                      </button>
                    </div>
                  </ul>
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
