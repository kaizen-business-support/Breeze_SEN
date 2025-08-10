// Statistics tracking utility
export interface Statistics {
  totalCustomers: number;
  totalOrders: number;
  totalRevenue: number;
  averageRating: number;
  activeServices: number;
}

export interface ActivityLog {
  id: string;
  type: 'customer_action' | 'employee_action' | 'system_event';
  userId: string;
  userType: 'customer' | 'cashier' | 'admin';
  action: string;
  details: string;
  service?: string;
  timestamp: Date;
  ipAddress?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  avatar?: string;
  joinedDate: string;
  loyaltyPoints: number;
  totalOrders: number;
  favoriteService?: string;
}

export interface UserOrder {
  id: string;
  service: 'car-wash' | 'restaurant' | 'fast-food' | 'barbershop';
  serviceName: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  details: string;
}

const STORAGE_KEYS = {
  STATISTICS: 'breeze_statistics',
  ACTIVITY_LOGS: 'breeze_activity_logs',
  CUSTOMERS: 'breeze_customers',
  ORDERS: 'breeze_orders',
  USER_PROFILE: 'breeze_user_profile',
  USER_ORDERS: 'breeze_user_orders'
};

// Initialize default statistics
const DEFAULT_STATS: Statistics = {
  totalCustomers: 0,
  totalOrders: 0,
  totalRevenue: 0,
  averageRating: 5.0,
  activeServices: 4
};

class StatisticsService {
  private statistics: Statistics;
  private activityLogs: ActivityLog[];

  constructor() {
    this.statistics = this.loadStatistics();
    this.activityLogs = this.loadActivityLogs();
  }

  private loadStatistics(): Statistics {
    if (typeof window === 'undefined') return DEFAULT_STATS;
    
    const saved = localStorage.getItem(STORAGE_KEYS.STATISTICS);
    if (saved) {
      return JSON.parse(saved);
    }
    
    // Initialize with realistic starting values for a new business
    const initialStats: Statistics = {
      totalCustomers: 23,
      totalOrders: 47,
      totalRevenue: 285000, // 285,000 FCFA
      averageRating: 4.8,
      activeServices: 4
    };
    
    this.saveStatistics(initialStats);
    return initialStats;
  }

  private loadActivityLogs(): ActivityLog[] {
    if (typeof window === 'undefined') return [];
    
    const saved = localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS);
    if (saved) {
      const logs = JSON.parse(saved);
      // Convert timestamp strings back to Date objects
      return logs.map((log: any) => ({
        ...log,
        timestamp: new Date(log.timestamp)
      }));
    }
    
    // Initialize with some sample logs
    const initialLogs: ActivityLog[] = [
      {
        id: '1',
        type: 'customer_action',
        userId: 'customer-1',
        userType: 'customer',
        action: 'account_created',
        details: 'Nouveau compte créé',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        ipAddress: '192.168.1.100'
      },
      {
        id: '2',
        type: 'customer_action',
        userId: 'customer-1',
        userType: 'customer',
        action: 'order_placed',
        details: 'Commande Fast Food - 4500 FCFA',
        service: 'fast-food',
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        ipAddress: '192.168.1.100'
      }
    ];
    
