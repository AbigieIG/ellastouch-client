import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Activity {
  id: number;
  activity: string;
  date: string;
}

const user = {
  fullName: "John Doe",
  phoneNumber: "123-456-7890",
  email: "john@example.com",
  state: "California",
  city: "Los Angeles",
  address: "123 Main St",
  zipCode: "90001",
};

const activities: Activity[] = [
  { id: 1, activity: "Booked Studio Glam", date: "Thu Jul 18 2024" },
  { id: 2, activity: "Attended Studio Glam", date: "Fri Jul 19 2024" },
  { id: 3, activity: "Left a Review", date: "Sat Jul 20 2024" },
];

const UserPage: React.FC = () => {

  const navigate = useNavigate()

  return (
    <div className="h-screen p-8">
        <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate("/edit-user")} className="bg-sky-600 px-4 py-2 text-white rounded">Edit</button>
            <button className="bg-red-600 px-4 py-2 text-white rounded">Delete Account</button>
        </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-3xl mx-auto">
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
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Activities</h2>
        <div className="relative w-full overflow-x-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead>
              <tr className="border-b">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Activity</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr onClick={() => navigate("/book-details")} className="bg-white border-b" key={activity.id}>
                  <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{activity.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{activity.activity}</td>
                  <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
