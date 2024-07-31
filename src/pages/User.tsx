import React, { useEffect, useState } from "react";
import apiClient from "../utils/axios";
import { UserType } from "../types";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";

const UserDisplay: React.FC = () => {

  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const res: AxiosResponse = await apiClient.delete(`/users/${id}`, {
        withCredentials: true,
      });
      if (res.status === 204) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [user, setUser] = useState<UserType>({} as UserType);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    apiClient
      .get(`/users/${id}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);
  return (
    <div className="bg-white  rounded-lg p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">User Details</h2>

     <div className="flex justify-end my-4">
     <button
        className="bg-red-500 text-xs text-white px-4 py-2 rounded-lg hover:bg-red-600"
        onClick={() => handleDelete()}
      >
        Delete
      </button>
     </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Full Name:</label>
          <span className="text-gray-600">{user.fullName}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Phone Number:</label>
          <span className="text-gray-600">{user.phoneNumber}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Email:</label>
          <span className="text-gray-600">{user.email}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Password:</label>
          <span className="text-gray-600">{user.password}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">State:</label>
          <span className="text-gray-600">{user.state}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">City:</label>
          <span className="text-gray-600">{user.city}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Address:</label>
          <span className="text-gray-600">{user.address}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Zip Code:</label>
          <span className="text-gray-600">{user.zipCode}</span>
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold text-gray-700">Comment:</label>
          <span className="text-gray-600">{new Date(user.createdAt as Date).toLocaleString()}</span>
        </div>
      </div>

      <div className="bg-white border-t mt-7 rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Activities</h2>
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


    </div>
  );
};

export default UserDisplay;
