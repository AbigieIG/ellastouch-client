import React, { useEffect, useState } from "react";
import apiClient from "../utils/axios";
import { UserType } from "../types";
import { isAxiosError } from "../utils/axiosError";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const UserEditForm: React.FC = () => {
  const [user, setUser] = useState<UserType>({} as UserType);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
    const res =  apiClient.put("/users/edit", user, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(res);
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response.data.message || "An unexpected error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
      navigate("/user-page")
    }
  };


  useEffect(() => {
    apiClient
      .get("/users/data", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className=" text-slate-600 min-h-screen p-8">
      <div className="bg-white  rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Edit </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={user?.fullName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={user?.phoneNumber}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user?.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={user?.state}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={user?.city}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={user?.address}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={user?.zipCode}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 flex justify-center items-center bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {loading ? <Spinner /> : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditForm;
