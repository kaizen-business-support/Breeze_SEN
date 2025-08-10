'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trackOrder, addUserOrder } from '../../../utils/statistics';
import { MenuManager } from '../../../utils/menuManager';
import { 
  Scissors,
  ArrowLeft,
  Calendar,
  Clock,
  Star,
  User,
  CheckCircle,
  MapPin,
  Phone,
  Award,
  X
} from 'lucide-react';
import Link from 'next/link';
import AuthModal from '../../../components/AuthModal';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string; // Changed to string to match MenuManager
  popular?: boolean;
  image: string;
}

interface Barber {
  id: string;
  name: string;
  specialties: string[];
  experience: number;
  rating: number;
  avatar: string;
  availableToday: boolean;
  nextAvailable?: string;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  barberId: string;
}

// Services now loaded dynamically from MenuManager

const barbers: Barber[] = [
  {
    id: 'barber-1',
    name: 'Moussa Ndiaye',
    specialties: ['Coupes Modernes', 'Barbe', 'Styling'],
    experience: 8,
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    availableToday: true,
    nextAvailable: '14:30'
  },
  {
    id: 'barber-2',
    name: 'Abdou Fall',
    specialties: ['Coupes Classiques', 'Soins', 'Événements'],
    experience: 12,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    availableToday: true,
    nextAvailable: '15:00'
  },
  {
    id: 'barber-3',
    name: 'Omar Sy',
    specialties: ['Barbe Expert', 'Coupes Tendance', 'Styling'],
    experience: 6,
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    availableToday: false,
    nextAvailable: 'Demain 09:00'
  }
];

const categories = [
  { id: 'all', name: 'Tous', icon: Scissors },
  { id: 'cut', name: 'Coupes', icon: Scissors },
  { id: 'beard', name: 'Barbe', icon: User },
  { id: 'treatment', name: 'Soins', icon: Award },
  { id: 'styling', name: 'Styling', icon: Star }
];

const timeSlots: TimeSlot[] = [
  { id: '1', time: '09:00', available: true, barberId: 'barber-1' },
  { id: '2', time: '09:30', available: false, barberId: 'barber-1' },
  { id: '3', time: '10:00', available: true, barberId: 'barber-1' },
  { id: '4', time: '10:30', available: true, barberId: 'barber-2' },
  { id: '5', time: '11:00', available: true, barberId: 'barber-2' },
  { id: '6', time: '14:30', available: true, barberId: 'barber-1' },
  { id: '7', time: '15:00', available: true, barberId: 'barber-2' },
  { id: '8', time: '15:30', available: true, barberId: 'barber-1' },
  { id: '9', time: '16:00', available: true, barberId: 'barber-2' },
  { id: '10', time: '16:30', available: true, barberId: 'barber-1' }
];

