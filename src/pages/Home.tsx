import Carousel from "../components/Carousel";
import sample from "../assets/images/img-5207.webp";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";

const Home = () => {
  const [active, setActive] = useState(false);

  return (
    <div className=" w-full  lg:mt-5">
      <div className="md:px-10 items-center gap-3">
        <div className="relative w-full h-[20rem] mb-4">
          <img
            className="w-full h-full object-cover md:rounded-md"
            src={sample}
            alt="logo"
          />
          <Link
            to={"/gallery"}
            className="text-lg bg-black/10 flex items-center justify-center gap-2 border border-white px-5 py-1 rounded-lg absolute bottom-3 left-1/2 -translate-x-1/2 text-white "
          >
            <span> Samples</span>
            <FaAngleRight size={15} />
          </Link>
        </div>
        <div className="px-4 md:px-0">
          <p className="text-sm leading-7 text-slate-600">
            <b className=" font-bold"> Ellas Touch Mua </b>is a Nigerian owned
            makeup brand that specializes in Bridals, Events ,Shoots and
            Trainings of Makeup. Our makeup service guarantees a seamless
            finish,lightweight and long lasting finish. We are very good at what
            we do!
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4  relative mt-5 md:px-10">
        <p className="text-sm capitalize">your service</p>
        <p
          onClick={() => setActive(!active)}
          className="text-xs cursor-pointer text-blue-600/70 capitalize"
        >
          booking policy
        </p>
        {active && (
          <div className="fixed flex justify-center px-5 items-center top-0 left-0 w-full h-full bg-slate-600/20">
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
      <Carousel />
    </div>
  );
};

export default Home;
