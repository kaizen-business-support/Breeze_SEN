'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CarWashBooking } from '@breeze/ui';
import { TimeSlot, PricingRule } from '@breeze/types';
import { Car, Clock, Shield, Star, ArrowRight, Phone, MapPin } from 'lucide-react';

const services = [
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
  { id: '14', time: '16:30', available: true, price: 5000, duration: 30 },
];

const pricingRules: PricingRule[] = [
  { id: '1', condition: 'peak_hours', multiplier: 1.2 },
  { id: '2', condition: 'suv', multiplier: 1.3 },
  { id: '3', condition: 'weekend', multiplier: 1.1 },
];

export default function CarWashHomePage() {
  const [currentStep, setCurrentStep] = useState<'service' | 'vehicle' | 'datetime' | 'payment'>('service');
  const [isBookingMode, setIsBookingMode] = useState(false);

  if (isBookingMode) {
    return (
      <main className="min-h-screen">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Car className="h-8 w-8 text-primary mr-3" />
                <span className="font-playfair text-xl font-bold text-gray-900">Breeze Lavage</span>
              </div>
              <button
                onClick={() => setIsBookingMode(false)}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                ← Retour à l'accueil
              </button>
            </div>
          </div>
        </nav>

        <div className="py-8">
          <CarWashBooking
            step={currentStep}
            services={services}
            availableSlots={availableSlots}
            pricing={pricingRules}
            service="lavage"
            onStepChange={(step) => setCurrentStep(step as any)}
            vehicleForm={true}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-primary mr-3" />
              <span className="font-playfair text-xl font-bold text-gray-900">Breeze Lavage</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="text-gray-600 hover:text-primary transition-colors">Services</a>
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">À propos</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
              <a href="/admin" className="text-gray-600 hover:text-primary transition-colors text-sm">
                👨‍💼 Admin
              </a>
              <button
                onClick={() => setIsBookingMode(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop)' }}
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
            Service de Lavage
            <span className="block text-secondary">Professionnel</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl mb-8 text-gray-200"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Réservez votre créneau en ligne et suivez le processus en temps réel
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={() => setIsBookingMode(true)}
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
            >
              Réserver maintenant <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-white hover:text-primary transition-colors">
              Voir nos services
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Pourquoi choisir Breeze Lavage?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Notre service combine technologie moderne et expertise professionnelle pour vous offrir la meilleure expérience de lavage automobile.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: 'Réservation Facile',
                description: 'Système de réservation en ligne avec créneaux en temps réel et estimation précise.'
              },
              {
                icon: Shield,
                title: 'Service Garanti',
                description: 'Professionnels certifiés avec garantie satisfaction et suivi qualité.'
              },
              {
                icon: Star,
                title: 'Tracking en Direct',
                description: 'Suivez chaque étape du processus avec notre système de tracking QR code.'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-6">À Propos de Breeze Lavage</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Depuis 2020, Breeze Lavage s'est imposé comme le leader du lavage automobile professionnel 
                à Dakar. Nous combinons techniques traditionnelles et technologies modernes pour offrir 
                un service d'exception à nos clients.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Notre équipe d'experts passionnés utilise uniquement des produits écologiques et 
                des équipements de dernière génération pour préserver votre véhicule et l'environnement.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <p className="text-gray-600 text-sm">Véhicules lavés par mois</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <p className="text-gray-600 text-sm">Clients satisfaits</p>
                </div>
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
                src="https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=600&h=400&fit=crop"
                alt="Équipe Breeze Lavage"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/20 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Nos Services</h2>
            <p className="text-gray-600">Choisissez le service qui correspond à vos besoins</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover-lift"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary">{service.pricing} FCFA</span>
                    <span className="text-sm text-gray-500">{service.duration} min</span>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    Prix variable selon créneaux - Configuré par l'équipe
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center">
                        <span className="w-2 h-2 bg-primary rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setIsBookingMode(true)}
                    className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    Choisir ce service
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl font-bold mb-4">Contactez-nous</h2>
            <p className="text-primary-100">Questions? Nous sommes là pour vous aider</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Informations de contact</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-3" />
                  <span>+221 77 123 45 67</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-3" />
                  <span>Avenue Cheikh Anta Diop, Dakar, Sénégal</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold mb-4">Horaires d'ouverture</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Lundi - Vendredi</span>
                  <span>8h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samedi</span>
                  <span>8h00 - 16h00</span>
                </div>
                <div className="flex justify-between">
                  <span>Dimanche</span>
                  <span>Fermé</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Car className="h-6 w-6 text-primary mr-2" />
            <span className="font-playfair text-lg font-semibold">Breeze Lavage</span>
          </div>
          <p className="text-gray-400">
            © 2024 Breeze - Service de Lavage Professionnel.
          </p>
        </div>
      </footer>
    </main>
  );
}