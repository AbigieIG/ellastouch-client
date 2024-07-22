import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  state: string;
  country: string;
  registrationDate: string;
}

const users: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phoneNumber: '123-456-7890', state: 'California', country: 'USA', registrationDate: 'Thu Jul 18 2024' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phoneNumber: '098-765-4321', state: 'New York', country: 'USA', registrationDate: 'Wed Jul 17 2024' },
  // Add more user data as needed
];

const UserTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber.includes(searchTerm) ||
        user.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterDate) {
      const formattedDate = format(filterDate, 'EEE MMM dd yyyy');
      results = results.filter((user) => user.registrationDate === formattedDate);
    }

    setFilteredUsers(results);
    setCurrentPage(1); // Reset to the first page when search term or filter date changes
  }, [searchTerm, filterDate]);

  const handleClick = (direction: string) => {
    if (direction === 'next' && currentPage < Math.ceil(filteredUsers.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);


  const navigate = useNavigate()
  return (
    <div className="bg-white  rounded-lg md:p-6">
      <h2 className="text-lg text-slate-700 font-semibold mb-4">Users</h2>
      <div className="mb-4 flex space-x-2">
        <input
          type="text"
          placeholder="Search by name, email, phone, state, or country"
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
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-white border-b">
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">ID</th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">Name</th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">Email</th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">Phone Number</th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">State</th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">Country</th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">Registration Date</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr onClick={() => navigate("/User-page")} className="bg-white border-b cursor-pointer" key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.phoneNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.state}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.country}</td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">{user.registrationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleClick('prev')}
          className={`px-4 py-2 rounded ${currentPage === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === 1}
        >
          <FaAngleLeft />
        </button>
        <span className="px-4 py-2">{currentPage} of {totalPages}</span>
        <button
          onClick={() => handleClick('next')}
          className={`px-4 py-2 rounded ${currentPage === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          disabled={currentPage === totalPages}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default UserTable;
