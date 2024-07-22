import {  useEffect, useState } from "react";
// import bookings from "../assets/data/booking";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import More from "./More";
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

interface CategoryType {
  id?: string;
  title: string;
  services: ServiceType[];
}
const Carousel = () => {
  const [active, setActive] = useState<number | null>(null);
  const toggleActive = (index: number) => {
    setActive(active === index ? null : index);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
  };


  const [ category, setcategory ] = useState<CategoryType [] | null >([]);
  async function fetchUsers() {
    try {
      const response = await apiClient.get("/categories");
      setcategory(response.data)

    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);


  return (
    <div className="pb-20 px-4 md:px-0">
      {category?.map((data, i) => {
        const isActive = active === i;
        return (
          <div
            className={
              isActive
                ? "overflow-hidden py-6 text-slate-600  "
                : " h-[4rem] overflow-hidden py-6  text-slate-600 "
            }
            key={i}
          >
            <div
              onClick={() => toggleActive(i)}
              className="flex cursor-pointer items-center md:mx-10 border-b pb-4  justify-between "
            >
              <p className="text-sm uppercase">{data.title}</p>
              {isActive ? (
                <FaAngleUp className=" cursor-pointer" size={15} />
              ) : (
                <FaAngleDown className=" cursor-pointer" size={15} />
              )}
            </div>
            <div className="flex mt-3 flex-col">
              {data.services.map((ser, i) => {
                return (
                  <NavLink to={`book-appointment/${ser.id}`} className="text-xs hover:bg-gray-300/30 w-full py-4  md:px-10" key={i}>
                    <p className=" font-semibold">{ser.name}</p>
                    <div className="flex mt-1 gap-2 items-center text-gray-500">
                      <p>{ser.duration} .</p>
                      <p>₦{ser.price} .</p>
                      <div className="" onClick={handleClick}>
                      <More
                        data={ser}
                        title={ser.name}
                        duration={ser.duration}
                        price={ser.price}
                        id={ser.id}
                        
                      />
                      </div>
                    </div>
                  </NavLink>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
