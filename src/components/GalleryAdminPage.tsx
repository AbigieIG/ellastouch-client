import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "./Modal";
import apiClient from "../utils/axios";
import categories from "../assets/data/category.json"
import { GalleryItem } from "../types/index"
import Spinner from "./Spinner";



const GalleryAdminPage: React.FC = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [form, setForm] = useState<{ category: string; image: string }>({
    category: "",
    image: "",
  });
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    fetch: false,
    save: false,
    delete: false,
  });

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading((prev) => ({ ...prev, fetch: true }));
    try {
      const response = await apiClient.get("/galleries");
      setItems(response.data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrEditItem = async () => {
    const formData = new FormData();
    if (imageFile) {
      formData.append("image", imageFile);
    } else {
      formData.append("image", form.image);
    }
    formData.append("category", form.category);

    setLoading((prev) => ({ ...prev, save: true }));
    try {
      if (editingItemId) {
        await apiClient.put(`/galleries/${editingItemId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },);
        setItems(
          items.map((item) =>
            item._id === editingItemId
              ? { ...item, category: form.category }
              : item
          )
        );
        setEditingItemId(null);
      } else {
        const response = await apiClient.post("/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
        setItems([...items, response.data]);
      }
      setForm({ category: "", image: "" });
      setImageFile(null);
    } catch (error) {
      console.error("Error adding or editing item:", error);
    } finally {
      setLoading((prev) => ({ ...prev, save: false }));
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setForm({ category: item.category, image: item.url });
    setEditingItemId(item._id);
  };

  const handleDelete = async (id: string) => {
    setLoading((prev) => ({ ...prev, delete: true }));
    try {
      await apiClient.delete(`/galleries/${id}`, {
        withCredentials: true,
      });
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
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
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
  });

  return (
    <div className="container mx-auto p-4 md:p-10">
      <div className="mb-6">
        <div className="flex flex-col gap-4">
          <div
            {...getRootProps()}
            className="p-4 border border-dashed rounded flex items-center justify-center cursor-pointer"
          >
            <input {...getInputProps()} />
            {imageFile ? (
              <img
                src={URL.createObjectURL(imageFile)}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            ) : form.image ? (
              <img
                src={form.image}
                alt="Preview"
                className="w-24 h-24 object-cover rounded"
              />
            ) : (
              <p className="text-gray-600">
                Drop an image here or click to upload
              </p>
            )}
          </div>
          <select
            name="category"
            value={form.category}
            onChange={handleFormChange}
            className="p-2 border rounded"
          >
            <option disabled={true} value="">
              Select Category
            </option>
            {categories.map((category, i) => (
              <option key={i} value={category}>
                {category}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddOrEditItem}
            className="px-4 py-2 bg-blue-600 text-white rounded flex items-center justify-center"
            disabled={loading.save}
          >
            {loading.save ? (
              <Spinner />
            ) : editingItemId ? (
              "Update Item"
            ) : (
              "Add Item"
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item._id} className="relative">
            <img
              src={item.url}
              alt={`Gallery item ${item._id}`}
              className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer"
              onClick={() => handlePreview(item.url)}
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
              onClick={() => handleDelete(item._id)}
              className="absolute top-2 right-12 text-red-500"
              disabled={loading.delete}
            >
              {loading.delete ? <Spinner /> : "Delete"}
            </button>
          </div>
        ))}
      </div>

      {selectedImage && (
        <Modal image={selectedImage} onClose={handleClosePreview} />
      )}
    </div>
  );
};

export default GalleryAdminPage;
