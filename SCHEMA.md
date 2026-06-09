# Laundry Management System - Database Schema

## Overview
Sistem manajemen laundri dengan fitur:
- Customer booking (8 langkah)
- Admin dashboard
- Real-time tracking
- Multiple payment methods
- OpenStreetMap integration

## Database Models

### User (users)
```
- id (CUID)
- name (String)
- email (String, unique)
- password (String, hashed)
- phone (String, optional)
- role (CUSTOMER, ADMIN, WORKER)
- createdAt, updatedAt
```

### Service (services)
```
- id (CUID)
- name (String, unique): "Cuci Komplit", "Cuci Kering", "Setrika Saja"
- description (String)
- basePrice (Float): default 10000
- items: ServiceItem[]
- orders: Order[]
```

### ServiceItem (service_items)
Kategori & Item:
1. **PAKAIAN (14 items)**
   - Kaos, Kemeja, Celana, Jaket, Dress, dll

2. **AKSESORIS (6 items)**
   - Topi, Tas, Sepatu, Dompet, Kaca Mata, Pernak-pernik

3. **PERLENGKAPAN (3 items)**
   - Sprei, Selimut, Bantal

4. **BONEKA (3 items)**
   - Boneka Kecil, Boneka Sedang, Boneka Besar

### Address (addresses)
Lokasi penjemputan dengan data:
- name, phone, street
- addressType: RUMAH, KOS, RUKO, LAINNYA
- latitude, longitude (untuk maps)
- isDefault

### Order (orders)
Flow 8 Langkah:
1. Service selection
2. Item category + items
3. Express option (tambah 10k)
4. Address (pickup location)
5. Schedule (date + time 09:00-18:00)
6. Payment method
7. Review
8. Confirmation

Status: PENDING → CONFIRMED → PICKED_UP → PROCESSING → READY → DELIVERED → COMPLETED

### OrderItem (order_items)
Item detail dalam order dengan quantity & price

### Payment (payments)
Methods:
- QRIS
- BCA_MBANKING
- MANDIRI_MBANKING
- BRI_MBANKING
- COD
- DP

Status: PENDING → COMPLETED atau FAILED

## Setup Instructions

1. Copy `.env.example` ke `.env.local`
2. Konfigurasi DATABASE_URL dengan PostgreSQL Anda
3. Jalankan:
```bash
npm run db:push
npm run db:migrate
```
