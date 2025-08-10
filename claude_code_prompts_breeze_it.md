# Prompts Claude Code - Breeze Implementation

## 🚀 Phase 1: Infrastructure & Template Setup (Semaines 1-3)

### Prompt 1.1 - Project Setup & Monorepo
```bash
claude-code create "Setup Breeze monorepo with Turbo, TypeScript, and Next.js 14 apps inspired by CRSINE car wash and TASTYC restaurant templates"
```

**Contexte détaillé pour Claude :**
```
Create a modern monorepo for Breeze, a multi-service platform for a commercial complex in Senegal. The platform manages:

1. Car wash service (inspired by CRSINE template)
2. Restaurant service (inspired by TASTYC template) 
3. Fast-food service (TASTYC adapted for youth)
4. Hair salon service
5. Auto parts shop

Requirements:
- Turbo monorepo with TypeScript
- Next.js 14 with App Router for client and employee apps
- Node.js microservices architecture
- Brand colors: #825313 (primary brown), #e18e02 (secondary orange), #000000, #ffffff
- Support for French language with Wolof optional
- Mobile-first responsive design
- Integration ready for Wave Money, Orange Money, WhatsApp Business API

Structure needed:
```
breeze-it/
├── apps/
│   ├── client-web/          # Customer-facing Next.js app
│   ├── employee-dashboard/  # Employee management dashboard
│   ├── api-gateway/        # Express/Fastify API gateway
│   └── services/           # Individual microservices
├── packages/
│   ├── ui/                 # Shared design system
│   ├── database/          # Prisma schemas
│   ├── types/             # TypeScript types
│   └── utils/             # Shared utilities
```

Include: package.json configurations, TypeScript configs, Turbo pipeline, ESLint/Prettier setup, and basic folder structure with README files.
```

### Prompt 1.2 - Design System & UI Components
```bash
claude-code create "Create comprehensive design system for Breeze using CRSINE and TASTYC template aesthetics with brand colors #825313 and #e18e02"
```

**Contexte détaillé :**
```
Build a complete design system package (@breeze/ui) that combines the best of CRSINE car wash template and TASTYC restaurant template aesthetics, adapted for Breeze's brand identity.

Brand Identity:
- Primary: #825313 (sophisticated brown)
- Secondary: #e18e02 (energetic orange)  
- Black: #000000
- White: #ffffff
- Additional colors for status (success, warning, error)

Service-Specific Palettes:
- Car Wash (CRSINE-inspired): Professional blue accents #2563eb
- Restaurant (TASTYC elegant): Gold accents #d4af37  
- Fast-Food (TASTYC fun): Vibrant red-orange #ff6b35
- Hair Salon: Calm teal accents #14b8a6
- Auto Shop: Industrial gray accents #6b7280

Components needed:
1. Button variants (primary, secondary, outline, ghost) per service
2. Card components with service-specific styling
3. Form elements (inputs, selects, checkboxes, radio)
4. Navigation components (header, sidebar, breadcrumbs)
5. Booking flow components (step indicator, time slots, vehicle form)
6. Menu components (category tabs, item cards, filters)
7. Modal/Dialog components
8. Loading states and skeletons
9. Typography scale with Inter (primary) and Playfair Display (restaurant)
10. Animation utilities with Framer Motion

Include:
- Tailwind CSS configuration with custom colors
- Storybook setup for component documentation
- Dark mode support
- Accessibility (WCAG 2.1 AA compliance)
- Mobile-first responsive breakpoints
- Animation presets inspired by both templates
```

### Prompt 1.3 - Database Schema & Prisma Setup
```bash
claude-code create "Setup PostgreSQL database with Prisma ORM for Breeze multi-service platform with enhanced booking and menu management capabilities"
```

