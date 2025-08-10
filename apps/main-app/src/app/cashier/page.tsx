'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { trackCashierSale, addUserOrder, saveSaleRecord, SaleRecord } from '../../utils/statistics';
import { 
  Car, 
  Utensils, 
  Coffee,
  Scissors,
  User,
  ShoppingCart,
  Clock,
  CheckCircle,
  Search,
  Plus,
  Minus,
  CreditCard,
  Banknote,
  Smartphone,
  Printer,
  QrCode,
  Receipt,
  X,
  Calendar,
  Hash
} from 'lucide-react';

interface CashierSession {
  employeeId: string;
  employeeName: string;
  services: string[];
  serviceName: string;
  shift: 'morning' | 'afternoon' | 'evening';
}

interface EmployeeData {
  id: string;
  email: string;
  name: string;
  role: string;
  services: string[];
  loginTime: string;
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  loyaltyPoints: number;
}

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  customizations?: string[];
}

interface Transaction {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  paymentMethod: 'cash' | 'card' | 'mobile';
  timestamp: Date;
  cashierId: string;
  cashierName: string;
  serviceType: string;
  qrCode: string;
  vehicleInfo?: {
    brand: string;
    model: string;
    plate: string;
    color: string;
  };
  appointmentInfo?: {
    barber: string;
    date: string;
    time: string;
  };
}

const services = [
  {
    id: 'car-wash',
    name: 'Lavage Auto',
    icon: Car,
    color: 'bg-blue-600',
    items: [
      { id: 'basic', name: 'Lavage Basique', price: 5000, category: 'wash' },
      { id: 'premium', name: 'Lavage Premium', price: 8000, category: 'wash' },
      { id: 'deluxe', name: 'Lavage Deluxe', price: 12000, category: 'wash' },
      { id: 'wax', name: 'Cire Protection', price: 3000, category: 'extra' },
      { id: 'interior', name: 'Nettoyage Intérieur', price: 4000, category: 'extra' }
    ]
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: Utensils,
    color: 'bg-amber-600',
    items: [
      { id: 'thieb', name: 'Thiéboudienne Royal', price: 15000, category: 'main' },
      { id: 'yassa', name: 'Yassa Poulet', price: 12000, category: 'main' },
      { id: 'mafe', name: 'Mafé Agneau', price: 14000, category: 'main' },
      { id: 'bissap', name: 'Jus de Bissap', price: 2500, category: 'drink' },
      { id: 'attaya', name: 'Thé Attaya', price: 1500, category: 'drink' }
    ]
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    icon: Coffee,
    color: 'bg-orange-600',
    items: [
      { id: 'burger', name: 'Burger Dakar', price: 4500, category: 'main' },
      { id: 'sandwich', name: 'Sandwich Dibiterie', price: 3500, category: 'main' },
      { id: 'fries', name: 'Frites Maison', price: 2000, category: 'side' },
      { id: 'soda', name: 'Soda Local', price: 1500, category: 'drink' },
      { id: 'combo', name: 'Menu Complet', price: 6500, category: 'combo' }
    ]
  },
  {
    id: 'barbershop',
    name: 'Coiffure',
    icon: Scissors,
    color: 'bg-purple-600',
    items: [
      { id: 'cut', name: 'Coupe Classique', price: 3000, category: 'cut' },
      { id: 'modern-cut', name: 'Coupe Moderne', price: 4000, category: 'cut' },
      { id: 'beard', name: 'Taille Barbe', price: 2000, category: 'beard' },
      { id: 'combo', name: 'Coupe + Barbe', price: 4500, category: 'combo' },
      { id: 'treatment', name: 'Soin Capillaire', price: 5000, category: 'treatment' }
    ]
  }
];

