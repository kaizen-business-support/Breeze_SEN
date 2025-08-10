// Interactive Menu Types (inspired by TASTYC)

export interface InteractiveMenuProps {
  categories: MenuCategory[];
  filters: MenuFilter[];
  sortOptions: SortOption[];
  viewMode: 'grid' | 'list' | 'cards';
}

export interface MenuItemModalProps {
  item: MenuItem;
  customizations: Customization[];
  onAddToCart: (item: MenuItem, options: any) => void;
}

// Enhanced Menu Model (TASTYC-inspired) 
export interface MenuItem {
  id: string;
  serviceId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  
  // Rich content
  images: Array<{
    url: string;
    alt: string;
    description?: string;
  }>;
  ingredients: string[];
  nutritionalInfo?: {
    calories: number;
    allergens: string[];
    dietary: string[];
  };
  
  // Dietary info
  dietaryTags: string[]; // ["vegetarian", "gluten-free", "vegan"]
  spiceLevel?: number; // 1-5
  
  // Customizations
  customizations: Array<{
    name: string;
    options: Array<{
      name: string;
      price: number;
    }>;
  }>;
  
  // Popularity tracking
  viewCount: number;
  orderCount: number;
  averageRating?: number;
  
  // Chef info
  chefId?: string;
  chef?: Chef;
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  image?: string;
  order: number;
}

export interface MenuFilter {
  id: string;
  name: string;
  type: 'checkbox' | 'range' | 'select';
  options?: string[];
  min?: number;
  max?: number;
}

export interface SortOption {
  id: string;
  name: string;
  field: string;
  direction: 'asc' | 'desc';
}

export interface Customization {
  id: string;
  name: string;
  type: 'size' | 'addon' | 'substitution';
  required: boolean;
  options: Array<{
    id: string;
    name: string;
    price: number;
  }>;
}

// Chef Model (TASTYC-inspired)
export interface Chef {
  id: string;
  name: string;
  title: string; // "Chef Exécutif", "Sous Chef"
  bio?: string;
  avatar?: string;
  specialties: string[];
  experience?: number; // Years of experience
  awards: Array<{
    name: string;
    year: number;
    description?: string;
  }>;
  socialLinks: Record<string, string>;
}