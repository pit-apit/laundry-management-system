/**
 * Booking Form State Management
 * Manages the state for the 8-step booking flow
 */

import { create } from 'zustand';

export interface BookingStep1Data {
  service: string;
  basePrice: number;
}

export interface BookingStep2Data {
  selectedCategory: string;
  selectedItems: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  itemCount: number;
}

export interface BookingStep3Data {
  isExpress: boolean;
  expressPrice: number;
}

export interface BookingStep4Data {
  address: {
    id?: string;
    name: string;
    phone: string;
    street: string;
    addressType: string;
    latitude: number;
    longitude: number;
  };
}

export interface BookingStep5Data {
  pickupDate: string;
  pickupTime: string;
  estimatedReturnDate: string;
}

export interface BookingStep6Data {
  paymentMethod: string;
}

export interface BookingFormData
  extends BookingStep1Data,
    BookingStep2Data,
    BookingStep3Data,
    BookingStep4Data,
    BookingStep5Data,
    BookingStep6Data {
  totalPrice: number;
}

interface BookingStore {
  // Data
  data: Partial<BookingFormData>;
  currentStep: number;

  // Actions
  setStep: (step: number) => void;
  nextStep: () => void;
  previousStep: () => void;

  // Update individual steps
  updateStep1: (data: BookingStep1Data) => void;
  updateStep2: (data: BookingStep2Data) => void;
  updateStep3: (data: BookingStep3Data) => void;
  updateStep4: (data: BookingStep4Data) => void;
  updateStep5: (data: BookingStep5Data) => void;
  updateStep6: (data: BookingStep6Data) => void;

  // Calculations
  calculateTotalPrice: () => number;

  // Reset
  reset: () => void;
}

const initialState: Partial<BookingFormData> = {
  service: '',
  basePrice: 0,
  selectedCategory: '',
  selectedItems: [],
  itemCount: 0,
  isExpress: false,
  expressPrice: 0,
  address: {
    name: '',
    phone: '',
    street: '',
    addressType: '',
    latitude: 0,
    longitude: 0,
  },
  pickupDate: '',
  pickupTime: '',
  estimatedReturnDate: '',
  paymentMethod: '',
  totalPrice: 0,
};

export const useBookingStore = create<BookingStore>((set, get) => ({
  data: initialState,
  currentStep: 1,

  setStep: (step: number) =>
    set({
      currentStep: Math.max(1, Math.min(step, 8)),
    }),

  nextStep: () =>
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, 8),
    })),

  previousStep: () =>
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, 1),
    })),

  updateStep1: (data: BookingStep1Data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),

  updateStep2: (data: BookingStep2Data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),

  updateStep3: (data: BookingStep3Data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),

  updateStep4: (data: BookingStep4Data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),

  updateStep5: (data: BookingStep5Data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),

  updateStep6: (data: BookingStep6Data) =>
    set((state) => ({
      data: { ...state.data, ...data },
    })),

  calculateTotalPrice: () => {
    const state = get();
    let total = state.data.basePrice || 0;

    // Add items cost
    if (state.data.selectedItems) {
      total += state.data.selectedItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity || 0);
      }, 0);
    }

    // Add express fee
    if (state.data.isExpress) {
      total += state.data.expressPrice || 10000;
    }

    return total;
  },

  reset: () => set({ data: initialState, currentStep: 1 }),
}));

/**
 * Contoh penggunaan di component:
 *
 * import { useBookingStore } from '@/store/bookingStore';
 *
 * export function BookingComponent() {
 *   const { data, currentStep, nextStep, updateStep1 } = useBookingStore();
 *
 *   const handleServiceSelect = (service: string, price: number) => {
 *     updateStep1({ service, basePrice: price });
 *     nextStep();
 *   };
 *
 *   return (
 *     <div>
 *       {currentStep === 1 && (
 *         <Step1ServiceSelection onSelect={handleServiceSelect} />
 *       )}
 *     </div>
 *   );
 * }
 */
