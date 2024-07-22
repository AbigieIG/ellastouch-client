import { Link } from "react-router-dom";
import { IoLogoFacebook, IoLogoTwitter, IoLogoInstagram } from "react-icons/io5";
import logo from "../assets/images/profilepic.webp";

const Footer = () => {
  return (
    <footer className="bg-gray-800 lg:hidden text-white py-8">
      <div className="container mx-auto px-5 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 lg:mb-0">
          <img className="w-12 h-12 rounded-full" src={logo} alt="logo" />
          <div className="ml-2">
            <h1 className="text-lg font-semibold">Ellas Touch Mua</h1>
            <p className="text-xs text-gray-400">Satelite Town, Lagos, Nigeria</p>
          </div>
        </div>
        <nav className="mb-4  lg:mb-0">
          <ul className="flex flex-col md:flex-row items-center gap-4">
            <li>
              <Link to="/" className="hover:text-sky-600">Home</Link>
            </li>
            <li>
              <Link to="/about-us" className="hover:text-sky-600">About</Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-sky-600">Services</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-sky-600">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <IoLogoFacebook className="text-2xl hover:text-sky-600" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <IoLogoTwitter className="text-2xl hover:text-sky-600" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <IoLogoInstagram className="text-2xl hover:text-sky-600" />
          </a>
        </div>
      </div>
      <div className="container mx-auto text-center mt-4">
        <p className="text-xs text-gray-400">© {new Date().getFullYear()} Ellas Touch Mua. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
