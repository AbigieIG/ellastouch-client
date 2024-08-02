import React, { useEffect, useState } from "react";
import StepBar from "../components/Stepbar";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import logo from "../assets/images/logo1.jpg";
import apiClient from "../utils/axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { bank } from "../assets/data/address";
import { IAddess, IBooking } from "../types";




const Confirmation: React.FC = () => {
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<IBooking>({} as IBooking );
  const [addressItem, setAddress] = useState<IAddess[]>([])
  const [bookId] = useState(() => {
    const savedData = localStorage.getItem("bookId");
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    apiClient
      .get(`bookings/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [bookId]);



    useEffect(() => {
      apiClient.get("/address")
      .then((res) => {
        setAddress(res.data)
      })
      .catch((err) => console.error(err))
    }, [])

  const handleSaveAsImage = () => {
    html2canvas(document.querySelector("#confirmation")!).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "confirmation.png";
      link.click();
    });
  };

  const handleSaveAsPDF = () => {
    html2canvas(document.querySelector("#confirmation")!).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("confirmation.pdf");
    });
  };

  return (
    <div className="px-4 mb-7 md:px-0">
      <div className="flex mt-5 items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex md:px-5 items-center gap-2"
        >
          <FaAngleLeft className="text-gray-500" size={20} />
          <span>Confirmation</span>
        </button>
        <div className="flex items-center justify-between relative px-10">
          <p
            onClick={() => setActive(!active)}
            className="text-xs cursor-pointer text-sky-600 capitalize"
          >
            Booking Policy
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
                <p>*REFUND is conditional.</p>
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => setActive(!active)}
                    className="text-white capitalize bg-sky-600 py-2 px-5 rounded mt-3 w-20"
                  >
                    Okay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <StepBar currentStep={4} />
      <div id="confirmation" className="md:px-10 mt-10">
        <div className="flex flex-col justify-center items-center md:flex-row gap-5">
          <img
            className="md:w-20 border border-slate-300 md:h-20 h-10 w-10 rounded-full"
            src={logo}
            alt="Profile"
          />
          <div className="text-sm text-slate-600 flex flex-col gap-5">
            <h1 className="text-slate-700 text-lg">
              You are booked with  EllasTouch Makeover
            </h1>
            <div className="flex items-center gap-10">
              <span className="text-slate-400">Service</span>
              <span>{data.serviceId?.name}</span>
            </div>
            <div className="flex items-center gap-10">
              <span className="text-slate-400">Date & time</span>
              <span>
                {data.date}, {data.time}
              </span>
            </div>
            <div className="flex items-center gap-10">
              <span className="text-slate-400">Booking ID</span>
              <span>{data.bookingId}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full mt-7">
          <button
            onClick={() => navigate("/")}
            className="my-4 border text-slate-500 py-3 px-10 rounded"
          >
            Book another appointment
          </button>
        </div>
        <div className="flex justify-center gap-4 mt-5">
          <button
            onClick={handleSaveAsImage}
            className="my-4 border text-slate-500 py-2 px-5 rounded"
          >
            Save as Image
          </button>
          <button
            onClick={handleSaveAsPDF}
            className="my-4 border text-slate-500 py-2 px-5 rounded"
          >
            Save as PDF
          </button>
        </div>
        <p className="text-sm w-full text-sky-600 leading-6 text-center mt-7">
          Kindly proceed to make payment into "{addressItem[0]?.bank.account}  {addressItem[0]?.bank.bankName}{" "}
          {addressItem[0]?.bank.name}
          ". Then send Payment receipt to our{" "}
          <a href={bank.link} className="underline" target="_blank">
            {" "}
            WHATSAPP line by clicking on this details.
          </a>{" "}
          Thank you!
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
