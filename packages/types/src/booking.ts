// Advanced Booking Types (inspired by CRSINE)

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  price?: number;
  duration: number;
}

export interface AdvancedBookingProps {
  service: ServiceType;
  availableSlots: TimeSlot[];
  pricing: PricingRule[];
  vehicleForm?: boolean;
  tableSelection?: boolean;
}

export interface TimeSlotProps {
  date: Date;
  slots: TimeSlot[];
  onSlotSelect: (slot: TimeSlot) => void;
}

// Enhanced Booking Model (CRSINE-inspired)
export interface Reservation {
  id: string;
  userId: string;
  serviceId: string;
  scheduledAt: Date;
  status: ReservationStatus;
  
  // Vehicle details for car wash
  vehicleDetails?: {
    brand: string;
    model: string;
    type: string;
    size: string;
    color: string;
    licensePlate: string;
  };
  
  // Table preferences for restaurant
  tablePreferences?: {
    tableNumber?: number;
    location: string;
    capacity: number;
  };
  
  // Service customizations
  selectedAddons: string[];
  specialRequests?: string;
  
  // Pricing breakdown
  pricingBreakdown: {
    base: number;
    addons: number;
    multipliers: number;
    total: number;
  };
  
  // Tracking
  estimatedDuration?: number;
  actualStartTime?: Date;
  actualEndTime?: Date;
}

export type ReservationStatus = 
  | 'pending'
  | 'confirmed' 
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export interface PricingRule {
  id: string;
  condition: string;
  multiplier: number;
}

export type ServiceType = 'lavage' | 'restaurant' | 'fastfood' | 'coiffure' | 'boutique';