'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  statisticsService, 
  getSalesRegister, 
  getFilteredSalesRegister, 
  getSalesRegisterSummary, 
  SalesFilterOptions, 
  SaleRecord 
} from '../../utils/statistics';
import { MenuManager, type MenuItem as MenuManagerItem } from '../../utils/menuManager';
import { 
  BarChart3,
  Users,
  Settings,
  Shield,
  Car,
  Utensils,
  Coffee,
  Scissors,
  Edit3,
  Trash2,
  Plus,
  Upload,
  Save,
  X,
  Eye,
  EyeOff,
  UserCheck,
  UserX,
  DollarSign,
  Clock,
  TrendingUp,
  Award,
  Activity,
  FileText,
  Filter,
  LogOut,
  UserPlus,
  Building2,
  Database,
  Image
} from 'lucide-react';

interface Service {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  isActive: boolean;
  totalOrders: number;
  revenue: number;
  averageRating: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'cashier' | 'admin';
  service?: string;
  isActive: boolean;
  joinedDate: string;
  totalOrders: number;
  loyaltyPoints: number;
}

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

const mockServices: Service[] = [
  {
    id: 'car-wash',
    name: 'Lavage Auto',
    description: 'Service de lavage automobile professionnel',
    icon: Car,
    color: 'bg-blue-600',
    isActive: true,
    totalOrders: 156,
    revenue: 780000,
    averageRating: 4.8
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    description: 'Cuisine gastronomique avec produits locaux',
    icon: Utensils,
    color: 'bg-amber-600',
    isActive: true,
    totalOrders: 234,
    revenue: 3510000,
    averageRating: 4.9
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    description: 'Restauration rapide et savoureuse',
    icon: Coffee,
    color: 'bg-orange-600',
    isActive: false,
    totalOrders: 0,
    revenue: 0,
    averageRating: 0
  },
  {
    id: 'barbershop',
    name: 'Coiffure',
    description: 'Services de coiffure et soins capillaires',
    icon: Scissors,
    color: 'bg-purple-600',
    isActive: false,
    totalOrders: 0,
    revenue: 0,
    averageRating: 0
  }
];

const mockUsers: User[] = [
  // Test clients
  {
    id: '1',
    name: 'Amadou Diallo',
    email: 'amadou@email.com',
    phone: '+221 78 604 27 27',
    role: 'customer',
    isActive: true,
    joinedDate: '2025-01-15',
    totalOrders: 12,
    loyaltyPoints: 1250
  },
  {
    id: '2',
    name: 'Fatou Sarr',
    email: 'fatou.customer@email.com',
    phone: '+221 76 987 65 43',
    role: 'customer',
    isActive: true,
    joinedDate: '2024-12-01',
    totalOrders: 8,
    loyaltyPoints: 850
  },
  {
    id: '3',
    name: 'Moussa Ba',
    email: 'moussa@email.com',
    phone: '+221 78 555 44 33',
    role: 'customer',
    isActive: true,
    joinedDate: '2024-11-15',
    totalOrders: 15,
    loyaltyPoints: 1950
  },
  {
    id: '4',
    name: 'Aïcha Ndiaye',
    email: 'aicha@email.com',
    phone: '+221 77 888 99 00',
    role: 'customer',
    isActive: true,
    joinedDate: '2024-10-10',
    totalOrders: 6,
    loyaltyPoints: 620
  },
  // Test admin
  {
    id: 'emp-1',
    name: 'Admin Principal',
    email: 'admin@breeze.sn',
    phone: '+221 33 123 45 67',
    role: 'admin',
    isActive: true,
    joinedDate: '2023-01-01',
    totalOrders: 0,
    loyaltyPoints: 0
  },
  // Test employees (cashiers)
  {
    id: 'emp-2',
    name: 'Caissier Lavage',
    email: 'cashier.carwash@breeze.sn',
    phone: '+221 77 234 56 78',
    role: 'cashier',
    service: 'car-wash',
    isActive: true,
    joinedDate: '2023-06-15',
    totalOrders: 0,
    loyaltyPoints: 0
  },
  {
    id: 'emp-3',
    name: 'Caissier Restaurant',
    email: 'cashier.restaurant@breeze.sn',
    phone: '+221 76 345 67 89',
    role: 'cashier',
    service: 'restaurant',
    isActive: true,
    joinedDate: '2023-07-01',
    totalOrders: 0,
    loyaltyPoints: 0
  },
  {
    id: 'emp-4',
    name: 'Caissier Fast Food',
    email: 'cashier.fastfood@breeze.sn',
    phone: '+221 78 456 78 90',
    role: 'cashier',
    service: 'fast-food',
    isActive: true,
    joinedDate: '2023-08-15',
    totalOrders: 0,
    loyaltyPoints: 0
  },
  {
    id: 'emp-5',
    name: 'Caissier Coiffure',
    email: 'cashier.barbershop@breeze.sn',
    phone: '+221 77 567 89 01',
    role: 'cashier',
    service: 'barbershop',
    isActive: true,
    joinedDate: '2023-09-01',
    totalOrders: 0,
    loyaltyPoints: 0
  },
  {
    id: 'emp-6',
    name: 'Caissier Multi-Services',
    email: 'cashier.multi@breeze.sn',
    phone: '+221 76 678 90 12',
    role: 'cashier',
    service: 'car-wash, fast-food',
    isActive: true,
    joinedDate: '2023-10-15',
    totalOrders: 0,
    loyaltyPoints: 0
  }
];

