'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Utensils, 
  Scissors,
  Coffee,
  User,
  LogIn,
  Menu,
  X,
  Star,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Users
} from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    id: 'car-wash',
    name: 'Lavage Auto',
    description: 'Service de lavage automobile professionnel',
    icon: Car,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    href: '/services/car-wash',
    features: ['Réservation en ligne', 'Service professionnel'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Cuisine gastronomique avec produits locaux',
    icon: Utensils,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    href: '/services/restaurant',
    features: ['Menu varié', 'Produits locaux'],
    image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&h=400&fit=crop'
  }
];

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const stats = [
    { label: 'Services Disponibles', value: '4', icon: Award },
    { label: 'Clients Satisfaits', value: '0', icon: Users },
    { label: 'Commandes Traitées', value: '0', icon: Clock },
    { label: 'Note Moyenne', value: '5.0/5', icon: Star }
  ];

  useEffect(() => {
    const token = localStorage.getItem('breeze_token');
    setIsLoggedIn(!!token);
  }, []);

  const handleServiceClick = (service: any) => {
    window.location.href = service.href;
  };

  const handleAuth = (mode: 'login' | 'register') => {
    localStorage.setItem('breeze_token', 'demo_token');
    setIsLoggedIn(true);
    setShowAuthModal(false);
    alert(`${mode === 'login' ? 'Connexion' : 'Inscription'} réussie !`);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-playfair font-bold text-primary">Breeze</div>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link href="/account" className="text-gray-600 hover:text-primary transition-colors">
                    Mon Compte
                  </Link>
                  <Link href="/admin" className="text-gray-600 hover:text-primary transition-colors">
                    <Shield size={20} />
                  </Link>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center text-gray-600 hover:text-primary transition-colors"
                >
                  <LogIn size={20} className="mr-2" />
                  Connexion
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary to-secondary text-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-playfair font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Breeze
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Votre plateforme de services numériques au Sénégal
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-playfair font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre gamme complète de services numériques conçus pour simplifier votre quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleServiceClick(service)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="aspect-w-16 aspect-h-9 relative overflow-hidden rounded-t-xl">
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent`} />
                  <div className="absolute bottom-4 left-4">
                    <service.icon className="h-8 w-8 text-white mb-2" />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-playfair font-semibold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-semibold">Découvrir</span>
                    <ArrowRight className="h-5 w-5 text-primary group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="font-playfair text-2xl font-bold text-primary mb-4">Breeze</div>
          <p className="text-gray-400 mb-6">
            Votre plateforme de services numériques au Sénégal
          </p>
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-500">
              © 2025 Breeze. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-2xl font-semibold">
                {authMode === 'login' ? 'Connexion' : 'Inscription'}
              </h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              <button
                onClick={() => handleAuth(authMode)}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {authMode === 'login' ? 'Se Connecter' : 'Créer un Compte'}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  {authMode === 'login' 
                    ? "Pas de compte ? S'inscrire" 
                    : "Déjà un compte ? Se connecter"
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}