import { useState } from "react";
import { MoreItem } from "../types/index";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const More = ({
  data,
  title,
  price,
  duration,
  id,
}: {
  data: MoreItem;
  title: string;
  price: number;
  duration: string;
  id: string;
}) => {
  const [active, seActive] = useState(false);
  const { description, terms, workingHours, extraCharges } = data;
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    e.preventDefault();
    seActive(true);
  };

  return (
    <>
      <button onClick={handleClick} className="text-sky-600">
        More
      </button>
      {active && (
        <div className="flex md:items-center  md:justify-center bg-black/10 fixed top-0 left-0 w-full h-full">
          <div className="bg-white overflow-y-auto md:px-10 px-3 pb-7 rounded-md shadow-lg">
            <div className="flex justify-start border-b border-gray-200 py-3 w-full">
              <FaAngleLeft
                onClick={() => seActive(false)}
                size={20}
                className="text-gray-600 cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-5 text-sm">
              <div className="flex flex-col md:flex-row gap-4 justify-between border-b border-gray-200 py-5 w-full">
                <div className="">
                  <h1 className="text-lg font-bold text-slate-700">{title}</h1>
                  <div className="flex items-center gap-2 text-xs">
                    <span>{duration} . </span>
                    <span>₦{price}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/book-appointment/${id}`)}
                  className="w-20 bg-sky-600 text-white rounded-md py-2"
                >
                  Book
                </button>
              </div>
              <ul className="flex text-slate-700 flex-col gap-1">
                {description.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
              <ul className="flex text-slate-700 flex-col gap-1">
                {workingHours.map((hours, i) => (
                  <li key={i}>{hours}</li>
                ))}
              </ul>
              <ul className="flex text-slate-700 flex-col gap-1">
                {extraCharges.map((charge, i) => (
                  <li key={i}>- {charge}</li>
                ))}
              </ul>
              <ul className="flex text-slate-700 flex-col gap-1">
                {terms.map((term, i) => (
                  <li key={i}>- {term}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default More;
