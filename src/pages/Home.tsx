import Accordion from "../components/Accordion";
import { useState } from "react";
import Carousel from "../components/Carousel";


const Home = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="w-full overflow-x-hidden  lg:mt-5">
      <div className="md:px-10 items-center gap-3">
  
         <Carousel  />
        <div className="px-4 md:px-0">
          <p className="text-sm leading-7 text-slate-600">
            <b className=" font-bold"> EllasTouch Makeover</b> is a Nigerian owned
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
     
      <Accordion />
    </div>
  );
};

export default Home;
