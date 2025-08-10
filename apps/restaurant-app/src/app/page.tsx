'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { RestaurantMenu } from '@breeze/ui';
import { MenuCategory, Chef, Testimonial, MenuItem } from '@breeze/types';
import { mockMenuItems } from '../data/menuItems';
import { 
  Utensils, 
  Clock, 
  Star, 
  Calendar,
  MapPin, 
  Phone, 
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ChefHat,
  Award
} from 'lucide-react';

// Mock data based on specifications
const mockCategories: MenuCategory[] = [
  { id: 'entrees', name: 'Entrées', description: 'Commencez votre repas en beauté', order: 1 },
  { id: 'plats', name: 'Plats Principaux', description: 'Nos créations signature', order: 2 },
  { id: 'desserts', name: 'Desserts', description: 'Finissez en douceur', order: 3 },
  { id: 'boissons', name: 'Boissons', description: 'Sélection de vins et cocktails', order: 4 }
];

const mockChefs: Chef[] = [
  {
    id: '1',
    name: 'Chef Amadou Diallo',
    title: 'Chef Exécutif',
    bio: 'Passionné par la cuisine sénégalaise moderne avec 15 ans d\'expérience internationale.',
    avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=300&h=300&fit=crop',
    specialties: ['Cuisine Fusion', 'Plats Locaux', 'Pâtisserie'],
    experience: 15,
    awards: [
      { name: 'Chef de l\'Année', year: 2023, description: 'Prix du meilleur chef du Sénégal' }
    ],
    socialLinks: {
      instagram: '@chef.amadou',
      linkedin: 'amadou-diallo-chef'
    }
  },
  {
    id: '2', 
    name: 'Chef Aïssatou Ndiaye',
    title: 'Sous Chef',
    bio: 'Spécialiste de la fusion cuisine africaine-française, formée à Paris.',
    avatar: 'https://images.unsplash.com/photo-1594736797933-d0500ba2fe65?w=300&h=300&fit=crop',
    specialties: ['Cuisine Française', 'Fusion Africaine', 'Desserts'],
    experience: 8,
    awards: [],
    socialLinks: {}
  }
];

const mockTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Fatou Sarr',
    title: 'Cliente régulière',
    content: 'Une expérience culinaire exceptionnelle! Le service et la qualité des plats sont remarquables.',
    rating: 5,
    serviceType: 'restaurant',
    featured: true,
    createdAt: new Date('2024-01-15'),
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b69a1d9f?w=100&h=100&fit=crop'
  },
  {
    id: '2',
    name: 'Moussa Ba',
    title: 'Food blogger',
    content: 'Breeze Restaurant redéfinit la gastronomie sénégalaise. Un must pour tous les amateurs de bonne cuisine.',
    rating: 5,
    serviceType: 'restaurant', 
    featured: true,
    createdAt: new Date('2024-01-10'),
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
  }
];

