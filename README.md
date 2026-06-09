# Laundry Management System 🧺

Sistem manajemen laundri modern dengan fitur booking online, tracking pesanan, dan admin dashboard.

## 🎨 Fitur Utama

### Customer Dashboard
- ✅ Sistem login/register
- ✅ Booking laundri 8 langkah:
  - Pilih layanan (Cuci Komplit, Cuci Kering, Setrika Saja)
  - Pilih kategori item (Pakaian, Aksesoris, Perlengkapan Rumah, Boneka)
  - Pilih layanan tambahan (Reguler/Express)
  - Input lokasi penjemputan dengan maps (OpenStreetMap)
  - Pilih jadwal penjemputan
  - Pilih metode pembayaran
  - Review pesanan
  - Download invoice
- ✅ Tracking pesanan real-time
- ✅ History pesanan
- ✅ Rating & review

### Admin Dashboard
- ✅ Dashboard overview (orders, revenue, customers)
- ✅ Manajemen pesanan (view, update status, assign worker)
- ✅ Manajemen pelanggan
- ✅ Manajemen layanan & harga
- ✅ Laporan & analytics
- ✅ Manajemen pembayaran

## 🛠️ Tech Stack
- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL dengan Prisma ORM
- **Authentication**: JWT + Next-Auth
- **Maps**: OpenStreetMap dengan Leaflet
- **Payment**: QRIS, M-Banking, COD, DP
- **Reports**: PDF Invoice

## 🎨 Tema Warna
- **Primary Color**: Ungu (#9333ea - #a855f7)

## 📦 Instalasi

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Git

### Setup

1. Clone repository
```bash
git clone https://github.com/pit-apit/laundry-management-system.git
cd laundry-management-system
```

2. Install dependencies
```bash
npm install
```

3. Setup environment
```bash
cp .env.example .env.local
# Edit .env.local dengan konfigurasi database Anda
```

4. Setup database
```bash
npm run db:push
```

5. Jalankan development server
```bash
npm run dev
```

Buka http://localhost:3000 di browser.

## 📁 Project Structure
```
.
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   ├── pages/           # API routes
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom React hooks
│   ├── types/           # TypeScript types
│   └── styles/          # Global styles
├── prisma/
│   └── schema.prisma    # Database schema
├── public/              # Static files
└── README.md
```

## 🚀 Development Guide

### Database Commands
```bash
npm run db:push        # Sync schema dengan database
npm run db:migrate     # Create migration
npm run db:studio      # Open Prisma Studio
```

## 📝 API Endpoints

### Auth
- `POST /api/auth/register` - Register customer
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order detail
- `PUT /api/orders/:id` - Update order

### Admin
- `GET /api/admin/dashboard` - Dashboard stats
- `GET /api/admin/orders` - All orders
- `PUT /api/admin/orders/:id` - Update order status

## 🔐 Security
- Password hashing dengan bcryptjs
- JWT authentication
- Protected API routes
- CORS configuration

## 📱 Responsive Design
- Mobile First approach
- Responsive pada semua ukuran device
- Touch-friendly interface

## 🤝 Contributing
Silakan buat pull request untuk improvements.

## 📄 License
MIT

## 👨‍💻 Author
pit-apit
