import React, { useState } from "react";
import StepBar from "../components/Stepbar";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import logo from "../assets/images/profilepic.webp";

const Confirmation: React.FC = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [data] = useState(() => {
    const savedData = localStorage.getItem("booking");
    return savedData ? JSON.parse(savedData) : {};
  });

  return (
    <div className="px-4 mb-7 md:px-0">
      <div className="flex mt-5  items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex md:px-5 items-center gap-2"
        >
          <FaAngleLeft className="text-gray-500" size={20} />
          <span>Confirmation</span>
        </button>
        <div className="flex items-center justify-between relative  px-10">
          <p
            onClick={() => setActive(!active)}
            className="text-xs cursor-pointer text-sky-600 capitalize"
          >
            booking policy
          </p>
          {active && (
            <div className="fixed flex justify-center px-5 items-center top-0 left-0 w-full h-full bg-slate-600/20">
              <div className="text-xs text-slate-600 shadow-lg justify-center px-5 py-5 rounded bg-white flex flex-col gap-1">
                <h1 className="font-semibold mb-3">Our Booking Policy</h1>
                <p>
                  *Reservation doesn't confirm booking. 60% Deposit payment is
                  required to secure your booking.
                </p>
                <p>
                  *Late arrivals attract an extra charge of N5,000 per 30mins.
                </p>
                <p>
                  *Please endeavor to read Service Description carefully (Tap
                  "more").
                </p>
                <p> *REFUND is conditional.</p>
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => setActive(!active)}
                    className="text-white capitalize bg-sky-600 py-2 px-5 rounded mt-3 w-20"
                  >
                    okay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <StepBar currentStep={4} />

      <div className="md:px-10 mt-10">
        <div className="flex flex-col justify-center items-center  md:flex-row gap-5">
          <img className="md:w-20 md:h-20 h-10 w-10  rounded-full" src={logo} alt="" />
          <div className="text-sm text-slate-600 flex flex-col gap-5">
            <h1 className=" text-slate-700 text-lg">
              You are booked with Zee Ellas Touch Mua
            </h1>
            <div className="flex  items-center gap-10">
              <span className="text-slate-400">Service</span>
              <span>{data.name}</span>
            </div>
            <div className="flex items-center gap-10">
              <span className="text-slate-400">Date & time</span>
              <span>
                {data.date} , {data.time}
              </span>
            </div>
            <div className="flex items-center gap-10">
              <span className="text-slate-400">Booking ID</span>
              <span>XUHN4VVJ</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-7">
          <button onClick={() => navigate("/")} className="my-4 border text-slate-500 py-3 px-10 rounded">
            Book another appointment
          </button>
        </div>
        <p className="text-sm w-full text-sky-600 leading-6 text-center mt-7">
          Kindly proceed to make payment into " 1990050715 ECO BANK ZEE BEAUTY
          ROYALE ". Then send Payment receipt to our WHATSAPP line by clicking
          on this details. Thank you!
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
