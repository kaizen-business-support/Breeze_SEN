import { ServiceType } from './colors';

export interface ServiceConfig {
  id: string;
  name: string;
  type: ServiceType;
  template: 'crsine' | 'tastyc' | 'hybrid';
  features: string[];
  bookingFlow?: 'advanced' | 'simple';
  hasMenu?: boolean;
  hasGallery?: boolean;
  hasReviews?: boolean;
}

export const serviceConfigs: Record<ServiceType, ServiceConfig> = {
  lavage: {
    id: 'lavage',
    name: 'Service Lavage',
    type: 'lavage',
    template: 'crsine',
    features: [
      'advanced-booking',
      'vehicle-form',
      'time-slots',
      'dynamic-pricing',
      'qr-tracking',
      'agent-dashboard'
    ],
    bookingFlow: 'advanced',
    hasGallery: true,
    hasReviews: true,
  },

  restaurant: {
    id: 'restaurant',
    name: 'Restaurant',
    type: 'restaurant', 
    template: 'tastyc',
    features: [
      'interactive-menu',
      'table-reservation',
      'chef-profiles',
      'testimonials',
      'opentable-integration',
      'gallery-lightbox'
    ],
    bookingFlow: 'simple',
    hasMenu: true,
    hasGallery: true,
    hasReviews: true,
  },

  fastfood: {
    id: 'fastfood',
    name: 'Fast Food',
    type: 'fastfood',
    template: 'tastyc',
    features: [
      'quick-ordering',
      'gamification',
      'real-time-tracking',
      'youth-interface',
      'mobile-optimized'
    ],
    hasMenu: true,
    hasReviews: true,
  },

  coiffure: {
    id: 'coiffure',
    name: 'Salon de Coiffure', 
    type: 'coiffure',
    template: 'crsine',
    features: [
      'appointment-booking',
      'stylist-selection',
      'service-customization',
      'before-after-gallery'
    ],
    bookingFlow: 'advanced',
    hasGallery: true,
    hasReviews: true,
  },

  boutique: {
    id: 'boutique',
    name: 'Boutique Auto',
    type: 'boutique',
    template: 'hybrid',
    features: [
      'product-catalog',
      'inventory-management', 
      'online-ordering',
      'delivery-tracking'
    ],
    hasGallery: true,
    hasReviews: true,
  },
};