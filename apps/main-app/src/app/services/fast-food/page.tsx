'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trackOrder, addUserOrder } from '../../../utils/statistics';
import { 
  Coffee,
  ArrowLeft,
  ShoppingCart,
  Plus,
  Minus,
  Clock,
  Star,
  Truck,
  CheckCircle,
  X
} from 'lucide-react';
import Link from 'next/link';
import AuthModal from '../../../components/AuthModal';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
  spiceLevel?: number;
  prepTime?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
  customizations?: string[];
}

const categories = [
  { id: 'burgers', name: 'Burgers', emoji: '🍔' },
  { id: 'sandwiches', name: 'Sandwichs', emoji: '🥪' },
  { id: 'sides', name: 'Accompagnements', emoji: '🍟' },
  { id: 'drinks', name: 'Boissons', emoji: '🥤' },
  { id: 'desserts', name: 'Desserts', emoji: '🍰' }
];

const menuItems: MenuItem[] = [
  {
    id: 'burger-dakar',
    name: 'Burger Dakar',
    description: 'Burger signature avec steak de bœuf local, fromage, salade et sauce spéciale',
    price: 4500,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    popular: true,
    prepTime: 15
  },
  {
    id: 'burger-dibiterie',
    name: 'Burger Dibiterie',
    description: 'Burger fusion avec viande grillée façon dibiterie et épices locales',
    price: 5000,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
    spiceLevel: 2,
    prepTime: 18
  },
  {
    id: 'sandwich-poisson',
    name: 'Sandwich Poisson Braisé',
    description: 'Poisson frais grillé avec légumes et sauce yassa dans pain artisanal',
    price: 3500,
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop',
    popular: true,
    prepTime: 12
  },
  {
    id: 'fries-patates',
    name: 'Frites de Patates Douces',
    description: 'Frites croustillantes de patates douces locales avec épices',
    price: 2000,
    category: 'sides',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
    prepTime: 10
  },
  {
    id: 'bissap-frais',
    name: 'Bissap Frais',
    description: 'Jus d\'hibiscus traditionnel glacé avec gingembre et menthe',
    price: 1500,
    category: 'drinks',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
    prepTime: 3
  }
];

export default function FastFoodPage() {
  const [selectedCategory, setSelectedCategory] = useState('burgers');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem('breeze_token');
    setIsLoggedIn(!!token);
  }, []);

  const filteredItems = menuItems.filter(item => item.category === selectedCategory);

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const estimatedTime = () => {
    if (cart.length === 0) return '∞';
    const maxPrepTime = Math.max(...cart.map(item => item.prepTime || 10));
    const totalTime = orderType === 'delivery' ? maxPrepTime + 20 : maxPrepTime;
    return `${totalTime} min`;
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    const totalAmount = getTotalPrice() + (orderType === 'delivery' ? 500 : 0);
    const userId = `user-${Date.now()}`;

    // Track order in statistics and add to user's order history
    try {
      trackOrder(totalAmount, 'fast-food', userId);
      
      // Add order to user's history
      const orderDetails = cart.map(item => `${item.quantity}x ${item.name}`).join(', ');
      addUserOrder('fast-food', 'Commande Fast Food', totalAmount, orderDetails);
    } catch (error) {
      console.error('Failed to track order statistics:', error);
    }

    alert('Commande passée avec succès ! Vous recevrez une confirmation par SMS.');
    setCart([]); // Clear cart after successful order
  };

  const handleAuth = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    alert('Connexion réussie ! Vous pouvez maintenant passer votre commande.');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Coffee className="h-12 w-12 text-orange-600 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement du menu...</p>
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
                <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center mr-3">
                  <Coffee className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="font-playfair text-xl font-bold text-gray-900">Breeze Fast Food</h1>
                  <p className="text-sm text-gray-600">Commande rapide et savoureuse</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Temps estimé</div>
                <div className="font-semibold text-orange-600">{estimatedTime()}</div>
              </div>
              <button className="relative bg-orange-600 text-white p-2 rounded-lg hover:bg-orange-700 transition-colors">
                <ShoppingCart size={20} />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Type Selection */}
      <div className="bg-orange-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setOrderType('pickup')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                orderType === 'pickup'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-orange-600 border border-orange-600'
              }`}
            >
              <CheckCircle size={16} className="mr-2" />
              À Emporter
            </button>
            <button
              onClick={() => setOrderType('delivery')}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                orderType === 'delivery'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-orange-600 border border-orange-600'
              }`}
            >
              <Truck size={16} className="mr-2" />
              Livraison (+500 FCFA)
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-2">
            {/* Category Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-6 p-4">
              <div className="flex overflow-x-auto space-x-4">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center px-6 py-3 rounded-lg whitespace-nowrap font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-orange-100'
                    }`}
                  >
                    <span className="text-lg mr-2">{category.emoji}</span>
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Items */}
            <div className="space-y-4">
              {filteredItems.map(item => (
                <motion.div
                  key={item.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  layout
                >
                  <div className="flex">
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {item.name}
                          {item.popular && (
                            <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                              Populaire
                            </span>
                          )}
                        </h3>
                        <span className="text-xl font-bold text-orange-600">
                          {formatPrice(item.price)} FCFA
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {item.prepTime || 10} min
                          </div>
                          {item.spiceLevel && (
                            <div className="flex items-center">
                              {'🌶️'.repeat(item.spiceLevel)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          {cart.find(cartItem => cartItem.id === item.id) ? (
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-medium w-8 text-center">
                                {cart.find(cartItem => cartItem.id === item.id)?.quantity}
                              </span>
                              <button
                                onClick={() => addToCart(item)}
                                className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center hover:bg-orange-700"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => addToCart(item)}
                              className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                            >
                              <Plus size={16} className="mr-2" />
                              Ajouter
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-32 h-32 bg-gray-200 relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Ma Commande ({getTotalItems()})
              </h2>

              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <Coffee className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Votre panier est vide</p>
                  <p className="text-sm text-gray-400 mt-1">Ajoutez des articles pour commencer</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm">{item.name}</h3>
                        <p className="text-sm text-gray-600">{formatPrice(item.price)} FCFA</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="w-6 h-6 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 text-white"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Order Summary */}
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sous-total:</span>
                      <span>{formatPrice(getTotalPrice())} FCFA</span>
                    </div>
                    {orderType === 'delivery' && (
                      <div className="flex justify-between text-sm">
                        <span>Livraison:</span>
                        <span>500 FCFA</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                      <span>Total:</span>
                      <span className="text-orange-600">
                        {formatPrice(getTotalPrice() + (orderType === 'delivery' ? 500 : 0))} FCFA
                      </span>
                    </div>
                  </div>

                  {/* Estimated Time */}
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-orange-800">Temps estimé:</span>
                      <span className="font-semibold text-orange-800">
                        {estimatedTime()}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-orange-600 text-white py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                  >
                    Passer la Commande
                  </button>
                </div>
              )}
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
        description="Vous devez être connecté pour passer une commande."
        primaryColor="bg-orange-600"
      />
    </div>
  );
}