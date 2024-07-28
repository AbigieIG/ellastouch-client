import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Calendar from "../components/Calender";
import StepBar from "../components/Stepbar";
import { FaAngleLeft } from "react-icons/fa6";
import { ServiceType } from "../types";
import apiClient from "../utils/axios";

const Booking = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<ServiceType>({} as ServiceType);
  const [active, setActive] = useState(false);


  useEffect(() => {
    apiClient
      .get(`/services/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="w-full   px-4 md:px-0 ">
      <div className="flex w-full mt-4 md:mt-0 items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex md:px-5 items-center gap-2"
        >
          <FaAngleLeft className="text-gray-500" size={20} />
          <span>Date & Time</span>
        </button>
        <div className="flex items-center z-50 justify-between relative  md:px-10">
          <p
            onClick={() => setActive(!active)}
            className="text-xs cursor-pointer text-sky-600 capitalize"
          >
            booking policy
          </p>
          {active && (
            <div className="fixed flex justify-center items-center top-0 left-0 w-full h-full bg-slate-600/20">
              <div className="text-xs text-slate-600  shadow-lg justify-center px-5 py-5 rounded   bg-white  flex flex-col gap-1">
                <h1 className=" font-semibold mb-3">Our Booking Policy</h1>
                <p>
                  *Reservation doesn't confirm booking. 60% Deposit payment is
                  required to secure your booking.
                </p>
                <p>
                  {" "}
                  *Late arrivals attracts an extra charge of N5,000 per 30mins.{" "}
                </p>
                <p>
                  {" "}
                  *Please endeavor to read Service Description carefully(Tap
                  "more").
                </p>
                <p> *REFUND is conditional.</p>
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => setActive(!active)}
                    className="text-white capitalize  bg-sky-600 py-2 px-5 rounded mt-3 w-20"
                  >
                    okay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <StepBar currentStep={2} />

      <div className="md:px-5 w-full mt-7">
        <div className="md:px-10 bg-slate-100/70  w-full py-4">
          <p>{data?.name}</p>
          <div className="flex mt-1 text-gray-500 gap-2 items-center text-xs">
            <p>{data?.duration} .</p>
            <p>₦{data?.price} .</p>
          </div>
        </div>
      </div>

      <Calendar data={data} />
    </div>
  );
};

export default Booking;
