// Service-specific color palettes inspired by CRSINE & TASTYC templates
// Based on Breeze IT brand colors: #825313 (primary) and #e18e02 (secondary)

export const breezeColors = {
  // Base Breeze IT colors
  primary: '#825313',
  secondary: '#e18e02',
  
  // Service Lavage - Style CRSINE
  lavage: {
    primary: '#825313',
    secondary: '#e18e02', 
    accent: '#2563eb', // Bleu confiance
    success: '#10b981', // Vert validation
    gradient: 'linear-gradient(135deg, #825313 0%, #e18e02 100%)',
  },

  // Service Restaurant - Style TASTYC Elegant  
  restaurant: {
    primary: '#825313',
    secondary: '#d4af37', // Or plus raffiné
    accent: '#8b4513', // Brun profond
    warm: '#f4f3f0', // Fond chaleureux
    gradient: 'linear-gradient(135deg, #825313 0%, #d4af37 100%)',
  },

  // Service Fast-Food - Style TASTYC Fun
  fastfood: {
    primary: '#e18e02', // Orange dominant
    secondary: '#ff6b35', // Rouge-orange vibrant
    accent: '#ffd60a', // Jaune énergique
    fun: '#ff006e', // Rose fun
    gradient: 'linear-gradient(135deg, #e18e02 0%, #ff6b35 100%)',
  },

  // Service Coiffure - Style CRSINE adapté
  coiffure: {
    primary: '#825313',
    secondary: '#e18e02',
    accent: '#9333ea', // Violet créatif
    elegant: '#f8fafc', // Fond élégant
    gradient: 'linear-gradient(135deg, #825313 0%, #9333ea 100%)',
  },

  // Service Boutique - Hybride des deux
  boutique: {
    primary: '#825313',
    secondary: '#e18e02',
    accent: '#059669', // Vert commercial
    highlight: '#f59e0b', // Orange highlight
    gradient: 'linear-gradient(135deg, #825313 0%, #059669 100%)',
  },

  // Neutral colors
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6', 
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Status colors
  success: '#10b981',
  warning: '#f59e0b', 
  error: '#ef4444',
  info: '#3b82f6',
} as const;

export type ServiceType = 'lavage' | 'restaurant' | 'fastfood' | 'coiffure' | 'boutique';

export const getServiceColors = (service: ServiceType) => {
  return breezeColors[service];
};