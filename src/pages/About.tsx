import GoogleMap from "../components/Google";
import WorkHours from "../components/workHours";
import address from "../assets/data/address";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="w-full flex  py-10 flex-col gap-2 md:px-10 px-4">
      <h1 className="text-sm"> About Us</h1>
      <p className=" leading-6 text-slate-600">
        Ellas Touch Mua is a Nigerian owned makeup brand that specializes in
        Bridals, Events ,Shoots and Training of Makeup. Our makeup service
        guarantees a velvet-seamless finish,lightweight and long lasting finish.
        We are very good at what we do!
      </p>
      <div className=" mt-5 md:hidden w-full h overflow-y-scroll    flex flex-col">
      <div className="">
      <WorkHours />
        <div className="my-5 ">
          {address.map((add, i) => {
            return (
              <div className="flex items-center gap-2 text-slate-600 py-2" key={i}>
                <add.icon className="text-slate-400/50" size={20} />
                <Link className="text-sky-600" to={add.link}>{add.title}</Link>
              </div>
            );
          })}
        </div>
        <GoogleMap height={200} width={"100%"} />
        <p className="text-xs text-slate-600 mt-10">website created by <Link className="text-sky-600 text-sm" to={"https://abigieig.github.io/klema-portfolio"}>klema dev</Link></p>
      </div>
    </div>
    </div>
  );
};

export default About;