**Contexte détaillé :**
```
Create a comprehensive PostgreSQL database schema using Prisma ORM for the Breeze platform, incorporating advanced features inspired by CRSINE booking system and TASTYC menu management.

Core Requirements:

1. Multi-service architecture support
2. Advanced booking system with time slots and dynamic pricing
3. Rich menu system with chef profiles and reviews
4. User management with role-based permissions
5. Loyalty points and gamification
6. Real-time notifications
7. Odoo integration fields

Key Models Needed:

Users & Authentication:
- Users (customers, agents, managers, admin)
- Role-based permissions per service
- JWT session management
- Loyalty points tracking

Services & Configuration:
- Services (lavage, restaurant, fast_food, coiffure, boutique)
- Operating hours, pricing rules, configuration per service

Booking System (CRSINE-inspired):
- Reservations with vehicle details
- Time slots with availability
- Dynamic pricing with breakdowns
- Add-ons and customizations
- QR code tracking
- Multi-step workflow status

Menu System (TASTYC-inspired):
- Menu items with rich media
- Categories and filters
- Chef profiles and specialties
- Reviews and ratings system
- Nutritional information
- Customization options

Orders & Transactions:
- Orders (fast-food, boutique)
- Order items with customizations
- Payment tracking (Wave, Orange Money, cash)
- Delivery management

Enhanced Features:
- File/media management
- Notification system
- Analytics tracking
- Audit logs

Include:
- Prisma schema with proper relations
- Database indexes for performance
- Seed data for development
- Migration scripts
- Type generation for TypeScript
```

## 🔧 Phase 2: Service Lavage (CRSINE-style) (Semaines 4-5)

### Prompt 2.1 - Car Wash Booking System
```bash
claude-code create "Build CRSINE-inspired car wash booking system with visual time slots, dynamic pricing calculator, and vehicle details form"
```

**Contexte détaillé :**
```
Create a sophisticated car wash booking system inspired by the CRSINE template, featuring:

Booking Flow (Multi-step):
1. Service Selection (visual cards with pricing)
2. Vehicle Details (brand, model, type, color, license plate)
3. Add-ons Selection (interior cleaning, wax, etc.)
4. Time Slot Picker (visual calendar with availability)
5. Dynamic Pricing Display (breakdown by service + vehicle type + time)
6. Customer Information
7. Payment Method Selection
8. Booking Confirmation with QR code

Key Components:

ServiceSelectionGrid:
- Visual service cards (Simple, Complet, Domicile, Écologique)
- Pricing display with duration estimates
- Feature comparison tooltip
- Mobile-optimized card layout

VehicleDetailsForm:
- Brand/model dropdown with autocomplete
- Vehicle type selection (sedan, SUV, truck, motorcycle)
- Size classification for pricing
- Photo upload option
- License plate input

TimeSlotPicker:
- Calendar view with available slots
- Color-coded availability (available, busy, unavailable)
- Peak hour pricing indicators
- Duration estimates per slot
- Real-time availability updates

DynamicPricingCalculator:
- Base price by service type
- Vehicle size multiplier
- Time slot multiplier (peak/off-peak)
- Add-ons pricing
- Total calculation with breakdown
- Discount application (loyalty points)

BookingConfirmation:
- QR code generation
- WhatsApp/SMS notification sending
- Email confirmation
- Calendar integration
- Booking modification options

Technical Requirements:
- Next.js with TypeScript
- Tailwind CSS with custom Breeze colors
- Framer Motion for smooth transitions
- React Hook Form for validation
- Date-fns for date manipulation
- QR code generation library
- Mobile-first responsive design
- Accessibility compliance
- Loading states and error handling
```

### Prompt 2.2 - Car Wash Agent Dashboard
```bash
claude-code create "Create car wash agent dashboard with QR scanning, multi-step workflow tracking, and real-time status updates inspired by CRSINE"
```

**Contexte détaillé :**
```
Build a comprehensive agent dashboard for car wash operations with role-specific interfaces:

Agent Roles & Permissions:
1. Agent Laveur 1 (Prélavage) - QR scan, rinse start/complete
2. Agent Laveur 2 (Lavage Principal) - Main wash, interior cleaning
3. Agent Laveur 3 (Finitions) - Drying, final inspection, delivery
4. Coordonnateur Général - Full oversight, reassignments, customer service
5. Responsable Lavage - Analytics, team management, quality control

Dashboard Features:

QR Code Scanner:
- Camera integration for QR scanning
- Reservation lookup and validation
- Customer info display
- Service details and special requests
- Vehicle information display

Workflow Management:
- Current assignments list
- Step-by-step process tracking
- Status update buttons (En cours, Terminé, Problème)
- Timer for each stage
- Photo capture for quality control
- Notes/observations input

Real-time Updates:
- WebSocket integration for live updates
- Team coordination messages
- Queue management
- Customer notifications automation
- Manager alerts for delays/issues

Agent-Specific Interfaces:

Prélavage Agent:
- Vehicle inspection checklist
- Pre-wash photo capture
- Initial rinse completion
- Issue flagging (damage, special care needed)

Main Wash Agent:
- Service checklist by wash type
- Interior/exterior progress tracking
- Add-on services confirmation
- Quality checkpoints

Finitions Agent:
- Final inspection checklist
- Customer satisfaction survey trigger
- Delivery confirmation
- Payment status verification

Supervisor Dashboard:
- Team performance metrics
- Queue optimization
- Customer wait times
- Service quality scores
- Revenue tracking
- Staff efficiency reports

Technical Stack:
- Next.js dashboard with real-time updates
- Socket.io for live communication
- Camera API for QR scanning
- PWA capabilities for mobile use
- Offline support for basic operations
- Performance monitoring
- Push notifications
```

