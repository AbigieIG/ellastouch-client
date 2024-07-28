import { FaCalendar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";
import { GrGallery } from "react-icons/gr";
import { IoBookmarks } from "react-icons/io5";
import { SidebarItem  } from "../../types";



const sidebar: SidebarItem[] = [
  {
    title: "book appointment",
    icon: FaCalendar,
    link: "/",
  },
  {
    title: "book classes",
    icon: IoMdPeople,
    link: "/book-classes",
  },
  {
    title: "services",
    icon: FiEdit,
    link: "/services",
  },
  {
    title: "classes",
    icon: IoIosPeople,
    link: "/classes",
  },
  {
    title: "gallery",
    icon: GrGallery,
    link: "/gallery",
  },
  {
    title: "track booking",
    icon: IoBookmarks,
    link: "/track-booking",
  },
  {
    title: "about us",
    icon: FaLocationDot,
    link: "/about-us",
  },
];

export default sidebar;