const mockMenuItems: MenuItem[] = [
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

// Function to load all users from localStorage and combine with mock data
const loadAllUsers = (): User[] => {
  try {
    // Get users created via registration
    const registeredUsers = JSON.parse(localStorage.getItem('breeze_users') || '[]');
    
    // Convert registered users to admin User format
    const convertedUsers: User[] = registeredUsers.map((user: any) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: 'customer' as const,
      isActive: true,
      joinedDate: user.joinedDate,
      totalOrders: user.totalOrders || 0,
      loyaltyPoints: user.loyaltyPoints || 0
    }));

    // Combine mock employees with registered customers
    // Keep mock users (employees) and add registered users (customers)
    const combinedUsers = [...mockUsers];
    
    // Add registered users, avoiding duplicates by ID
    convertedUsers.forEach(regUser => {
      if (!combinedUsers.find(existing => existing.id === regUser.id)) {
        combinedUsers.push(regUser);
      }
    });

    return combinedUsers;
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
    return mockUsers; // Fallback to mock data
  }
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'clients' | 'employees' | 'menu' | 'logs' | 'sales' | 'settings'>('overview');
  const [services, setServices] = useState<Service[]>(mockServices);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditingMenuItem, setIsEditingMenuItem] = useState(false);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [activityLogs, setActivityLogs] = useState<any[]>([]);
  const [realTimeStats, setRealTimeStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    averageRating: 5.0
  });
  const [logFilter, setLogFilter] = useState<'all' | 'customers' | 'employees' | 'system'>('all');
  
  // Sales Register State
  const [salesData, setSalesData] = useState<SaleRecord[]>([]);
  const [salesFilters, setSalesFilters] = useState<SalesFilterOptions>({});
  const [filteredSales, setFilteredSales] = useState<SaleRecord[]>([]);
  const [salesSummary, setSalesSummary] = useState<any>(null);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [menuServiceFilter, setMenuServiceFilter] = useState<string>('all');

  useEffect(() => {
    // Set mounted to true and load client-side data
    setMounted(true);
    
    // Load users from localStorage on client side
    setUsers(loadAllUsers());
    
    // Load menu items from MenuManager
    setMenuItems(MenuManager.getAllMenuItems());
    
    // Load real-time statistics and activity logs
    try {
      const stats = statisticsService.getStatistics();
      const logs = statisticsService.getActivityLogs();
      
      setRealTimeStats({
        totalRevenue: stats.totalRevenue,
        totalOrders: stats.totalOrders,
        totalCustomers: stats.totalCustomers,
        averageRating: stats.averageRating
      });
      setActivityLogs(logs);
      
      // Load sales data
      const sales = getSalesRegister();
      setSalesData(sales);
      setFilteredSales(sales);
      setSalesSummary(getSalesRegisterSummary(sales));

      // Update every 30 seconds for real-time updates
      const interval = setInterval(() => {
        const updatedStats = statisticsService.getStatistics();
        const updatedLogs = statisticsService.getActivityLogs();
        
        setRealTimeStats({
          totalRevenue: updatedStats.totalRevenue,
          totalOrders: updatedStats.totalOrders,
          totalCustomers: updatedStats.totalCustomers,
          averageRating: updatedStats.averageRating
        });
        setActivityLogs(updatedLogs);
        
        // Update sales data
        const updatedSales = getSalesRegister();
        setSalesData(updatedSales);
        const currentFilters = {
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          employeeIds: selectedEmployees.length > 0 ? selectedEmployees : undefined,
          services: selectedServices.length > 0 ? selectedServices : undefined,
          paymentMethods: selectedPaymentMethods.length > 0 ? selectedPaymentMethods : undefined
        };
        const filtered = getFilteredSalesRegister(currentFilters);
        setFilteredSales(filtered);
        setSalesSummary(getSalesRegisterSummary(filtered));
        
        // Refresh user list to include new registrations
        setUsers(loadAllUsers());
      }, 30000);

      return () => clearInterval(interval);
    } catch (error) {
      console.error('Failed to load admin statistics:', error);
    }
  }, []);

  const totalRevenue = realTimeStats.totalRevenue;
  const totalOrders = realTimeStats.totalOrders;
  const activeUsers = users.filter(user => user.isActive).length;
  const averageRating = realTimeStats.averageRating;

  const handleUserStatusToggle = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ));
  };

  const handleServiceToggle = (serviceId: string) => {
    setServices(services.map(service => 
      service.id === serviceId ? { ...service, isActive: !service.isActive } : service
    ));
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: '',
      email: '',
      phone: '',
      role: 'customer',
      isActive: true,
      joinedDate: new Date().toISOString().split('T')[0],
      totalOrders: 0,
      loyaltyPoints: 0
    };
    setEditingUser(newUser);
    setIsEditingUser(true);
  };

  const handleSaveUser = () => {
    if (!editingUser) return;
    
    if (editingUser.id.startsWith('user-')) {
      setUsers([...users, editingUser]);
    } else {
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
    }
    
    setIsEditingUser(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleAddMenuItem = () => {
    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      serviceId: 'restaurant',
      name: '',
      description: '',
      price: 0,
      isActive: true,
      category: 'plat'
    };
    setEditingMenuItem(newItem);
    setIsEditingMenuItem(true);
  };

  const handleSaveMenuItem = () => {
    if (!editingMenuItem) return;
    
    if (editingMenuItem.id.startsWith('item-')) {
      // Adding new item
      MenuManager.addMenuItem(editingMenuItem);
    } else {
      // Updating existing item
      MenuManager.updateMenuItem(editingMenuItem);
    }
    
    // Reload menu items from storage
    setMenuItems(MenuManager.getAllMenuItems());
    
    setIsEditingMenuItem(false);
    setEditingMenuItem(null);
  };

  // Sales filtering functions
  const applySalesFilters = () => {
    const filters: SalesFilterOptions = {};
    
    if (startDate) filters.startDate = new Date(startDate);
    if (endDate) filters.endDate = new Date(endDate + 'T23:59:59'); // Include full day
    if (selectedEmployees.length > 0) filters.employeeIds = selectedEmployees;
    if (selectedServices.length > 0) filters.services = selectedServices;
    if (selectedPaymentMethods.length > 0) filters.paymentMethods = selectedPaymentMethods;
    
    const filtered = getFilteredSalesRegister(filters);
    setFilteredSales(filtered);
    setSalesSummary(getSalesRegisterSummary(filtered));
  };

  const clearSalesFilters = () => {
    setStartDate('');
    setEndDate('');
    setSelectedEmployees([]);
    setSelectedServices([]);
    setSelectedPaymentMethods([]);
    setFilteredSales(salesData);
    setSalesSummary(getSalesRegisterSummary(salesData));
  };

  const handleLogout = () => {
    if (confirm('Êtes-vous sûr de vouloir vous déconnecter?')) {
      localStorage.removeItem('breeze_employee_token');
      window.location.href = '/employee';
    }
  };

  const clearDatabase = () => {
    if (confirm('ATTENTION: Cette action supprimera toutes les données de test. Êtes-vous sûr de vouloir continuer?')) {
      const confirmSecond = confirm('Cette action est irréversible. Confirmer la suppression de toutes les données?');
      if (confirmSecond) {
        // Clear all localStorage data
        const keysToKeep = ['breeze_employee_token']; // Keep admin session
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('breeze_') && !keysToKeep.includes(key)) {
            localStorage.removeItem(key);
          }
        });
        
        // Reset menu items to defaults
        MenuManager.resetToDefaults();
        
        alert('Base de données effacée avec succès. Rechargement de la page...');
        window.location.reload();
      }
    }
  };

  // Get unique employees and services from sales data
  const uniqueEmployees = salesData.length > 0 
    ? Array.from(new Set(salesData.map(sale => sale.cashierId)))
        .map(id => {
          const sale = salesData.find(s => s.cashierId === id);
          return { id, name: sale?.cashierName || id };
        })
    : [
        { id: 'emp-2', name: 'Caissier Lavage' },
        { id: 'emp-3', name: 'Caissier Restaurant' },
        { id: 'emp-4', name: 'Caissier Fast Food' },
        { id: 'emp-5', name: 'Caissier Coiffure' },
        { id: 'emp-6', name: 'Caissier Multi-Services' }
      ];

  const uniqueServices = salesData.length > 0 
    ? Array.from(new Set(salesData.map(sale => sale.service)))
    : ['car-wash', 'restaurant', 'fast-food', 'barbershop'];
    
  const paymentMethods = ['cash', 'card', 'mobile'];

  const filteredLogs = logFilter === 'all' 
    ? activityLogs 
    : activityLogs.filter(log => 
        logFilter === 'customers' ? log.userType === 'customer' :
        logFilter === 'employees' ? log.userType === 'cashier' || log.userType === 'admin' :
        logFilter === 'system' ? log.type === 'system_event' :
        false
      );

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement du tableau de bord...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <div>
                <h1 className="font-playfair text-2xl font-bold text-gray-900">
                  Administration Breeze
                </h1>
                <p className="text-sm text-gray-600">Gestion complète de la plateforme</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Administrateur</div>
                <div className="font-semibold text-gray-900">Super Admin</div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Se déconnecter"
              >
                <LogOut size={16} className="mr-1" />
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards - Always visible */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Revenus Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalRevenue.toLocaleString()} FCFA
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Commandes</p>
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Utilisateurs Actifs</p>
                <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Note Moyenne</p>
                <p className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}/5</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { id: 'overview', name: 'Aperçu', icon: BarChart3 },
                { id: 'services', name: 'Services', icon: Settings },
                { id: 'clients', name: 'Clients', icon: Users },
                { id: 'employees', name: 'Employés', icon: Building2 },
                { id: 'menu', name: 'Menu/Produits', icon: Utensils },
                { id: 'logs', name: 'Journaux', icon: Activity },
                { id: 'sales', name: 'Registre des Ventes', icon: FileText },
                { id: 'settings', name: 'Paramètres', icon: Shield }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center px-6 py-4 text-sm font-medium border-b-2 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon size={16} className="mr-2" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="font-playfair text-xl font-semibold">Vue d'ensemble</h2>
                
                {/* Services Performance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(service => (
                    <div key={service.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center mb-4">
                        <div className={`w-10 h-10 ${service.color} rounded-full flex items-center justify-center mr-4`}>
                          <service.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <p className={`text-sm ${service.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {service.isActive ? 'Actif' : 'Inactif'}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-semibold text-gray-900">{service.totalOrders}</div>
                          <div className="text-xs text-gray-600">Commandes</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-gray-900">
                            {service.revenue.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-600">FCFA</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-gray-900">{service.averageRating}</div>
                          <div className="text-xs text-gray-600">Note</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Services Tab */}
            {activeTab === 'services' && (
              <div className="space-y-6">
                <h2 className="font-playfair text-xl font-semibold">Gestion des Services</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map(service => (
                    <div key={service.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className={`w-10 h-10 ${service.color} rounded-full flex items-center justify-center mr-4`}>
                            <service.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{service.name}</h3>
                            <p className="text-sm text-gray-600">{service.description}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleServiceToggle(service.id)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            service.isActive
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {service.isActive ? 'Désactiver' : 'Activer'}
                        </button>
                      </div>
                      
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{service.totalOrders} commandes</span>
                        <span>{service.revenue.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clients Tab */}
            {activeTab === 'clients' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-playfair text-xl font-semibold">Gestion des Clients</h2>
                  <button
                    onClick={() => {
                      const newUser: User = {
                        id: `user-${Date.now()}`,
                        name: '',
                        email: '',
                        phone: '',
                        role: 'customer',
                        isActive: true,
                        joinedDate: new Date().toISOString().split('T')[0],
                        totalOrders: 0,
                        loyaltyPoints: 0
                      };
                      setEditingUser(newUser);
                      setIsEditingUser(true);
                    }}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                  >
                    <UserPlus size={16} className="mr-2" />
                    Nouveau Client
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Client
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Commandes
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Points Fidélité
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.filter(user => user.role === 'customer').map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                              <div className="text-sm text-gray-500">{user.phone}</div>
                              <div className="text-xs text-gray-400">Inscrit le {user.joinedDate}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="font-semibold">{user.totalOrders}</div>
                            <div className="text-xs text-gray-500">commandes</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="font-semibold text-primary">{user.loyaltyPoints}</div>
                            <div className="text-xs text-gray-500">points</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button
                              onClick={() => {
                                setEditingUser(user);
                                setIsEditingUser(true);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                              title="Modifier"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleUserStatusToggle(user.id)}
                              className={`${user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                              title={user.isActive ? 'Désactiver' : 'Activer'}
                            >
                              {user.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            <button
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Employees Tab */}
            {activeTab === 'employees' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-playfair text-xl font-semibold">Gestion des Employés</h2>
                  <button
                    onClick={() => {
                      const newUser: User = {
                        id: `emp-${Date.now()}`,
                        name: '',
                        email: '',
                        phone: '',
                        role: 'cashier',
                        isActive: true,
                        joinedDate: new Date().toISOString().split('T')[0],
                        totalOrders: 0,
                        loyaltyPoints: 0
                      };
                      setEditingUser(newUser);
                      setIsEditingUser(true);
                    }}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Nouvel Employé
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Employé
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rôle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Service(s)
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.filter(user => user.role === 'admin' || user.role === 'cashier').map(user => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                              <div className="text-sm text-gray-500">{user.phone}</div>
                              <div className="text-xs text-gray-400">Embauché le {user.joinedDate}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.role === 'admin' ? 'bg-red-100 text-red-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {user.role === 'admin' ? 'Administrateur' : 'Caissier'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {user.service ? (
                              <div className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {user.service}
                              </div>
                            ) : (
                              <span className="text-gray-500 text-xs">Tous services</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button
                              onClick={() => {
                                setEditingUser(user);
                                setIsEditingUser(true);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                              title="Modifier"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button
                              onClick={() => handleUserStatusToggle(user.id)}
                              className={`${user.isActive ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                              title={user.isActive ? 'Désactiver' : 'Activer'}
                            >
                              {user.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                            {user.role !== 'admin' && (
                              <button
                                onClick={() => handleDeleteUser(user.id)}
                                className="text-red-600 hover:text-red-900"
                                title="Supprimer"
                              >
                                <Trash2 size={16} />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Menu Tab */}
            {activeTab === 'menu' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-playfair text-xl font-semibold">Gestion du Menu</h2>
                  <button
                    onClick={handleAddMenuItem}
                    className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                  >
                    <Plus size={16} className="mr-2" />
                    Nouvel Article
                  </button>
                </div>

                {/* Service Filter */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-4">
                    <label className="block text-sm font-medium text-gray-700">Filtrer par service:</label>
                    <select
                      value={menuServiceFilter}
                      onChange={(e) => setMenuServiceFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="all">Tous les services</option>
                      <option value="restaurant">Restaurant</option>
                      <option value="fast-food">Fast Food</option>
                      <option value="barbershop">Coiffure</option>
                      <option value="car-wash">Lavage Auto</option>
                    </select>
                    <span className="text-sm text-gray-600">
                      {menuServiceFilter === 'all' 
                        ? `${menuItems.length} articles au total`
                        : `${menuItems.filter(item => item.serviceId === menuServiceFilter).length} articles`
                      }
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuItems
                    .filter(item => menuServiceFilter === 'all' || item.serviceId === menuServiceFilter)
                    .map(item => (
                    <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      {item.image ? (
                        <div className="relative group">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-32 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-white bg-opacity-90 rounded-full p-2">
                                <Image size={16} className="text-gray-600" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-32 bg-gray-100 flex items-center justify-center border-b border-gray-200">
                          <div className="text-center">
                            <Image size={24} className="text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-500">Pas d'image</p>
                          </div>
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold text-gray-900">{item.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                item.serviceId === 'restaurant' ? 'bg-amber-100 text-amber-800' :
                                item.serviceId === 'fast-food' ? 'bg-orange-100 text-orange-800' :
                                item.serviceId === 'barbershop' ? 'bg-purple-100 text-purple-800' :
                                item.serviceId === 'car-wash' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {item.serviceId === 'restaurant' ? 'Restaurant' :
                                 item.serviceId === 'fast-food' ? 'Fast Food' :
                                 item.serviceId === 'barbershop' ? 'Coiffure' :
                                 item.serviceId === 'car-wash' ? 'Lavage' : item.serviceId}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                            <div className="text-xs text-gray-500 mb-2">
                              Catégorie: {(() => {
                                // Convert category value to display label
                                const categoryLabels: Record<string, string> = {
                                  // Restaurant
                                  'entrées': 'Entrées',
                                  'plats': 'Plats principaux',
                                  'grillades': 'Grillades',
                                  'poissons': 'Poissons',
                                  'desserts': 'Desserts',
                                  'boissons': 'Boissons',
                                  'salades': 'Salades',
                                  // Fast Food
                                  'burgers': 'Burgers',
                                  'sandwiches': 'Sandwichs',
                                  'accompagnements': 'Accompagnements',
                                  'snacks': 'Snacks',
                                  // Barbershop
                                  'coupes': 'Coupes de cheveux',
                                  'barbe': 'Soins de barbe',
                                  'combos': 'Forfaits combinés',
                                  'soins': 'Soins capillaires',
                                  'styling': 'Coiffage & Styling',
                                  'coloration': 'Coloration',
                                  // Car Wash
                                  'lavage': 'Services de lavage',
                                  'detailing': 'Détailing complet',
                                  'cire': 'Cirage & Protection',
                                  'interieur': 'Nettoyage intérieur',
                                  'premium': 'Services premium'
                                };
                                return categoryLabels[item.category] || item.category;
                              })()}
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {item.isActive ? 'Actif' : 'Inactif'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-primary">{item.price.toLocaleString()} FCFA</span>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingMenuItem(item);
                                setIsEditingMenuItem(true);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                              title="Modifier"
                            >
                              <Edit3 size={16} />
                            </button>
                            <button 
                              onClick={() => {
                                if (confirm('Êtes-vous sûr de vouloir supprimer cet article?')) {
                                  MenuManager.deleteMenuItem(item.id);
                                  setMenuItems(MenuManager.getAllMenuItems());
                                }
                              }}
                              className="text-red-600 hover:text-red-900"
                              title="Supprimer"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {menuItems.filter(item => menuServiceFilter === 'all' || item.serviceId === menuServiceFilter).length === 0 && (
                  <div className="text-center py-12">
                    <Utensils className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Aucun article trouvé pour ce service</p>
                  </div>
                )}
              </div>
            )}

            {/* Sales Register Tab */}
            {activeTab === 'sales' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-playfair text-xl font-semibold">Registre des Ventes</h2>
                  <button
                    onClick={clearSalesFilters}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Réinitialiser Filtres
                  </button>
                </div>

                {/* Filters */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Filtres</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {/* Date Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Début</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Fin</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    
                    {/* Employee Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Employé</label>
                      <select
                        value={selectedEmployees[0] || ''}
                        onChange={(e) => setSelectedEmployees(e.target.value ? [e.target.value] : [])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="">Tous les employés</option>
                        {uniqueEmployees.map(emp => (
                          <option key={emp.id} value={emp.id}>{emp.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Service Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Service</label>
                      <select
                        value={selectedServices[0] || ''}
                        onChange={(e) => setSelectedServices(e.target.value ? [e.target.value] : [])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="">Tous les services</option>
                        {uniqueServices.map(service => (
                          <option key={service} value={service}>
                            {service === 'car-wash' ? 'Lavage Auto' :
                             service === 'restaurant' ? 'Restaurant' :
                             service === 'fast-food' ? 'Fast Food' :
                             service === 'barbershop' ? 'Coiffure' : service}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    {/* Payment Method Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Paiement</label>
                      <select
                        value={selectedPaymentMethods[0] || ''}
                        onChange={(e) => setSelectedPaymentMethods(e.target.value ? [e.target.value] : [])}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="">Tous les paiements</option>
                        {paymentMethods.map(method => (
                          <option key={method} value={method}>
                            {method === 'cash' ? 'Espèces' :
                             method === 'card' ? 'Carte' :
                             method === 'mobile' ? 'Mobile Money' : method}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={applySalesFilters}
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Appliquer Filtres
                    </button>
                  </div>
                </div>

                {/* Summary Cards */}
                {salesSummary && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-sm text-gray-600">Total Ventes</div>
                      <div className="text-2xl font-bold text-primary">{salesSummary.totalSales}</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-sm text-gray-600">Chiffre d'Affaires</div>
                      <div className="text-2xl font-bold text-green-600">{salesSummary.totalRevenue.toLocaleString()} FCFA</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-sm text-gray-600">Panier Moyen</div>
                      <div className="text-2xl font-bold text-blue-600">{Math.round(salesSummary.averageTransaction).toLocaleString()} FCFA</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="text-sm text-gray-600">Période</div>
                      <div className="text-lg font-bold text-gray-900">
                        {startDate && endDate ? `${startDate} → ${endDate}` : 'Toutes dates'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Sales List */}
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900">
                      Détail des Ventes ({filteredSales.length} transactions)
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Transaction
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Caissier
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Client
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Service
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Articles
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Paiement
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date/Heure
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSales.slice(0, 100).map((sale) => (
                          <tr key={sale.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {sale.transactionId}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div>{sale.cashierName}</div>
                              <div className="text-xs text-gray-500">{sale.cashierId}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div>{sale.customerName}</div>
                              <div className="text-xs text-gray-500">{sale.customerPhone}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                sale.service === 'car-wash' ? 'bg-blue-100 text-blue-800' :
                                sale.service === 'restaurant' ? 'bg-amber-100 text-amber-800' :
                                sale.service === 'fast-food' ? 'bg-orange-100 text-orange-800' :
                                sale.service === 'barbershop' ? 'bg-purple-100 text-purple-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {sale.service === 'car-wash' ? 'Lavage Auto' :
                                 sale.service === 'restaurant' ? 'Restaurant' :
                                 sale.service === 'fast-food' ? 'Fast Food' :
                                 sale.service === 'barbershop' ? 'Coiffure' : sale.service}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              <div className="max-w-xs">
                                {sale.items.slice(0, 2).map(item => (
                                  <div key={item.name} className="text-xs">
                                    {item.name} x{item.quantity}
                                  </div>
                                ))}
                                {sale.items.length > 2 && (
                                  <div className="text-xs text-gray-500">
                                    +{sale.items.length - 2} autres
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                              {sale.total.toLocaleString()} FCFA
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                sale.paymentMethod === 'cash' ? 'bg-green-100 text-green-800' :
                                sale.paymentMethod === 'card' ? 'bg-blue-100 text-blue-800' :
                                sale.paymentMethod === 'mobile' ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {sale.paymentMethod === 'cash' ? 'Espèces' :
                                 sale.paymentMethod === 'card' ? 'Carte' :
                                 sale.paymentMethod === 'mobile' ? 'Mobile Money' : sale.paymentMethod}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div>{sale.timestamp.toLocaleDateString('fr-FR')}</div>
                              <div className="text-xs text-gray-500">{sale.timestamp.toLocaleTimeString('fr-FR')}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {filteredSales.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Aucune vente trouvée avec ces critères</p>
                    </div>
                  )}
                  
                  {filteredSales.length > 100 && (
                    <div className="px-6 py-4 bg-gray-50 border-t">
                      <p className="text-sm text-gray-500 text-center">
                        Affichage des 100 premières ventes sur {filteredSales.length} total
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="font-playfair text-xl font-semibold">Paramètres Système</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Configuration Générale</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom de la Plateforme
                        </label>
                        <input
                          type="text"
                          defaultValue="Breeze"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email de Contact
                        </label>
                        <input
                          type="email"
                          defaultValue="contact@breeze.sn"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Préférences</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Mode Maintenance</span>
                        <button className="bg-gray-300 rounded-full w-12 h-6 relative">
                          <div className="bg-white w-5 h-5 rounded-full absolute left-0.5 top-0.5"></div>
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Notifications Email</span>
                        <button className="bg-primary rounded-full w-12 h-6 relative">
                          <div className="bg-white w-5 h-5 rounded-full absolute right-0.5 top-0.5"></div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Database Management Section */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <Database className="h-6 w-6 text-red-600 mr-3" />
                    <h3 className="font-semibold text-red-900">Gestion de la Base de Données</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <span className="text-yellow-600 text-lg">⚠️</span>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-yellow-800">Zone de Danger</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Cette section permet de nettoyer complètement la base de données de test. 
                            Utilisez uniquement pour passer en mode production.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={clearDatabase}
                        className="w-full bg-red-600 text-white px-4 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center font-semibold"
                      >
                        <Database size={16} className="mr-2" />
                        Effacer Toutes les Données de Test
                      </button>
                      
                      <div className="text-sm text-gray-600">
                        <p><strong>Cette action supprimera :</strong></p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                          <li>Tous les comptes clients créés via l'inscription</li>
                          <li>Toutes les réservations et commandes</li>
                          <li>Tous les journaux d'activité</li>
                          <li>Toutes les ventes enregistrées</li>
                          <li>Toutes les statistiques d'utilisation</li>
                          <li>Tous les profils utilisateur personnalisés</li>
                        </ul>
                        <p className="mt-3 text-red-600 font-medium">
                          ⚠️ Cette action est irréversible ! Les comptes employés (admin et caissiers) seront préservés.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Logs Tab */}
            {activeTab === 'logs' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="font-playfair text-xl font-semibold">Journaux d'Activité</h2>
                  <div className="flex items-center space-x-2">
                    <Filter size={16} className="text-gray-500" />
                    <select
                      value={logFilter}
                      onChange={(e) => setLogFilter(e.target.value as any)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="all">Tous les logs</option>
                      <option value="customers">Clients</option>
                      <option value="employees">Employés</option>
                      <option value="system">Système</option>
                    </select>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-3">
                    {activityLogs
                      .filter(log => {
                        if (logFilter === 'all') return true;
                        if (logFilter === 'customers') return log.userType === 'customer';
                        if (logFilter === 'employees') return log.userType === 'cashier' || log.userType === 'admin';
                        if (logFilter === 'system') return log.type === 'system_event';
                        return true;
                      })
                      .slice(0, 50) // Show only latest 50 logs
                      .map(log => (
                        <div key={log.id} className="bg-white rounded-lg p-4 border-l-4 border-l-blue-500">
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  log.userType === 'customer' ? 'bg-green-100 text-green-800' :
                                  log.userType === 'admin' ? 'bg-red-100 text-red-800' :
                                  log.userType === 'cashier' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {log.userType === 'customer' ? 'Client' :
                                   log.userType === 'admin' ? 'Admin' :
                                   log.userType === 'cashier' ? 'Caissier' : 'Système'}
                                </span>
                                {log.service && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                                    {log.service}
                                  </span>
                                )}
                                <span className="text-xs text-gray-500">
                                  ID: {log.userId}
                                </span>
                              </div>
                              <div className="text-sm font-medium text-gray-900 mb-1">
                                Action: {log.action}
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                {log.details}
                              </div>
                              {log.ipAddress && (
                                <div className="text-xs text-gray-500">
                                  IP: {log.ipAddress}
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-500 text-right">
                              <div>{new Date(log.timestamp).toLocaleDateString('fr-FR')}</div>
                              <div>{new Date(log.timestamp).toLocaleTimeString('fr-FR')}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>

                  {activityLogs.length === 0 && (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Aucun log d'activité disponible</p>
                    </div>
                  )}

                  {activityLogs.length > 50 && (
                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-500">
                        Affichage des 50 derniers logs sur {activityLogs.length} total
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Edit Modal */}
      {isEditingUser && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-playfair text-xl font-semibold">
                  {editingUser.id.startsWith('user-') ? 'Nouvel Utilisateur' : 'Modifier Utilisateur'}
                </h2>
                <button
                  onClick={() => setIsEditingUser(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input
                    type="text"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({...editingUser, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rôle *</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({...editingUser, role: e.target.value as any})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="customer">Client</option>
                    <option value="cashier">Caissier</option>
                    <option value="admin">Administrateur</option>
                  </select>
                </div>
              </div>

              {editingUser.role === 'cashier' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Assigné</label>
                  <select
                    value={editingUser.service || ''}
                    onChange={(e) => setEditingUser({...editingUser, service: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Sélectionner un service</option>
                    <option value="car-wash">Lavage Auto</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="fast-food">Fast Food</option>
                    <option value="barbershop">Coiffure</option>
                  </select>
                </div>
              )}

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditingUser(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveUser}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MenuItem Edit Modal */}
      {isEditingMenuItem && editingMenuItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-playfair text-xl font-semibold">
                  {editingMenuItem.id.startsWith('item-') ? 'Nouvel Article' : 'Modifier Article'}
                </h2>
                <button
                  onClick={() => setIsEditingMenuItem(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service</label>
                  <select
                    value={editingMenuItem.serviceId}
                    onChange={(e) => {
                      // Reset category when service changes to prevent invalid combinations
                      setEditingMenuItem({...editingMenuItem, serviceId: e.target.value, category: ''});
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="car-wash">Lavage Auto</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="fast-food">Fast Food</option>
                    <option value="barbershop">Coiffure</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Changer le service réinitialisera la catégorie
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom *</label>
                  <input
                    type="text"
                    value={editingMenuItem.name}
                    onChange={(e) => setEditingMenuItem({...editingMenuItem, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={editingMenuItem.description}
                    onChange={(e) => setEditingMenuItem({...editingMenuItem, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>

                {/* Image Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  
                  {/* Current Image Preview */}
                  {editingMenuItem.image && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <img 
                          src={editingMenuItem.image} 
                          alt={editingMenuItem.name}
                          className="w-20 h-16 object-cover rounded border border-gray-300 flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-700 mb-1">Image actuelle</p>
                          <div className="flex items-center space-x-2">
                            {editingMenuItem.image.startsWith('data:') ? (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Upload size={12} className="mr-1" />
                                Téléchargée
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <Image size={12} className="mr-1" />
                                URL
                              </span>
                            )}
                          </div>
                          {!editingMenuItem.image.startsWith('data:') && (
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              {editingMenuItem.image}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Image Upload Options */}
                  <div className="space-y-4">
                    {/* File Upload */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Télécharger une image</label>
                      <div 
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors"
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.add('border-primary', 'bg-primary', 'bg-opacity-5');
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove('border-primary', 'bg-primary', 'bg-opacity-5');
                        }}
                        onDrop={(e) => {
                          e.preventDefault();
                          e.currentTarget.classList.remove('border-primary', 'bg-primary', 'bg-opacity-5');
                          
                          const file = e.dataTransfer.files?.[0];
                          if (file) {
                            // Validate file size (max 5MB)
                            if (file.size > 5 * 1024 * 1024) {
                              alert('L\'image est trop volumineuse. Veuillez choisir une image de moins de 5MB.');
                              return;
                            }
                            
                            // Validate file type
                            if (!file.type.startsWith('image/')) {
                              alert('Veuillez choisir un fichier image valide.');
                              return;
                            }
                            
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              const dataUrl = event.target?.result as string;
                              setEditingMenuItem({...editingMenuItem, image: dataUrl});
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              // Validate file size (max 5MB)
                              if (file.size > 5 * 1024 * 1024) {
                                alert('L\'image est trop volumineuse. Veuillez choisir une image de moins de 5MB.');
                                return;
                              }
                              
                              // Validate file type
                              if (!file.type.startsWith('image/')) {
                                alert('Veuillez choisir un fichier image valide.');
                                return;
                              }
                              
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const dataUrl = event.target?.result as string;
                                setEditingMenuItem({...editingMenuItem, image: dataUrl});
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                          className="hidden"
                          id="image-upload"
                        />
                        <label 
                          htmlFor="image-upload" 
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <Upload size={32} className="text-gray-400 mb-2" />
                          <p className="text-sm font-medium text-gray-700">Cliquer ou glisser une image</p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF jusqu'à 5MB
                          </p>
                        </label>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-xs">
                        <span className="bg-white px-2 text-gray-500">OU</span>
                      </div>
                    </div>

                    {/* URL Input */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">URL de l'image</label>
                      <input
                        type="url"
                        value={editingMenuItem.image && !editingMenuItem.image.startsWith('data:') ? editingMenuItem.image : ''}
                        onChange={(e) => setEditingMenuItem({...editingMenuItem, image: e.target.value})}
                        placeholder="https://example.com/image.jpg"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Coller l'URL d'une image (recommandé: 400x300px)
                      </p>
                    </div>

                    {/* Quick Image Options */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-2">Ou choisir une image prédéfinie:</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(() => {
                          const imageOptions = {
                            'restaurant': [
                              'https://images.unsplash.com/photo-1551248429-40975aa4de74?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1558030006-450675393462?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&h=300&fit=crop'
                            ],
                            'fast-food': [
                              'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop'
                            ],
                            'barbershop': [
                              'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=400&h=300&fit=crop'
                            ],
                            'car-wash': [
                              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?w=400&h=300&fit=crop',
                              'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&h=300&fit=crop'
                            ]
                          };

                          const serviceImages = imageOptions[editingMenuItem.serviceId as keyof typeof imageOptions] || [];
                          return serviceImages.slice(0, 6).map((imageUrl, index) => (
                            <button
                              key={index}
                              type="button"
                              onClick={() => setEditingMenuItem({...editingMenuItem, image: imageUrl})}
                              className={`w-full h-16 rounded border-2 overflow-hidden hover:border-primary transition-colors ${
                                editingMenuItem.image === imageUrl ? 'border-primary' : 'border-gray-300'
                              }`}
                            >
                              <img 
                                src={imageUrl} 
                                alt={`Option ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ));
                        })()}
                      </div>
                    </div>

                    {/* Remove Image Option */}
                    {editingMenuItem.image && (
                      <button
                        type="button"
                        onClick={() => setEditingMenuItem({...editingMenuItem, image: ''})}
                        className="text-sm text-red-600 hover:text-red-800"
                      >
                        Supprimer l'image
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <select
                    value={editingMenuItem.category}
                    onChange={(e) => setEditingMenuItem({...editingMenuItem, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {(() => {
                      // Define categories based on service type
                      const categoryOptions = {
                        'restaurant': [
                          { value: 'entrées', label: 'Entrées' },
                          { value: 'plats', label: 'Plats principaux' },
                          { value: 'grillades', label: 'Grillades' },
                          { value: 'poissons', label: 'Poissons' },
                          { value: 'desserts', label: 'Desserts' },
                          { value: 'boissons', label: 'Boissons' },
                          { value: 'salades', label: 'Salades' }
                        ],
                        'fast-food': [
                          { value: 'burgers', label: 'Burgers' },
                          { value: 'sandwiches', label: 'Sandwichs' },
                          { value: 'accompagnements', label: 'Accompagnements' },
                          { value: 'boissons', label: 'Boissons' },
                          { value: 'desserts', label: 'Desserts' },
                          { value: 'snacks', label: 'Snacks' }
                        ],
                        'barbershop': [
                          { value: 'coupes', label: 'Coupes de cheveux' },
                          { value: 'barbe', label: 'Soins de barbe' },
                          { value: 'combos', label: 'Forfaits combinés' },
                          { value: 'soins', label: 'Soins capillaires' },
                          { value: 'styling', label: 'Coiffage & Styling' },
                          { value: 'coloration', label: 'Coloration' }
                        ],
                        'car-wash': [
                          { value: 'lavage', label: 'Services de lavage' },
                          { value: 'detailing', label: 'Détailing complet' },
                          { value: 'cire', label: 'Cirage & Protection' },
                          { value: 'interieur', label: 'Nettoyage intérieur' },
                          { value: 'premium', label: 'Services premium' }
                        ]
                      };

                      const serviceCategories = categoryOptions[editingMenuItem.serviceId as keyof typeof categoryOptions] || [];
                      
                      return serviceCategories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ));
                    })()}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Les catégories disponibles dépendent du service sélectionné
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prix (FCFA) *</label>
                  <input
                    type="number"
                    value={editingMenuItem.price}
                    onChange={(e) => setEditingMenuItem({...editingMenuItem, price: parseInt(e.target.value) || 0})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditingMenuItem(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSaveMenuItem}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center"
                >
                  <Save size={16} className="mr-2" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}