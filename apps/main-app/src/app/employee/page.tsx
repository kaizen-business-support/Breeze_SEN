'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trackLogin } from '../../utils/statistics';
import { 
  User,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Briefcase,
  Shield,
  Users,
  AlertCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Employee {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'cashier' | 'admin';
  services: string[]; // Changed to support multiple services
  isActive: boolean;
}

// Demo employee accounts
const DEMO_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    email: 'admin@breeze.sn',
    password: 'admin123',
    name: 'Admin Principal',
    role: 'admin',
    services: [], // Admin has access to all services
    isActive: true
  },
  {
    id: 'emp-2',
    email: 'cashier.carwash@breeze.sn',
    password: 'cashier123',
    name: 'Caissier Lavage',
    role: 'cashier',
    services: ['car-wash'],
    isActive: true
  },
  {
    id: 'emp-3',
    email: 'cashier.restaurant@breeze.sn',
    password: 'cashier123',
    name: 'Caissier Restaurant',
    role: 'cashier',
    services: ['restaurant'],
    isActive: true
  },
  {
    id: 'emp-4',
    email: 'cashier.fastfood@breeze.sn',
    password: 'cashier123',
    name: 'Caissier Fast Food',
    role: 'cashier',
    services: ['fast-food'],
    isActive: true
  },
  {
    id: 'emp-5',
    email: 'cashier.barbershop@breeze.sn',
    password: 'cashier123',
    name: 'Caissier Coiffure',
    role: 'cashier',
    services: ['barbershop'],
    isActive: true
  },
  {
    id: 'emp-6',
    email: 'cashier.multi@breeze.sn',
    password: 'cashier123',
    name: 'Caissier Multi-Services',
    role: 'cashier',
    services: ['car-wash', 'fast-food'], // Example: manages multiple services
    isActive: true
  }
];

export default function EmployeeLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const redirectToAppropriateService = (employeeData: any) => {
    if (employeeData.role === 'admin') {
      router.push('/admin');
    } else if (employeeData.role === 'cashier') {
      // All cashiers go to the POS system (cashier page)
      router.push('/cashier');
    }
  };

  useEffect(() => {
    setMounted(true);
    
    // Check if already logged in as employee
    const employeeToken = localStorage.getItem('breeze_employee_token');
    if (employeeToken) {
      try {
        const employeeData = JSON.parse(employeeToken);
        redirectToAppropriateService(employeeData);
      } catch (e) {
        localStorage.removeItem('breeze_employee_token');
      }
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find employee
    const employee = DEMO_EMPLOYEES.find(emp => 
      emp.email.toLowerCase() === email.toLowerCase() && 
      emp.password === password &&
      emp.isActive
    );

    if (!employee) {
      setError('Email ou mot de passe incorrect');
      setIsLoading(false);
      return;
    }

    // Store employee session
    const employeeSession = {
      id: employee.id,
      email: employee.email,
      name: employee.name,
      role: employee.role,
      services: employee.services,
      loginTime: new Date().toISOString()
    };

    localStorage.setItem('breeze_employee_token', JSON.stringify(employeeSession));

    // Track login in statistics
    try {
      trackLogin(employee.id, employee.role, employee.services[0]); // Use first service for logging
    } catch (error) {
      console.error('Failed to track employee login:', error);
    }

    // Redirect based on role and services
    redirectToAppropriateService(employeeSession);

    setIsLoading(false);
  };

  const fillDemoCredentials = (role: 'admin' | 'cashier', service?: string) => {
    if (role === 'admin') {
      setEmail('admin@breeze.sn');
      setPassword('admin123');
    } else {
      const serviceEmails = {
        'car-wash': 'cashier.carwash@breeze.sn',
        'restaurant': 'cashier.restaurant@breeze.sn',
        'fast-food': 'cashier.fastfood@breeze.sn',
        'barbershop': 'cashier.barbershop@breeze.sn'
      };
      setEmail(serviceEmails[service as keyof typeof serviceEmails] || 'cashier.carwash@breeze.sn');
      setPassword('cashier123');
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Briefcase className="h-12 w-12 text-primary mx-auto mb-4 animate-pulse" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-xl p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-8 w-8 text-white" />
            </div>
            <h2 className="font-playfair text-2xl font-bold text-gray-900 mb-2">
              Espace Employé
            </h2>
            <p className="text-gray-600">
              Connectez-vous pour accéder à votre interface de travail
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center"
              >
                <AlertCircle size={20} className="mr-2" />
                {error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email professionnel
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="votre.email@breeze.sn"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                  Connexion en cours...
                </>
              ) : (
                <>
                  <LogIn size={20} className="mr-2" />
                  Se connecter
                </>
              )}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 pt-6 border-t">
            <p className="text-sm text-gray-600 text-center mb-4">
              Comptes de démonstration :
            </p>
            
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="w-full text-left bg-gray-50 hover:bg-gray-100 px-4 py-3 rounded-lg border transition-colors"
              >
                <div className="flex items-center">
                  <Shield size={16} className="text-red-600 mr-3" />
                  <div>
                    <div className="font-medium text-sm">Administrateur</div>
                    <div className="text-xs text-gray-600">admin@breeze.sn / admin123</div>
                  </div>
                </div>
              </button>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { service: 'car-wash', name: 'Lavage' },
                  { service: 'restaurant', name: 'Restaurant' },
                  { service: 'fast-food', name: 'Fast Food' },
                  { service: 'barbershop', name: 'Coiffure' }
                ].map(({ service, name }) => (
                  <button
                    key={service}
                    type="button"
                    onClick={() => fillDemoCredentials('cashier', service)}
                    className="text-left bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg border transition-colors"
                  >
                    <div className="flex items-center">
                      <Users size={14} className="text-blue-600 mr-2" />
                      <div>
                        <div className="font-medium text-xs">{name}</div>
                        <div className="text-xs text-gray-600">cashier123</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <a
              href="/"
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              ← Retour à l'accueil
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}