export default function RestaurantHomePage() {
  const [showMenu, setShowMenu] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);

  if (showMenu) {
    return (
      <main className="min-h-screen">
        <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <Utensils className="h-8 w-8 text-primary mr-3" />
                <span className="text-xl font-bold text-gray-900 font-playfair">Breeze Restaurant</span>
              </div>
              <button
                onClick={() => setShowMenu(false)}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                ← Retour à l'accueil
              </button>
            </div>
          </div>
        </nav>

        <div className="py-8">
          <RestaurantMenu
            categories={mockCategories}
            menuItems={mockMenuItems}
            chefs={mockChefs}
            testimonials={mockTestimonials}
          />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Utensils className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-bold text-gray-900 font-playfair">Breeze Restaurant</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-600 hover:text-primary transition-colors">À propos</a>
              <button
                onClick={() => setShowMenu(true)}
                className="text-gray-600 hover:text-primary transition-colors"
              >
                Notre Menu
              </button>
              <a href="#chefs" className="text-gray-600 hover:text-primary transition-colors">Nos Chefs</a>
              <a href="#gallery" className="text-gray-600 hover:text-primary transition-colors">Galerie</a>
              <a href="#contact" className="text-gray-600 hover:text-primary transition-colors">Contact</a>
              <a href="/admin" className="text-gray-600 hover:text-primary transition-colors text-sm">
                👨‍💼 Admin
              </a>
              <button
                onClick={() => setIsReservationOpen(true)}
                className="btn-primary"
              >
                Réserver
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=1080&fit=crop)',
            y: y1 
          }}
        >
          <div className="hero-overlay" />
        </motion.div>
        
        <div className="hero-content text-center text-white max-w-4xl mx-auto px-4">
          <motion.h1 
            className="text-6xl md:text-7xl font-bold mb-6 font-playfair"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Breeze Restaurant
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl mb-8 text-gray-200 font-light"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Cuisine gastronomique sénégalaise avec une touche moderne
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <button
              onClick={() => setShowMenu(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              Découvrir le Menu
            </button>
            <button
              onClick={() => setIsReservationOpen(true)}
              className="btn-secondary text-lg px-8 py-4"
            >
              Réserver une Table
            </button>
          </motion.div>

          {/* Floating elements */}
          <motion.div
            className="absolute top-20 left-10 w-16 h-16 opacity-20"
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <ChefHat className="w-full h-full text-secondary" />
          </motion.div>
          <motion.div
            className="absolute bottom-20 right-10 w-12 h-12 opacity-20"
            animate={{ y: [10, -10, 10] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <Star className="w-full h-full text-secondary" />
          </motion.div>
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
              <h2 className="text-4xl font-bold text-gray-900 mb-6 font-playfair">
                Notre Histoire
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Depuis 2018, Breeze Restaurant révolutionne la scène culinaire dakaroise en proposant 
                une cuisine qui allie traditions sénégalaises et techniques gastronomiques modernes.
              </p>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Nos chefs passionnés sélectionnent les meilleurs ingrédients locaux pour créer 
                des expériences gustatives uniques qui célèbrent la richesse de notre terroir.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Restaurant Primé</h3>
                  <p className="text-gray-600 text-sm">Élu meilleur restaurant 2023</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ChefHat className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Chefs Expérimentés</h3>
                  <p className="text-gray-600 text-sm">Plus de 20 ans d'expertise</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              style={{ y: y2 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=800&fit=crop"
                alt="Intérieur du restaurant"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary rounded-full opacity-20" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full opacity-20" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Dishes Preview */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl font-bold text-gray-900 mb-4 font-playfair"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Nos Spécialités
            </motion.h2>
            <motion.p 
              className="text-gray-600 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Découvrez quelques-uns de nos plats signature qui font la renommée de Breeze Restaurant
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Thieboudienne Revisité',
                description: 'Notre version moderne du plat national sénégalais',
                price: '12,000',
                image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop'
              },
              {
                name: 'Yassa de Poisson Royal',
                description: 'Poisson frais mariné aux oignons et citron vert',
                price: '15,000',
                image: 'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop'
              },
              {
                name: 'Mafé Premium',
                description: 'Ragoût d\'agneau à la sauce d\'arachide artisanale',
                price: '18,000',
                image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
              }
            ].map((dish, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden menu-item-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img 
                  src={dish.image} 
                  alt={dish.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 font-playfair">
                    {dish.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{dish.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-primary">{dish.price} FCFA</span>
                    <button className="bg-primary/10 text-primary px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors">
                      Commander
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => setShowMenu(true)}
              className="btn-primary text-lg px-8 py-4"
            >
              Voir le Menu Complet
            </button>
          </div>
        </div>
      </section>

      {/* Chefs Section */}
      <section id="chefs" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">Nos Chefs</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Rencontrez les artistes culinaires qui donnent vie à nos créations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {mockChefs.map((chef, index) => (
              <motion.div
                key={chef.id}
                className="chef-card p-8 text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <img
                  src={chef.avatar}
                  alt={chef.name}
                  className="chef-avatar"
                />
                <h3 className="text-2xl font-semibold text-gray-900 mb-1 font-playfair">
                  {chef.name}
                </h3>
                <p className="text-primary font-medium mb-4">{chef.title}</p>
                <p className="text-gray-600 mb-6">{chef.bio}</p>
                
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {chef.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-center items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {chef.experience} ans d'expérience
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section id="gallery" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-playfair">Galerie</h2>
            <p className="text-gray-400 text-lg">Plongez dans l'univers visuel de Breeze Restaurant</p>
          </div>
          
          <div className="gallery-grid">
            {[
              'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1563379091339-03246963d96c?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
            ].map((image, index) => (
              <motion.div
                key={index}
                className="gallery-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <img src={image} alt={`Gallery ${index + 1}`} />
                <div className="gallery-overlay">
                  <div className="text-white">
                    <h4 className="font-semibold">Image {index + 1}</h4>
                    <p className="text-sm opacity-80">Description de l'image</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 font-playfair">
              Ce que disent nos clients
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {mockTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="testimonial-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating 
                          ? 'text-yellow-500 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic text-lg">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.title}</p>
                  </div>
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
            <h2 className="text-4xl font-bold mb-4 font-playfair">Contactez-nous</h2>
            <p className="text-primary-100 text-lg">Nous serons ravis de vous accueillir</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Adresse</h3>
              <p className="text-primary-100">
                Rue de Colmar, Plateau<br />
                Dakar, Sénégal
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Téléphone</h3>
              <p className="text-primary-100">+221 33 823 45 67</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Horaires</h3>
              <p className="text-primary-100">
                Lun-Dim: 12h00 - 23h00<br />
                Cuisine ferme à 22h30
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => setIsReservationOpen(true)}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Réserver Maintenant
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Utensils className="h-8 w-8 text-secondary mr-3" />
                <span className="text-2xl font-bold font-playfair">Breeze Restaurant</span>
              </div>
              <p className="text-gray-400">
                Restaurant gastronomique sénégalais au cœur de Dakar
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">À propos</a></li>
                <li><button onClick={() => setShowMenu(true)} className="text-gray-400 hover:text-white transition-colors">Menu</button></li>
                <li><a href="#chefs" className="text-gray-400 hover:text-white transition-colors">Chefs</a></li>
                <li><a href="#gallery" className="text-gray-400 hover:text-white transition-colors">Galerie</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Rue de Colmar, Plateau</li>
                <li>+221 33 823 45 67</li>
                <li>contact@tastyc.sn</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <Instagram className="h-6 w-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <Facebook className="h-6 w-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                <Twitter className="h-6 w-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Breeze Restaurant. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Reservation Modal */}
      {isReservationOpen && (
        <ReservationModal onClose={() => setIsReservationOpen(false)} />
      )}
    </main>
  );
}

// Reservation Modal Component
function ReservationModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl max-w-md w-full p-8"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-playfair">
            Réserver une Table
          </h2>
          <p className="text-gray-600">Nous vous attendons avec plaisir</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="form-label">Nom complet</label>
            <input type="text" className="form-input" placeholder="Votre nom" />
          </div>
          
          <div>
            <label className="form-label">Téléphone</label>
            <input type="tel" className="form-input" placeholder="+221 XX XXX XX XX" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="form-label">Date</label>
              <input type="date" className="form-input" />
            </div>
            <div>
              <label className="form-label">Heure</label>
              <select className="form-input">
                <option>12:00</option>
                <option>12:30</option>
                <option>13:00</option>
                <option>13:30</option>
                <option>19:00</option>
                <option>19:30</option>
                <option>20:00</option>
                <option>20:30</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="form-label">Nombre de personnes</label>
            <select className="form-input">
              <option>1 personne</option>
              <option>2 personnes</option>
              <option>3 personnes</option>
              <option>4 personnes</option>
              <option>5 personnes</option>
              <option>6+ personnes</option>
            </select>
          </div>
          
          <div>
            <label className="form-label">Demandes spéciales (optionnel)</label>
            <textarea 
              className="form-input h-20 resize-none" 
              placeholder="Allergies, préférences de table..."
            />
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 btn-primary"
            >
              Confirmer
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}