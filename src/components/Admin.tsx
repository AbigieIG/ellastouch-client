import React, { useEffect, useState } from "react";
import { IAdmin } from "../types";
import apiClient from "../utils/axios";
import Spinner from "../components/Spinner";

const AdminProfile: React.FC = () => {
  const [admin, setAdmin] = useState<IAdmin | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    apiClient
      .get<IAdmin>("/admin", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => setAdmin(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleUpdate = () => {
    setLoading(true);
    if (admin) {
      apiClient
        .put(`/admin`, admin, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        })
        .then((response) => {
          setAdmin(response.data);
          setIsEditing(false);
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (admin) {
      setAdmin({
        ...admin,
        [name]: value,
        bank: {
          ...admin.bank,
          [name]: value,
        },
      });
    }
  };

  if (!admin) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 text-slate-600">
      <div className="mb-4">
        <label className="block font-medium">Full Name</label>
        {isEditing ? (
          <input
            type="text"
            name="fullName"
            value={admin.fullName}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{admin.fullName}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Phone Number</label>
        {isEditing ? (
          <input
            type="text"
            name="phoneNumber"
            value={admin.phoneNumber}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{admin.phoneNumber}</p>
        )}
      </div>

      {/* <div className="mb-4">
        <label className="block font-medium">Email</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{admin.email}</p>
        )}
      </div> */}

      <div className="mb-4">
        <label className="block font-medium">Instagram</label>
        {isEditing ? (
          <input
            type="text"
            name="instagram"
            value={admin.instagram || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{admin.instagram || "N/A"}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-medium">Facebook</label>
        {isEditing ? (
          <input
            type="text"
            name="facebook"
            value={admin.facebook || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{admin.facebook || "N/A"}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-medium">Twitter</label>
        {isEditing ? (
          <input
            type="text"
            name="twitter"
            value={admin.twitter || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{admin.twitter || "N/A"}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block font-medium">Whatsapp</label>
        {isEditing ? (
          <input
            type="text"
            name="whatsapp"
            value={admin.whatsapp || ""}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{admin.whatsapp || "N/A"}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-medium">Address</label>
        {isEditing ? (
          <input
            type="text"
            name="address"
            value={admin.address}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>{admin.address}</p>
        )}
      </div>

      {/* <div className="mb-4">
        <label className="block font-medium">Password</label>
        {isEditing ? (
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        ) : (
          <p>••••••••</p> 
        )}
      </div> */}

      {admin.bank && (
        <>
          <div className="mb-4">
            <label className="block font-medium"> Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={admin.bank.name}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            ) : (
              <p>{admin.bank.name}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-medium">Bank Name</label>
            {isEditing ? (
              <input
                type="text"
                name="bankName"
                value={admin.bank.bankName}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            ) : (
              <p>{admin.bank.bankName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block font-medium">Bank Account Number</label>
            {isEditing ? (
              <input
                type="number"
                name="account"
                value={admin.bank.account}
                onChange={handleChange}
                className="border p-2 w-full"
              />
            ) : (
              <p>{admin.bank.account}</p>
            )}
          </div>
        </>
      )}

      <button
        onClick={() => setIsEditing(!isEditing)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isEditing ? "Cancel" : "Edit"}
      </button>

      {isEditing && (
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-4 py-2 rounded ml-2"
        >
          {loading ? <Spinner /> : "Save"}
        </button>
      )}
    </div>
  );
};

export default AdminProfile;