// Generate QR code data for transaction
const generateQRCode = (transaction: Transaction): string => {
  const qrData = {
    transactionId: transaction.id,
    customer: transaction.customerName,
    phone: transaction.customerPhone,
    service: transaction.serviceType,
    total: transaction.total,
    payment: transaction.paymentMethod,
    cashier: transaction.cashierName,
    timestamp: transaction.timestamp.toISOString(),
    items: transaction.items.map(item => `${item.name} x${item.quantity}`)
  };
  
  // In a real app, this would generate an actual QR code
  // For now, we'll create a base64 encoded JSON string
  return btoa(JSON.stringify(qrData));
};

export default function CashierPage() {
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [session, setSession] = useState<CashierSession | null>(null);
  const [currentOrder, setCurrentOrder] = useState<OrderItem[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerSearch, setCustomerSearch] = useState('');
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [lastTransaction, setLastTransaction] = useState<Transaction | null>(null);
  const [vehicleInfo, setVehicleInfo] = useState({
    brand: '',
    model: '',
    plate: '',
    color: ''
  });
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [allCustomers, setAllCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    // Load employee session
    const employeeToken = localStorage.getItem('breeze_employee_token');
    if (!employeeToken) {
      router.push('/employee');
      return;
    }

    try {
      const employee: EmployeeData = JSON.parse(employeeToken);
      setEmployeeData(employee);
      
      // If cashier has multiple services, show service selection
      if (employee.services.length > 1) {
        setShowServiceSelection(true);
      } else if (employee.services.length === 1) {
        // Single service - create session directly
        const service = services.find(s => s.id === employee.services[0]);
        if (service) {
          const newSession: CashierSession = {
            employeeId: employee.id,
            employeeName: employee.name,
            services: employee.services,
            serviceName: service.name,
            shift: new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'
          };
          setSession(newSession);
          setSelectedService(employee.services[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load employee data:', error);
      router.push('/employee');
    }

    // Load saved transactions
    const savedTransactions = localStorage.getItem('breeze_transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }

    // Load all customers (registered users + mock customers)
    setAllCustomers(loadAllCustomers());
  }, [router]);

  const handleServiceSelection = (serviceId: string) => {
    if (!employeeData) return;
    
    const service = services.find(s => s.id === serviceId);
    if (service) {
      const newSession: CashierSession = {
        employeeId: employeeData.id,
        employeeName: employeeData.name,
        services: employeeData.services,
        serviceName: service.name,
        shift: new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'
      };
      setSession(newSession);
      setSelectedService(serviceId);
      setShowServiceSelection(false);
    }
  };

  const loadAllCustomers = (): Customer[] => {
    try {
      // Load registered users from localStorage (same as admin dashboard)
      const registeredUsers = JSON.parse(localStorage.getItem('breeze_users') || '[]');
      const convertedUsers: Customer[] = registeredUsers.map((user: any) => ({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        loyaltyPoints: user.loyaltyPoints || 0
      }));

      // Mock customers for demo purposes
      const mockCustomers: Customer[] = [
        { id: 'mock-1', name: 'Amadou Diallo', phone: '+221 77 123 45 67', email: 'amadou@email.com', loyaltyPoints: 1250 },
        { id: 'mock-2', name: 'Fatou Sarr', phone: '+221 76 987 65 43', loyaltyPoints: 800 },
        { id: 'mock-3', name: 'Moussa Ba', phone: '+221 78 555 44 33', email: 'moussa@email.com', loyaltyPoints: 2100 },
        { id: 'mock-4', name: 'Aïcha Ndiaye', phone: '+221 77 888 99 00', loyaltyPoints: 500 }
      ];

      // Combine registered users with mock customers
      return [...convertedUsers, ...mockCustomers];
    } catch (error) {
      console.error('Error loading customers:', error);
      // Return mock customers if error loading
      return [
        { id: 'mock-1', name: 'Amadou Diallo', phone: '+221 77 123 45 67', email: 'amadou@email.com', loyaltyPoints: 1250 },
        { id: 'mock-2', name: 'Fatou Sarr', phone: '+221 76 987 65 43', loyaltyPoints: 800 },
        { id: 'mock-3', name: 'Moussa Ba', phone: '+221 78 555 44 33', email: 'moussa@email.com', loyaltyPoints: 2100 },
        { id: 'mock-4', name: 'Aïcha Ndiaye', phone: '+221 77 888 99 00', loyaltyPoints: 500 }
      ];
    }
  };

  const addItemToOrder = (item: any) => {
    const orderItem: OrderItem = {
      ...item,
      category: item.category || 'general'
    };
    
    const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
    if (existingItem) {
      setCurrentOrder(currentOrder.map(orderItem =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      ));
    } else {
      setCurrentOrder([...currentOrder, { ...orderItem, quantity: 1 }]);
    }
  };

  const removeItemFromOrder = (itemId: string) => {
    const existingItem = currentOrder.find(orderItem => orderItem.id === itemId);
    if (existingItem && existingItem.quantity > 1) {
      setCurrentOrder(currentOrder.map(orderItem =>
        orderItem.id === itemId
          ? { ...orderItem, quantity: orderItem.quantity - 1 }
          : orderItem
      ));
    } else {
      setCurrentOrder(currentOrder.filter(orderItem => orderItem.id !== itemId));
    }
  };

  const calculateTotal = () => {
    return currentOrder.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const createNewCustomer = () => {
    if (!newCustomerName || !newCustomerPhone) return null;
    
    const newCustomer: Customer = {
      id: `user-${Date.now()}`,
      name: newCustomerName,
      phone: newCustomerPhone,
      loyaltyPoints: 0
    };
    
    // Save to localStorage so it appears in admin dashboard and future searches
    try {
      const existingUsers = JSON.parse(localStorage.getItem('breeze_users') || '[]');
      const newUser = {
        id: newCustomer.id,
        name: newCustomer.name,
        email: '', // Optional field
        phone: newCustomer.phone,
        joinedDate: new Date().toISOString().split('T')[0],
        loyaltyPoints: newCustomer.loyaltyPoints,
        totalOrders: 0
      };
      existingUsers.push(newUser);
      localStorage.setItem('breeze_users', JSON.stringify(existingUsers));
      
      // Update local customers list
      setAllCustomers(loadAllCustomers());
    } catch (error) {
      console.error('Failed to save new customer:', error);
    }
    
    setSelectedCustomer(newCustomer);
    setNewCustomerName('');
    setNewCustomerPhone('');
    return newCustomer;
  };

  const processPayment = (paymentMethod: 'cash' | 'card' | 'mobile') => {
    if (!selectedCustomer || currentOrder.length === 0 || !session) return;

    // For car wash, require vehicle info
    if (selectedService === 'car-wash' && (!vehicleInfo.brand || !vehicleInfo.model)) {
      setShowVehicleModal(true);
      return;
    }

    const transaction: Transaction = {
      id: `TXN-${Date.now()}`,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      items: [...currentOrder],
      total: calculateTotal(),
      paymentMethod,
      timestamp: new Date(),
      cashierId: session.employeeId,
      cashierName: session.employeeName,
      serviceType: selectedService,
      qrCode: '', // Will be set after generation
      ...(selectedService === 'car-wash' && { vehicleInfo })
    };

    // Generate QR code
    transaction.qrCode = generateQRCode(transaction);

    // Save transaction
    const updatedTransactions = [transaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem('breeze_transactions', JSON.stringify(updatedTransactions));

    // Track in statistics (as cashier action, not customer action)
    try {
      const itemsText = transaction.items.map(item => `${item.name} x${item.quantity}`).join(', ');
      
      trackCashierSale(
        transaction.total,
        selectedService,
        selectedCustomer.id,
        selectedCustomer.name,
        session.employeeId,
        session.employeeName,
        transaction.paymentMethod,
        itemsText
      );

      // Save to sales register
      const saleRecord: SaleRecord = {
        id: `SALE-${Date.now()}`,
        transactionId: transaction.id,
        cashierId: session.employeeId,
        cashierName: session.employeeName,
        customerId: selectedCustomer.id,
        customerName: selectedCustomer.name,
        customerPhone: selectedCustomer.phone,
        service: selectedService,
        items: transaction.items.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: transaction.total,
        paymentMethod: transaction.paymentMethod,
        timestamp: transaction.timestamp,
        ...(selectedService === 'car-wash' && { vehicleInfo })
      };
      
      saveSaleRecord(saleRecord);
      
      addUserOrder(selectedService as 'car-wash' | 'restaurant' | 'fast-food' | 'barbershop', transaction.items.map(item => item.name).join(', '), transaction.total, 
        `${transaction.items.length} articles - ${transaction.paymentMethod}`);
    } catch (error) {
      console.error('Failed to track transaction:', error);
    }

    setLastTransaction(transaction);
    setShowPaymentModal(false);
    setShowTicketModal(true);
    
    // Reset order
    setCurrentOrder([]);
    setSelectedCustomer(null);
    setCustomerSearch('');
    setVehicleInfo({ brand: '', model: '', plate: '', color: '' });
  };

  const printTicket = () => {
    if (!lastTransaction) return;
    
    const printContent = `
      <div style="font-family: monospace; width: 300px; margin: 0 auto;">
        <h2 style="text-align: center;">BREEZE ${lastTransaction.serviceType.toUpperCase()}</h2>
        <hr>
        <p><strong>Transaction:</strong> ${lastTransaction.id}</p>
        <p><strong>Date:</strong> ${lastTransaction.timestamp.toLocaleString('fr-FR')}</p>
        <p><strong>Client:</strong> ${lastTransaction.customerName}</p>
        <p><strong>Téléphone:</strong> ${lastTransaction.customerPhone}</p>
        <p><strong>Caissier:</strong> ${lastTransaction.cashierName}</p>
        <hr>
        <h3>Articles:</h3>
        ${lastTransaction.items.map(item => 
          `<p>${item.name} x${item.quantity} - ${(item.price * item.quantity).toLocaleString()} FCFA</p>`
        ).join('')}
        <hr>
        <p><strong>TOTAL: ${lastTransaction.total.toLocaleString()} FCFA</strong></p>
        <p><strong>Paiement:</strong> ${lastTransaction.paymentMethod.toUpperCase()}</p>
        ${lastTransaction.vehicleInfo ? `
        <hr>
        <h3>Véhicule:</h3>
        <p>${lastTransaction.vehicleInfo.brand} ${lastTransaction.vehicleInfo.model}</p>
        <p>Couleur: ${lastTransaction.vehicleInfo.color}</p>
        <p>Plaque: ${lastTransaction.vehicleInfo.plate}</p>
        ` : ''}
        <hr>
        <div style="text-align: center; margin: 20px 0;">
          <p>QR CODE: ${lastTransaction.qrCode.substring(0, 20)}...</p>
          <p>Merci de votre visite!</p>
        </div>
      </div>
    `;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const filteredCustomers = allCustomers.filter(customer =>
    customer.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    customer.phone.includes(customerSearch)
  );

  // Show service selection for multi-service cashiers
  if (showServiceSelection && employeeData) {
    const availableServices = services.filter(service => employeeData.services.includes(service.id));
    
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-4xl mx-auto p-8">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-4">
              Bonjour {employeeData.name}
            </h1>
            <p className="text-gray-600">
              Sélectionnez le service que vous souhaitez gérer aujourd'hui
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableServices.map((service) => (
              <motion.div
                key={service.id}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                onClick={() => handleServiceSelection(service.id)}
              >
                <div className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <service.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-semibold text-center text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  Caisse {service.name}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                localStorage.removeItem('breeze_employee_token');
                router.push('/employee');
              }}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de votre session...</p>
        </div>
      </div>
    );
  }

  const currentService = services.find(s => s.id === selectedService);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {currentService && (
                <div className={`w-10 h-10 ${currentService.color} rounded-full flex items-center justify-center mr-4`}>
                  <currentService.icon className="h-6 w-6 text-white" />
                </div>
              )}
              <div>
                <h1 className="font-playfair text-xl font-bold text-gray-900">
                  POS - {session.serviceName}
                </h1>
                <p className="text-sm text-gray-600">
                  {session.employeeName} • Session {session.shift === 'morning' ? 'Matin' : session.shift === 'afternoon' ? 'Après-midi' : 'Soir'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Mes transactions - {session.serviceName}</div>
                <div className="font-semibold text-gray-900">
                  {transactions.filter(t => 
                    t.cashierId === session.employeeId && 
                    t.serviceType === selectedService &&
                    new Date(t.timestamp).toDateString() === new Date().toDateString()
                  ).length}
                </div>
              </div>
              <button
                onClick={() => {
                  setSession(null);
                  setSelectedService('');
                  setCurrentOrder([]);
                  setSelectedCustomer(null);
                  if (employeeData && employeeData.services.length > 1) {
                    setShowServiceSelection(true);
                  } else {
                    localStorage.removeItem('breeze_employee_token');
                    router.push('/employee');
                  }
                }}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {employeeData && employeeData.services.length > 1 ? 'Changer Service' : 'Fermer Session'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products/Services */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-4">
                Produits & Services
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {currentService?.items.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => addItemToOrder(item)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-left"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-primary font-semibold">{item.price.toLocaleString()} FCFA</p>
                    <p className="text-xs text-gray-500 mt-1">{item.category}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
              <h2 className="font-semibold text-gray-900 mb-4">Mes Transactions - {session.serviceName}</h2>
              <div className="space-y-3">
                {transactions
                  .filter(transaction => 
                    transaction.cashierId === session.employeeId && 
                    transaction.serviceType === selectedService &&
                    new Date(transaction.timestamp).toDateString() === new Date().toDateString()
                  )
                  .slice(0, 5)
                  .map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{transaction.id}</div>
                      <div className="text-sm text-gray-600">
                        {transaction.customerName} • {new Date(transaction.timestamp).toLocaleTimeString('fr-FR')}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{transaction.total.toLocaleString()} FCFA</div>
                      <div className="flex items-center text-sm text-green-600">
                        <CheckCircle size={14} className="mr-1" />
                        {transaction.paymentMethod}
                      </div>
                    </div>
                  </div>
                ))}
                {transactions
                  .filter(transaction => 
                    transaction.cashierId === session.employeeId && 
                    transaction.serviceType === selectedService &&
                    new Date(transaction.timestamp).toDateString() === new Date().toDateString()
                  ).length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    Aucune transaction aujourd'hui pour ce service
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Order Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Commande Actuelle
              </h2>

              {/* Customer Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Client *
                </label>
                <div className="relative mb-2">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher client..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                
                {/* New Customer */}
                <div className="mb-2 space-y-2">
                  <input
                    type="text"
                    placeholder="Nom nouveau client"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Téléphone"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={createNewCustomer}
                    disabled={!newCustomerName || !newCustomerPhone}
                    className="w-full bg-green-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300"
                  >
                    Nouveau Client
                  </button>
                </div>
                
                {customerSearch && (
                  <div className="mt-2 border border-gray-200 rounded-lg max-h-40 overflow-y-auto">
                    {filteredCustomers.map((customer) => (
                      <button
                        key={customer.id}
                        onClick={() => {
                          setSelectedCustomer(customer);
                          setCustomerSearch('');
                        }}
                        className="w-full p-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                      >
                        <div className="font-medium text-gray-900">{customer.name}</div>
                        <div className="text-sm text-gray-600">{customer.phone}</div>
                        <div className="text-xs text-primary">{customer.loyaltyPoints} points</div>
                      </button>
                    ))}
                  </div>
                )}

                {selectedCustomer && (
                  <div className="mt-2 p-3 bg-primary/5 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900">{selectedCustomer.name}</div>
                        <div className="text-sm text-gray-600">{selectedCustomer.phone}</div>
                      </div>
                      <div className="text-sm text-primary font-medium">
                        {selectedCustomer.loyaltyPoints} pts
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Items */}
              <div className="mb-6">
                {currentOrder.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    Aucun article sélectionné
                  </p>
                ) : (
                  <div className="space-y-3">
                    {currentOrder.map((item) => (
                      <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-600">{item.price.toLocaleString()} FCFA</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => removeItemFromOrder(item.id)}
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center font-medium">{item.quantity}</span>
                          <button
                            onClick={() => addItemToOrder({ id: item.id, name: item.name, price: item.price, category: item.category })}
                            className="w-6 h-6 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 text-white"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Total */}
              {currentOrder.length > 0 && (
                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-primary">{calculateTotal().toLocaleString()} FCFA</span>
                  </div>
                </div>
              )}

              {/* Payment Button */}
              {currentOrder.length > 0 && selectedCustomer && (
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Procéder au Paiement
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-2xl font-semibold">
                Paiement
              </h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {calculateTotal().toLocaleString()} FCFA
              </div>
              <p className="text-gray-600">
                Client: {selectedCustomer?.name}
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => processPayment('cash')}
                className="w-full bg-green-600 text-white py-4 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
              >
                <Banknote className="mr-2 h-5 w-5" />
                Espèces
              </button>
              <button
                onClick={() => processPayment('card')}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Carte Bancaire
              </button>
              <button
                onClick={() => processPayment('mobile')}
                className="w-full bg-orange-600 text-white py-4 rounded-lg font-medium hover:bg-orange-700 transition-colors flex items-center justify-center"
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Mobile Money
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vehicle Info Modal */}
      {showVehicleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-playfair text-2xl font-semibold">
                Informations Véhicule
              </h2>
              <button
                onClick={() => setShowVehicleModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Marque (ex: Toyota)"
                value={vehicleInfo.brand}
                onChange={(e) => setVehicleInfo({...vehicleInfo, brand: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Modèle (ex: Corolla)"
                value={vehicleInfo.model}
                onChange={(e) => setVehicleInfo({...vehicleInfo, model: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                required
              />
              <input
                type="text"
                placeholder="Couleur"
                value={vehicleInfo.color}
                onChange={(e) => setVehicleInfo({...vehicleInfo, color: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Plaque d'immatriculation"
                value={vehicleInfo.plate}
                onChange={(e) => setVehicleInfo({...vehicleInfo, plate: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <button
                onClick={() => {
                  setShowVehicleModal(false);
                  processPayment('cash'); // Will retry payment
                }}
                disabled={!vehicleInfo.brand || !vehicleInfo.model}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:bg-gray-300"
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Modal */}
      {showTicketModal && lastTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="font-playfair text-2xl font-semibold text-green-600">
                Transaction Réussie
              </h2>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-sm">
              <div className="flex justify-between mb-2">
                <span>Transaction:</span>
                <span className="font-medium">{lastTransaction.id}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Client:</span>
                <span className="font-medium">{lastTransaction.customerName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Total:</span>
                <span className="font-semibold text-primary">{lastTransaction.total.toLocaleString()} FCFA</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Paiement:</span>
                <span className="font-medium">{lastTransaction.paymentMethod.toUpperCase()}</span>
              </div>
              <div className="text-center">
                <QrCode className="h-12 w-12 mx-auto mb-2 text-gray-600" />
                <p className="text-xs text-gray-600">QR Code généré</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={printTicket}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </button>
              <button
                onClick={() => setShowTicketModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}