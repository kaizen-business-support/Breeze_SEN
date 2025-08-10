'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trackOrder, addUserOrder } from '../../../utils/statistics';
import { 
  Utensils,
  ArrowLeft,
  Calendar,
  Clock,
  Star,
  Users,
  CheckCircle,
  MapPin,
  Phone,
  ChefHat,
  Award,
  Heart,
  Leaf,
  X
} from 'lucide-react';
import Link from 'next/link';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
  vegetarian?: boolean;
  spiceLevel?: number;
  allergens?: string[];
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  tables: number;
}

interface TableSize {
  id: string;
  size: number;
  label: string;
  available: boolean;
}

const categories = [
  { id: 'entrees', name: 'Entrées', emoji: '🥗', icon: Leaf },
  { id: 'plats', name: 'Plats Principaux', emoji: '🍛', icon: ChefHat },
  { id: 'grillades', name: 'Grillades', emoji: '🔥', icon: Award },
  { id: 'poissons', name: 'Poissons', emoji: '🐟', icon: Star },
  { id: 'desserts', name: 'Desserts', emoji: '🍰', icon: Heart },
  { id: 'boissons', name: 'Boissons', emoji: '🥤', icon: Clock }
];

const menuItems: MenuItem[] = [
  {
    id: 'salade-cesar',
    name: 'Salade César',
    description: 'Laitue romaine, croûtons, parmesan, sauce César maison',
    price: 4500,
    category: 'entrees',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop',
    vegetarian: true
  },
  {
    id: 'thieboudienne',
    name: 'Thiéboudienne',
    description: 'Riz au poisson traditionnel avec légumes locaux et sauce tomate',
    price: 8500,
    category: 'plats',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    popular: true
  },
  {
    id: 'yassa-poulet',
    name: 'Yassa Poulet',
    description: 'Poulet mariné aux oignons et citron, riz parfumé',
    price: 7500,
    category: 'plats',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop',
    popular: true,
    spiceLevel: 2
  },
  {
    id: 'mafe-agneau',
    name: 'Mafé d\'Agneau',
    description: 'Agneau mijoté dans une sauce d\'arachide onctueuse',
    price: 9000,
    category: 'plats',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
    spiceLevel: 1
  },
  {
    id: 'dibi-agneau',
    name: 'Dibi d\'Agneau',
    description: 'Agneau grillé aux épices, accompagné de pain et moutarde',
    price: 12000,
    category: 'grillades',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
    popular: true,
    spiceLevel: 2
  },
  {
    id: 'poisson-braise',
    name: 'Poisson Braisé',
    description: 'Poisson frais grillé, sauce à l\'attieké et légumes',
    price: 8000,
    category: 'poissons',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop',
    spiceLevel: 1
  },
  {
    id: 'thiof-yassa',
    name: 'Thiof au Yassa',
    description: 'Mérou local aux oignons confits et riz basmati',
    price: 11000,
    category: 'poissons',
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop',
    popular: true
  },
  {
    id: 'tarte-coco',
    name: 'Tarte à la Noix de Coco',
    description: 'Tarte artisanale à la noix de coco fraîche',
    price: 3000,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop',
    vegetarian: true
  }
];

const timeSlots: TimeSlot[] = [
  { id: '1', time: '12:00', available: true, tables: 5 },
  { id: '2', time: '12:30', available: true, tables: 3 },
  { id: '3', time: '13:00', available: false, tables: 0 },
  { id: '4', time: '13:30', available: true, tables: 2 },
  { id: '5', time: '14:00', available: true, tables: 4 },
  { id: '6', time: '19:00', available: true, tables: 6 },
  { id: '7', time: '19:30', available: true, tables: 4 },
  { id: '8', time: '20:00', available: true, tables: 2 },
  { id: '9', time: '20:30', available: true, tables: 3 },
  { id: '10', time: '21:00', available: true, tables: 1 }
];

const tableSizes: TableSize[] = [
  { id: 'table-2', size: 2, label: 'Table pour 2', available: true },
  { id: 'table-4', size: 4, label: 'Table pour 4', available: true },
  { id: 'table-6', size: 6, label: 'Table pour 6', available: true },
  { id: 'table-8', size: 8, label: 'Table pour 8', available: false }
];

