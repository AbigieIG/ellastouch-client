import React, { useState } from 'react';
import { Category } from '../types/index';

const initialCategories: Category[] = [
  { id: 1, name: 'STUDIO WALK-IN SESSION' },
  { id: 2, name: 'MAINLAND HOME SERVICE SESSION' },
  { id: 3, name: 'ISLAND HOME SERVICE SESSION' },
  { id: 4, name: 'PRE WEDDING SHOOTS' },
  { id: 5, name: 'INTRODUCTION/COURT/REGISTRY' },
  { id: 6, name: 'BRIDAL MAKEUP/WEDDING PACKAGES' },
];

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [newCategory, setNewCategory] = useState<string>('');
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [editedName, setEditedName] = useState<string>('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
      const newCat: Category = { id: newId, name: newCategory };
      setCategories([...categories, newCat]);
      setNewCategory('');
    }
  };

  const handleEditCategory = (category: Category) => {
    setEditCategory(category);
    setEditedName(category.name);
  };

  const handleSaveEdit = () => {
    if (editCategory && editedName.trim()) {
      setCategories(categories.map(cat =>
        cat.id === editCategory.id ? { ...cat, name: editedName } : cat
      ));
      setEditCategory(null);
      setEditedName('');
    }
  };

  const handleDeleteCategory = (id: number) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="bg-white rounded-lg max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
      <h2 className="text-lg text-slate-700 font-semibold mb-4">Manage Categories</h2>

      <div className="mb-6">
        <input
          type="text"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button
          className="mt-2 w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={handleAddCategory}
        >
          Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map(category => (
          <div key={category.id} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
            {editCategory?.id === category.id ? (
              <input
                type="text"
                className="col-span-2 px-4 py-2 border lowercase rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            ) : (
              <span className="col-span-2 lowercase">{category.name}</span>
            )}
            <div className="flex space-x-2">
              {editCategory?.id === category.id ? (
                <button
                  className="px-2 py-1 text-xs  bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={handleSaveEdit}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-2 text-xs py-1 bg-sky-500 text-white rounded hover:bg-sky-600"
                  onClick={() => handleEditCategory(category)}
                >
                  Edit
                </button>
              )}
              <button
                className="px-2 py-1 text-xs  bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => handleDeleteCategory(category.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
