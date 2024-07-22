import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Link } from "react-router-dom";

interface FormState {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  agreeTerms: boolean;
}

const Register: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    fullName: "",
    phoneNumber: "",
    email: "",
    password: "",
    state: "",
    city: "",
    address: "",
    zipCode: "",
    agreeTerms: false,
  });
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      phoneNumber: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.agreeTerms) {
      setError("You must agree to the terms and conditions");
    } else {
      setError("");
      console.log(formState);
      navigate("/confirm");
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="flex my-6  justify-center h-full overflow-auto">
        <div className="bg-white md:p-8 px-1 rounded w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                value={formState.fullName}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                htmlFor="fullName"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Full Name
              </label>
            </div>
            <div className="mb-4 relative">
              <PhoneInput
                country={'ng'}
                value={formState.phoneNumber}
                onChange={handlePhoneChange}
                inputClass="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
              />
          
            </div>
            <div className="mb-4 relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                value={formState.email}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Email
              </label>
            </div>
            <div className="mb-4 relative">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                value={formState.password}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Password
              </label>
            </div>
            <div className="mb-4 flex space-x-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  id="state"
                  name="state"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                  value={formState.state}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label
                  htmlFor="state"
                  className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  State
                </label>
              </div>
              <div className="flex-1 relative">
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                  value={formState.zipCode}
                  onChange={handleChange}
                  placeholder=" "
                />
                <label
                  htmlFor="zipCode"
                  className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
                >
                  Zip Code
                </label>
              </div>
            </div>
            <div className="mb-4 relative">
              <input
                type="text"
                id="city"
                name="city"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                value={formState.city}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                htmlFor="city"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                City
              </label>
            </div>
            <div className="mb-4 relative">
              <input
                type="text"
                id="address"
                name="address"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                value={formState.address}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                htmlFor="address"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Address
              </label>
            </div>
       
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                className="mr-2"
                checked={formState.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeTerms" className="text-gray-700 font-medium">
                I agree to the terms and conditions
              </label>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600/85 text-white py-2 rounded hover:bg-blue-700/90 transition duration-300"
            >
             Create
            </button>
          </form>
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/user-login"
                className="text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
