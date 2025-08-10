'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  Save, 
  X, 
  Car,
  Settings,
  BarChart3,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';

interface WashService {
  id: string;
  name: string;
  description: string;
  pricing: number;
  duration: number;
  features: string[];
  image?: string;
  isActive: boolean;
}

const initialServices: WashService[] = [
  {
    id: 'basic',
    name: 'Lavage Basique',
    description: 'Lavage extérieur complet avec shampooing et rinçage',
    pricing: 5000,
    duration: 30,
    features: ['Lavage extérieur', 'Shampooing carrosserie', 'Rinçage haute pression', 'Séchage'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    isActive: true
  },
  {
    id: 'premium',
    name: 'Lavage Premium',
    description: 'Lavage complet intérieur et extérieur avec finitions',
    pricing: 5000,
    duration: 60,
    features: ['Lavage complet', 'Nettoyage intérieur', 'Cire de protection', 'Lustrage jantes'],
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
    isActive: true
  },
  {
    id: 'deluxe',
    name: 'Lavage Deluxe',
    description: 'Service premium avec traitement de protection avancé',
    pricing: 5000,
    duration: 90,
    features: ['Tout Premium', 'Traitement cuir', 'Cire carnauba', 'Parfum intérieur'],
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop',
    isActive: true
  }
];

interface TimeSlotConfig {
  id: string;
  time: string;
  isActive: boolean;
  pricing: number;
}

const initialTimeSlots: TimeSlotConfig[] = [
  { id: '1', time: '08:00', isActive: true, pricing: 5000 },
  { id: '2', time: '08:30', isActive: true, pricing: 5000 },
  { id: '3', time: '09:00', isActive: true, pricing: 5000 },
  { id: '4', time: '09:30', isActive: true, pricing: 5000 },
  { id: '5', time: '10:00', isActive: true, pricing: 5000 },
  { id: '6', time: '10:30', isActive: true, pricing: 5000 },
  { id: '7', time: '11:00', isActive: true, pricing: 5000 },
  { id: '8', time: '11:30', isActive: true, pricing: 5000 },
  { id: '9', time: '14:00', isActive: true, pricing: 5000 },
  { id: '10', time: '14:30', isActive: true, pricing: 5000 },
  { id: '11', time: '15:00', isActive: true, pricing: 5000 },
  { id: '12', time: '15:30', isActive: true, pricing: 5000 },
  { id: '13', time: '16:00', isActive: true, pricing: 5000 },
  { id: '14', time: '16:30', isActive: true, pricing: 5000 },
];

export default function CarWashAdminDashboard() {
  const [services, setServices] = useState<WashService[]>(initialServices);
  const [timeSlots, setTimeSlots] = useState<TimeSlotConfig[]>(initialTimeSlots);
  const [activeTab, setActiveTab] = useState<'services' | 'pricing' | 'schedule'>('services');
  const [isEditing, setIsEditing] = useState(false);
  const [editingService, setEditingService] = useState<WashService | null>(null);

  const handleAddNewService = () => {
    const newService: WashService = {
      id: `service-${Date.now()}`,
      name: '',
      description: '',
      pricing: 5000,
      duration: 30,
      features: [],
      isActive: true
    };
    setEditingService(newService);
    setIsEditing(true);
  };

  const handleEditService = (service: WashService) => {
    setEditingService({ ...service });
    setIsEditing(true);
  };

  const handleSaveService = () => {
    if (!editingService) return;
    
    if (editingService.id.startsWith('service-')) {
      setServices([...services, editingService]);
    } else {
      setServices(services.map(service => 
        service.id === editingService.id ? editingService : service
      ));
    }
    
    setIsEditing(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service?')) {
      setServices(services.filter(service => service.id !== id));
    }
  };

  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    if (editingService) {
      setEditingService({
        ...editingService,
        image: imageUrl
      });
    }
  };

  const updateTimeSlotPricing = (id: string, pricing: number) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, pricing } : slot
    ));
  };

  const toggleTimeSlot = (id: string) => {
    setTimeSlots(timeSlots.map(slot => 
      slot.id === id ? { ...slot, isActive: !slot.isActive } : slot
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="font-playfair text-2xl font-bold text-gray-900">
                Tableau de Bord - Breeze Lavage
              </h1>
              <p className="text-sm text-gray-600">Gestion des services et tarifs</p>
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
                <Car className="h-6 w-6 text-primary" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Services Actifs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {services.filter(s => s.isActive).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Créneaux Actifs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {timeSlots.filter(s => s.isActive).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Prix Moyen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(services.reduce((sum, s) => sum + s.pricing, 0) / services.length)} FCFA
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
                <p className="text-sm font-medium text-gray-600">Durée Moy.</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(services.reduce((sum, s) => sum + s.duration, 0) / services.length)} min
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'services', name: 'Services', icon: Car },
                { id: 'pricing', name: 'Tarification', icon: DollarSign },
                { id: 'schedule', name: 'Horaires', icon: Clock }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} className="mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Services Tab */}
            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-playfair text-xl font-semibold text-gray-900">
                    Gestion des Services
                  </h2>
                  <button
                    onClick={handleAddNewService}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                  >
                    <Plus size={20} className="mr-2" />
                    Nouveau Service
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map(service => (
                    <motion.div
                      key={service.id}
                      layout
                      className="bg-gray-50 rounded-lg p-4 border hover:shadow-md transition-shadow"
                    >
                      {service.image && (
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-sans text-lg font-semibold text-gray-900">
                            {service.name}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            service.isActive 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {service.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {service.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold text-primary">
                            {service.pricing} FCFA
                          </span>
                          <span className="text-sm text-gray-500">
                            {service.duration} min
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <button
                            onClick={() => handleEditService(service)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing Tab */}
            {activeTab === 'pricing' && (
              <div>
                <h2 className="font-playfair text-xl font-semibold text-gray-900 mb-6">
                  Configuration des Prix par Créneau
                </h2>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    💡 <strong>Astuce:</strong> Vous pouvez définir des prix différents pour chaque créneau horaire pour optimiser la demande.
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {timeSlots.map(slot => (
                    <div key={slot.id} className="bg-white border rounded-lg p-4">
                      <div className="text-center mb-3">
                        <div className="font-medium text-gray-900">{slot.time}</div>
                        <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                          slot.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {slot.isActive ? 'Actif' : 'Inactif'}
                        </div>
                      </div>
                      <input
                        type="number"
                        value={slot.pricing}
                        onChange={(e) => updateTimeSlotPricing(slot.id, parseInt(e.target.value) || 0)}
                        className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-primary focus:border-transparent"
                        placeholder="Prix"
                      />
                      <div className="text-xs text-gray-500 mt-1">FCFA</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Schedule Tab */}
            {activeTab === 'schedule' && (
              <div>
                <h2 className="font-playfair text-xl font-semibold text-gray-900 mb-6">
                  Gestion des Horaires
                </h2>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {timeSlots.map(slot => (
                    <div key={slot.id} className="bg-white border rounded-lg p-4 text-center">
                      <div className="font-medium text-gray-900 mb-2">{slot.time}</div>
                      <button
                        onClick={() => toggleTimeSlot(slot.id)}
                        className={`w-full px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          slot.isActive
                            ? 'bg-green-600 text-white hover:bg-green-700'
                            : 'bg-red-600 text-white hover:bg-red-700'
                        }`}
                      >
                        {slot.isActive ? 'Désactiver' : 'Activer'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Service Modal */}
      {isEditing && editingService && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-playfair text-xl font-semibold">
                  {editingService.id.startsWith('service-') ? 'Nouveau Service' : 'Modifier le Service'}
                </h2>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du Service *
                    </label>
                    <input
                      type="text"
                      value={editingService.name}
                      onChange={(e) => setEditingService({...editingService, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ex: Lavage Premium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prix (FCFA) *
                    </label>
                    <input
                      type="number"
                      value={editingService.pricing}
                      onChange={(e) => setEditingService({...editingService, pricing: parseInt(e.target.value) || 0})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ex: 5000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={editingService.description}
                    onChange={(e) => setEditingService({...editingService, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Décrivez le service en détail..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durée (minutes) *
                  </label>
                  <input
                    type="number"
                    value={editingService.duration}
                    onChange={(e) => setEditingService({...editingService, duration: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ex: 30"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image du Service
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
                      id="service-image-upload"
                    />
                    <label
                      htmlFor="service-image-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      {editingService.image ? (
                        <img
                          src={editingService.image}
                          alt={editingService.name}
                          className="w-full h-32 object-cover rounded-lg mb-4"
                        />
                      ) : (
                        <Upload className="h-12 w-12 text-gray-400 mb-4" />
                      )}
                      <span className="text-sm text-gray-600">
                        Cliquez pour {editingService.image ? 'changer' : 'ajouter'} l'image
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prestations Incluses
                  </label>
                  <input
                    type="text"
                    value={editingService.features.join(', ')}
                    onChange={(e) => setEditingService({
                      ...editingService, 
                      features: e.target.value.split(', ').filter(f => f.trim())
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Ex: Lavage extérieur, Shampooing, Rinçage"
                  />
                  <p className="text-xs text-gray-500 mt-1">Séparez les prestations par des virgules</p>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveService}
                    disabled={!editingService.name || !editingService.description || editingService.pricing <= 0}
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