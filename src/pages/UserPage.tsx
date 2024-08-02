import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../utils/axios";
import { UserType } from "../types";
import ConfirmationModal from "../components/ConfirmationModal";
import { isAxiosError } from "../utils/axiosError";
import { AxiosResponse } from "axios";

const UserPage: React.FC = () => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    apiClient
      .get("/users/data", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const navigate = useNavigate();
  console.log(user);

  const handleDelete = async () => {
    try {
      const res: AxiosResponse = await apiClient.delete("/users/delete", {
        withCredentials: true,
      });
      if (res.status === 204) {
        navigate("/");
      }
    } catch (error) {
      if (isAxiosError(error)) {
        setError(error.response.data.message || "An unexpected error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="h-screen p-8">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => navigate("/edit-user")}
          className="bg-blue-500 px-4 py-2 text-white rounded"
        >
          Edit
        </button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-red-600 px-4 py-2 text-white rounded"
        >
          Delete Account
        </button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Full Name:</label>
            <span className="text-gray-600">{user?.fullName}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Phone Number:</label>
            <span className="text-gray-600">{user?.phoneNumber}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Email:</label>
            <span className="text-gray-600">{user?.email}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">State:</label>
            <span className="text-gray-600">{user?.state}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">City:</label>
            <span className="text-gray-600">{user?.city}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Address:</label>
            <span className="text-gray-600">{user?.address}</span>
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Zip Code:</label>
            <span className="text-gray-600">{user?.zipCode}</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Activities</h2>
        {user?.bookings && user.bookings.length > 0 ? (
          <div className="relative w-full overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
              <thead>
                <tr className="border-b">
                  <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">Booking Id</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Time</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {user?.bookings?.map((book) => (
                  <tr
                    onClick={() => navigate(`/bookings/${book._id}`)}
                    className="bg-white border-b cursor-pointer"
                    key={book._id}
                  >
                    <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {book.bookingId} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {book.serviceId?.name} 
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {book.time} 
                    </td>
                    {/* <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                    {book.service?.name}{" "}
                    {book.service?.price} {book.service?.duration}
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                      {new Date(book.createdAt as Date).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No activities found.</p>
        )}
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
      />
      <div className="flex justify-start">
        <button
          className="bg-blue-500 text-white flex my-5  px-4 py-2 rounded-lg hover:bg-blue-600"
          onClick={() => navigate(`/`)}
        >
          Book Service
        </button>
      </div>
    </div>
  );
};

export default UserPage;