## 🍽️ Phase 3: Restaurant Service (TASTYC-style) (Semaines 6-7)

### Prompt 3.1 - Interactive Restaurant Menu System
```bash
claude-code create "Build TASTYC-inspired interactive restaurant menu with chef profiles, filterable categories, and reservation system with elegant design"
```

**Contexte détaillé :**
```
Create a sophisticated restaurant menu and reservation system inspired by TASTYC template with elegant, mature design:

Menu System Features:

Interactive Menu Display:
- Elegant category navigation (Entrées, Plats, Desserts, Boissons)
- High-quality food photography with lightbox gallery
- Detailed item descriptions with ingredients
- Chef recommendations and specialties
- Nutritional information and allergen warnings
- Price display with optional wine pairings

Filtering & Search:
- Dietary filters (Végétarien, Sans gluten, Halal, Vegan)
- Price range slider
- Spice level indicators
- Chef specialties filter
- Ingredient-based search
- Popular items highlighting

Menu Item Modal:
- Full-screen item details
- Image gallery with zoom
- Customization options (cooking level, sides)
- Nutritional breakdown
- Chef notes and recommendations
- Add to favorites functionality

Chef Profiles Section:
- Professional chef photos
- Biography and specialties
- Career highlights and awards
- Signature dishes
- Social media links
- Chef's table booking option

Reservation System:

Table Booking Flow:
1. Date/time selection with availability
2. Party size and seating preferences
3. Special occasions (anniversary, business dinner)
4. Dietary restrictions notes
5. Contact information
6. Confirmation with calendar integration

Features:
- Real-time table availability
- Preferred seating selection (window, terrace, private)
- Special requests handling
- Cancellation/modification options
- Reminder notifications
- VIP customer recognition

Design Elements:
- Sophisticated color palette (#825313 primary, #d4af37 gold accents)
- Playfair Display typography for elegance
- Subtle parallax effects
- Smooth transitions and hover effects
- Ambient background imagery
- Professional food photography presentation

Technical Implementation:
- Next.js with TypeScript
- Tailwind CSS with custom restaurant theme
- Framer Motion for elegant animations
- Image optimization with Next.js Image
- Advanced filtering with Fuse.js
- Calendar integration
- Email/SMS confirmations
- Accessibility compliance (WCAG 2.1 AA)
```

### Prompt 3.2 - Restaurant Operations Dashboard
```bash
claude-code create "Create restaurant operations dashboard with table management, order taking system, and kitchen display inspired by fine dining workflows"
```

