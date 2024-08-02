import React, { useEffect, useState } from "react";
import StepBar from "../components/Stepbar";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import apiClient from "../utils/axios";
import { UserType } from "../types";
import { AxiosError, AxiosResponse } from "axios";
import Spinner from "../components/Spinner";

interface FormState {
  fullName: string;
  userId: string | null;
  time: string;
  date: string;
  serviceId: string;
  phoneNumber: string;
  email: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
  comment: string;
  agreeTerms?: boolean;
}

const Register: React.FC = () => {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [booking] = useState(() => {
    const savedBooking = localStorage.getItem("booking");
    return savedBooking ? JSON.parse(savedBooking) : {};
  });
 console.log(booking);
  const [formState, setFormState] = useState<FormState>({
    userId: null,
    time: booking.time || "",
    date: booking.date || "",
    serviceId: booking._id || "",
    fullName: "",
    email: "",
    phoneNumber: "",
    state: "",
    city: "",
    address: "",
    zipCode: "",
    comment: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    apiClient
      .get("/users/data", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (user._id) {
      setFormState((prevState) => ({
        ...prevState,
        userId: user._id || "",
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        state: user.state || "",
        city: user.city || "",
        address: user.address || "",
        zipCode: user.zipCode || "",
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox";
    const checked = isCheckbox
      ? (e.target as HTMLInputElement).checked
      : undefined;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    if (
      !formState.fullName ||
      !formState.email ||
      !formState.phoneNumber ||
      !formState.state ||
      !formState.city ||
      !formState.address ||
      !formState.zipCode
    ) {
      setError("Please fill in all required fields");
      return;
    }
    
    if (!formState.agreeTerms) {
      setError("Please agree to our terms and conditions");
      return;
    }

    setLoading(true); // Start loading
    try {
      const res: AxiosResponse = await apiClient.post("/bookings", formState);
      if (res.status === 201) {
        localStorage.setItem("bookId", JSON.stringify(res.data._id));
        navigate("/confirm");
      }
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        setError(
          error.response?.data.message || "An unexpected error occurred"
        );
      }
    } finally {
      setLoading(false); 
    }
  };

  const handlePhoneChange = (value: string) => {
    setFormState((prevState) => ({
      ...prevState,
      phoneNumber: value,
    }));
  };

  return (
    <>
      <div className="flex items-center mt-5 justify-between px-4 md:px-0">
        <button
          onClick={() => navigate(-1)}
          className="flex md:px-5 items-center gap-2"
        >
          <FaAngleLeft className="text-gray-500" size={20} />
          <span>Your information</span>
        </button>
        <div className="flex items-center justify-between relative  md:px-10">
          <p
            onClick={() => setActive(!active)}
            className="text-xs cursor-pointer text-sky-600 capitalize"
          >
            booking policy
          </p>
          {active && (
            <div className="fixed flex justify-center items-center px-5 top-0 z-50 left-0 w-full h-full bg-slate-600/20">
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
      <div className="px-4 md:px-0">
        <StepBar currentStep={3} />
      </div>

      <div className="md:px-5 w-full mt-7 px-4 ">
        <div className="md:px-10 bg-slate-100/70  w-full py-4">
          <div className="flex mt-1 text-gray-500 gap-2 items-center text-xs">
            <p className="text-gray-800 text-sm">{booking?.name}</p>
            <p>{booking?.duration} .</p>
            <p>₦{booking?.price} .</p>
          </div>
          <p className="text-gray-500 text-xs">
            with Ellas Touch Mua on {booking.date}, {booking.time}
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-7 h-full overflow-auto px-4 md:px-0">
        <div className="bg-white md:p-8 rounded w-full max-w-lg">
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
                disabled={loading} // Disable input if loading
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
                disabled={loading} // Disable input if loading
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
                disabled={loading} // Disable input if loading
              />
              <label
                htmlFor="email"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Email
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
                  disabled={loading} // Disable input if loading
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
                  disabled={loading} // Disable input if loading
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
                disabled={loading} // Disable input if loading
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
                disabled={loading} // Disable input if loading
              />
              <label
                htmlFor="address"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Address
              </label>
            </div>
            <div className="mb-4 relative">
              <textarea
                id="comment"
                name="comment"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
                value={formState.comment}
                onChange={handleChange}
                placeholder=" "
                disabled={loading} // Disable input if loading
              />
              <label
                htmlFor="comment"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Comment (Optional)
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
                disabled={loading} // Disable input if loading
              />
              <label htmlFor="agreeTerms" className="text-gray-700 font-medium">
                I agree to the terms and conditions
              </label>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full flex items-center justify-center bg-blue-600/85 text-white py-2 rounded hover:bg-blue-700/90 transition duration-300"
              disabled={loading} // Disable button if loading
            >
              {loading ? <Spinner /> : "Book Service"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
