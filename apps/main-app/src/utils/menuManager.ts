interface MenuItem {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  price: number;
  isActive: boolean;
  category: string;
  image?: string;
}

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
  popular?: boolean;
  image: string;
}

// Default menu items - same as in admin dashboard
const defaultMenuItems: MenuItem[] = [
  // Restaurant Items
  {
    id: 'salade-cesar',
    serviceId: 'restaurant',
    name: 'Salade César',
    description: 'Laitue romaine, croûtons, parmesan, sauce César maison',
    price: 4500,
    isActive: true,
    category: 'entrées',
    image: 'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop'
  },
  {
    id: 'thieboudienne',
    serviceId: 'restaurant',
    name: 'Thiéboudienne',
    description: 'Riz au poisson traditionnel avec légumes locaux et sauce tomate',
    price: 8500,
    isActive: true,
    category: 'plats',
    image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop'
  },
  {
    id: 'yassa-poulet',
    serviceId: 'restaurant',
    name: 'Yassa Poulet',
    description: 'Poulet mariné aux oignons et citron, riz parfumé',
    price: 7500,
    isActive: true,
    category: 'plats',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop'
  },
  {
    id: 'mafe-agneau',
    serviceId: 'restaurant',
    name: 'Mafé d\'Agneau',
    description: 'Agneau mijoté dans une sauce d\'arachide onctueuse',
    price: 9000,
    isActive: true,
    category: 'plats',
    image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop'
  },
  {
    id: 'dibi-agneau',
    serviceId: 'restaurant',
    name: 'Dibi d\'Agneau',
    description: 'Agneau grillé aux épices, accompagné de pain et moutarde',
    price: 12000,
    isActive: true,
    category: 'grillades',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop'
  },
  {
    id: 'poisson-braise',
    serviceId: 'restaurant',
    name: 'Poisson Braisé',
    description: 'Poisson frais grillé, sauce à l\'attieké et légumes',
    price: 8000,
    isActive: true,
    category: 'poissons',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop'
  },
  {
    id: 'thiof-yassa',
    serviceId: 'restaurant',
    name: 'Thiof au Yassa',
    description: 'Mérou local aux oignons confits et riz basmati',
    price: 11000,
    isActive: true,
    category: 'poissons',
    image: 'https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=400&h=300&fit=crop'
  },
  {
    id: 'tarte-coco',
    serviceId: 'restaurant',
    name: 'Tarte à la Noix de Coco',
    description: 'Tarte artisanale à la noix de coco fraîche',
    price: 3000,
    isActive: true,
    category: 'desserts',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=300&fit=crop'
  },

  // Fast Food Items
  {
    id: 'burger-dakar',
    serviceId: 'fast-food',
    name: 'Burger Dakar',
    description: 'Burger signature avec steak de bœuf local, fromage, salade et sauce spéciale',
    price: 4500,
    isActive: true,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop'
  },
  {
    id: 'burger-dibiterie',
    serviceId: 'fast-food',
    name: 'Burger Dibiterie',
    description: 'Burger fusion avec viande grillée façon dibiterie et épices locales',
    price: 5000,
    isActive: true,
    category: 'burgers',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop'
  },
  {
    id: 'sandwich-poisson',
    serviceId: 'fast-food',
    name: 'Sandwich Poisson Braisé',
    description: 'Poisson frais grillé avec légumes et sauce yassa dans pain artisanal',
    price: 3500,
    isActive: true,
    category: 'sandwiches',
    image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop'
  },
  {
    id: 'fries-patates',
    serviceId: 'fast-food',
    name: 'Frites de Patates Douces',
    description: 'Frites croustillantes de patates douces locales avec épices',
    price: 2000,
    isActive: true,
    category: 'accompagnements',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop'
  },
  {
    id: 'bissap-frais',
    serviceId: 'fast-food',
    name: 'Bissap Frais',
    description: 'Jus d\'hibiscus traditionnel glacé avec gingembre et menthe',
    price: 1500,
    isActive: true,
    category: 'boissons',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop'
  },

  // Barbershop Services
  {
    id: 'classic-cut',
    serviceId: 'barbershop',
    name: 'Coupe Classique',
    description: 'Coupe traditionnelle adaptée à votre style et forme de visage',
    price: 3000,
    isActive: true,
    category: 'coupes',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop'
  },
  {
    id: 'modern-cut',
    serviceId: 'barbershop',
    name: 'Coupe Moderne',
    description: 'Coupe tendance avec finitions précises et styling',
    price: 4000,
    isActive: true,
    category: 'coupes',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop'
  },
  {
    id: 'beard-trim',
    serviceId: 'barbershop',
    name: 'Taille de Barbe',
    description: 'Taille et mise en forme professionnelle de la barbe',
    price: 2000,
    isActive: true,
    category: 'barbe',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop'
  },
  {
    id: 'combo-cut-beard',
    serviceId: 'barbershop',
    name: 'Coupe + Barbe',
    description: 'Service complet coupe et barbe avec finitions',
    price: 4500,
    isActive: true,
    category: 'combos',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop'
  },
  {
    id: 'hair-treatment',
    serviceId: 'barbershop',
    name: 'Soin Capillaire',
    description: 'Traitement professionnel pour cheveux et cuir chevelu',
    price: 5000,
    isActive: true,
    category: 'soins',
    image: 'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=400&h=300&fit=crop'
  },
  {
    id: 'special-styling',
    serviceId: 'barbershop',
    name: 'Coiffage Spécial',
    description: 'Coiffage pour événements spéciaux avec produits premium',
    price: 6000,
    isActive: true,
    category: 'styling',
    image: 'https://images.unsplash.com/photo-1562004760-acb5235d95dd?w=400&h=300&fit=crop'
  },

  // Car Wash Services
  {
    id: 'basic-wash',
    serviceId: 'car-wash',
    name: 'Lavage Basique',
    description: 'Lavage extérieur complet avec shampooing et rinçage',
    price: 5000,
    isActive: true,
    category: 'lavage',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
  },
  {
    id: 'premium-wash',
    serviceId: 'car-wash',
    name: 'Lavage Premium',
    description: 'Lavage complet intérieur et extérieur avec finitions',
    price: 7500,
    isActive: true,
    category: 'lavage',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop'
  },
  {
    id: 'deluxe-wash',
    serviceId: 'car-wash',
    name: 'Lavage Deluxe',
    description: 'Service premium avec traitement de protection avancé',
    price: 10000,
    isActive: true,
    category: 'lavage',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop'
  }
];

