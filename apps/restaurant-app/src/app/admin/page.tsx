'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MenuItem, MenuCategory } from '@breeze/types';
import { mockMenuItems } from '../../data/menuItems';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  Save, 
  X, 
  Eye,
  Settings,
  BarChart3,
  Users,
  Clock
} from 'lucide-react';

const categories = [
  { id: 'entrees', name: 'Entrées' },
  { id: 'plats', name: 'Plats Principaux' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'boissons', name: 'Boissons' }
];

export default function AdminDashboard() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(mockMenuItems);
  const [selectedCategory, setSelectedCategory] = useState('entrees');
  const [isEditing, setIsEditing] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const handleAddNew = () => {
    const newItem: MenuItem = {
      id: `new-${Date.now()}`,
      serviceId: 'restaurant',
      name: '',
      description: '',
      price: 0,
      category: selectedCategory,
      images: [],
      ingredients: [],
      nutritionalInfo: {
        calories: 0,
        allergens: [],
        dietary: []
      },
      dietaryTags: [],
      customizations: [],
      viewCount: 0,
      orderCount: 0
    };
    setEditingItem(newItem);
    setIsEditing(true);
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem({ ...item });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!editingItem) return;
    
    if (editingItem.id.startsWith('new-')) {
      // Add new item
      setMenuItems([...menuItems, editingItem]);
    } else {
      // Update existing item
      setMenuItems(menuItems.map(item => 
        item.id === editingItem.id ? editingItem : item
      ));
    }
    
    setIsEditing(false);
    setEditingItem(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élément du menu?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const handleImageUpload = (file: File) => {
    // In a real app, this would upload to a server
    const imageUrl = URL.createObjectURL(file);
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        images: [
          ...editingItem.images,
          { url: imageUrl, alt: editingItem.name || 'Menu item' }
        ]
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="font-playfair text-2xl font-bold text-gray-900">
                Tableau de Bord - Breeze Restaurant
              </h1>
              <p className="text-sm text-gray-600">Gestion du menu et des commandes</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                <BarChart3 size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                <Users size={20} />
              </button>
              <button className="p-2 text-gray-600 hover:text-primary transition-colors">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-primary/10 rounded-full">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Vues Totales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {menuItems.reduce((sum, item) => sum + item.viewCount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Commandes</p>
                <p className="text-2xl font-bold text-gray-900">
                  {menuItems.reduce((sum, item) => sum + item.orderCount, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Popularité Moy.</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(menuItems.reduce((sum, item) => sum + (item.averageRating || 0), 0) / menuItems.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 ${
                    selectedCategory === category.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {category.name}
                  <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {menuItems.filter(item => item.category === category.id).length}
                  </span>
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-xl font-semibold text-gray-900">
                {categories.find(c => c.id === selectedCategory)?.name}
              </h2>
              <button
                onClick={handleAddNew}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Ajouter un plat
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow"
                >
                  {item.images.length > 0 && (
                    <img
                      src={item.images[0].url}
                      alt={item.images[0].alt}
                      className="w-full h-32 object-cover rounded-lg mb-3"
                    />
                  )}
                  <div className="space-y-2">
                    <h3 className="font-sans text-lg font-semibold text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-primary">
                        {item.price} FCFA
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Vues: {item.viewCount}</span>
                      <span>Commandes: {item.orderCount}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-playfair text-xl font-semibold">
                  {editingItem.id.startsWith('new-') ? 'Ajouter un plat' : 'Modifier le plat'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du plat *
                    </label>
                    <input
                      type="text"
                      value={editingItem.name}
                      onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ex: Thiéboudienne Royal"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (FCFA) *
                    </label>
                    <input
                      type="number"
                      value={editingItem.price}
                      onChange={(e) => setEditingItem({...editingItem, price: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ex: 15000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Décrivez le plat en détail..."
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Images
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }}
                      className="hidden"
                      id="image-upload"
                    />
                    <label
                      htmlFor="image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      <span className="text-sm text-gray-600">
                        Cliquez pour ajouter une image
                      </span>
                    </label>
                    
                    {editingItem.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {editingItem.images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={image.url}
                              alt={image.alt}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <button
                              onClick={() => {
                                setEditingItem({
                                  ...editingItem,
                                  images: editingItem.images.filter((_, i) => i !== index)
                                });
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ingrédients
                  </label>
                  <input
                    type="text"
                    value={editingItem.ingredients.join(', ')}
                    onChange={(e) => setEditingItem({
                      ...editingItem, 
                      ingredients: e.target.value.split(', ').filter(i => i.trim())
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ex: Riz jasmin, Poisson thiof, Légumes de saison"
                  />
                  <p className="text-xs text-gray-500 mt-1">Séparez les ingrédients par des virgules</p>
                </div>

                {/* Actions */}
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={!editingItem.name || !editingItem.description || editingItem.price <= 0}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center"
                  >
                    <Save size={16} className="mr-2" />
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}