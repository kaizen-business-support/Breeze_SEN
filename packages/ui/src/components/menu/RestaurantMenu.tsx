// Restaurant Menu Component
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuItem, MenuCategory, Chef, Testimonial } from '@breeze/types';
import { cn } from '../../utils/cn';
import { Star, Filter, Grid, List } from 'lucide-react';

interface RestaurantMenuProps {
  categories: MenuCategory[];
  menuItems: MenuItem[];
  chefs: Chef[];
  testimonials: Testimonial[];
}

export function RestaurantMenu({ 
  categories, 
  menuItems = [],
  chefs, 
  testimonials 
}: RestaurantMenuProps) {
  const [activeCategory, setActiveCategory] = useState('entrées');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Menu items now come from props

  return (
    <div className="restaurant-menu">
      {/* Menu Header with parallax effect */}
      <MenuHeader className="parallax-bg">
        <h1 className="font-playfair text-4xl text-primary mb-4">Notre Menu</h1>
        <p className="text-lg text-gray-600">Cuisine gastronomique avec des produits frais</p>
      </MenuHeader>

      {/* Category Filters */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-4">
        <MenuCategoryTabs
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* View Mode Toggle */}
      <div className="flex justify-end mb-6">
        <div className="flex rounded-lg border border-gray-300">
          <button
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-2 rounded-l-lg transition-colors",
              viewMode === 'grid' 
                ? "bg-primary text-white" 
                : "bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={cn(
              "p-2 rounded-r-lg transition-colors",
              viewMode === 'list' 
                ? "bg-primary text-white" 
                : "bg-white text-gray-600 hover:bg-gray-50"
            )}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Menu Items Grid/List */}
      <MenuItemsGrid
        items={getItemsByCategory(activeCategory)}
        viewMode={viewMode}
        onItemClick={setSelectedItem}
      />

      {/* Chef Section */}
      <ChefSection chefs={chefs} className="mt-16" />

      {/* Testimonials */}
      <TestimonialsCarousel testimonials={testimonials} className="mt-16" />

      {/* Menu Item Modal */}
      <MenuItemModal 
        item={selectedItem}
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
      />
    </div>
  );

  function getItemsByCategory(category: string): MenuItem[] {
    return menuItems.filter(item => item.category === category);
  }
}

// Menu Header Component
function MenuHeader({ 
  children, 
  className 
}: { 
  children: React.ReactNode, 
  className?: string 
}) {
  return (
    <div className={cn(
      "relative h-64 flex items-center justify-center text-center",
      "bg-gradient-to-r from-primary/20 to-secondary/20",
      "before:absolute before:inset-0 before:bg-black/20",
      className
    )}>
      <div className="relative z-10 text-white">
        {children}
      </div>
    </div>
  );
}

// Category Tabs Component
function MenuCategoryTabs({ 
  categories, 
  active, 
  onChange 
}: { 
  categories: MenuCategory[], 
  active: string, 
  onChange: (category: string) => void 
}) {
  return (
    <div className="flex space-x-1 overflow-x-auto pb-2">
      {categories.map((category) => (
        <motion.button
          key={category.id}
          className={cn(
            "px-6 py-3 rounded-lg whitespace-nowrap font-medium transition-colors",
            active === category.id
              ? "bg-primary text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
          onClick={() => onChange(category.id)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {category.name}
        </motion.button>
      ))}
    </div>
  );
}

// Menu Items Grid Component
function MenuItemsGrid({ 
  items, 
  viewMode, 
  onItemClick 
}: { 
  items: MenuItem[], 
  viewMode: 'grid' | 'list', 
  onItemClick: (item: MenuItem) => void 
}) {
  return (
    <div className={cn(
      viewMode === 'grid' 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        : "space-y-4"
    )}>
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          item={item}
          layout={viewMode === 'grid' ? 'vertical' : 'horizontal'}
          onClick={() => onItemClick(item)}
        />
      ))}
    </div>
  );
}

