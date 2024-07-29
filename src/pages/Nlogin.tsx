import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/axios";
import { isAxiosError } from "../utils/axiosError";
import Spinner from "../components/Spinner";

const Login: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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
        if (form.email === import.meta.env.VITE_ADMIN_EMAIL) {
          const res = await apiClient.post("/admin/login", form, {
            withCredentials: true,
          });
          if (res.status === 200) {
            navigate("/admin");
            localStorage.setItem("admin", JSON.stringify(res.data));
          }
         
        } else {
          await apiClient.post("/login", form, {
            withCredentials: true,
          });

          navigate("/user-page");
        }
        setError("");
      }
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
      <div className="flex justify-center min-h-screen">
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
                htmlFor="email"
                className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
              >
                email
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
              className="w-full flex items-center justify-center bg-blue-600/90 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              {loading ? <Spinner /> : "Login"}
            </button>
          </form>
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              No profile yet?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Create new profile
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
