/**
 * Booking Form Types
 * Type definitions untuk booking flow
 */

export interface ServiceOption {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  icon?: string;
}

export interface ItemCategory {
  id: string;
  name: string;
  description: string;
  items: ServiceItem[];
}

export interface ServiceItem {
  id: string;
  name: string;
  categoryId: string;
  price: number;
  description?: string;
}

export interface SelectedItem extends ServiceItem {
  quantity: number;
}

export interface PickupAddress {
  id?: string;
  name: string;
  phone: string;
  street: string;
  city?: string;
  zipCode?: string;
  addressType: 'RUMAH' | 'KOS' | 'RUKO' | 'LAINNYA';
  latitude: number;
  longitude: number;
  isDefault?: boolean;
}

export interface PickupSchedule {
  date: string; // ISO date string
  time: string; // HH:mm format
  estimatedReturn: string; // ISO date string
}

export interface PaymentOption {
  id: string;
  name: string;
  description: string;
  badge: string;
  icon?: string;
  info?: string;
}

export interface OrderSummary {
  service: string;
  itemCount: number;
  isExpress: boolean;
  address: PickupAddress;
  schedule: PickupSchedule;
  paymentMethod: string;
  totalPrice: number;
  basePrice: number;
  expressPrice: number;
  selectedItems: SelectedItem[];
}

export interface CreateOrderRequest {
  serviceId: string;
  itemCount: number;
  isExpress: boolean;
  pickupAddressId: string;
  pickupDate: string;
  pickupTime: string;
  paymentMethod: string;
  totalPrice: number;
  estimatedReturnDate: string;
  notes?: string;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  message: string;
  paymentUrl?: string;
  estimatedPickup?: string;
}

export interface OrderResponse {
  id: string;
  userId: string;
  serviceId: string;
  totalPrice: number;
  status: OrderStatus;
  pickupDate: string;
  estimatedReturnDate: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'PICKED_UP'
  | 'PROCESSING'
  | 'READY'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELLED';

export type PaymentMethod = 'QRIS' | 'BCA_MBANKING' | 'MANDIRI_MBANKING' | 'BRI_MBANKING' | 'COD' | 'DP';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'EXPIRED';

export interface ValidationError {
  field: string;
  message: string;
}

export interface BookingState {
  currentStep: number;
  data: Partial<OrderSummary>;
  errors: ValidationError[];
  isLoading: boolean;
}