export default function BarbershopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [bookingStep, setBookingStep] = useState<'service' | 'barber' | 'date' | 'time' | 'confirm'>('service');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('breeze_token');
    setIsLoggedIn(!!token);
    
    // Load services from MenuManager
    const menuItems = MenuManager.getMenuItemsByService('barbershop');
    const convertedServices: Service[] = menuItems.map(item => MenuManager.convertMenuItemToService(item));
    setServices(convertedServices);

    // Listen for menu updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'breeze_menu_items') {
        const updatedMenuItems = MenuManager.getMenuItemsByService('barbershop');
        const updatedServices = updatedMenuItems.map(item => MenuManager.convertMenuItemToService(item));
        setServices(updatedServices);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

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
          weekday: 'long', 
          month: 'long', 
          day: 'numeric' 
        }),
        shortDisplay: date.toLocaleDateString('fr-FR', { 
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

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  const availableSlots = selectedBarber 
    ? timeSlots.filter(slot => slot.barberId === selectedBarber.id && slot.available)
    : timeSlots.filter(slot => slot.available);

  const resetBooking = () => {
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setBookingStep('service');
  };

  const proceedToNextStep = () => {
    if (bookingStep === 'service' && selectedService) {
      if (!isLoggedIn) {
        setShowAuthModal(true);
        return;
      }
      setBookingStep('barber');
    } else if (bookingStep === 'barber' && selectedBarber) {
      setBookingStep('date');
    } else if (bookingStep === 'date' && selectedDate) {
      setBookingStep('time');
    } else if (bookingStep === 'time' && selectedSlot) {
      setBookingStep('confirm');
    }
  };

  const handleAuth = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    setBookingStep('barber');
  };

  const confirmBooking = () => {
    const userId = `user-${Date.now()}`;
    const servicePrice = selectedService?.price || 3000;

    // Track booking in statistics and add to user's history
    try {
      trackOrder(servicePrice, 'barbershop', userId);
      
      // Add booking to user's history
      const orderDetails = `${selectedService?.name} avec ${selectedBarber?.name} - ${selectedDate && availableDates.find(d => d.id === selectedDate)?.display} à ${selectedSlot?.time}`;
      addUserOrder('barbershop', selectedService?.name || 'Service Coiffure', servicePrice, orderDetails);
    } catch (error) {
      console.error('Failed to track booking statistics:', error);
    }

    alert('Rendez-vous confirmé ! Vous recevrez une confirmation par SMS.');
    resetBooking();
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Scissors className="h-12 w-12 text-purple-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement des services...</p>
        </div>
      </div>
    );
  }

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
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
                  <Scissors className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="font-playfair text-xl font-bold text-gray-900">Breeze Coiffure</h1>
                  <p className="text-sm text-gray-600">Services de coiffure professionnels</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Ouvert aujourd'hui</div>
                <div className="font-semibold text-purple-600">8h00 - 20h00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Progress */}
      {(selectedService || selectedBarber || selectedDate || selectedSlot) && (
        <div className="bg-purple-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-center">
              <div className="flex items-center space-x-4">
                {['service', 'barber', 'date', 'time', 'confirm'].map((step, index) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                      bookingStep === step
                        ? 'bg-purple-600 text-white'
                        : index < ['service', 'barber', 'date', 'time', 'confirm'].indexOf(bookingStep)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {index + 1}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      bookingStep === step ? 'text-purple-600' : 'text-gray-600'
                    }`}>
                      {step === 'service' && 'Service'}
                      {step === 'barber' && 'Coiffeur'}
                      {step === 'date' && 'Date'}
                      {step === 'time' && 'Horaire'}
                      {step === 'confirm' && 'Confirmation'}
                    </span>
                    {index < 4 && (
                      <div className="w-8 h-0.5 bg-gray-300 ml-4" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Service Selection */}
        {bookingStep === 'service' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
                Nos Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choisissez le service qui vous convient. Nos coiffeurs experts vous garantissent un résultat professionnel.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex justify-center">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex space-x-4">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                      }`}
                    >
                      <category.icon size={16} className="mr-2" />
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <motion.div
                  key={service.id}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all ${
                    selectedService?.id === service.id ? 'ring-2 ring-purple-600 shadow-lg' : 'hover:shadow-md'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedService(service)}
                >
                  <div className="aspect-video relative">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    {service.popular && (
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Populaire
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-purple-600">
                        {formatPrice(service.price)} FCFA
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {service.duration} min
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {selectedService && (
              <div className="flex justify-center">
                <button
                  onClick={proceedToNextStep}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Choisir le Coiffeur
                </button>
              </div>
            )}
          </div>
        )}

        {/* Barber Selection */}
        {bookingStep === 'barber' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
                Choisissez Votre Coiffeur
              </h2>
              <p className="text-gray-600">Service sélectionné: <span className="font-semibold">{selectedService?.name}</span></p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {barbers.map(barber => (
                <motion.div
                  key={barber.id}
                  className={`bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-all ${
                    selectedBarber?.id === barber.id ? 'ring-2 ring-purple-600 shadow-lg' : 'hover:shadow-md'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedBarber(barber)}
                >
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img
                        src={barber.avatar}
                        alt={barber.name}
                        className="w-16 h-16 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{barber.name}</h3>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star size={14} className="mr-1 text-yellow-500" />
                          {barber.rating} • {barber.experience} ans d'exp.
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Spécialités:</h4>
                      <div className="flex flex-wrap gap-2">
                        {barber.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`text-sm ${barber.availableToday ? 'text-green-600' : 'text-orange-600'}`}>
                      {barber.availableToday ? (
                        <>✅ Disponible aujourd'hui • Prochain: {barber.nextAvailable}</>
                      ) : (
                        <>⏰ Prochain disponible: {barber.nextAvailable}</>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setBookingStep('service')}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Retour
              </button>
              {selectedBarber && (
                <button
                  onClick={proceedToNextStep}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Choisir la Date
                </button>
              )}
            </div>
          </div>
        )}

        {/* Date Selection */}
        {bookingStep === 'date' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
                Choisissez une Date
              </h2>
              <p className="text-gray-600">
                Coiffeur: <span className="font-semibold">{selectedBarber?.name}</span> • 
                Service: <span className="font-semibold">{selectedService?.name}</span>
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Dates disponibles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {availableDates.map((date) => (
                    <motion.button
                      key={date.id}
                      className={`p-4 rounded-lg border text-center transition-colors ${
                        selectedDate === date.id
                          ? 'border-purple-600 bg-purple-600 text-white shadow-md'
                          : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                      onClick={() => {
                        setSelectedDate(date.id);
                        setSelectedSlot(null); // Reset slot selection when date changes
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="font-medium text-sm mb-1">{date.shortDisplay}</div>
                      <div className="text-xs opacity-75">{date.display}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setBookingStep('barber')}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Retour
              </button>
              {selectedDate && (
                <button
                  onClick={proceedToNextStep}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Choisir l'Horaire
                </button>
              )}
            </div>
          </div>
        )}

        {/* Time Selection */}
        {bookingStep === 'time' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
                Choisissez l'Horaire
              </h2>
              <p className="text-gray-600">
                Coiffeur: <span className="font-semibold">{selectedBarber?.name}</span> • 
                Service: <span className="font-semibold">{selectedService?.name}</span> • 
                Date: <span className="font-semibold">{selectedDate && availableDates.find(d => d.id === selectedDate)?.shortDisplay}</span>
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Créneaux disponibles pour {selectedDate && availableDates.find(d => d.id === selectedDate)?.shortDisplay}</h3>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {availableSlots.map(slot => (
                    <button
                      key={slot.id}
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-4 rounded-lg border text-center font-medium transition-colors ${
                        selectedSlot?.id === slot.id
                          ? 'border-purple-600 bg-purple-600 text-white'
                          : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setBookingStep('date')}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Retour
              </button>
              {selectedSlot && (
                <button
                  onClick={proceedToNextStep}
                  className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Confirmer le Rendez-vous
                </button>
              )}
            </div>
          </div>
        )}

        {/* Confirmation */}
        {bookingStep === 'confirm' && (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
                Confirmation du Rendez-vous
              </h2>
            </div>

            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Récapitulatif de votre réservation
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Service:</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Coiffeur:</span>
                  <span className="font-medium">{selectedBarber?.name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{selectedDate && availableDates.find(d => d.id === selectedDate)?.display}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Heure:</span>
                  <span className="font-medium">{selectedSlot?.time}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Durée:</span>
                  <span className="font-medium">{selectedService?.duration} minutes</span>
                </div>
                <div className="flex justify-between py-3 text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-purple-600">{selectedService?.price ? formatPrice(selectedService.price) : '0'} FCFA</span>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <button
                  onClick={() => setBookingStep('time')}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Modifier
                </button>
                <button
                  onClick={confirmBooking}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Salon Info */}
        {bookingStep === 'service' && (
          <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-8">
              <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-4">
                Breeze Coiffure
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Notre salon offre des services de coiffure professionnels dans un environnement moderne et accueillant. 
                Nos coiffeurs expérimentés vous garantissent un service de qualité.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Adresse</h3>
                <p className="text-gray-600">QG33+G39, Rte de l'Aeroport, Dakar</p>
              </div>
              <div className="text-center">
                <Phone className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Téléphone</h3>
                <p className="text-gray-600">+221 78 604 27 27</p>
              </div>
              <div className="text-center">
                <Clock className="h-8 w-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Horaires</h3>
                <p className="text-gray-600">
                  Lun-Sam: 8h00-20h00<br />
                  Dim: 10h00-18h00
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuth={handleAuth}
        title="Connexion Requise"
        description="Vous devez être connecté pour prendre un rendez-vous."
        primaryColor="bg-purple-600"
      />
    </div>
  );
}