export default function RestaurantPage() {
  const [currentView, setCurrentView] = useState<'menu' | 'reservation'>('menu');
  const [selectedCategory, setSelectedCategory] = useState('entrees');
  const [error, setError] = useState<string | null>(null);
  const [reservationStep, setReservationStep] = useState<'details' | 'datetime' | 'confirm'>('details');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [selectedTable, setSelectedTable] = useState<TableSize | null>(null);
  const [reservationDetails, setReservationDetails] = useState({
    guests: 2,
    name: '',
    phone: '',
    email: '',
    specialRequests: ''
  });
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  useEffect(() => {
    try {
      setMounted(true);
      const token = localStorage.getItem('breeze_token');
      setIsLoggedIn(!!token);
      console.log('Restaurant page initialized successfully');
    } catch (error) {
      console.error('Error initializing restaurant page:', error);
      setError(`Erreur d'initialisation: ${error instanceof Error ? error.message : String(error)}`);
      setIsLoggedIn(false);
    }
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
  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const resetReservation = () => {
    setReservationStep('details');
    setSelectedDate(null);
    setSelectedSlot(null);
    setSelectedTable(null);
    setReservationDetails({
      guests: 2,
      name: '',
      phone: '',
      email: '',
      specialRequests: ''
    });
  };

  const proceedToNextStep = () => {
    if (reservationStep === 'details' && reservationDetails.name && reservationDetails.phone) {
      setReservationStep('datetime');
    } else if (reservationStep === 'datetime' && selectedDate && selectedSlot && selectedTable) {
      setReservationStep('confirm');
    }
  };

  const handleReservationClick = () => {
    if (!isLoggedIn) {
      setAuthMode('login');
      setShowAuthModal(true);
      return;
    }
    setCurrentView('reservation');
  };

  const handleAuth = () => {
    try {
      if (authMode === 'signup') {
        // Create new user account
        const newUser = {
          id: `user-${Date.now()}`,
          name: authForm.name,
          email: authForm.email,
          phone: authForm.phone,
          joinedDate: new Date().toISOString().split('T')[0],
          loyaltyPoints: 0,
          totalOrders: 0
        };
        
        // Save to localStorage users list
        const existingUsers = JSON.parse(localStorage.getItem('breeze_users') || '[]');
        existingUsers.push(newUser);
        localStorage.setItem('breeze_users', JSON.stringify(existingUsers));
        
        // Set user profile
        localStorage.setItem('breeze_user_profile', JSON.stringify(newUser));
        
        console.log('Account created successfully');
      }
      
      localStorage.setItem('breeze_token', 'demo_token');
      setIsLoggedIn(true);
      setShowAuthModal(false);
      setCurrentView('reservation');
      setAuthForm({ email: '', password: '', name: '', phone: '' });
      console.log('Authentication successful');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setAuthForm({ email: '', password: '', name: '', phone: '' });
  };

  const confirmReservation = () => {
    const userId = `user-${Date.now()}`;
    const estimatedAmount = reservationDetails.guests * 8000; // Estimated 8000 FCFA per person

    // Track reservation in statistics (count as order)
    try {
      trackOrder(estimatedAmount, 'restaurant', userId);
      
      // Add reservation to user's history
      const orderDetails = `Table pour ${reservationDetails.guests} personnes - ${reservationDetails.specialRequests || 'Aucune demande spéciale'}`;
      addUserOrder('restaurant', 'Réservation Restaurant', estimatedAmount, orderDetails);
    } catch (error) {
      console.error('Failed to track reservation statistics:', error);
    }

    alert('Réservation confirmée ! Vous recevrez une confirmation par SMS et email.');
    resetReservation();
    setCurrentView('menu');
  };

  const isDetailsValid = () => {
    return reservationDetails.name.trim() && reservationDetails.phone.trim();
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erreur</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Utensils className="h-12 w-12 text-amber-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement du restaurant...</p>
        </div>
      </div>
    );
  }

  try {
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
                <div className="w-10 h-10 bg-amber-600 rounded-full flex items-center justify-center mr-3">
                  <Utensils className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="font-playfair text-xl font-bold text-gray-900">Breeze Restaurant</h1>
                  <p className="text-sm text-gray-600">Cuisine gastronomique sénégalaise</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Service continu</div>
                <div className="font-semibold text-amber-600">12h00 - 22h00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-amber-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setCurrentView('menu')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'menu'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-600 border border-amber-600'
              }`}
            >
              <ChefHat size={16} className="mr-2" />
              Notre Menu
            </button>
            <button
              onClick={handleReservationClick}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                currentView === 'reservation'
                  ? 'bg-amber-600 text-white'
                  : 'bg-white text-amber-600 border border-amber-600'
              }`}
            >
              <Calendar size={16} className="mr-2" />
              Réserver une Table
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Menu View */}
        {currentView === 'menu' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
                Notre Menu Gastronomique
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Découvrez notre cuisine authentique sénégalaise préparée avec des ingrédients frais et locaux.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex overflow-x-auto space-x-4">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-6 py-3 rounded-lg whitespace-nowrap font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-amber-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-amber-100'
                    }`}
                  >
                    <span className="text-lg mr-2">{category.emoji}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                >
                  <div className="aspect-video relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex space-x-2">
                      {item.popular && (
                        <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Populaire
                        </span>
                      )}
                      {item.vegetarian && (
                        <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Végétarien
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                      <span className="text-xl font-bold text-amber-600">
                        {formatPrice(item.price)} FCFA
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        {item.spiceLevel && (
                          <div className="flex items-center">
                            {'🌶️'.repeat(item.spiceLevel)}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star size={14} className="mr-1 text-yellow-500" />
                        4.{Math.floor(Math.random() * 3) + 6}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Reservation View */}
        {currentView === 'reservation' && (
          <div className="space-y-8">
            {/* Reservation Progress */}
            <div className="bg-amber-50 rounded-lg p-4">
              <div className="flex justify-center">
                <div className="flex items-center space-x-8">
                  {['details', 'datetime', 'confirm'].map((step, index) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        reservationStep === step
                          ? 'bg-amber-600 text-white'
                          : index < ['details', 'datetime', 'confirm'].indexOf(reservationStep)
                          ? 'bg-amber-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        reservationStep === step ? 'text-amber-600' : 'text-gray-600'
                      }`}>
                        {step === 'details' && 'Détails'}
                        {step === 'datetime' && 'Date & Heure'}
                        {step === 'confirm' && 'Confirmation'}
                      </span>
                      {index < 2 && (
                        <div className="w-12 h-0.5 bg-gray-300 ml-4" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reservation Details */}
            {reservationStep === 'details' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
                    Détails de la Réservation
                  </h2>
                  <p className="text-gray-600">
                    Remplissez les informations pour réserver votre table
                  </p>
                </div>

                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de convives
                      </label>
                      <div className="flex space-x-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                          <button
                            key={num}
                            onClick={() => setReservationDetails({...reservationDetails, guests: num})}
                            className={`w-12 h-12 rounded-lg border font-medium transition-colors ${
                              reservationDetails.guests === num
                                ? 'border-amber-600 bg-amber-600 text-white'
                                : 'border-gray-300 hover:border-amber-300'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        required
                        value={reservationDetails.name}
                        onChange={(e) => setReservationDetails({...reservationDetails, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Votre nom complet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={reservationDetails.phone}
                        onChange={(e) => setReservationDetails({...reservationDetails, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="+221 77 123 45 67"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email (optionnel)
                      </label>
                      <input
                        type="email"
                        value={reservationDetails.email}
                        onChange={(e) => setReservationDetails({...reservationDetails, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Demandes spéciales (optionnel)
                      </label>
                      <textarea
                        value={reservationDetails.specialRequests}
                        onChange={(e) => setReservationDetails({...reservationDetails, specialRequests: e.target.value})}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        placeholder="Allergies, préférences de table, occasion spéciale..."
                      />
                    </div>
                  </div>

                  {isDetailsValid() && (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={proceedToNextStep}
                        className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                      >
                        Choisir Date et Heure
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Date & Time Selection */}
            {reservationStep === 'datetime' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
                    Date et Heure
                  </h2>
                  <p className="text-gray-600">
                    Réservation pour {reservationDetails.guests} personne{reservationDetails.guests > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Date Selection */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-center">Choisissez une date</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {availableDates.map((date) => (
                      <motion.button
                        key={date.id}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          selectedDate === date.id
                            ? 'border-amber-600 bg-amber-600 text-white shadow-md'
                            : 'border-gray-300 hover:border-amber-300 hover:bg-amber-50'
                        }`}
                        onClick={() => {
                          setSelectedDate(date.id);
                          setSelectedSlot(null);
                          setSelectedTable(null);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="font-medium text-sm">{date.shortDisplay}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Time Selection */}
                {selectedDate && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 text-center">Choisissez un créneau</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      {timeSlots.map((slot) => (
                        <motion.button
                          key={slot.id}
                          className={`p-4 rounded-lg border text-center transition-colors ${
                            slot.available 
                              ? selectedSlot?.id === slot.id
                                ? 'border-amber-600 bg-amber-600 text-white'
                                : 'border-gray-300 hover:border-amber-300 hover:bg-amber-50'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!slot.available}
                          onClick={() => {
                            if (slot.available) {
                              setSelectedSlot(slot);
                              setSelectedTable(null);
                            }
                          }}
                          whileHover={slot.available ? { scale: 1.05 } : {}}
                          whileTap={slot.available ? { scale: 0.95 } : {}}
                        >
                          <div className="font-medium">{slot.time}</div>
                          <div className="text-xs mt-1">
                            {slot.available ? `${slot.tables} tables disponibles` : 'Complet'}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Table Selection */}
                {selectedSlot && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 text-center">Type de table</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {tableSizes.map((table) => (
                        <motion.button
                          key={table.id}
                          className={`p-4 rounded-lg border text-center transition-colors ${
                            table.available 
                              ? selectedTable?.id === table.id
                                ? 'border-amber-600 bg-amber-600 text-white'
                                : 'border-gray-300 hover:border-amber-300 hover:bg-amber-50'
                              : 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!table.available}
                          onClick={() => {
                            if (table.available) {
                              setSelectedTable(table);
                            }
                          }}
                          whileHover={table.available ? { scale: 1.02 } : {}}
                          whileTap={table.available ? { scale: 0.98 } : {}}
                        >
                          <Users className="h-6 w-6 mx-auto mb-2" />
                          <div className="font-medium">{table.label}</div>
                          <div className="text-xs mt-1">
                            {table.available ? 'Disponible' : 'Non disponible'}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setReservationStep('details')}
                    className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Retour
                  </button>
                  {selectedDate && selectedSlot && selectedTable && (
                    <button
                      onClick={proceedToNextStep}
                      className="bg-amber-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                    >
                      Confirmer la Réservation
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Confirmation */}
            {reservationStep === 'confirm' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
                    Confirmation de Réservation
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
                      <span className="text-gray-600">Nom:</span>
                      <span className="font-medium">{reservationDetails.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Téléphone:</span>
                      <span className="font-medium">{reservationDetails.phone}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">Nombre de convives:</span>
                      <span className="font-medium">{reservationDetails.guests} personne{reservationDetails.guests > 1 ? 's' : ''}</span>
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
                      <span className="text-gray-600">Table:</span>
                      <span className="font-medium">{selectedTable?.label}</span>
                    </div>
                    {reservationDetails.specialRequests && (
                      <div className="py-2 border-b">
                        <span className="text-gray-600 block mb-1">Demandes spéciales:</span>
                        <span className="font-medium text-sm">{reservationDetails.specialRequests}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <button
                      onClick={() => setReservationStep('datetime')}
                      className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={confirmReservation}
                      className="flex-1 bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                    >
                      Confirmer
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Restaurant Info */}
      {currentView === 'menu' && (
        <div className="bg-amber-600 text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl font-bold mb-4">Breeze Restaurant</h2>
              <p className="text-amber-100 max-w-2xl mx-auto">
                Une expérience culinaire authentique dans un cadre élégant. 
                Notre chef vous propose une cuisine sénégalaise raffinée avec des ingrédients de première qualité.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <MapPin className="h-8 w-8 mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Adresse</h3>
                <p className="text-amber-100">QG33+G39, Rte de l'Aeroport, Dakar</p>
              </div>
              <div>
                <Phone className="h-8 w-8 mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Réservations</h3>
                <p className="text-amber-100">+221 78 604 27 27</p>
              </div>
              <div>
                <Clock className="h-8 w-8 mx-auto mb-3" />
                <h3 className="text-xl font-semibold mb-2">Horaires</h3>
                <p className="text-amber-100">
                  Mar-Dim: 12h00-15h00, 19h00-22h00<br />
                  Fermé le lundi
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-2xl font-semibold">
                {authMode === 'login' ? 'Connexion Requise' : 'Créer un Compte'}
              </h2>
              <button
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthForm({ email: '', password: '', name: '', phone: '' });
                }}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-center mb-6">
              <p className="text-gray-600">
                {authMode === 'login' 
                  ? 'Vous devez être connecté pour effectuer une réservation.'
                  : 'Créez votre compte pour accéder aux réservations.'
                }
              </p>
            </div>

            <div className="space-y-4">
              {authMode === 'signup' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Votre nom complet"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({...authForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="+221 77 123 45 67"
                      required
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="votre@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                onClick={handleAuth}
                disabled={authMode === 'signup' && (!authForm.name || !authForm.phone || !authForm.email || !authForm.password)}
                className="w-full bg-amber-600 text-white py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {authMode === 'login' ? 'Se Connecter' : 'Créer le Compte'}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  {authMode === 'login' 
                    ? 'Pas de compte ? ' 
                    : 'Déjà un compte ? '
                  }
                  <span 
                    onClick={toggleAuthMode}
                    className="text-amber-600 cursor-pointer hover:text-amber-700 underline"
                  >
                    {authMode === 'login' ? 'Créer un compte' : 'Se connecter'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    );
  } catch (renderError) {
    console.error('Restaurant page render error:', renderError);
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md">
          <div className="text-red-500 text-6xl mb-4">🚨</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erreur de Rendu</h1>
          <p className="text-gray-600 mb-4">Une erreur est survenue lors du chargement de la page restaurant.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
          >
            Recharger la page
          </button>
        </div>
      </div>
    );
  }
}