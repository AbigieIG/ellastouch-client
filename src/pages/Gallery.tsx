import React, { useEffect, useState } from 'react';
import Modal from "../components/Modal"; 
import categories from "../assets/data/category.json";
import apiClient from '../utils/axios';
import { GalleryItem } from '../types';

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    fetch: false,
    save: false,
    delete: false,
  });

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };

  const filteredItems = selectedCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    try {
      const response = await apiClient.get("/galleries");
      setGallery(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-10 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Gallery</h1>
      
      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-sky-500 hover:text-white transition w-full md:w-1/3"
        >
          <option value="All">All</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {loading.fetch ? (
        <div className="flex justify-center items-center">
          <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
          <p className="text-gray-700 ml-4">Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={item.url}
                alt={`Gallery item ${index}`}
                className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer"
                onClick={() => openModal(item.url)}
              />
              <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
                {item.category}
              </div>
            </div>
          ))}
        </div>
      )}

      {modalImage && (
        <Modal
          image={modalImage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default GalleryPage;
