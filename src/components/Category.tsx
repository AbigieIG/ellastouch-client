import React, { useEffect, useState } from "react";
import { CategoryType } from "../types/index";
import apiClient from "../utils/axios";
import { AxiosResponse } from "axios";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [newCategory, setNewCategory] = useState<string>("");
  const [editCategory, setEditCategory] = useState<CategoryType | null>(null);
  const [editedName, setEditedName] = useState<string>("");
  const [isLoadingAdd, setIsLoadingAdd] = useState<boolean>(false);
  const [isLoadingEdit, setIsLoadingEdit] = useState<boolean>(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);

  const handleAddCategory = async () => {
    if (newCategory.trim()) {
      setIsLoadingAdd(true);
      try {
        const res: AxiosResponse<CategoryType> = await apiClient.post("/categories", {
          title: newCategory,
        }, {
          withCredentials: true,
        });
        setCategories(prevCategories => [...prevCategories, res.data]);
        setNewCategory("");
      } catch (error) {
        console.error("Failed to add category:", error);
      } finally {
        setIsLoadingAdd(false);
      }
    }
  };

  const handleEditCategory = (category: CategoryType) => {
    setEditCategory(category);
    setEditedName(category.title);
  };

  const handleSaveEdit = async () => {
    if (editCategory && editedName.trim()) {
      setIsLoadingEdit(true);
      try {
        const res: AxiosResponse<CategoryType> = await apiClient.put(`/categories/${editCategory.id}`, {
          title: editedName,
        }, {
          withCredentials: true,
        });
        setCategories(prevCategories => 
          prevCategories.map(cat => cat.id === editCategory.id ? res.data : cat)
        );
        // setEditCategory(null);
        setEditedName("");
      } catch (error) {
        console.error("Failed to update category:", error);
      } finally {
        setIsLoadingEdit(false);
      }
    }
  };

  const handleDeleteCategory = async (id: string) => {
    setLoadingDeleteId(id);
    try {
      await apiClient.delete(`/categories/${id}`, {
        withCredentials: true,
      });
      setCategories(prevCategories => prevCategories.filter(cat => cat.id !== id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    } finally {
      setLoadingDeleteId(null);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res: AxiosResponse<CategoryType[]> = await apiClient.get("/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className="bg-white rounded-lg max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-lg text-slate-700 font-semibold mb-4">
        Manage Categories
      </h2>

      <div className="mb-6">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          disabled={isLoadingAdd}
        />
        <button
          className="mt-2 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={handleAddCategory}
          disabled={isLoadingAdd}
        >
          {isLoadingAdd ? "Adding..." : "Add Category"}
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
          >
            {editCategory?.id === category.id ? (
              <input
                type="text"
                className="col-span-2 px-4 py-2 border lowercase rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                disabled={isLoadingEdit}
              />
            ) : (
              <span className="col-span-2 lowercase">{category.title}</span>
            )}
            <div className="flex space-x-2">
              {editCategory?.id === category.id ? (
                <button
                  className="px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
                  onClick={handleSaveEdit}
                  disabled={isLoadingEdit}
                >
                  {isLoadingEdit ? "Saving..." : "Save"}
                </button>
              ) : (
                <button
                  className="px-2 text-xs py-1 bg-sky-500 text-white rounded hover:bg-sky-600"
                  onClick={() => handleEditCategory(category)}
                  disabled={isLoadingEdit}
                >
                  Edit
                </button>
              )}
              <button
                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                onClick={() => handleDeleteCategory(category.id)}
                disabled={loadingDeleteId === category.id}
              >
                {loadingDeleteId === category.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
