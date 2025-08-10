// Font configuration for Breeze monorepo
export const fontHierarchy = {
  // Primary font for body text and UI elements
  body: 'font-sans', // Inter
  
  // Display font for headings and titles
  heading: {
    // Main headings (H1, H2)
    primary: 'font-playfair',
    // Secondary headings (H3, H4, H5, H6)
    secondary: 'font-sans',
  },
  
  // Special use cases
  brand: 'font-playfair', // Brand names and logos
  button: 'font-sans',    // Buttons and CTAs
  caption: 'font-sans',   // Small text and captions
  navigation: 'font-sans', // Navigation items
} as const;

// Font size scale
export const fontSizes = {
  // Display sizes
  'display-2xl': 'text-6xl md:text-7xl',
  'display-xl': 'text-5xl md:text-6xl', 
  'display-lg': 'text-4xl md:text-5xl',
  'display-md': 'text-3xl md:text-4xl',
  'display-sm': 'text-2xl md:text-3xl',
  
  // Heading sizes
  'heading-xl': 'text-4xl',
  'heading-lg': 'text-3xl',
  'heading-md': 'text-2xl',
  'heading-sm': 'text-xl',
  'heading-xs': 'text-lg',
  
  // Body sizes
  'body-xl': 'text-xl',
  'body-lg': 'text-lg',
  'body-md': 'text-base',
  'body-sm': 'text-sm',
  'body-xs': 'text-xs',
} as const;

// Font weight utilities
export const fontWeights = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
} as const;

// Common font combinations
export const fontCombinations = {
  // Hero sections
  hero: {
    title: `${fontHierarchy.heading.primary} ${fontWeights.bold} ${fontSizes['display-xl']}`,
    subtitle: `${fontHierarchy.body} ${fontWeights.normal} ${fontSizes['body-xl']}`,
  },
  
  // Section headers
  section: {
    title: `${fontHierarchy.heading.primary} ${fontWeights.bold} ${fontSizes['heading-xl']}`,
    subtitle: `${fontHierarchy.body} ${fontWeights.normal} ${fontSizes['body-lg']}`,
  },
  
  // Card components
  card: {
    title: `${fontHierarchy.heading.secondary} ${fontWeights.semibold} ${fontSizes['heading-sm']}`,
    description: `${fontHierarchy.body} ${fontWeights.normal} ${fontSizes['body-md']}`,
    caption: `${fontHierarchy.caption} ${fontWeights.normal} ${fontSizes['body-sm']}`,
  },
  
  // Navigation
  nav: {
    brand: `${fontHierarchy.brand} ${fontWeights.bold} ${fontSizes['heading-sm']}`,
    link: `${fontHierarchy.navigation} ${fontWeights.medium} ${fontSizes['body-md']}`,
  },
  
  // Buttons
  button: {
    primary: `${fontHierarchy.button} ${fontWeights.medium} ${fontSizes['body-md']}`,
    large: `${fontHierarchy.button} ${fontWeights.medium} ${fontSizes['body-lg']}`,
    small: `${fontHierarchy.button} ${fontWeights.medium} ${fontSizes['body-sm']}`,
  },
} as const;

export type FontHierarchy = typeof fontHierarchy;
export type FontSizes = typeof fontSizes;
export type FontWeights = typeof fontWeights;
export type FontCombinations = typeof fontCombinations;