**Contexte détaillé :**
```
Build a comprehensive restaurant operations system with role-specific interfaces for fine dining service:

Staff Roles & Interfaces:

Maître d'Hôtel Dashboard:
- Floor plan with real-time table status
- Reservation management and walk-in handling
- Guest preference tracking
- Special occasion management
- VIP customer alerts
- Revenue and covers tracking

Serveur Interface:
- Table assignment and status
- Digital order taking with menu integration
- Customer preference notes
- Allergy and dietary restriction alerts
- Wine pairing suggestions
- Bill splitting and payment processing

Chef de Cuisine Dashboard:
- Order queue with timing priorities
- Menu item availability management
- Kitchen staff coordination
- Quality control checkpoints
- Inventory alerts
- Special dietary request handling

Caissier/Manager Interface:
- Transaction oversight
- Daily sales reports
- Table turnover analytics
- Staff performance metrics
- Customer feedback management
- Reservation confirmations

Core Features:

Table Management:
- Interactive floor plan (drag-and-drop table assignment)
- Real-time status (Libre, Réservée, Occupée, Nettoyage)
- Party size and time tracking
- Table preferences and history
- Special setup requirements
- Cleaning/maintenance scheduling

Order Management:
- Course-by-course ordering
- Kitchen timing coordination
- Modification handling
- Allergen flagging
- Wine service integration
- Bill generation with itemization

Kitchen Display System:
- Order queue with priority system
- Preparation time estimates
- Course timing coordination
- Allergen warnings
- Special preparation notes
- Quality checkpoints

Customer Service:
- Guest preference database
- Special occasion tracking
- Complaint handling
- Feedback collection
- Loyalty program integration
- Follow-up communications

Real-time Features:
- WebSocket for live updates
- Push notifications for staff
- Customer wait time tracking
- Kitchen-to-service communication
- Manager alerts for issues
- Performance monitoring

Technical Implementation:
- Next.js dashboard with SSR
- Socket.io for real-time updates
- Drag-and-drop functionality
- PWA for mobile staff use
- Offline capability for basic operations
- POS system integration
- Thermal printer support
- Accessibility for staff with disabilities
```

## 🍔 Phase 4: Fast-Food Service (TASTYC Fun-adapted) (Semaines 8-9)

### Prompt 4.1 - Youth-Oriented Fast-Food Interface
```bash
claude-code create "Build vibrant fast-food ordering system with gamification, real-time tracking, and youth-oriented design adapted from TASTYC template"
```

**Contexte détaillé :**
```
Create a dynamic, youth-oriented fast-food ordering system that adapts TASTYC's design for a fun, energetic experience:

Design Philosophy:
- Vibrant color palette (#e18e02 primary, #ff6b35 accent, #ffd60a highlights)
- Sans-serif typography (Inter) with bold weights
- High-energy animations and micro-interactions
- Mobile-first design with thumb-friendly navigation
- Instagram-worthy food photography
- Gamification elements throughout

Ordering Experience:

Menu Interface:
- Grid layout with large, appetizing food photos
- Quick add buttons with satisfying animations
- Combo meal suggestions with savings highlights
- Popular items badges and trending indicators
- Calorie information and dietary icons
- Student discount pricing display

Quick Order Flow:
1. Menu browsing with instant add-to-cart
2. Combo optimization suggestions
3. Customization with visual options
4. Order mode selection (Sur place, À emporter, Livraison)
5. Quick payment with saved methods
6. Real-time order tracking

Gamification Features:
- Points for each order (Breeze Coins)
- Achievement badges (First Order, Big Eater, Loyal Customer)
- Daily challenges (Try new item, Order before 11am)
- Leaderboards among friends
- Streak counters for consecutive orders
- Unlockable menu items and discounts

Order Tracking:
- Real-time status with fun animations
- Preparation stage indicators
- Estimated completion time
- Push notifications with personality
- Social sharing of order milestones
- Delivery tracking with live map

Customization Interface:
- Visual ingredient selection
- Size comparisons with animations
- Spice level with fun indicators
- Build-your-own options
- Nutritional impact display
- Price updates in real-time

Social Features:
- Group ordering functionality
- Share favorites with friends
- Photo reviews with filters
- Challenge friends to try items
- Birthday month promotions
- Student ID verification for discounts

Technical Features:
- Progressive Web App (PWA)
- Offline menu browsing
- Push notifications
- Camera integration for order photos
- Social media sharing
- Location services for delivery
- Biometric payment options
- Quick reorder from history

Youth-Specific Elements:
- TikTok-style vertical scrolling menu
- Snap-to-share order confirmations
- Emoji reactions for menu items
- Voice ordering option
- AR menu preview (future enhancement)
- Student ID integration
- Group payment splitting
```

### Prompt 4.2 - Fast-Food Operations & Kitchen Display
```bash
claude-code create "Create fast-food operations system with queue management, kitchen display, and delivery coordination for high-volume service"
```

