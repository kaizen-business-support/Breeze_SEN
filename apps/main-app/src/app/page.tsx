'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { statisticsService, trackNewCustomer, trackLogin, createUserProfile } from '../utils/statistics';
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

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  href: string;
  features: string[];
  image: string;
  comingSoon?: boolean;
}

const services: Service[] = [
  {
    id: 'car-wash',
    name: 'Lavage Auto',
    description: 'Service de lavage automobile professionnel avec système de réservation en ligne et suivi en temps réel.',
    icon: Car,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    href: '/services/car-wash',
    features: ['Réservation en ligne', 'Suivi temps réel', 'Tarifs flexibles', 'Service professionnel'],
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Cuisine gastronomique avec des produits frais et locaux. Découvrez notre menu interactif et réservez votre table.',
    icon: Utensils,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    href: '/services/restaurant',
    features: ['Menu interactif', 'Réservation de table', 'Chefs experts', 'Produits locaux'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=400&fit=crop'
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    description: 'Restauration rapide avec des options savoureuses et une commande en ligne simplifiée.',
    icon: Coffee,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    href: '/services/fast-food',
    features: ['Commande rapide', 'Livraison express', 'Menu varié', 'Prix abordables'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop'
  },
  {
    id: 'barbershop',
    name: 'Coiffure',
    description: 'Services de coiffure et soins capillaires avec des professionnels expérimentés.',
    icon: Scissors,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    href: '/services/barbershop',
    features: ['Coiffeurs experts', 'Soins personnalisés', 'Rendez-vous en ligne', 'Produits premium'],
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop'
  }
];

// Stats will be loaded dynamically

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authForm, setAuthForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [stats, setStats] = useState([
    { label: 'Services Disponibles', value: '4', icon: Award },
    { label: 'Clients Satisfaits', value: '0', icon: Users },
    { label: 'Commandes Traitées', value: '0', icon: Clock },
    { label: 'Note Moyenne', value: '5.0/5', icon: Star }
  ]);

  useEffect(() => {
    const token = localStorage.getItem('breeze_token');
    setIsLoggedIn(!!token);

    // Load real-time statistics
    try {
      const currentStats = statisticsService.getStatistics();
      setStats([
        { label: 'Services Disponibles', value: currentStats.activeServices.toString(), icon: Award },
        { label: 'Clients Satisfaits', value: currentStats.totalCustomers.toString(), icon: Users },
        { label: 'Commandes Traitées', value: currentStats.totalOrders.toString(), icon: Clock },
        { label: 'Note Moyenne', value: `${currentStats.averageRating.toFixed(1)}/5`, icon: Star }
      ]);
    } catch (error) {
      console.error('Failed to load statistics:', error);
      // Use default stats if loading fails
    }
  }, []);

  const handleServiceClick = (service: Service) => {
    // Allow browsing services without authentication
    // Authentication will be required when user tries to place order/make reservation
    window.location.href = service.href;
  };

  const handleAuth = (mode: 'login' | 'register') => {
    // Validate required fields
    if (mode === 'register') {
      if (!authForm.name || !authForm.phone || !authForm.email || !authForm.password) {
        alert('Veuillez remplir tous les champs obligatoires.');
        return;
      }
    } else {
      if (!authForm.email || !authForm.password) {
        alert('Veuillez saisir votre email et mot de passe.');
        return;
      }
    }

    localStorage.setItem('breeze_token', 'demo_token');
    setIsLoggedIn(true);
    setShowAuthModal(false);

    // Track statistics and create user profile
    try {
      if (mode === 'register') {
        // Create user profile with actual data
        const profile = createUserProfile(authForm.name, authForm.email, authForm.phone);
        
        trackNewCustomer(profile.id, authForm.name);
        
        // Update stats display
        const currentStats = statisticsService.getStatistics();
        setStats([
          { label: 'Services Disponibles', value: currentStats.activeServices.toString(), icon: Award },
          { label: 'Clients Satisfaits', value: currentStats.totalCustomers.toString(), icon: Users },
          { label: 'Commandes Traitées', value: currentStats.totalOrders.toString(), icon: Clock },
          { label: 'Note Moyenne', value: `${currentStats.averageRating.toFixed(1)}/5`, icon: Star }
        ]);
      } else {
        const userId = `user-${Date.now()}`;
        trackLogin(userId, 'customer');
      }
    } catch (error) {
      console.error('Failed to track auth statistics:', error);
    }

    // Reset form
    setAuthForm({ name: '', phone: '', email: '', password: '' });
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
              <div className="hidden md:ml-8 md:flex md:space-x-8">
                <a href="#services" className="text-gray-600 hover:text-primary transition-colors">Services</a>
                <a href="#about" className="text-gray-600 hover:text-primary transition-colors">À propos</a>
                <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <Link href="/account" className="flex items-center text-gray-600 hover:text-primary transition-colors">
                    <User size={20} className="mr-2" />
                    Mon Compte
                  </Link>
                  <button
                    onClick={() => {
                      localStorage.removeItem('breeze_token');
                      setIsLoggedIn(false);
                    }}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <LogIn size={16} className="mr-2" />
                  Se Connecter
                </button>
              )}
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:text-primary"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <a href="#services" className="block px-3 py-2 text-gray-600 hover:text-primary">Services</a>
              <a href="#about" className="block px-3 py-2 text-gray-600 hover:text-primary">À propos</a>
              <a href="#contact" className="block px-3 py-2 text-gray-600 hover:text-primary">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&h=1080&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1 
            className="font-playfair text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Breeze
            <span className="block text-secondary">Services Numériques</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            La plateforme tout-en-un pour vos services quotidiens au Sénégal. 
            Réservez en ligne et profitez d'une expérience digitale moderne.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              Découvrir nos Services <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            {!isLoggedIn && (
              <button
                onClick={() => setShowAuthModal(true)}
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-primary transition-colors"
              >
                Créer un Compte
              </button>
            )}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">
              Nos Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez notre gamme complète de services numériques conçus pour simplifier votre quotidien.
              {!isLoggedIn && (
                <span className="block mt-2 text-primary font-medium">
                  * Un compte est requis pour effectuer une réservation ou commande
                </span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="service-card cursor-pointer relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleServiceClick(service)}
              >
                
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <div className={`absolute top-4 left-4 w-12 h-12 ${service.bgColor} rounded-full flex items-center justify-center`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2">
                    {service.features.slice(0, 3).map((feature, i) => (
                      <div key={i} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-4 border-t">
                    <button className="w-full py-2 px-4 rounded-lg font-medium transition-colors bg-primary text-white hover:bg-primary/90">
                      Découvrir
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6">
                À Propos de Breeze
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Breeze est la première plateforme de services numériques au Sénégal, 
                conçue pour connecter les clients avec des services de qualité dans 
                le lavage automobile, la restauration et les soins personnels.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Notre mission est de moderniser l'accès aux services quotidiens 
                grâce à la technologie, tout en soutenant l'économie locale.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: Shield, title: 'Sécurisé', desc: 'Paiements sécurisés' },
                  { icon: Clock, title: 'Rapide', desc: 'Réservation instantanée' },
                  { icon: Award, title: 'Qualité', desc: 'Services certifiés' }
                ].map((feature, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                alt="Équipe Breeze"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold mb-4">Contactez-nous</h2>
            <p className="text-primary-100 max-w-2xl mx-auto">
              Des questions sur nos services ? Notre équipe est là pour vous aider.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-8">
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <Phone className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
                <p className="text-primary-100">+221 78 604 27 27</p>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <Mail className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Email</h3>
                <p className="text-primary-100">contact@breeze.sn</p>
              </div>
              
              <div className="text-center lg:text-left">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto lg:mx-0 mb-4">
                  <MapPin className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Adresse</h3>
                <p className="text-primary-100 mb-3">QG33+G39, Rte de l'Aeroport, Dakar</p>
                <a 
                  href="https://maps.app.goo.gl/oKcXwUm1uRD1sE3D7" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary-200 hover:text-white transition-colors text-sm"
                >
                  <MapPin size={16} className="mr-1" />
                  Voir sur Google Maps
                </a>
              </div>
            </div>

            {/* Embedded Map */}
            <div className="relative">
              <div className="bg-white/10 rounded-lg p-4">
                <h3 className="text-xl font-semibold mb-4 text-center lg:text-left">Notre Localisation</h3>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3858.842857142857!2d-17.4833333!3d14.7833333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xec0d39e9e9e9e9e9%3A0xe9e9e9e9e9e9e9e9!2sQG33%2BG39%2C%20Rte%20de%20l'Aeroport%2C%20Dakar!5e0!3m2!1sen!2ssn!4v1620000000000!5m2!1sen!2ssn"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
                <div className="mt-4 text-center">
                  <a 
                    href="https://maps.app.goo.gl/oKcXwUm1uRD1sE3D7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <MapPin size={16} className="mr-2" />
                    Ouvrir dans Google Maps
                  </a>
                </div>
              </div>
            </div>
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
              {authMode === 'register' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      value={authForm.name}
                      onChange={(e) => setAuthForm({...authForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      value={authForm.phone}
                      onChange={(e) => setAuthForm({...authForm, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+221 78 604 27 27"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  value={authForm.email}
                  onChange={(e) => setAuthForm({...authForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="votre@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe *
                </label>
                <input
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({...authForm, password: e.target.value})}
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