import { Product, ColorVariant } from './product';

export interface CartItem {
  id: string; // generated unique id: productId + colorName
  product: Product;
  quantity: number;
  selectedColor?: ColorVariant;
}

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  shippingMethod: 'standard' | 'express';
  paymentMethod: 'card' | 'apple_pay';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  giftNote?: string;
}

export interface OrderConfirmationData {
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: CheckoutFormData;
  estimatedDelivery: string;
}
