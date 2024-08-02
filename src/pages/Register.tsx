import React, { useState } from "react";
import StepBar from "../components/Stepbar";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import apiClient from "../utils/axios";
import Spinner from "../components/Spinner";

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
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement >
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!formState.agreeTerms) {
        setError("You must agree to the terms and conditions");
      } else {
        const res = await apiClient.post("/register", formState, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(res);
        setError("");
        console.log(formState);
        // navigate("/confirm");
      }
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex px-5 items-center gap-2"
        >
          <FaAngleLeft className="text-gray-500" size={20} />
          <span>Your information</span>
        </button>
        <div className="flex items-center justify-between relative mt-5 px-10">
          <p
            onClick={() => setActive(!active)}
            className="text-xs cursor-pointer text-sky-600 capitalize"
          >
            booking policy
          </p>
          {active && (
            <div className="fixed flex justify-center items-center top-0 z-50 left-0 w-full h-full bg-slate-600/20">
              <div className="text-xs text-slate-600 shadow-lg justify-center px-5 py-5 rounded bg-white flex flex-col gap-1">
                <h1 className="font-semibold mb-3">Our Booking Policy</h1>
                <p>
                  *Reservation doesn't confirm booking. 60% Deposit payment is
                  required to secure your booking.
                </p>
                <p>
                  *Late arrivals attract an extra charge of N5,000 per 30mins.
                </p>
                <p>
                  *Please endeavor to read Service Description carefully (Tap
                  "more").
                </p>
                <p>*REFUND is conditional.</p>
                <div className="w-full flex justify-end">
                  <button
                    onClick={() => setActive(!active)}
                    className="text-white capitalize bg-sky-600 py-2 px-5 rounded mt-3 w-20"
                  >
                    okay
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <StepBar currentStep={3} />
      <div className="flex my-6 justify-center h-full overflow-auto">
        <div className="bg-white p-8 rounded w-full max-w-lg">
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
                country={"ng"}
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
              className="w-full flex items-center justify-center bg-blue-600/85 text-white py-2 rounded hover:bg-blue-700/90 transition duration-300"
            >
             {loading ? <Spinner /> : "Create"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
