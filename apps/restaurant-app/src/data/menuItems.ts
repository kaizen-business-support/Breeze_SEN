import { MenuItem } from '@breeze/types';

// Sample menu items for Breeze Restaurant
export const mockMenuItems: MenuItem[] = [
  // ENTRÉES
  {
    id: 'entree-1',
    serviceId: 'restaurant',
    name: 'Salade de Mangue au Crabe',
    description: 'Salade fraîche de mangue avec crabe local, avocat et vinaigrette aux agrumes',
    price: 8500,
    category: 'entrees',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop',
        alt: 'Salade de mangue au crabe'
      }
    ],
    ingredients: ['Mangue fraîche', 'Crabe local', 'Avocat', 'Mesclun', 'Vinaigrette aux agrumes'],
    nutritionalInfo: {
      calories: 280,
      allergens: ['Crustacés'],
      dietary: ['Sans gluten', 'Riche en protéines']
    },
    dietaryTags: ['gluten-free', 'high-protein'],
    customizations: [
      {
        name: 'Portion',
        options: [
          { name: 'Normale', price: 0 },
          { name: 'Grande', price: 2000 }
        ]
      }
    ],
    viewCount: 45,
    orderCount: 23,
    averageRating: 4.8,
    chefId: '1'
  },
  {
    id: 'entree-2', 
    serviceId: 'restaurant',
    name: 'Pastels au Poisson',
    description: 'Beignets croustillants farcis au poisson frais, épices locales et légumes',
    price: 6000,
    category: 'entrees',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=600&h=400&fit=crop',
        alt: 'Pastels au poisson'
      }
    ],
    ingredients: ['Poisson frais', 'Pâte de blé', 'Oignons', 'Épices locales', 'Persil'],
    nutritionalInfo: {
      calories: 320,
      allergens: ['Gluten', 'Poisson'],
      dietary: ['Source de protéines']
    },
    dietaryTags: ['fish'],
    spiceLevel: 2,
    customizations: [
      {
        name: 'Quantité',
        options: [
          { name: '3 pièces', price: 0 },
          { name: '5 pièces', price: 2000 }
        ]
      },
      {
        name: 'Sauce d\'accompagnement',
        options: [
          { name: 'Sauce tomate', price: 0 },
          { name: 'Sauce piquante', price: 500 }
        ]
      }
    ],
    viewCount: 67,
    orderCount: 34,
    averageRating: 4.6,
    chefId: '1'
  },

  // PLATS PRINCIPAUX
  {
    id: 'plat-1',
    serviceId: 'restaurant',
    name: 'Thiéboudienne Royal',
    description: 'Riz au poisson traditionnel avec légumes de saison et poisson frais, revisité par nos chefs',
    price: 15000,
    category: 'plats',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&h=400&fit=crop',
        alt: 'Thiéboudienne Royal'
      }
    ],
    ingredients: ['Riz jasmin', 'Poisson thiof', 'Légumes de saison', 'Concentré de tomate', 'Épices traditionnelles'],
    nutritionalInfo: {
      calories: 650,
      allergens: ['Poisson'],
      dietary: ['Sans gluten', 'Plat complet']
    },
    dietaryTags: ['gluten-free', 'traditional'],
    spiceLevel: 3,
    customizations: [
      {
        name: 'Type de poisson',
        options: [
          { name: 'Thiof', price: 0 },
          { name: 'Dorade', price: 2000 },
          { name: 'Mérou', price: 3000 }
        ]
      },
      {
        name: 'Portion',
        options: [
          { name: 'Normale', price: 0 },
          { name: 'Grande', price: 3000 }
        ]
      }
    ],
    viewCount: 89,
    orderCount: 67,
    averageRating: 4.9,
    chefId: '1'
  },
  {
    id: 'plat-2',
    serviceId: 'restaurant', 
    name: 'Yassa Poulet Fermier',
    description: 'Poulet fermier mariné aux oignons et citron, accompagné de riz parfumé',
    price: 12000,
    category: 'plats',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1598515213692-d437bbca4375?w=600&h=400&fit=crop',
        alt: 'Yassa poulet fermier'
      }
    ],
    ingredients: ['Poulet fermier', 'Oignons', 'Citron vert', 'Riz basmati', 'Moutarde', 'Épices'],
    nutritionalInfo: {
      calories: 580,
      allergens: ['Moutarde'],
      dietary: ['Sans gluten', 'Riche en protéines']
    },
    dietaryTags: ['gluten-free', 'high-protein'],
    spiceLevel: 2,
    customizations: [
      {
        name: 'Accompagnement',
        options: [
          { name: 'Riz blanc', price: 0 },
          { name: 'Riz rouge', price: 500 },
          { name: 'Attieké', price: 1000 }
        ]
      }
    ],
    viewCount: 78,
    orderCount: 56,
    averageRating: 4.7,
    chefId: '2'
  },

  // DESSERTS
  {
    id: 'dessert-1',
    serviceId: 'restaurant',
    name: 'Thiakry au Coco',
    description: 'Dessert traditionnel au mil, lait de coco et fruits tropicaux',
    price: 4500,
    category: 'desserts',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1488477304112-4944851de03d?w=600&h=400&fit=crop',
        alt: 'Thiakry au coco'
      }
    ],
    ingredients: ['Mil', 'Lait de coco', 'Fruits tropicaux', 'Vanille', 'Sucre de canne'],
    nutritionalInfo: {
      calories: 280,
      allergens: ['Noix de coco'],
      dietary: ['Végétalien', 'Sans gluten']
    },
    dietaryTags: ['vegan', 'gluten-free', 'traditional'],
    customizations: [
      {
        name: 'Garniture',
        options: [
          { name: 'Fruits de saison', price: 0 },
          { name: 'Noix de coco râpée', price: 500 }
        ]
      }
    ],
    viewCount: 34,
    orderCount: 28,
    averageRating: 4.5,
    chefId: '2'
  },
  {
    id: 'dessert-2',
    serviceId: 'restaurant',
    name: 'Tarte au Baobab',
    description: 'Tarte moderne aux fruits de baobab avec crème pâtissière vanille',
    price: 5500,
    category: 'desserts',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
        alt: 'Tarte au baobab'
      }
    ],
    ingredients: ['Pâte sablée', 'Pulpe de baobab', 'Crème pâtissière', 'Vanille', 'Fruits confits'],
    nutritionalInfo: {
      calories: 380,
      allergens: ['Gluten', 'Œufs', 'Lait'],
      dietary: ['Végétarien', 'Riche en vitamine C']
    },
    dietaryTags: ['vegetarian'],
    customizations: [
      {
        name: 'Taille',
        options: [
          { name: 'Individuelle', price: 0 },
          { name: 'À partager', price: 2000 }
        ]
      }
    ],
    viewCount: 42,
    orderCount: 31,
    averageRating: 4.8,
    chefId: '2'
  },

  // BOISSONS
  {
    id: 'boisson-1',
    serviceId: 'restaurant',
    name: 'Jus de Bissap Maison',
    description: 'Jus d\'hibiscus artisanal avec gingembre et menthe fraîche',
    price: 2500,
    category: 'boissons',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&h=400&fit=crop',
        alt: 'Jus de bissap maison'
      }
    ],
    ingredients: ['Fleurs d\'hibiscus', 'Gingembre frais', 'Menthe', 'Sucre de canne', 'Citron'],
    nutritionalInfo: {
      calories: 85,
      allergens: [],
      dietary: ['Végétalien', 'Sans gluten', 'Antioxydant']
    },
    dietaryTags: ['vegan', 'gluten-free', 'healthy'],
    customizations: [
      {
        name: 'Taille',
        options: [
          { name: 'Petit (25cl)', price: 0 },
          { name: 'Grand (50cl)', price: 1000 }
        ]
      },
      {
        name: 'Préparation',
        options: [
          { name: 'Nature', price: 0 },
          { name: 'Avec glaçons', price: 0 },
          { name: 'Frappé', price: 500 }
        ]
      }
    ],
    viewCount: 56,
    orderCount: 43,
    averageRating: 4.6
  },
  {
    id: 'boisson-2',
    serviceId: 'restaurant',
    name: 'Cocktail Baobab Sunset',
    description: 'Cocktail signature au jus de baobab, rhum blanc et fruits tropicaux',
    price: 7500,
    category: 'boissons',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&h=400&fit=crop',
        alt: 'Cocktail Baobab Sunset'
      }
    ],
    ingredients: ['Rhum blanc', 'Jus de baobab', 'Mangue', 'Ananas', 'Sirop de canne', 'Citron vert'],
    nutritionalInfo: {
      calories: 220,
      allergens: ['Alcool'],
      dietary: ['Cocktail signature']
    },
    dietaryTags: ['cocktail', 'signature'],
    customizations: [
      {
        name: 'Force',
        options: [
          { name: 'Classique', price: 0 },
          { name: 'Double rhum', price: 2000 }
        ]
      }
    ],
    viewCount: 38,
    orderCount: 29,
    averageRating: 4.9
  }
];