**Contexte détaillé :**
```
Build a high-efficiency fast-food operations system optimized for speed and volume:

Staff Interfaces:

Cashier/Front Counter:
- Quick order entry with shortcuts
- Combo meal suggestions
- Upselling prompts
- Multiple payment methods (cash, card, mobile money)
- Student discount verification
- Order modification handling
- Customer queue management

Kitchen Display System:
- Color-coded order priorities
- Preparation time countdown
- Ingredient availability status
- Special preparation notes
- Allergen warnings
- Order modification alerts
- Efficiency metrics per station

Preparation Stations:
- Station-specific order filtering
- Ingredient checklist per item
- Quality control checkpoints
- Waste tracking
- Speed metrics
- Communication with other stations

Delivery Coordination:
- Order ready notifications
- Packaging requirements
- Delivery driver assignment
- Route optimization
- Customer communication
- Delivery confirmation

Manager Dashboard:
- Real-time performance metrics
- Staff efficiency monitoring
- Inventory level alerts
- Customer wait times
- Revenue tracking
- Peak hour analytics

Core Features:

Queue Management:
- Dynamic order prioritization
- Expected completion times
- Customer notification system
- Load balancing across stations
- Rush hour optimization
- Special order handling

Kitchen Workflow:
- Parallel preparation coordination
- Ingredient availability tracking
- Equipment status monitoring
- Temperature compliance
- Food safety timers
- Quality control checkpoints

Order Fulfillment:
- Packaging station coordination
- Order verification system
- Customer pickup notifications
- Delivery driver interface
- Order accuracy tracking
- Customer satisfaction monitoring

Performance Analytics:
- Service time metrics
- Order accuracy rates
- Customer satisfaction scores
- Staff productivity measures
- Peak hour analysis
- Revenue optimization insights

Real-time Features:
- Live order status updates
- Kitchen-to-counter communication
- Customer notification system
- Manager alert system
- Inventory level monitoring
- Equipment status tracking

Mobile Integration:
- Staff mobile alerts
- Delivery driver app
- Customer pickup notifications
- Manager oversight app
- Inventory scanning
- Emergency communication

Technical Implementation:
- Real-time dashboard with WebSocket
- Kitchen display monitors
- Mobile apps for staff
- POS system integration
- Inventory management system
- Customer notification system
- Analytics and reporting
- Cloud synchronization
```

## ✂️ Phase 5: Services Complémentaires (Semaines 10-11)

### Prompt 5.1 - Hair Salon Booking System
```bash
claude-code create "Build hair salon appointment booking system with barber selection, service customization, and client history using CRSINE booking flow adapted for salon services"
```

**Contexte détaillé :**
```
Create a professional hair salon booking system adapted from CRSINE's booking flow:

Booking Flow Adaptation:

Service Selection:
- Visual service cards (Coupe Simple, Dégradé, Barbe, Combo)
- Service duration and pricing display
- Before/after photo galleries
- Style trend showcase
- Seasonal promotion highlights

Barber Selection:
- Professional barber profiles
- Specialty services per barber
- Customer ratings and reviews
- Portfolio of work (photo gallery)
- Availability calendar per barber
- Price variations by experience level

Appointment Scheduling:
- Real-time availability calendar
- Preferred time slot selection
- Recurring appointment options
- Buffer time management
- Peak hour pricing indicators
- Same-day booking availability

Client Preferences:
- Previous service history
- Preferred barber requests
- Style preferences and notes
- Allergen/sensitivity information
- Communication preferences
- Special occasion requests

Features:

Client Management:
- Digital client cards
- Service history tracking
- Photo documentation of cuts
- Preference notes and reminders
- Birthday and special occasion tracking
- Loyalty program integration

Barber Interface:
- Daily appointment schedule
- Client information access
- Service notes and preferences
- Time tracking and efficiency metrics
- Earnings tracking
- Client feedback access

Salon Operations:
- Real-time schedule overview
- Walk-in queue management
- Equipment and station status
- Inventory level monitoring
- Staff performance analytics
- Revenue tracking per barber

Customer Experience:
- Appointment confirmations
- Reminder notifications
- Style inspiration gallery
- Before/after photo sharing
- Review and rating system
- Referral program integration

Technical Implementation:
- Calendar integration with availability
- Photo storage and management
- Client preference database
- Payment processing integration
- Notification system
- Mobile-optimized booking interface
```

### Prompt 5.2 - Auto Parts Shop System
```bash
claude-code create "Create auto parts shop with vehicle compatibility search, inventory management, and order fulfillment using hybrid CRSINE/TASTYC design approach"
```

