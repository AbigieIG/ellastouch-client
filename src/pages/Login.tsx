import React, { useState } from "react";
import { Link } from "react-router-dom";
import StepBar from "../components/Stepbar";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import apiClient from "../utils/axios";
import { isAxiosError } from "../utils/axiosError";
import Spinner from "../components/Spinner";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (form.email === "" || form.password === "") {
        setError("email and password are required");
      } else {
      const res =  await apiClient.post("/login", form, {
         headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
         }
        });
        localStorage.setItem("token", res.data.token);
        navigate("/book-form");
      }
      setError("");
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response.data.message || "An unexpected error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex items-center mt-5 justify-between px-4 md:px-0">
        <button
          onClick={() => navigate(-1)}
          className="flex md:px-5 items-center gap-2"
        >
          <FaAngleLeft className="text-gray-500" size={20} />
          <span>Login</span>
        </button>
        <div className="flex items-center z-50 justify-between relative  md:px-10">
          <p
            onClick={() => setActive(!active)}
            className="text-xs cursor-pointer text-sky-600 capitalize"
          >
            booking policy
          </p>
          {active && (
            <div className="fixed flex justify-center items-center px-5 top-0 left-0 w-full h-full bg-slate-600/20">
              <div className="text-xs text-slate-600 shadow-lg  justify-center px-5 py-5 rounded bg-white flex flex-col gap-1">
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
                <p> *REFUND is conditional.</p>
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
      <div className="flex justify-center min-h-screen px-4 ">
        <div className="bg-white p-8 rounded w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-5 relative">
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4  py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-600/70 peer"
                value={form.email}
                onChange={handleChange}
                placeholder=" "
              />
              <label
                htmlFor="username"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Username
              </label>
            </div>
            <div className="mb-4 relative">
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-600/70 peer"
                value={form.password}
                onChange={handleChange}
                placeholder=""
              />
              <label
                htmlFor="password"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                Password
              </label>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600/90 flex items-center justify-center text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
             {loading ? <Spinner /> : "Login"}
            </button>
          </form>
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              No profile yet?{" "}
              <Link
                to="/create-profile"
                className="text-blue-600 hover:underline"
              >
                Create new profile
              </Link>
            </p>
            <p className="text-gray-600 mt-2">
              <Link to="/book-form" className="text-blue-600 hover:underline">
                Skip login process
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
