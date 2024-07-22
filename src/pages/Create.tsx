import React, { useState } from "react";
import { More, Service } from "../types/index";

interface ServiceFormProps {
  service: Service;
  onSubmit: (updatedService: Service) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onSubmit }) => {
  const [formData, setFormData] = useState<Service>(service);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMoreChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    key: keyof More
  ) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      more: {
        ...formData.more,
        [key]: value.split("\n"),
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    console.log(formData);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto">
      <h2 className="text-lg text-slate-700 font-semibold mb-4">
        {" "}
        Create Service
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        <div className="mb-4 relative">
          <input
            type="text"
            id="service"
            name="service"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData?.name}
            onChange={handleChange}
            placeholder=" "
          />
          <label
            htmlFor="service"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            Service
          </label>
        </div>
        <div className="mb-4 relative">
          <select className="lowercase w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer ">
            <option value="">STUDIO WALK-IN SESSION</option>
            <option value="">MAINLAND HOME SERVICE SESSION</option>
            <option value="">ISLAND HOME SERVICE SESSION</option>
            <option value="">PRE WEDDING SHOOTS</option>
            <option value="">INTRODUCTION/COURT /REGISTRY</option>
            <option value="">BRIDAL MAKEUP/WEDDING PACKAGES</option>
          </select>
          <label
            htmlFor="service"
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
            value={formData?.price}
            onChange={handleChange}
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            price
          </label>
        </div>
        <div className="mb-4 relative">
          <input
            type="text"
            id="duration"
            name="duration"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData?.duration}
            onChange={handleChange}
            placeholder=" "
          />
          <label
            htmlFor="duration"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            duration
          </label>
        </div>
        <div className="mb-4 relative">
          <textarea
            id="description"
            name="description"
            className="w-full px-4 h-20 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData?.more?.description?.join("\n")}
            onChange={(e) => handleMoreChange(e, "description")}
            placeholder=" "
          />
          <label
            htmlFor="description"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            description
          </label>
        </div>
        <div className="mb-4 relative">
          <textarea
            id="workingHours"
            name="workingHours"
            className="w-full px-4 py-2 h-20 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData?.more?.workingHours?.join("\n")}
            onChange={(e) => handleMoreChange(e, "workingHours")}
            placeholder=" "
          />
          <label
            htmlFor="workingHours"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            workingHours
          </label>
        </div>
        <div className="mb-4 relative">
          <textarea
            id="extraCharges"
            name="extraCharges"
            className="w-full px-4 py-2 border h-20 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData?.more?.extraCharges?.join("\n")}
            onChange={(e) => handleMoreChange(e, "extraCharges")}
            placeholder=" "
          />
          <label
            htmlFor="extraCharges"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            extraCharges
          </label>
        </div>
        <div className="mb-4 relative">
          <textarea
            id="terms"
            name="terms"
            className="w-full px-4 py-2 border h-20 rounded focus:outline-none focus:ring-2 focus:ring-blue-600 peer"
            value={formData?.more?.terms?.join("\n")}
            onChange={(e) => handleMoreChange(e, "terms")}
            placeholder=" "
          />
          <label
            htmlFor="terms"
            className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] left-4 peer-focus:left-1 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          >
            terms
          </label>
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
  );
};

export default ServiceForm;
