import GoogleMap from "../components/Google";
import WorkHours from "../components/workHours";
import { AddressItem, IAddess } from "../types";
import { useEffect, useState } from "react";
import apiClient from "../utils/axios";
import { FaLocationDot, FaPhone, FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const About = () => {
  const [addressItem, setAddress] = useState<IAddess[]>([]);
  useEffect(() => {
    apiClient
      .get("/address")
      .then((res) => {
        setAddress(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const address: AddressItem[] = [
    {
      title: addressItem[0]?.address,
      icon: FaLocationDot,
      link: "https://www.google.com/maps/place/Petrocam+Filling+Station+Satellite/@6.4551121,3.2531475,17z/data=!3m1!5s0x103b8626d8f47357:0x17097613b4052094!4m14!1m7!3m6!1s0x103b87793408f19d:0xc60858a1804c5383!2sPetrocam+Filling+Station+Satellite!8m2!3d6.4551068!4d3.2557224!16s%2Fg%2F11fk3db3dg!3m5!1s0x103b87793408f19d:0xc60858a1804c5383!8m2!3d6.4551068!4d3.2557224!16s%2Fg%2F11fk3db3dg?entry=ttu",
    },
    {
      title: addressItem[0]?.phoneNumber || "tel:+2348181099812",
      icon: FaPhone,
      link: "tel:+" + addressItem[0]?.phoneNumber || "tel:+2348181099812",
    },
    {
      title: "email",
      icon: MdEmail,
      link: "mailto:" + addressItem[0]?.email,
    },
    {
      title: "instagram",
      icon: FaSquareInstagram,
      link: addressItem[0]?.instagram || "",
    },
  ];

  return (
    <div className="w-full flex  py-10 flex-col gap-2 md:px-10 px-4 min-h-screen">
      <h1 className="text-sm"> About Us</h1>
      <p className=" leading-6 text-slate-600">
      EllasTouch Makeover is a Nigerian owned makeup brand that specializes in
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
                <div
                  className="flex items-center gap-2 text-slate-600 py-2"
                  key={i}
                >
                  <add.icon className="text-slate-400/50" size={20} />
                  <a className="text-sky-600" target="_blank" href={add.link}>
                    {add.title}
                  </a>
                </div>
              );
            })}
          </div>
          <GoogleMap height={200} width={"100%"} />
          <p className="text-xs text-slate-600 mt-10">
            website created by{" "}
            <a
              className="text-sky-600 text-sm"
              target="_blank"
              href={"https://abigieig.github.io/klema-portfolio"}
            >
              klema dev
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
