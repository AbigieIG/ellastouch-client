import GoogleMap from "./Google";
import WorkHours from "./workHours";
import address from "../assets/data/address";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="px-10 mt-5 w-[25%] border-l hidden lg:flex flex-col">
      <div className="w-full">
        <GoogleMap height={200} width={200} />
        <div className="mt-5">
          {address.map((add, i) => {
            return (
              <div className="flex items-center gap-2 text-slate-600 py-2" key={i}>
                <add.icon className="text-slate-400/50" size={20} />
                <Link className="text-sky-600" to={add.link}>{add.title}</Link>
              </div>
            );
          })}
        </div>
        <WorkHours />
        <p className="text-xs text-slate-600 mt-10">website created by <Link className="text-sky-600 text-sm" to={"https://abigieig.github.io/klema-portfolio"}>klema dev</Link></p>
      </div>
    </div>
  );
};

export default Sidebar;
