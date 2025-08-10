'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUserProfile, updateUserProfile, getUserOrders, UserProfile, UserOrder } from '../../utils/statistics';
import { 
  User, 
  Settings, 
  History, 
  Star, 
  Gift, 
  Edit3, 
  Save, 
  ArrowLeft,
  Car,
  Utensils,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import Link from 'next/link';

// Types are imported from statistics utility

// Mock data removed - using real user data from localStorage

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'loyalty'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage
    const userProfile = getUserProfile();
    const userOrders = getUserOrders();
    
    setProfile(userProfile);
    setOrders(userOrders);
    setLoading(false);

    // Redirect if no user data found
    if (!userProfile) {
      alert('Aucun profil utilisateur trouvé. Veuillez vous connecter.');
      window.location.href = '/';
    }
  }, []);

  const handleSaveProfile = () => {
    if (!profile) return;
    
    // Save profile to localStorage
    updateUserProfile(profile);
    setIsEditing(false);
    alert('Profil mis à jour avec succès !');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement de votre profil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">Aucun profil utilisateur trouvé.</p>
          <Link href="/" className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'car-wash': return Car;
      case 'restaurant': return Utensils;
      default: return Calendar;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Terminé';
      case 'pending': return 'En cours';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center text-gray-600 hover:text-primary transition-colors mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Retour à l'accueil
              </Link>
              <div>
                <h1 className="font-playfair text-2xl font-bold text-gray-900">Mon Compte</h1>
                <p className="text-gray-600">Gérez votre profil et vos commandes</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="font-semibold text-gray-900">{profile.name}</div>
                <div className="text-sm text-gray-600">{profile.loyaltyPoints} points</div>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <nav className="space-y-2">
                {[
                  { id: 'profile', name: 'Profil', icon: User },
                  { id: 'history', name: 'Historique', icon: History },
                  { id: 'loyalty', name: 'Fidélité', icon: Gift }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon size={20} className="mr-3" />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Statistiques</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Commandes</span>
                  <span className="font-semibold">{profile.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Points Fidélité</span>
                  <span className="font-semibold text-primary">{profile.loyaltyPoints}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Favori</span>
                  <span className="font-semibold">{profile.favoriteService}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="font-playfair text-xl font-semibold">Informations Personnelles</h2>
                    <button
                      onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
                      className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                        isEditing
                          ? 'bg-primary text-white hover:bg-primary/90'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isEditing ? <Save size={16} className="mr-2" /> : <Edit3 size={16} className="mr-2" />}
                      {isEditing ? 'Enregistrer' : 'Modifier'}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom Complet
                      </label>
                      <div className="flex items-center">
                        <User size={16} className="text-gray-400 mr-3" />
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.name}
                            onChange={(e) => setProfile(profile ? {...profile, name: e.target.value} : null)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <span className="text-gray-900">{profile.name}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="flex items-center">
                        <Mail size={16} className="text-gray-400 mr-3" />
                        {isEditing ? (
                          <input
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile(profile ? {...profile, email: e.target.value} : null)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <span className="text-gray-900">{profile.email}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <div className="flex items-center">
                        <Phone size={16} className="text-gray-400 mr-3" />
                        {isEditing ? (
                          <input
                            type="tel"
                            value={profile.phone}
                            onChange={(e) => setProfile(profile ? {...profile, phone: e.target.value} : null)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <span className="text-gray-900">{profile.phone}</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Adresse
                      </label>
                      <div className="flex items-center">
                        <MapPin size={16} className="text-gray-400 mr-3" />
                        {isEditing ? (
                          <input
                            type="text"
                            value={profile.address}
                            onChange={(e) => setProfile(profile ? {...profile, address: e.target.value || ''} : null)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        ) : (
                          <span className="text-gray-900">{profile.address}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Membre depuis</h3>
                    <p className="text-gray-600">
                      {new Date(profile.joinedDate).toLocaleDateString('fr-FR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div className="p-6">
                  <h2 className="font-playfair text-xl font-semibold mb-6">Historique des Commandes</h2>
                  
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const ServiceIcon = getServiceIcon(order.service);
                      return (
                        <motion.div
                          key={order.id}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                                <ServiceIcon className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{order.serviceName}</h3>
                                <p className="text-sm text-gray-600">{order.details}</p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {new Date(order.date).toLocaleDateString('fr-FR')} • {order.id}
                                </p>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="font-semibold text-gray-900">{order.amount.toLocaleString()} FCFA</div>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {getStatusText(order.status)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {orders.length === 0 && (
                    <div className="text-center py-12">
                      <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="font-semibold text-gray-900 mb-2">Aucune commande</h3>
                      <p className="text-gray-600">Vous n'avez pas encore effectué de commande.</p>
                      <Link href="/" className="btn-primary mt-4">
                        Découvrir nos Services
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Loyalty Tab */}
              {activeTab === 'loyalty' && (
                <div className="p-6">
                  <h2 className="font-playfair text-xl font-semibold mb-6">Programme de Fidélité</h2>
                  
                  {/* Points Summary */}
                  <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white mb-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-2xl font-bold">{profile.loyaltyPoints} Points</h3>
                        <p className="opacity-90">Solde disponible</p>
                      </div>
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                        <Gift className="h-8 w-8" />
                      </div>
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Star className="h-6 w-6 text-yellow-500 mr-2" />
                        <h3 className="font-semibold">Récompense Bronze</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Échangez 500 points contre une réduction de 2500 FCFA
                      </p>
                      <button 
                        className={`w-full py-2 px-4 rounded-lg transition-colors ${
                          profile.loyaltyPoints >= 500
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={profile.loyaltyPoints < 500}
                      >
                        {profile.loyaltyPoints >= 500 ? 'Échanger' : '500 points requis'}
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Star className="h-6 w-6 text-gray-400 mr-2" />
                        <h3 className="font-semibold">Récompense Argent</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Échangez 1000 points contre une réduction de 6000 FCFA
                      </p>
                      <button 
                        className={`w-full py-2 px-4 rounded-lg transition-colors ${
                          profile.loyaltyPoints >= 1000
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={profile.loyaltyPoints < 1000}
                      >
                        {profile.loyaltyPoints >= 1000 ? 'Échanger' : '1000 points requis'}
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Star className="h-6 w-6 text-yellow-600 mr-2" />
                        <h3 className="font-semibold">Récompense Or</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Échangez 2000 points contre une réduction de 15000 FCFA
                      </p>
                      <button 
                        className={`w-full py-2 px-4 rounded-lg transition-colors ${
                          profile.loyaltyPoints >= 2000
                            ? 'bg-primary text-white hover:bg-primary/90'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        disabled={profile.loyaltyPoints < 2000}
                      >
                        {profile.loyaltyPoints >= 2000 ? 'Échanger' : '2000 points requis'}
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <Gift className="h-6 w-6 text-primary mr-2" />
                        <h3 className="font-semibold">Comment Gagner des Points</h3>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• 1 point pour chaque 100 FCFA dépensés</li>
                        <li>• 50 points bonus pour chaque parrainage</li>
                        <li>• Points double lors des événements spéciaux</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}