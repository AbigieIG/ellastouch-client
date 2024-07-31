import { useEffect, useState } from "react";
import { AddressItem, IAddess } from "../types";
import apiClient from "../utils/axios";
import { FaLocationDot, FaPhone, FaSquareInstagram } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";




const Contact = () => {
  const [addressItem, setAddress] = useState<IAddess[]>([])
  useEffect(() => {
    apiClient.get("/address")
    .then((res) => {
      setAddress(res.data)
    })
    .catch((err) => console.error(err))
  }, [])
  
  const address: AddressItem[] = [
    {
      title:  addressItem[0]?.address,
      icon: FaLocationDot,
      link: "https://www.google.com/maps/place/Petrocam+Filling+Station+Satellite/@6.4551121,3.2531475,17z/data=!3m1!5s0x103b8626d8f47357:0x17097613b4052094!4m14!1m7!3m6!1s0x103b87793408f19d:0xc60858a1804c5383!2sPetrocam+Filling+Station+Satellite!8m2!3d6.4551068!4d3.2557224!16s%2Fg%2F11fk3db3dg!3m5!1s0x103b87793408f19d:0xc60858a1804c5383!8m2!3d6.4551068!4d3.2557224!16s%2Fg%2F11fk3db3dg?entry=ttu",
    },
    {
      title: addressItem[0]?.phoneNumber || "+2348181099812",
      icon: FaPhone,
      link: "tel:+" + addressItem[0]?.phoneNumber || "tel:+2348181099812",
    },
    {
      title: "email",
      icon: MdEmail,
      link: "mailto:" + addressItem[0]?.email ,
    },
    {
      title:  "instagram",
      icon: FaSquareInstagram,
      link: addressItem[0]?.instagram || "" ,
    },
  ];
  return (
    <div className="container text-slate-600 text-sm mx-auto p-4 md:p-10 h-screen">
      <h1 className="text-lg font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {address.map((detail, index) => (
          <a
            key={index}
            href={detail.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <detail.icon className="text-xl text-sky-600 mr-4" />
            <div>
              <h2 className="text-sm font-medium">{detail.title}</h2>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
