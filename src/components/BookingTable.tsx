// src/components/BookingTable.tsx
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import bookings from "../assets/data/userBooking";
import { useNavigate } from 'react-router-dom';

interface Booking {
  id: number;
  name: string;
  date: string;
  time: string;
  duration: string;
  price: number;
  username: string;
  email: string;
}

const BookingTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookings);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let results = bookings.filter(
      (booking) =>
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterDate) {
      const formattedDate = format(filterDate, "EEE MMM dd yyyy");
      results = results.filter((booking) => booking.date === formattedDate);
    }

    setFilteredBookings(results);
    setCurrentPage(1); 
  }, [searchTerm, filterDate]);

  const handleClick = (direction: string) => {
    if (direction === "next" && currentPage < Math.ceil(filteredBookings.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastBooking = currentPage * itemsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking);
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const navigate = useNavigate()
  return (
    <div className="bg-white w-full rounded-lg md:p-6">
      {/* <h2 className="text-sm font-semibold mb-4">Bookings</h2> */}
      <h2 className="text-lg text-slate-700 font-semibold mb-4">Bookings</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search by name, username, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <DatePicker
          selected={filterDate}
          onChange={(date: Date | null) => setFilterDate(date)}
          dateFormat="EEE MMM dd yyyy"
          placeholderText="Select a date"
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="relative w-full overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr className="border-b">
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Service</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Username</th>
              <th className="px-6 py-4">Email</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {currentBookings.map((booking) => (
              <tr  onClick={() => navigate("/book-details")} className="bg-white border-b cursor-pointer" key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{booking.name}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{booking.date}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{booking.time}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{booking.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{booking.price}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{booking.username}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{booking.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleClick("prev")}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === 1}
        >
         <FaAngleLeft/>
        </button>
        <span className="px-4 py-2">{currentPage} of {totalPages}</span>
        <button
          onClick={() => handleClick("next")}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === totalPages}
        >
         <FaAngleRight /> 
        </button>
      </div>
    </div>
  );
};

export default BookingTable;
