'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: () => void;
  title: string;
  description: string;
  primaryColor: string;
}

export default function AuthModal({ 
  isOpen, 
  onClose, 
  onAuth, 
  title, 
  description, 
  primaryColor 
}: AuthModalProps) {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

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
      setAuthForm({ email: '', password: '', name: '', phone: '' });
      onAuth();
      console.log('Authentication successful');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'signup' : 'login');
    setAuthForm({ email: '', password: '', name: '', phone: '' });
  };

  const handleClose = () => {
    setAuthForm({ email: '', password: '', name: '', phone: '' });
    setAuthMode('login');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-playfair text-2xl font-semibold">
            {authMode === 'login' ? title : 'Créer un Compte'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-600">
            {authMode === 'login' 
              ? description
              : 'Créez votre compte pour accéder aux services.'
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            onClick={handleAuth}
            disabled={authMode === 'signup' && (!authForm.name || !authForm.phone || !authForm.email || !authForm.password)}
            className={`w-full ${primaryColor} text-white py-3 rounded-lg font-medium hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`}
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
                className="text-blue-600 cursor-pointer hover:text-blue-700 underline"
              >
                {authMode === 'login' ? 'Créer un compte' : 'Se connecter'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}