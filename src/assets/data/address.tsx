import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaSquareInstagram } from "react-icons/fa6";
import { AddressItem } from "../../types/index";



const address: AddressItem[] = [
  {
    title: "Petrocam Filling Station  abulado bus stop Satellite",
    icon: FaLocationDot,
    link: "https://www.google.com/maps/place/Petrocam+Filling+Station+Satellite/@6.4551121,3.2531475,17z/data=!3m1!5s0x103b8626d8f47357:0x17097613b4052094!4m14!1m7!3m6!1s0x103b87793408f19d:0xc60858a1804c5383!2sPetrocam+Filling+Station+Satellite!8m2!3d6.4551068!4d3.2557224!16s%2Fg%2F11fk3db3dg!3m5!1s0x103b87793408f19d:0xc60858a1804c5383!8m2!3d6.4551068!4d3.2557224!16s%2Fg%2F11fk3db3dg?entry=ttu",
  },
  {
    title: "+234 8181099812",
    icon: FaPhone,
    link: "08181099812",
  },
  {
    title: "email",
    icon: MdEmail,
    link: "",
  },
  {
    title: "instagram",
    icon: FaSquareInstagram,
    link: "",
  },
];

export default address;
