import React, { useState } from 'react';
import gallery from '../assets/data/gallery'; 
import Modal from "../components/Modal"; // Adjust the import path as needed

const categories: string[] = ['All', 'full makeup', 'light makeup', 'gele'];

const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [modalImage, setModalImage] = useState<string | null>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const filteredItems = selectedCategory === 'All'
    ? gallery
    : gallery.filter(item => item.category === selectedCategory);

  const openModal = (image: string) => {
    setModalImage(image);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="container mx-auto p-4 md:p-10">
      <h1 className="text-2xl font-bold mb-6">Gallery</h1>
      
      <div className="mb-6">
        <div className="flex flex-wrap gap-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-sky-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-sky-500 hover:text-white transition`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => (
          <div key={index} className="relative">
            <img
              src={item.image}
              alt={`Gallery item ${index}`}
              className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => openModal(item.image)}
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
              {item.category}
            </div>
          </div>
        ))}
      </div>

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
