import React, { useState, useEffect } from "react";
import { ServiceType, CategoryType } from "../types/index";
import apiClient from "../utils/axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const ServiceForm: React.FC = () => {
  const [formData, setFormData] = useState<ServiceType>({} as ServiceType);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiClient.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (id) {
          const response = await apiClient.get(`/services/${id}`);
          setFormData(response.data);
        }
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };
    fetchService();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMoreChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    key: keyof Omit<
      ServiceType,
      "id" | "name" | "categoryId" | "duration" | "price"
    >
  ) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      [key]: value.split("\n"),
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      if (id) {
        await apiClient.put(`/services/${id}`, formData, {
          withCredentials: true,
        });
      } else {
        await apiClient.post("/services", formData, {
          withCredentials: true,
        });
      }
    navigate("/admin");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md mb-24 rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-lg text-slate-700 font-semibold mb-4">
        {id ? "Edit Service" : "Create Service"}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="mb-4 relative">
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder=" "
          />
          <label
            htmlFor="name"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            Service
          </label>
        </div>
        <div className="mb-4 relative">
          <select
            name="categoryId"
            className="lowercase w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData.categoryId || ""}
            onChange={handleChange}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
          <label
            htmlFor="categoryId"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            Category
          </label>
        </div>
        <div className="mb-4 relative">
          <input
            type="text"
            id="price"
            name="price"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData.price || ""}
            onChange={handleChange}
            placeholder=" "
          />
          <label
            htmlFor="price"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            Price
          </label>
        </div>
        <div className="mb-4 relative">
          <input
            type="text"
            id="duration"
            name="duration"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData.duration || ""}
            onChange={handleChange}
            placeholder=" "
          />
          <label
            htmlFor="duration"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            Duration
          </label>
        </div>
        <div className="mb-4 relative">
          <textarea
            id="description"
            name="description"
            className="w-full px-4 h-20 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData.description?.join("\n") || ""}
            onChange={(e) => handleMoreChange(e, "description")}
            placeholder=" "
          />
          <label
            htmlFor="description"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            Description
          </label>
        </div>
        <div className="mb-4 relative">
          <textarea
            id="workingHours"
            name="workingHours"
            className="w-full px-4 py-2 h-20 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData.workingHours?.join("\n") || ""}
            onChange={(e) => handleMoreChange(e, "workingHours")}
            placeholder=" "
          />
          <label
            htmlFor="workingHours"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            Working Hours
          </label>
        </div>
        <div className="mb-4 relative">
          <textarea
            id="extraCharges"
            name="extraCharges"
            className="w-full px-4 py-2 border h-20 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData.extraCharges?.join("\n") || ""}
            onChange={(e) => handleMoreChange(e, "extraCharges")}
            placeholder=" "
          />
          <label
            htmlFor="extraCharges"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            Extra Charges
          </label>
        </div>
        <div className="mb-4 relative">
          <textarea
            id="terms"
            name="terms"
            className="w-full px-4 py-2 border h-20 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData.terms?.join("\n") || ""}
            onChange={(e) => handleMoreChange(e, "terms")}
            placeholder=" "
          />
          <label
            htmlFor="terms"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            Terms
          </label>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
           {loading ? <Spinner /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
