import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import gallery from '../assets/data/gallery'; 
import Modal from './Modal'; 
import { v4 as uuidv4 } from 'uuid';

interface GalleryItem {
  id: string;
  image: string;
  category: string;
}

const initialGallery: GalleryItem[] = gallery.map(item => ({ ...item, id: uuidv4() }));

const GalleryAdminPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>(initialGallery);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [form, setForm] = useState<{ image: string; category: string }>({ image: '', category: '' });
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEditItem = () => {
    if (editingItemId) {
      setItems(items.map(item =>
        item.id === editingItemId ? { ...item, ...form } : item
      ));
      setEditingItemId(null);
    } else {
      setItems([...items, { id: uuidv4(), ...form }]);
    }
    setForm({ image: '', category: '' });
  };

  const handleEdit = (item: GalleryItem) => {
    setForm({ image: item.image, category: item.category });
    setEditingItemId(item.id);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handlePreview = (image: string) => {
    setSelectedImage(image);
  };

  const handleClosePreview = () => {
    setSelectedImage(null);
  };

  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    // accept: 'image/*',
  });

  return (
    <div className="container mx-auto p-4 md:p-10">
      {/* <h1 className="text-sm text-slate-600 font-bold mb-6">Gallery Admin</h1> */}
      
      <div className="mb-6">
        <div className="flex flex-col gap-4">
          <div {...getRootProps()} className="p-4 border border-dashed rounded flex items-center justify-center cursor-pointer">
            <input {...getInputProps()} />
            {form.image ? (
              <img src={form.image} alt="Preview" className="w-24 h-24 object-cover rounded" />
            ) : (
              <p className="text-gray-600">Drop an image here or click to upload</p>
            )}
          </div>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleFormChange}
            placeholder="Image URL (or upload image)"
            className="p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleFormChange}
            placeholder="Category"
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddOrEditItem}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            {editingItemId ? 'Update Item' : 'Add Item'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <img
              src={item.image}
              alt={`Gallery item ${item.id}`}
              className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => handlePreview(item.image)}
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 rounded-b-lg">
              {item.category}
            </div>
            <button
              onClick={() => handleEdit(item)}
              className="absolute top-2 right-2 text-yellow-500"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-12 text-red-500"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal
          image={selectedImage}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
};

export default GalleryAdminPage;