**Contexte détaillé :**
```
Build a comprehensive auto parts shop system combining CRSINE's booking efficiency with TASTYC's catalog presentation:

Product Discovery:

Vehicle Compatibility Search:
- Make/model/year selection interface
- VIN number lookup option
- Compatibility verification system
- Alternative part suggestions
- Cross-reference database
- OEM vs. aftermarket options

Catalog Interface:
- Category-based navigation
- Advanced filtering options
- Part number search
- Visual part identification
- Comparison tools
- Bulk ordering options

Features:

Inventory Management:
- Real-time stock levels
- Supplier integration
- Reorder point alerts
- Price tracking and updates
- Seasonal demand forecasting
- Multi-location inventory

Order Processing:
- Quick quote generation
- B2B and retail pricing
- Volume discount calculation
- Shipping cost estimation
- Delivery scheduling
- Installation service booking

Customer Interface:
- Vehicle garage (saved vehicles)
- Order history and tracking
- Wishlist and saved searches
- Compatibility alerts
- Price drop notifications
- Expert consultation booking

Technical Features:
- Parts compatibility database
- Inventory synchronization
- Supplier API integration
- Shipping calculator
- Payment processing
- Order tracking system
```

## 🔗 Phase 6: Intégrations & Finalisation (Semaine 12)

### Prompt 6.1 - External Integrations
```bash
claude-code create "Implement WhatsApp Business API, Wave/Orange Money payments, and Odoo ERP integration for complete Breeze ecosystem"
```

**Contexte détaillé :**
```
Create comprehensive external integrations for the Breeze platform:

WhatsApp Business API Integration:
- Automated booking confirmations
- Service status updates
- Customer support chatbot
- Appointment reminders
- Promotional campaigns
- Order tracking updates
- Multilingual support (French/Wolof)

Payment Gateway Integration:
- Wave Money API implementation
- Orange Money API integration
- PayTech/PayDunya for cards
- Split payment options
- Automatic refund processing
- Payment confirmation workflows
- Multi-currency support (FCFA)

Odoo ERP Integration:
- Customer data synchronization
- Product/service catalog sync
- Invoice generation
- Inventory management
- Financial reporting
- Staff management
- Analytics data export

Additional Integrations:
- Google Maps for delivery routing
- Email service (SendGrid/Mailgun)
- SMS gateway for notifications
- Cloud storage (AWS S3/MinIO)
- Analytics (Google Analytics/Mixpanel)
- Error monitoring (Sentry)
```

### Prompt 6.2 - Performance Optimization & Deployment
```bash
claude-code create "Optimize Breeze platform performance, implement caching strategies, and setup production deployment with monitoring"
```

**Contexte détaillé :**
```
Finalize the Breeze platform with production-ready optimizations:

Performance Optimization:
- Image optimization and lazy loading
- Code splitting and bundle optimization
- Redis caching implementation
- Database query optimization
- CDN setup for static assets
- Progressive loading strategies

Production Deployment:
- Docker containerization
- Kubernetes orchestration
- CI/CD pipeline setup
- Environment configuration
- SSL certificate management
- Load balancing configuration

Monitoring & Analytics:
- Application performance monitoring
- Error tracking and alerting
- User behavior analytics
- Business metrics dashboard
- Health check endpoints
- Automated backup systems

Security Implementation:
- Rate limiting
- Input validation
- SQL injection prevention
- XSS protection
- CSRF tokens
- API security headers
```

## 📝 Instructions d'Usage des Prompts

### Ordre d'Exécution:
1. **Suivre l'ordre numérique** (1.1 → 1.2 → 1.3 → 2.1, etc.)
2. **Attendre la completion** de chaque prompt avant le suivant
3. **Tester et valider** chaque étape avant de continuer
4. **Adapter si nécessaire** selon les retours de Claude

### Format de Commande:
```bash
# Dans le terminal, dans le dossier de projet
claude-code create "[prompt exact ici]"
```

### Contexte à Fournir:
- **Toujours mentionner** qu'il s'agit de Breeze
- **Inclure les couleurs** #825313 et #e18e02  
- **Préciser l'inspiration** CRSINE et TASTYC
- **Rappeler le marché** sénégalais et multi-services

Cette roadmap de prompts vous permettra de construire progressivement une plateforme Breeze complète et professionnelle ! 🚀
