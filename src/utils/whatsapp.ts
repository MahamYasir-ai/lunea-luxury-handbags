import { CartItem } from '../types/cart';

export const WHATSAPP_NUMBER = '+923366551688';
export const WHATSAPP_CLEAN_NUMBER = '923366551688';

export interface WhatsAppOrderPayload {
  orderNumber: string;
  createdAt: string;
  customer: {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    address: string;
    apartment?: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
    giftNote?: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  paymentMethod?: string;
}

export function generateWhatsAppOrderMessage(data: WhatsAppOrderPayload): string {
  const {
    orderNumber,
    createdAt,
    customer,
    items,
    subtotal,
    discount,
    tax,
    total,
    paymentMethod,
  } = data;

  const fullName = `${customer.firstName.trim()} ${customer.lastName.trim()}`.trim();
  const addressLine = [
    customer.address.trim(),
    customer.apartment?.trim(),
    customer.city.trim(),
    customer.state?.trim(),
    customer.postalCode.trim(),
    customer.country.trim(),
  ]
    .filter(Boolean)
    .join(', ');

  const itemsList = items
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}*\n` +
        `   • Qty: ${item.quantity}\n` +
        `   • Finish: ${item.selectedColor?.name || 'Signature'}\n` +
        `   • Price: $${(item.product.price * item.quantity).toLocaleString()}`
    )
    .join('\n\n');

  let text = `⚜️ *LUNÉA AURUM LUXURY — ORDER ACQUISITION* ⚜️\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `📋 *Order Number:* ${orderNumber}\n`;
  text += `📅 *Date:* ${createdAt}\n\n`;

  text += `👤 *PATRON / CUSTOMER DETAILS:*\n`;
  text += `• *Full Name:* ${fullName}\n`;
  text += `• *Phone / WhatsApp:* ${customer.phone}\n`;
  text += `• *Email:* ${customer.email}\n\n`;

  text += `📍 *SHIPPING & DELIVERY ADDRESS:*\n`;
  text += `• *Destination:* ${addressLine}\n`;
  text += `• *City:* ${customer.city}\n`;
  text += `• *Country:* ${customer.country}\n`;
  text += `• *Courier:* White-Glove Armored Courier (Complimentary)\n\n`;

  text += `🛍️ *ORDERED MASTERPIECES (${items.length} ${items.length === 1 ? 'item' : 'items'}):*\n`;
  text += `${itemsList}\n\n`;

  text += `💰 *FINANCIAL SETTLEMENT:*\n`;
  text += `• *Subtotal:* $${subtotal.toLocaleString()}\n`;
  if (discount > 0) {
    text += `• *Privilege Discount:* -$${discount.toLocaleString()}\n`;
  }
  text += `• *Courier Delivery:* COMPLIMENTARY\n`;
  text += `• *Estimated Tax (8%):* $${tax.toLocaleString()}\n`;
  text += `• *TOTAL DUE:* $${total.toLocaleString()}\n`;
  if (paymentMethod) {
    text += `• *Payment Preference:* ${
      paymentMethod === 'card'
        ? 'Credit Card / Amex'
        : paymentMethod === 'apple_pay'
        ? 'Apple Pay / Wire Transfer'
        : 'WhatsApp Direct Settlement'
    }\n`;
  }

  if (customer.giftNote && customer.giftNote.trim()) {
    text += `\n✍️ *Gift Inscription Note:*\n"${customer.giftNote.trim()}"\n`;
  }

  text += `━━━━━━━━━━━━━━━━━━━━━━━\n`;
  text += `Kindly confirm receipt of this order and share the fulfillment schedule. Thank you!`;

  return text;
}

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_CLEAN_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function openWhatsAppChat(message: string): boolean {
  const url = buildWhatsAppLink(message);
  try {
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}
