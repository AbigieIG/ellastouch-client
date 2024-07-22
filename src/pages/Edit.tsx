import React, { useState } from 'react';


interface User {
  fullName: string;
  phoneNumber: string;
  email: string;
  state: string;
  city: string;
  address: string;
  zipCode: string;
}

const initialUser: User = {
  fullName: "John Doe",
  phoneNumber: "123-456-7890",
  email: "john@example.com",
  state: "California",
  city: "Los Angeles",
  address: "123 Main St",
  zipCode: "90001",
};

const UserEditForm: React.FC = () => {
  const [user, setUser] = useState<User>(initialUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    console.log('Updated user data:', user);
  };

  return (
    <div className=" text-slate-600 min-h-screen p-8">
      <div className="bg-white  rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Edit </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={user.fullName}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">State</label>
            <input
              type="text"
              name="state"
              value={user.state}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={user.city}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={user.zipCode}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded w-full"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEditForm;
