// Review and Testimonials Types

export interface Review {
  id: string;
  userId: string;
  
  // Polymorphic relations
  menuItemId?: string;
  reservationId?: string;
  
  rating: number; // 1-5
  title?: string;
  comment: string;
  images: string[];
  
  // Moderation
  isApproved: boolean;
  moderatedAt?: Date;
  
  createdAt: Date;
  
  // Relations
  user?: User;
  menuItem?: any;
  reservation?: any;
}

export interface Testimonial {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  content: string;
  rating: number;
  serviceType: string;
  featured: boolean;
  createdAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}