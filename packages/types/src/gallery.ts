// Gallery Component Types (inspired by TASTYC)

export interface GalleryProps {
  images: GalleryImage[];
  categories: string[];
  lightboxEnabled: boolean;
  layout: 'masonry' | 'grid' | 'carousel';
}

export interface GalleryImage {
  id: string;
  url: string;
  thumbnail?: string;
  alt: string;
  title?: string;
  description?: string;
  category: string;
  tags: string[];
  metadata?: {
    width: number;
    height: number;
    size: number;
    format: string;
    takenAt?: Date;
    location?: string;
  };
}