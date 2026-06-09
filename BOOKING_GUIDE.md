# Booking Implementation Guide

## 📋 Overview

Panduan lengkap untuk menyelesaikan implementasi fitur booking laundry 8 langkah dengan step terakhir (Step 8 - Konfirmasi & Pembayaran).

## ✅ File yang Sudah Dibuat

### Frontend Components
1. **Step8ConfirmationPayment.tsx** - Step terakhir untuk konfirmasi dan pembayaran
2. **bookingStore.ts** - Zustand state management untuk booking flow
3. **booking/page.tsx** - Main container page dengan progress bar dan step navigation
4. **booking.ts (types)** - TypeScript interfaces untuk booking flow

### Backend
1. **api/orders/route.ts** - API endpoint untuk create dan get orders

## 🚀 Quick Start

### 1. Install Zustand (jika belum ada)
```bash
npm install zustand
```

### 2. Update package.json dengan Zustand dependency
```json
{
  "dependencies": {
    "zustand": "^4.4.0"
  }
}
```

### 3. Import dan gunakan di Step Components
```tsx
import { useBookingStore } from '@/store/bookingStore';

export function StepComponent() {
  const { data, currentStep, updateStep1 } = useBookingStore();
  
  // Gunakan state di component
}
```

## 🎯 Fitur yang Sudah Implemented

### Step 8 - Confirmation & Payment
- ✅ Order summary review
- ✅ Payment method display
- ✅ Terms & conditions checkbox
- ✅ Order submission handling
- ✅ Success state dengan order ID
- ✅ Error handling & validation
- ✅ Loading state
- ✅ Security badge

### Booking Store
- ✅ State management untuk 8 steps
- ✅ Price calculation
- ✅ Step navigation (next/previous)
- ✅ Data persistence
- ✅ Reset functionality

### Booking Page
- ✅ Progress bar dengan percentage
- ✅ Step indicators (completed/current/upcoming)
- ✅ Step labels
- ✅ Dynamic step rendering
- ✅ Quick navigation buttons
- ✅ Responsive layout

## 📝 Backend Implementation Checklist

### Database
- [ ] Add Order model ke Prisma schema
- [ ] Add OrderItem model
- [ ] Add Payment model
- [ ] Add Address model (jika belum ada)
- [ ] Run `npm run db:push`
- [ ] Create indexes untuk performance

### API Endpoints
- [ ] Implement POST /api/orders (create order)
- [ ] Implement GET /api/orders (list orders)
- [ ] Implement GET /api/orders/:id (get detail)
- [ ] Implement PUT /api/orders/:id (update status)
- [ ] Add authentication middleware
- [ ] Add validation schemas (Zod)

### Payment Gateway
- [ ] Setup Midtrans / Xendit account
- [ ] Create payment helper functions
- [ ] Implement payment URL generation
- [ ] Setup webhook for payment callback
- [ ] Test dengan test credentials

### Email Service
- [ ] Setup email provider (SendGrid/Resend)
- [ ] Create email templates
- [ ] Send confirmation email
- [ ] Send payment link email
- [ ] Send status update emails

## 🔧 Integration dengan Existing Steps

Pastikan setiap step component terintegrasi dengan store:

```tsx
// Example di Step1ServiceSelection.tsx
import { useBookingStore } from '@/store/bookingStore';

export function Step1ServiceSelection({ onNext, initialData }) {
  const { updateStep1, nextStep } = useBookingStore();
  
  const handleSelect = (service: string, price: number) => {
    updateStep1({ service, basePrice: price });
    nextStep(); // atau onNext()
  };
  
  return (
    // Component JSX
  );
}
```

## 📊 Data Flow

```
Step 1 (Service) 
  ↓ updateStep1() 
  ↓
Step 2 (Items) 
  ↓ updateStep2() 
  ↓
Step 3 (Express) 
  ↓ updateStep3() 
  ↓
Step 4 (Address) 
  ↓ updateStep4() 
  ↓
Step 5 (Schedule) 
  ↓ updateStep5() 
  ↓
Step 6 (Payment) 
  ↓ updateStep6() 
  ↓
Step 7 (Review) 
  ↓
Step 8 (Confirmation & Payment)
  ↓
POST /api/orders
  ↓
Payment Gateway
  ↓
Success Page
```

## 🎨 UI Customization

### Colors (Update di tailwind config)
- Primary Purple: `#9333ea` to `#a855f7`
- Success Green: `#10b981`
- Error Red: `#ef4444`
- Warning Blue: `#3b82f6`

### Typography
- Heading: Bold, 24-32px
- Subheading: Semibold, 18-20px
- Body: Regular, 14-16px
- Small: Regular, 12-13px

## 🔒 Security Checklist

- [ ] Validate user authentication pada setiap API call
- [ ] Validate payment amount server-side
- [ ] Implement rate limiting untuk order creation
- [ ] Hash sensitive data di database
- [ ] Use HTTPS untuk payment gateway
- [ ] Implement CSRF protection
- [ ] Sanitize user input dengan Zod validation
- [ ] Log sensitive operations
- [ ] Implement audit trail

## 🧪 Testing

### Unit Tests
```bash
npm test -- Step8ConfirmationPayment.test.tsx
npm test -- bookingStore.test.ts
```

### Integration Tests
- Test complete booking flow
- Test payment gateway callback
- Test email notifications

### Manual Testing
- Test dengan semua browser
- Test mobile responsiveness
- Test dengan slow network
- Test payment methods

## 🚨 Common Issues & Solutions

### Issue: Store tidak update
**Solution**: Pastikan component adalah Client Component (`'use client'`)

### Issue: API 404
**Solution**: Pastikan path `/api/orders` benar di `src/app/api/orders/route.ts`

### Issue: Payment tidak redirect
**Solution**: Check payment gateway configuration dan API response

## 📚 Documentation Links

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Prisma ORM](https://www.prisma.io/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 📞 Support

Untuk pertanyaan atau issues:
1. Check dokumentasi yang ada
2. Review implementation guide di atas
3. Check TODO comments di code
4. Create GitHub issue dengan detail

---

**Last Updated**: 9 Juni 2026
**Status**: Ready for Backend Implementation
