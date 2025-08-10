// Car Wash Booking Component
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceType, TimeSlot, AdvancedBookingProps } from '@breeze/types';
import { cn } from '../../utils/cn';

interface CarWashBookingProps extends AdvancedBookingProps {
  step: 'service' | 'vehicle' | 'datetime' | 'payment';
  services: WashService[];
  onStepChange: (step: string) => void;
}

interface WashService {
  id: string;
  name: string;
  description: string;
  pricing: number;
  duration: number;
  features: string[];
  image?: string;
}

export function CarWashBooking({ 
  step, 
  services, 
  availableSlots, 
  pricing,
  onStepChange 
}: CarWashBookingProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [vehicleDetails, setVehicleDetails] = useState({
    brand: '',
    model: '',
    type: 'sedan',
    color: '',
    licensePlate: ''
  });

  // Check if vehicle form is valid
  const isVehicleFormValid = () => {
    return vehicleDetails.brand && 
           vehicleDetails.model && 
           vehicleDetails.type && 
           vehicleDetails.color;
  };

  const steps = ['Service', 'Véhicule', 'Horaire', 'Paiement'];
  
  // Debug current step
  console.log('Current step:', step, 'Steps:', steps);

  return (
    <div className="booking-container max-w-4xl mx-auto p-6">
      {/* Step Indicator */}
      <div className="steps-indicator mb-8">
        <StepIndicator steps={steps} current={step} />
      </div>

      {/* Step Content with Animation */}
      <BookingStepTransition step={step}>
        {step === 'service' && (
          <div className="space-y-8">
            <div className="service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <ServiceCard
                  key={service.id}
                  service={service}
                  isSelected={selectedService === service.id}
                  onSelect={() => setSelectedService(service.id)}
                  className="hover-lift transition-all duration-300"
                />
              ))}
            </div>
            
            {/* Continue Button */}
            {selectedService && (
              <div className="flex justify-center">
                <button
                  onClick={() => onStepChange('vehicle')}
                  className="bg-primary text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-primary/90 transition-colors flex items-center"
                >
                  Continuer
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'vehicle' && (
          <div className="space-y-8">
            <VehicleDetailsForm
              onVehicleChange={setVehicleDetails}
              vehicleDetails={vehicleDetails}
              className="max-w-2xl mx-auto"
            />
            
            {/* Navigation Buttons */}
            <div className="flex justify-between max-w-2xl mx-auto">
              <button
                onClick={() => onStepChange('service')}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour
              </button>
              {isVehicleFormValid() && (
                <button
                  onClick={() => onStepChange('datetime')}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center"
                >
                  Continuer
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {step === 'datetime' && (
          <div className="space-y-8">
            <TimeSlotPicker
              slots={availableSlots}
              onSlotSelect={(slot) => setSelectedSlot(slot)}
              className="visual-time-picker"
            />
            
            {/* Navigation Buttons */}
            <div className="flex justify-between max-w-2xl mx-auto">
              <button
                onClick={() => onStepChange('vehicle')}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour
              </button>
              {selectedSlot && (
                <button
                  onClick={() => onStepChange('payment')}
                  className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center"
                >
                  Continuer
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-8">
            <PaymentSection 
              total={calculateTotal()}
              onPaymentComplete={() => console.log('Payment complete')}
            />
            
            {/* Back Button */}
            <div className="flex justify-start max-w-md mx-auto">
              <button
                onClick={() => onStepChange('datetime')}
                className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center"
              >
                <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour
              </button>
            </div>
          </div>
        )}
      </BookingStepTransition>
    </div>
  );

  function calculateTotal() {
    if (!selectedService) return 5000; // Default price
    
    const service = services.find(s => s.id === selectedService);
    if (!service) return 5000;
    
    // Base price from selected service
    let total = service.pricing;
    
    // Apply time slot pricing if different from base price
    if (selectedSlot && selectedSlot.price && selectedSlot.price !== service.pricing) {
      total = selectedSlot.price;
    }
    
    return total;
  }
}

// Step Indicator Component
function StepIndicator({ steps, current }: { steps: string[], current: string }) {
  // Map current step to proper index
  const stepMapping: { [key: string]: number } = {
    'service': 0,
    'vehicle': 1,
    'datetime': 2,
    'payment': 3
  };
  
  const currentIndex = stepMapping[current] ?? 0;

  return (
    <div className="flex justify-center items-center space-x-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2",
            index === currentIndex 
              ? "bg-primary text-white border-primary shadow-lg scale-110" 
              : index < currentIndex
              ? "bg-primary text-white border-primary"
              : "bg-gray-100 text-gray-400 border-gray-300"
          )}>
            {index < currentIndex ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          <div className="ml-3 text-left">
            <div className={cn(
              "text-sm font-medium transition-colors",
              index === currentIndex ? "text-primary font-bold" : 
              index < currentIndex ? "text-primary" : "text-gray-400"
            )}>
              {step}
            </div>
            <div className={cn(
              "text-xs transition-colors",
              index === currentIndex ? "text-primary/70" : 
              index < currentIndex ? "text-green-600" : "text-gray-400"
            )}>
              {index < currentIndex ? "Terminé" : index === currentIndex ? "En cours" : "À faire"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Service Card Component
function ServiceCard({ 
  service, 
  isSelected, 
  onSelect, 
  className 
}: { 
  service: WashService, 
  isSelected: boolean, 
  onSelect: () => void,
  className?: string 
}) {
  return (
    <motion.div
      className={cn(
        "border rounded-lg p-6 cursor-pointer transition-all",
        isSelected 
          ? "border-primary bg-primary/5 shadow-lg" 
          : "border-gray-200 hover:border-primary/50 hover:shadow-md",
        className
      )}
      onClick={onSelect}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {service.image && (
        <img 
          src={service.image} 
          alt={service.name}
          className="w-full h-32 object-cover rounded-md mb-4"
        />
      )}
      <h3 className="font-sans text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
      <p className="text-gray-600 text-sm mb-4">{service.description}</p>
      
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-primary">{service.pricing} FCFA</span>
        <span className="text-sm text-gray-500">{service.duration} min</span>
      </div>
      
      <ul className="mt-4 space-y-1">
        {service.features.map((feature, index) => (
          <li key={index} className="text-sm text-gray-600 flex items-center">
            <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// Booking Step Transition Component  
function BookingStepTransition({ 
  children, 
  step 
}: { 
  children: React.ReactNode, 
  step: string 
}) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="booking-step"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

// Vehicle Details Form Component
function VehicleDetailsForm({ 
  onVehicleChange, 
  vehicleDetails,
  className 
}: { 
  onVehicleChange: (details: any) => void,
  vehicleDetails: any,
  className?: string 
}) {
  const handleChange = (field: string, value: string) => {
    const newDetails = { ...vehicleDetails, [field]: value };
    onVehicleChange(newDetails);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="font-playfair text-2xl font-bold text-center text-gray-900 mb-8">
        Détails du véhicule
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2 mb-4">
          <p className="text-sm text-gray-600">
            <span className="text-red-500">*</span> Champs obligatoires
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marque <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={vehicleDetails.brand}
            onChange={(e) => handleChange('brand', e.target.value)}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
              !vehicleDetails.brand ? "border-red-300" : "border-gray-300"
            )}
            placeholder="Toyota, Mercedes, etc."
          />
          {!vehicleDetails.brand && (
            <p className="text-red-500 text-sm mt-1">La marque est obligatoire</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Modèle <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={vehicleDetails.model}
            onChange={(e) => handleChange('model', e.target.value)}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
              !vehicleDetails.model ? "border-red-300" : "border-gray-300"
            )}
            placeholder="Corolla, C-Class, etc."
          />
          {!vehicleDetails.model && (
            <p className="text-red-500 text-sm mt-1">Le modèle est obligatoire</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type de véhicule <span className="text-red-500">*</span>
          </label>
          <select
            required
            value={vehicleDetails.type}
            onChange={(e) => handleChange('type', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="sedan">Berline</option>
            <option value="suv">SUV</option>
            <option value="hatchback">Citadine</option>
            <option value="truck">Camionnette</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Couleur <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={vehicleDetails.color}
            onChange={(e) => handleChange('color', e.target.value)}
            className={cn(
              "w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent",
              !vehicleDetails.color ? "border-red-300" : "border-gray-300"
            )}
            placeholder="Blanc, Noir, Rouge, etc."
          />
          {!vehicleDetails.color && (
            <p className="text-red-500 text-sm mt-1">La couleur est obligatoire</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Plaque d'immatriculation (optionnel)
          </label>
          <input
            type="text"
            value={vehicleDetails.licensePlate}
            onChange={(e) => handleChange('licensePlate', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="DK-123-AB"
          />
        </div>
      </div>
    </div>
  );
}

// Time Slot Picker Component
function TimeSlotPicker({ 
  slots, 
  onSlotSelect,
  className 
}: { 
  slots: TimeSlot[], 
  onSlotSelect: (slot: TimeSlot) => void,
  className?: string 
}) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate next 7 days for date selection
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        id: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('fr-FR', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        fullDate: date
      });
    }
    return dates;
  };

  const availableDates = getAvailableDates();
  
  // Filter slots by selected date (for demo, we show all slots for any selected date)
  const filteredSlots = selectedDate ? slots : [];

  return (
    <div className={cn("space-y-6", className)}>
      <h2 className="font-playfair text-2xl font-bold text-center text-gray-900 mb-8">
        Choisir une date et un créneau
      </h2>
      
      {/* Date Selection */}
      <div className="space-y-4">
        <h3 className="font-sans text-lg font-semibold text-gray-800 text-center">1. Sélectionnez une date</h3>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {availableDates.map((date) => (
            <motion.button
              key={date.id}
              className={cn(
                "p-3 rounded-lg border text-center transition-colors text-sm",
                selectedDate === date.id
                  ? "border-primary bg-primary text-white shadow-md"
                  : "border-gray-300 hover:border-primary hover:bg-primary/5"
              )}
              onClick={() => {
                setSelectedDate(date.id);
                setSelectedSlot(null); // Reset slot selection when date changes
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-medium">{date.display}</div>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Time Slot Selection */}
      {selectedDate && (
        <div className="space-y-4">
          <h3 className="font-sans text-lg font-semibold text-gray-800 text-center">2. Choisissez votre créneau</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSlots.map((slot) => (
              <motion.button
                key={slot.id}
                className={cn(
                  "p-4 rounded-lg border text-center transition-colors",
                  slot.available 
                    ? selectedSlot === slot.id
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 hover:border-primary hover:bg-primary/5"
                    : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                )}
                disabled={!slot.available}
                onClick={() => {
                  if (slot.available) {
                    setSelectedSlot(slot.id);
                    onSlotSelect(slot);
                  }
                }}
                whileHover={slot.available ? { scale: 1.05 } : {}}
                whileTap={slot.available ? { scale: 0.95 } : {}}
              >
                <div className="font-medium">{slot.time}</div>
                {slot.price && (
                  <div className="text-sm mt-1">{slot.price} FCFA</div>
                )}
                <div className="text-xs mt-1">{slot.duration} min</div>
              </motion.button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Payment Section Component
function PaymentSection({ 
  total, 
  onPaymentComplete 
}: { 
  total: number, 
  onPaymentComplete: () => void 
}) {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <h2 className="font-playfair text-2xl font-bold text-center text-gray-900 mb-8">
        Paiement
      </h2>
      
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total:</span>
          <span className="text-primary">{total} FCFA</span>
        </div>
      </div>
      
      <button
        onClick={onPaymentComplete}
        className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
      >
        Confirmer la réservation
      </button>
    </div>
  );
}