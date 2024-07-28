import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserType } from "../types";
import apiClient from "../utils/axios";

const UserTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterDate, setFilterDate] = useState<Date | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserType[]>(users);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  async function fetchUsers() {
    try {
      const response = await apiClient.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let results = users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phoneNumber.includes(searchTerm) ||
        user.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterDate) {
      const formattedDate = format(filterDate, "yyyy-MM-dd");
      results = results.filter((user) => {
        const createdAtStr =
          user.createdAt instanceof Date
            ? format(user.createdAt, "yyyy-MM-dd")
            : user?.createdAt?.toString().split("T")[0];
        return createdAtStr === formattedDate;
      });
    }

    setFilteredUsers(results);
    setCurrentPage(1);
  }, [searchTerm, filterDate, users]);

  const handleClick = (direction: string) => {
    if (
      direction === "next" &&
      currentPage < Math.ceil(filteredUsers.length / itemsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg md:p-6">
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
          dateFormat="yyyy-MM-dd"
          placeholderText="Select a date"
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>
      <div className="relative w-full overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr className="bg-white border-b">
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                ID
              </th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                Name
              </th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                Email
              </th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                Phone Number
              </th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                State
              </th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                City
              </th>
              <th className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                Registration Date
              </th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, i) => (
              <tr
                onClick={() => navigate(`/user/${user.id}`)}
                className="bg-white border-b cursor-pointer"
                key={user.id}
              >
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {i + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {user.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {user.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {user.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap overflow-hidden overflow-ellipsis">
                  {new Date(user.createdAt as Date).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleClick("prev")}
          className={`px-4 py-2 rounded ${
            currentPage === 1
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === 1}
        >
          <FaAngleLeft />
        </button>
        <span className="px-4 py-2">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handleClick("next")}
          className={`px-4 py-2 rounded ${
            currentPage === totalPages
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={currentPage === totalPages}
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default UserTable;
