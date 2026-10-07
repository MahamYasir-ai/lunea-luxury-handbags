export interface ColorVariant {
  name: string;
  hex: string;
  hardwareHex?: string;
  image?: string;
}

export interface ProductSpecification {
  leatherType?: string;
  hardwareFinish?: string;
  lining?: string;
  strapDrop?: string;
  dimensions?: string;
  weight?: string;
  closure?: string;
  craftsmanshipOrigin?: string;
  editionLimit?: string;
  serialCertification?: string;
}

export interface Review {
  id: string;
  author: string;
  location?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  editionPurchased?: string;
}

export type ProductCategory = 
  | 'Clutches & Evening'
  | 'Shoulder & Crossbody'
  | 'Statement Totes'
  | 'Micro & Minaudière'
  | 'Limited Editions';

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  subcategory: string;
  collection: string;
  rating: number;
  reviewCount: number;
  images: string[];
  colors: ColorVariant[];
  material: string;
  dimensions: string;
  stock: number;
  featured: boolean;
  bestseller: boolean;
  newArrival: boolean;
  tags: string[];
  specifications: ProductSpecification;
  reviews?: Review[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  heroImage: string;
  excerpt: string;
  content: string[];
}

