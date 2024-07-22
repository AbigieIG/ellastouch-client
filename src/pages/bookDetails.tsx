import React from 'react';

const BookingDetails: React.FC = () => {
  const booking = {
    fullName: "John Doe",
    phoneNumber: "123-456-7890",
    email: "john@example.com",
    state: "California",
    city: "Los Angeles",
    address: "123 Main St",
    zipCode: "90001",
    date: "Thu Jul 18 2024",
    service: "Studio Glam Only",
    time: "5:00 PM",
    duration: "60 mins",
    price: 20000,
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Full Name:</label>
          <span className="text-gray-600">{booking.fullName}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Phone Number:</label>
          <span className="text-gray-600">{booking.phoneNumber}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Email:</label>
          <span className="text-gray-600">{booking.email}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">State:</label>
          <span className="text-gray-600">{booking.state}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">City:</label>
          <span className="text-gray-600">{booking.city}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Address:</label>
          <span className="text-gray-600">{booking.address}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Zip Code:</label>
          <span className="text-gray-600">{booking.zipCode}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Dervice:</label>
          <span className="text-gray-600">{booking.service}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Date:</label>
          <span className="text-gray-600">{booking.date}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Time:</label>
          <span className="text-gray-600">{booking.time}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Duration:</label>
          <span className="text-gray-600">{booking.duration}</span>
        </div>
        <div className="flex flex-col">
          <label className="font-semibold text-gray-700">Price:</label>
          <span className="text-gray-600">{booking.price}</span>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
