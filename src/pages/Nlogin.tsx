import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.username === "" || form.password === "") {
      setError("Username and password are required");
    } else {
      setError("");
      console.log("Username:", form.username);
      console.log("Password:", form.password);
      navigate("/")
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
                type="text"
                id="username"
                name="username"
                className="w-full px-4  py-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-600/70 peer"
                value={form.username}
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
              className="w-full bg-blue-600/90 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Login
            </button>
          </form>
          <div className="mt-10 text-center">
            <p className="text-gray-600">
              No profile yet?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline"
              >
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