class MenuManager {
  private static readonly STORAGE_KEY = 'breeze_menu_items';

  // Get all menu items (from localStorage or defaults)
  static getAllMenuItems(): MenuItem[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
      // Initialize with defaults if nothing stored
      this.saveAllMenuItems(defaultMenuItems);
      return defaultMenuItems;
    } catch (error) {
      console.error('Error loading menu items:', error);
      return defaultMenuItems;
    }
  }

  // Get menu items for a specific service
  static getMenuItemsByService(serviceId: string): MenuItem[] {
    return this.getAllMenuItems().filter(item => item.serviceId === serviceId && item.isActive);
  }

  // Save all menu items to localStorage
  static saveAllMenuItems(items: MenuItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
      // Trigger storage event for cross-tab synchronization
      window.dispatchEvent(new StorageEvent('storage', {
        key: this.STORAGE_KEY,
        newValue: JSON.stringify(items),
        storageArea: localStorage
      }));
    } catch (error) {
      console.error('Error saving menu items:', error);
    }
  }

  // Update a single menu item
  static updateMenuItem(updatedItem: MenuItem): void {
    const allItems = this.getAllMenuItems();
    const index = allItems.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      allItems[index] = updatedItem;
      this.saveAllMenuItems(allItems);
    }
  }

  // Add a new menu item
  static addMenuItem(newItem: MenuItem): void {
    const allItems = this.getAllMenuItems();
    allItems.push(newItem);
    this.saveAllMenuItems(allItems);
  }

  // Delete a menu item
  static deleteMenuItem(itemId: string): void {
    const allItems = this.getAllMenuItems();
    const filteredItems = allItems.filter(item => item.id !== itemId);
    this.saveAllMenuItems(filteredItems);
  }

  // Convert service format to menu item format (for barbershop)
  static convertServiceToMenuItem(service: Service, serviceId: string): MenuItem {
    return {
      id: service.id,
      serviceId: serviceId,
      name: service.name,
      description: service.description,
      price: service.price,
      isActive: true,
      category: service.category,
      image: service.image
    };
  }

  // Convert menu item format to service format (for barbershop)
  static convertMenuItemToService(item: MenuItem): Service {
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      duration: 30, // Default duration
      category: item.category,
      image: item.image || ''
    };
  }

  // Reset to default menu
  static resetToDefaults(): void {
    this.saveAllMenuItems(defaultMenuItems);
  }
}

export { MenuManager, type MenuItem, type Service };