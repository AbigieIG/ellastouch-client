// src/components/BookingDetail.tsx
import React, { useState } from "react";
import { BookingType } from "../types";
import apiClient from "../utils/axios";
import { AxiosError } from "axios";


const BookingDetail: React.FC = () => {
  const [searchId, setSearchId] = useState<string>("");
  const [booking, setBooking] = useState<BookingType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/booking/${searchId}`);
      const data = response.data;
      setBooking(data);
    } catch (err) {
      if (err instanceof AxiosError) {
        setError(err.response?.data.message);
        setBooking(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Search Booking</h1>
      <div className="mb-4 flex">
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Enter Booking ID"
          className={`p-2 border border-gray-300 rounded-l-md flex-grow ${
            searchId.length < 6
              ? "focus:ring-red-500 focus:border-red-500"
              : "focus:ring-blue-500 focus:border-blue-500"
          }`}
        />
        <button
          onClick={handleSearch}
          disabled={searchId === "" || searchId.length < 6}
          className="p-2 bg-blue-500 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-r-md"
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center">Loading...</div>
      )}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {booking ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Booking Details</h2>
          <div className="mb-2">
            <strong className="text-gray-600">ID:</strong> {booking.bookingId}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Name:</strong> {booking.fullName}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Date:</strong> {booking.date}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Time:</strong> {booking.time}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Service:</strong>{" "}
            {booking.service?.name}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Duration:</strong>{" "}
            {booking.service?.duration}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Price:</strong>{" "}
            {booking.service?.price}
          </div>
          <div className="mb-2">
            <strong className="text-gray-600">Address:</strong>{" "}
            <div>
              <span>{booking.address},</span>
              <span> {booking.city},</span>
              <span> {booking.state},</span>
              <span> {booking.zipCode}</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default BookingDetail;