    this.saveActivityLogs(initialLogs);
    return initialLogs;
  }

  private saveStatistics(stats: Statistics) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.STATISTICS, JSON.stringify(stats));
    }
    this.statistics = stats;
  }

  private saveActivityLogs(logs: ActivityLog[]) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.ACTIVITY_LOGS, JSON.stringify(logs));
    }
    this.activityLogs = logs;
  }

  // Public methods to get statistics
  getStatistics(): Statistics {
    return { ...this.statistics };
  }

  getActivityLogs(): ActivityLog[] {
    return [...this.activityLogs].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  // Methods to update statistics
  incrementCustomers() {
    this.statistics.totalCustomers += 1;
    this.saveStatistics(this.statistics);
  }

  incrementOrders(amount: number, service?: string) {
    this.statistics.totalOrders += 1;
    this.statistics.totalRevenue += amount;
    this.saveStatistics(this.statistics);
  }

  updateRating(newRating: number) {
    // Simple average calculation - in real app would be more sophisticated
    const totalRatings = this.statistics.totalOrders || 1;
    this.statistics.averageRating = (
      (this.statistics.averageRating * (totalRatings - 1) + newRating) / totalRatings
    );
    this.saveStatistics(this.statistics);
  }

  // Activity logging methods
  logActivity(log: Omit<ActivityLog, 'id' | 'timestamp'>) {
    const newLog: ActivityLog = {
      ...log,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date()
    };

    this.activityLogs.unshift(newLog);
    
    // Keep only last 1000 logs to prevent storage bloat
    if (this.activityLogs.length > 1000) {
      this.activityLogs = this.activityLogs.slice(0, 1000);
    }
    
    this.saveActivityLogs(this.activityLogs);
  }

  logCustomerAction(userId: string, action: string, details: string, service?: string) {
    this.logActivity({
      type: 'customer_action',
      userId,
      userType: 'customer',
      action,
      details,
      service,
      ipAddress: '192.168.1.100' // In real app, would get actual IP
    });
  }

  logEmployeeAction(userId: string, userType: 'cashier' | 'admin', action: string, details: string, service?: string) {
    this.logActivity({
      type: 'employee_action',
      userId,
      userType,
      action,
      details,
      service,
      ipAddress: '192.168.1.100' // In real app, would get actual IP
    });
  }

  logSystemEvent(action: string, details: string) {
    this.logActivity({
      type: 'system_event',
      userId: 'system',
      userType: 'admin',
      action,
      details
    });
  }

  // Methods for realistic data simulation (for demo purposes)
  simulateRealisticActivity() {
    const now = Date.now();
    const actions = [
      { action: 'page_view', details: 'Page d\'accueil visitée', weight: 10 },
      { action: 'service_view', details: 'Service consulté', weight: 8 },
      { action: 'account_created', details: 'Nouveau compte créé', weight: 2 },
      { action: 'order_placed', details: 'Commande passée', weight: 3 },
      { action: 'login', details: 'Connexion utilisateur', weight: 5 }
    ];

    // Add some recent realistic activity
    for (let i = 0; i < 5; i++) {
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const randomTime = now - Math.random() * 86400000 * 7; // Within last 7 days
      
      this.activityLogs.unshift({
        id: `sim-${Date.now()}-${i}`,
        type: 'customer_action',
        userId: `customer-${Math.floor(Math.random() * 100)}`,
        userType: 'customer',
        action: randomAction.action,
        details: randomAction.details,
        timestamp: new Date(randomTime),
        ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`
      });
    }

    this.saveActivityLogs(this.activityLogs);
  }

  // User Profile Management
  saveUserProfile(profile: UserProfile) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
    }
  }

  getUserProfile(): UserProfile | null {
    if (typeof window === 'undefined') return null;
    
    const saved = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (!saved) return null;
    
    try {
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }

  updateUserProfile(updates: Partial<UserProfile>) {
    const currentProfile = this.getUserProfile();
    if (!currentProfile) return;
    
    const updatedProfile = { ...currentProfile, ...updates };
    this.saveUserProfile(updatedProfile);
  }

  saveUserOrder(order: UserOrder) {
    if (typeof window === 'undefined') return;
    
    const orders = this.getUserOrders();
    orders.unshift(order); // Add to beginning
    
    // Keep only last 50 orders
    if (orders.length > 50) {
      orders.splice(50);
    }
    
    localStorage.setItem(STORAGE_KEYS.USER_ORDERS, JSON.stringify(orders));
  }

  getUserOrders(): UserOrder[] {
    if (typeof window === 'undefined') return [];
    
    const saved = localStorage.getItem(STORAGE_KEYS.USER_ORDERS);
    if (!saved) return [];
    
    try {
      return JSON.parse(saved);
    } catch {
      return [];
    }
  }
}

// Singleton instance
export const statisticsService = new StatisticsService();

// Utility functions for common operations
export const trackOrder = (amount: number, service: string, userId: string) => {
  statisticsService.incrementOrders(amount, service);
  statisticsService.logCustomerAction(userId, 'order_placed', `Commande ${service} - ${amount} FCFA`, service);
};

export const trackNewCustomer = (userId: string, name: string) => {
  statisticsService.incrementCustomers();
  statisticsService.logCustomerAction(userId, 'account_created', `Nouveau compte: ${name}`);
};

export const trackLogin = (userId: string, userType: 'customer' | 'cashier' | 'admin', service?: string) => {
  if (userType === 'customer') {
    statisticsService.logCustomerAction(userId, 'login', 'Connexion client');
  } else {
    statisticsService.logEmployeeAction(userId, userType, 'login', `Connexion ${userType}`, service);
  }
};

export const trackServiceView = (userId: string, service: string) => {
  statisticsService.logCustomerAction(userId, 'service_view', `Consultation service ${service}`, service);
};

// User Profile Management Functions
export const createUserProfile = (name: string, email: string, phone: string): UserProfile => {
  const profile: UserProfile = {
    id: `user-${Date.now()}`,
    name,
    email,
    phone,
    joinedDate: new Date().toISOString().split('T')[0],
    loyaltyPoints: 0,
    totalOrders: 0
  };
  
  statisticsService.saveUserProfile(profile);
  return profile;
};

export const getUserProfile = (): UserProfile | null => {
  return statisticsService.getUserProfile();
};

export const updateUserProfile = (updates: Partial<UserProfile>) => {
  statisticsService.updateUserProfile(updates);
};

export const addUserOrder = (service: 'car-wash' | 'restaurant' | 'fast-food' | 'barbershop', serviceName: string, amount: number, details: string) => {
  const order: UserOrder = {
    id: `ORD-${Date.now()}`,
    service,
    serviceName,
    date: new Date().toISOString().split('T')[0],
    amount,
    status: 'completed',
    details
  };
  
  statisticsService.saveUserOrder(order);
  
  // Update user's total orders and loyalty points
  const profile = getUserProfile();
  if (profile) {
    updateUserProfile({
      totalOrders: profile.totalOrders + 1,
      loyaltyPoints: profile.loyaltyPoints + Math.floor(amount / 100) // 1 point per 100 FCFA
    });
  }
};

export const getUserOrders = (): UserOrder[] => {
  return statisticsService.getUserOrders();
};

// New function to track cashier sales (replaces trackOrder for POS transactions)
export const trackCashierSale = (
  amount: number, 
  service: string, 
  customerId: string, 
  customerName: string,
  cashierId: string, 
  cashierName: string,
  paymentMethod: string,
  items: string
) => {
  statisticsService.incrementOrders(amount, service);
  statisticsService.logEmployeeAction(
    cashierId, 
    'cashier', 
    'sale_processed', 
    `Vente ${service} - Client: ${customerName} - ${amount} FCFA (${paymentMethod}) - Articles: ${items}`, 
    service
  );
};

// Sales register functionality
export interface SaleRecord {
  id: string;
  transactionId: string;
  cashierId: string;
  cashierName: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  service: string;
  items: Array<{name: string, quantity: number, price: number}>;
  total: number;
  paymentMethod: 'cash' | 'card' | 'mobile';
  timestamp: Date;
  vehicleInfo?: {
    brand: string;
    model: string;
    plate: string;
    color: string;
  };
}

export const saveSaleRecord = (saleRecord: SaleRecord) => {
  if (typeof window === 'undefined') return;
  
  const salesKey = 'breeze_sales_register';
  const existing = localStorage.getItem(salesKey);
  const sales: SaleRecord[] = existing ? JSON.parse(existing) : [];
  
  sales.unshift(saleRecord);
  
  // Keep last 1000 sales records
  if (sales.length > 1000) {
    sales.splice(1000);
  }
  
  localStorage.setItem(salesKey, JSON.stringify(sales));
};

export const getSalesRegister = (): SaleRecord[] => {
  if (typeof window === 'undefined') return [];
  
  const salesKey = 'breeze_sales_register';
  const existing = localStorage.getItem(salesKey);
  
  if (!existing) {
    // Initialize with some sample data for demo
    const sampleSales = createSampleSalesData();
    localStorage.setItem(salesKey, JSON.stringify(sampleSales));
    return sampleSales;
  }
  
  try {
    const sales = JSON.parse(existing);
    // Convert timestamp strings back to Date objects
    return sales.map((sale: any) => ({
      ...sale,
      timestamp: new Date(sale.timestamp)
    }));
  } catch {
    return [];
  }
};

// Create sample sales data for demonstration
const createSampleSalesData = (): SaleRecord[] => {
  const now = new Date();
  const samples: SaleRecord[] = [];
  
  // Sample employees
  const employees = [
    { id: 'emp-2', name: 'Caissier Lavage' },
    { id: 'emp-3', name: 'Caissier Restaurant' },
    { id: 'emp-4', name: 'Caissier Fast Food' },
    { id: 'emp-5', name: 'Caissier Coiffure' },
    { id: 'emp-6', name: 'Caissier Multi-Services' }
  ];
  
  // Sample customers
  const customers = [
    { id: '1', name: 'Amadou Diallo', phone: '+221 77 123 45 67' },
    { id: '2', name: 'Fatou Sarr', phone: '+221 76 987 65 43' },
    { id: '3', name: 'Moussa Ba', phone: '+221 78 555 44 33' },
    { id: '4', name: 'Aïcha Ndiaye', phone: '+221 77 888 99 00' }
  ];
  
  // Sample transactions for the last 7 days
  for (let i = 0; i < 15; i++) {
    const randomEmployee = employees[Math.floor(Math.random() * employees.length)];
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const services = ['car-wash', 'restaurant', 'fast-food', 'barbershop'];
    const randomService = services[Math.floor(Math.random() * services.length)];
    const paymentMethods: ('cash' | 'card' | 'mobile')[] = ['cash', 'card', 'mobile'];
    const randomPayment = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    
    // Generate items based on service
    let items: Array<{name: string, quantity: number, price: number}> = [];
    let total = 0;
    
    if (randomService === 'car-wash') {
      items = [
        { name: 'Lavage Premium', quantity: 1, price: 8000 },
        { name: 'Cire Protection', quantity: 1, price: 3000 }
      ];
      total = 11000;
    } else if (randomService === 'restaurant') {
      items = [
        { name: 'Thiéboudienne Royal', quantity: 2, price: 15000 },
        { name: 'Jus de Bissap', quantity: 2, price: 2500 }
      ];
      total = 35000;
    } else if (randomService === 'fast-food') {
      items = [
        { name: 'Burger Dakar', quantity: 1, price: 4500 },
        { name: 'Frites Maison', quantity: 1, price: 2000 },
        { name: 'Soda Local', quantity: 1, price: 1500 }
      ];
      total = 8000;
    } else if (randomService === 'barbershop') {
      items = [
        { name: 'Coupe + Barbe', quantity: 1, price: 4500 }
      ];
      total = 4500;
    }
    
    const randomDate = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000);
    
    samples.push({
      id: `SALE-${Date.now()}-${i}`,
      transactionId: `TXN-${Date.now()}-${i}`,
      cashierId: randomEmployee.id,
      cashierName: randomEmployee.name,
      customerId: randomCustomer.id,
      customerName: randomCustomer.name,
      customerPhone: randomCustomer.phone,
      service: randomService,
      items,
      total,
      paymentMethod: randomPayment,
      timestamp: randomDate,
      ...(randomService === 'car-wash' && {
        vehicleInfo: {
          brand: 'Toyota',
          model: 'Corolla',
          plate: 'DK-123-AB',
          color: 'Blanc'
        }
      })
    });
  }
  
  return samples.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

export interface SalesFilterOptions {
  startDate?: Date;
  endDate?: Date;
  employeeIds?: string[];
  services?: string[];
  paymentMethods?: string[];
}

export const getFilteredSalesRegister = (filters: SalesFilterOptions = {}): SaleRecord[] => {
  const allSales = getSalesRegister();
  
  return allSales.filter(sale => {
    // Date filter
    if (filters.startDate && sale.timestamp < filters.startDate) return false;
    if (filters.endDate && sale.timestamp > filters.endDate) return false;
    
    // Employee filter
    if (filters.employeeIds && filters.employeeIds.length > 0 && 
        !filters.employeeIds.includes(sale.cashierId)) return false;
    
    // Service filter
    if (filters.services && filters.services.length > 0 && 
        !filters.services.includes(sale.service)) return false;
    
    // Payment method filter
    if (filters.paymentMethods && filters.paymentMethods.length > 0 && 
        !filters.paymentMethods.includes(sale.paymentMethod)) return false;
    
    return true;
  });
};

export const getSalesRegisterSummary = (sales: SaleRecord[]) => {
  const totalSales = sales.length;
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const averageTransaction = totalSales > 0 ? totalRevenue / totalSales : 0;
  
  const serviceBreakdown = sales.reduce((acc, sale) => {
    acc[sale.service] = (acc[sale.service] || 0) + sale.total;
    return acc;
  }, {} as Record<string, number>);
  
  const paymentMethodBreakdown = sales.reduce((acc, sale) => {
    acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + sale.total;
    return acc;
  }, {} as Record<string, number>);
  
  const employeeBreakdown = sales.reduce((acc, sale) => {
    if (!acc[sale.cashierId]) {
      acc[sale.cashierId] = {
        name: sale.cashierName,
        sales: 0,
        revenue: 0
      };
    }
    acc[sale.cashierId].sales += 1;
    acc[sale.cashierId].revenue += sale.total;
    return acc;
  }, {} as Record<string, {name: string, sales: number, revenue: number}>);
  
  return {
    totalSales,
    totalRevenue,
    averageTransaction,
    serviceBreakdown,
    paymentMethodBreakdown,
    employeeBreakdown
  };
};