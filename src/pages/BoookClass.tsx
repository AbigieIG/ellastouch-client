import { BsCalendarX } from "react-icons/bs";

const BoookClass = () => {
  return (
    <div className="md:px-10 text-slate-700">
      <h1 className="text-lg">Your Class</h1>
      <div className="flex flex-col justify-center items-center mt-36 gap-10">
        <p className="text-lg"> No classes with open slots right now</p>
        <p>
          Classes with bookable slots will
          appear when available
        </p>
        <BsCalendarX className="text-sky-600" size={100} />
      </div>
    </div>
  );
};

export default BoookClass;