// Menu Item Card Component
function MenuItemCard({ 
  item, 
  layout = 'vertical', 
  onClick 
}: { 
  item: MenuItem, 
  layout?: 'vertical' | 'horizontal',
  onClick?: () => void 
}) {
  return (
    <motion.div
      className={cn(
        "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden cursor-pointer",
        layout === 'horizontal' ? "flex" : ""
      )}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 20px 40px rgba(130, 83, 19, 0.15)"
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div className={cn(
        "relative overflow-hidden",
        layout === 'horizontal' ? "w-32 flex-shrink-0" : "h-48"
      )}>
        <motion.img
          src={item.images[0]?.url}
          alt={item.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating badge */}
        {item.averageRating && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="text-xs font-medium ml-1">{item.averageRating}</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
          {item.spiceLevel && (
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full mr-1",
                    i < item.spiceLevel! ? "bg-red-500" : "bg-gray-200"
                  )}
                />
              ))}
            </div>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {item.description}
        </p>

        {/* Dietary tags */}
        {item.dietaryTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {item.dietaryTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">{item.price} FCFA</span>
          
          <motion.button
            className="bg-primary text-white px-4 py-2 rounded-lg font-medium"
            whileHover={{ backgroundColor: "var(--secondary)" }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              // Add to cart logic
            }}
          >
            Commander
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// Chef Section Component
function ChefSection({ 
  chefs, 
  className 
}: { 
  chefs: Chef[], 
  className?: string 
}) {
  return (
    <section className={cn("py-16", className)}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Chefs</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Rencontrez notre équipe talentueuse de chefs passionnés
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chefs.map((chef) => (
          <ChefCard key={chef.id} chef={chef} />
        ))}
      </div>
    </section>
  );
}

// Chef Card Component
function ChefCard({ chef }: { chef: Chef }) {
  return (
    <motion.div
      className="text-center"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative mb-6">
        <img
          src={chef.avatar}
          alt={chef.name}
          className="w-32 h-32 rounded-full mx-auto object-cover"
        />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-1">{chef.name}</h3>
      <p className="text-primary font-medium mb-3">{chef.title}</p>
      
      {chef.experience && (
        <p className="text-sm text-gray-600 mb-4">
          {chef.experience} ans d'expérience
        </p>
      )}
      
      <div className="flex flex-wrap justify-center gap-2">
        {chef.specialties.slice(0, 3).map((specialty) => (
          <span
            key={specialty}
            className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
          >
            {specialty}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

// Testimonials Carousel Component
function TestimonialsCarousel({ 
  testimonials, 
  className 
}: { 
  testimonials: Testimonial[], 
  className?: string 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className={cn("py-16 bg-gray-50", className)}>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ce que disent nos clients</h2>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            {testimonials[currentIndex] && (
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Navigation dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-3 h-3 rounded-full transition-colors",
                index === currentIndex ? "bg-primary" : "bg-gray-300"
              )}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonial Card Component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              "w-5 h-5",
              i < testimonial.rating 
                ? "text-yellow-500 fill-current" 
                : "text-gray-300"
            )}
          />
        ))}
      </div>
      
      <blockquote className="text-xl text-gray-700 mb-6 italic">
        "{testimonial.content}"
      </blockquote>
      
      <div className="flex items-center justify-center">
        {testimonial.avatar && (
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-12 h-12 rounded-full mr-4"
          />
        )}
        <div>
          <p className="font-semibold text-gray-900">{testimonial.name}</p>
          {testimonial.title && (
            <p className="text-gray-600 text-sm">{testimonial.title}</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Menu Item Modal Component
function MenuItemModal({ 
  item, 
  isOpen, 
  onClose 
}: { 
  item: MenuItem | null, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  if (!item || !isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              src={item.images[0]?.url}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-4">{item.description}</p>
            
            {item.ingredients && (
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">Ingrédients</h3>
                <p className="text-gray-600">{item.ingredients.join(', ')}</p>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-3xl font-bold text-primary">{item.price} FCFA</span>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Ajouter au panier
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}