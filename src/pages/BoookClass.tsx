import { BsCalendarX } from "react-icons/bs";

const BoookClass = () => {
  return (
    <div className="md:px-10 text-slate-700 px-5 h-screen mb-8">
      <h1 className="text-lg">Your Class</h1>
      <div className="flex flex-col justify-center items-center md:mt-36 mt-10 gap-10">
        <p className="text-lg text-center"> No classes with open slots right now</p>
        <p className="text-center">
          Classes with bookable slots will
          appear when available
        </p>
        <BsCalendarX className="text-sky-600" size={100} />
      </div>
    </div>
  );
};

export default BoookClass;
