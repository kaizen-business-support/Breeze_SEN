'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackOrder, addUserOrder } from '../../../utils/statistics';
import { 
  Car,
  ArrowLeft,
  Clock,
  Star,
  CheckCircle,
  User,
  Calendar,
  CreditCard,
  MapPin,
  Phone,
  X
} from 'lucide-react';
import Link from 'next/link';
import AuthModal from '../../../components/AuthModal';

interface WashService {
  id: string;
  name: string;
  description: string;
  pricing: number;
  duration: number;
  features: string[];
  image?: string;
}

interface VehicleDetails {
  brand: string;
  model: string;
  type: string;
  color: string;
  licensePlate: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price: number;
  duration: number;
}

const services: WashService[] = [
  {
    id: 'basic',
    name: 'Lavage Basique',
    description: 'Lavage extérieur complet avec shampooing et rinçage',
    pricing: 5000,
    duration: 30,
    features: ['Lavage extérieur', 'Shampooing carrosserie', 'Rinçage haute pression', 'Séchage'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
  },
  {
    id: 'premium',
    name: 'Lavage Premium',
    description: 'Lavage complet intérieur et extérieur avec finitions',
    pricing: 5000,
    duration: 60,
    features: ['Lavage complet', 'Nettoyage intérieur', 'Cire de protection', 'Lustrage jantes'],
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop'
  },
  {
    id: 'deluxe',
    name: 'Lavage Deluxe',
    description: 'Service premium avec traitement de protection avancé',
    pricing: 5000,
    duration: 90,
    features: ['Tout Premium', 'Traitement cuir', 'Cire carnauba', 'Parfum intérieur'],
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop'
  }
];

const availableSlots: TimeSlot[] = [
  { id: '1', time: '08:00', available: true, price: 5000, duration: 30 },
  { id: '2', time: '08:30', available: true, price: 5000, duration: 30 },
  { id: '3', time: '09:00', available: false, price: 5000, duration: 30 },
  { id: '4', time: '09:30', available: true, price: 5000, duration: 30 },
  { id: '5', time: '10:00', available: true, price: 5000, duration: 30 },
  { id: '6', time: '10:30', available: true, price: 5000, duration: 30 },
  { id: '7', time: '11:00', available: true, price: 5000, duration: 30 },
  { id: '8', time: '11:30', available: true, price: 5000, duration: 30 },
  { id: '9', time: '14:00', available: true, price: 5000, duration: 30 },
  { id: '10', time: '14:30', available: true, price: 5000, duration: 30 },
  { id: '11', time: '15:00', available: true, price: 5000, duration: 30 },
  { id: '12', time: '15:30', available: true, price: 5000, duration: 30 },
  { id: '13', time: '16:00', available: true, price: 5000, duration: 30 },
  { id: '14', time: '16:30', available: true, price: 5000, duration: 30 }
];

export default function CarWashPage() {
  const [currentStep, setCurrentStep] = useState<'service' | 'vehicle' | 'datetime' | 'payment'>('service');
  const [selectedService, setSelectedService] = useState<WashService | null>(null);
  const [vehicleDetails, setVehicleDetails] = useState<VehicleDetails>({
    brand: '',
    model: '',
    type: 'sedan',
    color: '',
    licensePlate: ''
  });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('breeze_token');
    setIsLoggedIn(!!token);
  }, []);

  const steps = ['Service', 'Véhicule', 'Horaire', 'Paiement'];

  // Generate next 7 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        id: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('fr-FR', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        fullDate: date
      });
    }
    return dates;
  };

  const availableDates = getAvailableDates();

  const isVehicleFormValid = () => {
    return vehicleDetails.brand && vehicleDetails.model && vehicleDetails.type && vehicleDetails.color;
  };

  const calculateTotal = () => {
    if (!selectedService) return 5000;
    let total = selectedService.pricing;
    if (selectedSlot && selectedSlot.price && selectedSlot.price !== selectedService.pricing) {
      total = selectedSlot.price;
    }
    return total;
  };

  const handleContinueToBooking = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }
    setCurrentStep('vehicle');
  };

  const handleAuth = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setCurrentStep('vehicle');
  };

  const getStepIndicatorStatus = (stepIndex: number, currentStepName: string) => {
    const stepMapping: { [key: string]: number } = {
      'service': 0,
      'vehicle': 1,
      'datetime': 2,
      'payment': 3
    };
    
    const currentIndex = stepMapping[currentStepName] ?? 0;
    
    if (stepIndex === currentIndex) return 'current';
    if (stepIndex < currentIndex) return 'completed';
    return 'pending';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-primary transition-colors mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Retour
              </Link>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="font-playfair text-xl font-bold text-gray-900">Breeze Lavage</h1>
                  <p className="text-sm text-gray-600">Service de lavage professionnel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Step Indicator */}
        <div className="steps-indicator mb-8">
          <div className="flex justify-center items-center space-x-8">
            {steps.map((step, index) => {
              const status = getStepIndicatorStatus(index, currentStep);
              return (
                <div key={step} className="flex items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
                    status === 'current'
                      ? 'bg-primary text-white border-primary shadow-lg scale-110'
                      : status === 'completed'
                      ? 'bg-primary text-white border-primary'
                      : 'bg-gray-100 text-gray-400 border-gray-300'
                  }`}>
                    {status === 'completed' ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <div className="ml-3 text-left">
                    <div className={`text-sm font-medium transition-colors ${
                      status === 'current' ? 'text-primary font-bold' : 
                      status === 'completed' ? 'text-primary' : 'text-gray-400'
                    }`}>
                      {step}
                    </div>
                    <div className={`text-xs transition-colors ${
                      status === 'current' ? 'text-primary/70' : 
                      status === 'completed' ? 'text-green-600' : 'text-gray-400'
                    }`}>
                      {status === 'completed' ? 'Terminé' : status === 'current' ? 'En cours' : 'À faire'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="booking-step"
          >
            {/* Service Selection */}
            {currentStep === 'service' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                    Choisissez votre service
                  </h2>
                  <p className="text-gray-600">Sélectionnez le type de lavage qui convient à votre véhicule</p>
                </div>

                <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map(service => (
                    <motion.div
                      key={service.id}
                      className={`border rounded-lg p-6 cursor-pointer transition-all hover-lift ${
                        selectedService?.id === service.id
                          ? 'border-primary bg-primary/5 shadow-lg'
                          : 'border-gray-200 hover:border-primary/50 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedService(service)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {service.image && (
                        <img 
                          src={service.image} 
                          alt={service.name}
                          className="w-full h-32 object-cover rounded-md mb-4"
                        />
                      )}
                      <h3 className="font-sans text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                      
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-2xl font-bold text-primary">{service.pricing} FCFA</span>
                        <span className="text-sm text-gray-500">{service.duration} min</span>
                      </div>
                      <div className="text-xs text-gray-500 mb-4">
                        Prix variable selon créneaux - Configuré par l'équipe
                      </div>
                      
                      <ul className="space-y-1">
                        {service.features.map((feature, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-center">
                            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
                
                {selectedService && (
                  <div className="flex justify-center">
                    <button
                      onClick={handleContinueToBooking}
                      className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors flex items-center"
                    >
                      Continuer
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Vehicle Details */}
            {currentStep === 'vehicle' && (
              <div className="space-y-8">
                <div className="max-w-2xl mx-auto">
                  <h2 className="font-playfair text-2xl font-bold text-center text-gray-900 mb-8">
                    Détails du véhicule
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2 mb-4">
                      <p className="text-sm text-gray-600">
                        <span className="text-red-500">*</span> Champs obligatoires
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Marque <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vehicleDetails.brand}
                        onChange={(e) => setVehicleDetails({...vehicleDetails, brand: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                          !vehicleDetails.brand ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Toyota, Mercedes, etc."
                      />
                      {!vehicleDetails.brand && (
                        <p className="text-red-500 text-sm mt-1">La marque est obligatoire</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Modèle <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vehicleDetails.model}
                        onChange={(e) => setVehicleDetails({...vehicleDetails, model: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                          !vehicleDetails.model ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Corolla, C-Class, etc."
                      />
                      {!vehicleDetails.model && (
                        <p className="text-red-500 text-sm mt-1">Le modèle est obligatoire</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type de véhicule <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={vehicleDetails.type}
                        onChange={(e) => setVehicleDetails({...vehicleDetails, type: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="sedan">Berline</option>
                        <option value="suv">SUV</option>
                        <option value="hatchback">Citadine</option>
                        <option value="truck">Camionnette</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Couleur <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={vehicleDetails.color}
                        onChange={(e) => setVehicleDetails({...vehicleDetails, color: e.target.value})}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent ${
                          !vehicleDetails.color ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Blanc, Noir, Rouge, etc."
                      />
                      {!vehicleDetails.color && (
                        <p className="text-red-500 text-sm mt-1">La couleur est obligatoire</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Plaque d'immatriculation (optionnel)
                      </label>
                      <input
                        type="text"
                        value={vehicleDetails.licensePlate}
                        onChange={(e) => setVehicleDetails({...vehicleDetails, licensePlate: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="DK-123-AB"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between max-w-2xl mx-auto">
                  <button
                    onClick={() => setCurrentStep('service')}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour
                  </button>
                  {isVehicleFormValid() && (
                    <button
                      onClick={() => setCurrentStep('datetime')}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center"
                    >
                      Continuer
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Date Time Selection */}
            {currentStep === 'datetime' && (
              <div className="space-y-8">
                <h2 className="font-playfair text-2xl font-bold text-center text-gray-900 mb-8">
                  Choisir une date et un créneau
                </h2>
                
                {/* Date Selection */}
                <div className="space-y-4">
                  <h3 className="font-sans text-lg font-semibold text-gray-800 text-center">1. Sélectionnez une date</h3>
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {availableDates.map((date) => (
                      <motion.button
                        key={date.id}
                        className={`p-3 rounded-lg border text-center transition-colors text-sm ${
                          selectedDate === date.id
                            ? 'border-primary bg-primary text-white shadow-md'
                            : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                        }`}
                        onClick={() => {
                          setSelectedDate(date.id);
                          setSelectedSlot(null); // Reset slot selection when date changes
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-medium">{date.display}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
                
                {/* Time Slot Selection */}
                {selectedDate && (
                  <div className="space-y-4">
                    <h3 className="font-sans text-lg font-semibold text-gray-800 text-center">2. Choisissez votre créneau</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {availableSlots.map((slot) => (
                        <motion.button
                          key={slot.id}
                          className={`p-4 rounded-lg border text-center transition-colors ${
                            slot.available 
                              ? selectedSlot?.id === slot.id
                                ? 'border-primary bg-primary text-white'
                                : 'border-gray-300 hover:border-primary hover:bg-primary/5'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!slot.available}
                          onClick={() => {
                            if (slot.available) {
                              setSelectedSlot(slot);
                            }
                          }}
                          whileHover={slot.available ? { scale: 1.05 } : {}}
                          whileTap={slot.available ? { scale: 0.95 } : {}}
                        >
                          <div className="font-medium">{slot.time}</div>
                          {slot.price && (
                            <div className="text-sm mt-1">{slot.price} FCFA</div>
                          )}
                          <div className="text-xs mt-1">{slot.duration} min</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between max-w-2xl mx-auto">
                  <button
                    onClick={() => setCurrentStep('vehicle')}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Retour
                  </button>
                  {selectedSlot && (
                    <button
                      onClick={() => setCurrentStep('payment')}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center"
                    >
                      Continuer
                      <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Payment */}
            {currentStep === 'payment' && (
              <div className="space-y-8">
                <div className="max-w-md mx-auto">
                  <h2 className="font-playfair text-2xl font-bold text-center text-gray-900 mb-8">
                    Confirmation et Paiement
                  </h2>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Récapitulatif</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Service:</span>
                        <span>{selectedService?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Véhicule:</span>
                        <span>{vehicleDetails.brand} {vehicleDetails.model}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{selectedDate && availableDates.find(d => d.id === selectedDate)?.display}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Heure:</span>
                        <span>{selectedSlot?.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-primary">{calculateTotal()} FCFA</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => {
                      const userId = `user-${Date.now()}`;
                      const servicePrice = calculateTotal();

                      // Track booking in statistics and add to user's history
                      try {
                        trackOrder(servicePrice, 'car-wash', userId);
                        
                        // Add booking to user's history
                        const orderDetails = `${selectedService?.name} - ${vehicleDetails.brand} ${vehicleDetails.model} (${vehicleDetails.color}) - ${selectedDate && availableDates.find(d => d.id === selectedDate)?.display} à ${selectedSlot?.time}`;
                        addUserOrder('car-wash', selectedService?.name || 'Service Lavage', servicePrice, orderDetails);
                      } catch (error) {
                        console.error('Failed to track booking statistics:', error);
                      }

                      alert('Réservation confirmée ! Vous recevrez un SMS de confirmation.');
                      // Reset form or redirect
                    }}
                    className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Confirmer la réservation
                  </button>

                  <div className="flex justify-start mt-6">
                    <button
                      onClick={() => setCurrentStep('datetime')}
                      className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center"
                    >
                      <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Retour
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contact Info */}
      <div className="bg-primary text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <MapPin className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Adresse</h3>
              <p className="text-primary-100">QG33+G39, Rte de l'Aeroport, Dakar</p>
            </div>
            <div>
              <Phone className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
              <p className="text-primary-100">+221 78 604 27 27</p>
            </div>
            <div>
              <Clock className="h-8 w-8 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">Horaires</h3>
              <p className="text-primary-100">
                Lun-Ven: 8h00-18h00<br />
                Sam: 8h00-16h00
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
        title="Connexion Requise"
        description="Vous devez être connecté pour réserver un lavage."
        primaryColor="bg-blue-600"
      />
    </div>
  );
}