export type NailShape = 'almond' | 'coffin' | 'square' | 'oval' | 'stiletto' | 'short';
export type NailLength = 'short' | 'medium' | 'long' | 'extra-long';
export type NailFinish = 'glazed-chrome' | 'pearl' | 'matte' | 'french-tip' | 'holographic' | 'gel-gloss';
export type NailSize = 'XS' | 'S' | 'M' | 'L' | 'Custom';

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number; // in INR
  originalPrice?: number;
  shape: NailShape;
  length: NailLength;
  finish: NailFinish;
  finishLabel: string;
  colors: string[];
  primaryColorName: string;
  image: string;
  hoverImage?: string;
  badge?: string;
  description: string;
  rating: number;
  reviewCount: number;
  occasion: string;
  features: string[];
  inStock: boolean;
}

export interface PolishShade {
  id: string;
  name: string;
  hex: string;
  finish: string;
  tagline: string;
  price: number; // in INR
  volume: string;
  swatchTone: string;
  description: string;
}

export interface CartItem {
  product: Product;
  size: NailSize;
  customSizes?: { thumb: string; index: string; middle: string; ring: string; pinky: string };
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  productName: string;
  verified: boolean;
  comment: string;
  avatarColor: string;
  shapePurchased: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'sizing' | 'application' | 'durability' | 'shipping';
}
