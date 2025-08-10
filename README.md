# Breeze Monorepo - Car Wash & Restaurant Services

A modern monorepo built with Turbo, TypeScript, and Next.js 14, featuring applications for car wash services and restaurant experiences.

## 🏗️ Architecture Overview

```
breeze/
├── apps/
│   ├── car-wash-app/      # Car Wash Service
│   └── restaurant-app/    # Restaurant Service
├── packages/
│   ├── ui/                # Shared UI components
│   ├── types/             # TypeScript type definitions
│   └── config/            # Shared configuration
└── docs/                  # Documentation
```

## 🎨 Design System

### Service-Specific Color Palettes

- **Lavage (Car Wash)**: Primary #825313, Secondary #e18e02, Accent #2563eb
- **Restaurant (Elegant)**: Primary #825313, Secondary #d4af37, Accent #8b4513  
- **Fast-Food (Vibrant)**: Primary #e18e02, Secondary #ff6b35, Accent #ffd60a
- **Coiffure (Beauty Salon)**: Primary #825313, Secondary #e18e02, Accent #9333ea
- **Boutique (Hybrid)**: Primary #825313, Secondary #e18e02, Accent #059669

## 🚀 Features Implemented

### Car Wash App (Port 3001)
- ✅ Advanced booking system with visual time slots
- ✅ Vehicle details form with dynamic pricing
- ✅ Step-by-step booking flow with animations
- ✅ Service cards with pricing breakdown
- ✅ Mobile-first responsive design
- ✅ QR tracking integration ready
- ✅ Agent dashboard components

### Restaurant App (Port 3002)
- ✅ Interactive menu with filtering system
- ✅ Chef profiles and testimonials
- ✅ Parallax hero section with animations
- ✅ Gallery with lightbox functionality
- ✅ Reservation system with OpenTable integration ready
- ✅ Mobile-optimized menu browsing
- ✅ Social media integration

### Shared Packages
- ✅ UI component library with Framer Motion
- ✅ TypeScript types for all data models
- ✅ Service-specific configuration system
- ✅ Utility functions and helpers

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Build System**: Turbo (monorepo)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: npm workspaces

## 📦 Installation & Setup

### Prerequisites
- Node.js >= 18.17.0
- npm >= 10.2.4

### Quick Start

**Option 1: Simple Installation (Recommended for Windows)**
```bash
# Run the simple installer
install-simple.bat

# Start individual apps
start-car-wash.bat       # Car Wash Service (Port 3001)
start-restaurant.bat     # Restaurant Service (Port 3002)
```

**Option 2: NPM Installation**
```bash
# Install dependencies
npm install

# Start apps individually
npm run dev:car-wash     # Car Wash Service (Port 3001)
npm run dev:restaurant   # Restaurant Service (Port 3002)

# Or with Turbo (if available)
npm run dev              # Start all apps
npm run car-wash         # Car Wash only
npm run restaurant       # Restaurant only
```

### Build Commands
```bash
# Build all apps
npm run build

# Type check all packages
npm run type-check

# Lint all code
npm run lint

# Format code
npm run format
```

## 🎯 Service Templates

### 1. Lavage (Car Wash)
**Features**: Advanced booking, vehicle forms, QR tracking, agent dashboard
**Style**: Professional car wash interface with trust-building elements
**Port**: 3001

### 2. Restaurant
**Features**: Interactive menu, chef profiles, table reservations, gallery
**Style**: Elegant restaurant experience with sophisticated design
**Port**: 3002

### 3. Fast-Food (Planned)
**Features**: Quick ordering, gamification, youth-oriented interface
**Style**: Vibrant and energetic design for quick service

### 4. Coiffure (Planned) 
**Features**: Appointment booking, stylist selection, before/after gallery
**Style**: Creative and elegant design for beauty services

### 5. Boutique (Planned)
**Features**: Product catalog, inventory, online ordering, delivery tracking
**Style**: Professional commerce interface for auto parts shop

## 📱 Mobile Experience

Both apps are built mobile-first with:
- Responsive breakpoints for all screen sizes
- Touch-optimized interactions
- Swipeable booking steps (Car Wash)
- Horizontal scrolling menus (Restaurant)
- Bottom sheet navigation
- Optimized image loading

## 🎨 Animation System

### Car Wash Animations
- Step-by-step booking transitions
- Service card hover effects  
- Loading states for booking process
- QR scan animations

### Restaurant Animations
- Parallax hero sections
- Menu item hover transformations
- Smooth scrolling interactions
- Gallery lightbox transitions
- Floating elements

## 🔧 Configuration

### Environment Variables
```bash
# Apps can use these environment variables
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_STRIPE_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_KEY=
```

### Customization
- Colors: Update `packages/config/src/colors.ts`
- Services: Modify `packages/config/src/services.ts`
- Components: Extend `packages/ui/src/components/`

## 📊 Data Models

### Enhanced Booking Model
```typescript
interface Reservation {
  id: string;
  vehicleDetails?: VehicleInfo;
  tablePreferences?: TableInfo;
  selectedAddons: string[];
  pricingBreakdown: PricingInfo;
  trackingInfo: TrackingStatus;
}
```

### Enhanced Menu Model
```typescript
interface MenuItem {
  id: string;
  images: GalleryImage[];
  nutritionalInfo?: NutritionData;
  dietaryTags: string[];
  customizations: CustomizationOption[];
  chefInfo?: Chef;
}
```

## 🚦 Development Workflow

### Adding New Services
1. Create service configuration in `packages/config/src/services.ts`
2. Add color palette to `packages/config/src/colors.ts`
3. Create new app in `apps/` directory
4. Build components using shared UI package

### Component Development
1. Create components in `packages/ui/src/components/`
2. Export from `packages/ui/src/index.ts`
3. Use in apps with proper TypeScript types
4. Test across all breakpoints

## 🎭 Template Integration

### Car Wash Integration Features
- Visual service selection cards
- Multi-step booking wizard
- Dynamic pricing calculator
- Vehicle details capture
- Time slot visualization
- QR code generation
- Agent workflow tracking

### Restaurant Integration Features  
- Interactive menu filtering
- Chef profile showcase
- Testimonial carousel
- Gallery with categories
- Table reservation flow
- Social media links
- OpenTable widget ready

## 📈 Analytics & Metrics

Ready for integration with analytics tracking:
- Booking conversion rates (Car Wash)
- Menu item popularity (Restaurant)
- User interaction heatmaps
- Mobile vs desktop usage
- Service selection patterns

## 🔐 Security Features

- Input validation on all forms
- CSRF protection ready
- Secure file upload handling
- API rate limiting preparation
- Privacy-compliant data handling

## 🌐 Internationalization

Structure ready for i18n:
- French primary language
- Wolof support planned
- RTL layout considerations
- Currency formatting (FCFA)
- Date/time localization

## 🎨 Brand Consistency

Maintains Breeze brand identity:
- Consistent color usage across services
- Typography hierarchy
- Logo placement standards
- Professional photography style
- Consistent messaging tone

## 📞 Support

For development questions:
- Check component documentation in `packages/ui/`
- Review type definitions in `packages/types/`
- Reference configuration in `packages/config/`

## 🔄 Updates & Maintenance

Regular maintenance includes:
- Dependency updates
- Security patches
- Performance optimizations
- New template features
- Mobile experience improvements

---

**Built with ❤️ by Breeze - Powering Senegal's Digital Transformation**