import { NextRequest, NextResponse } from 'next/server';

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      serviceId,
      itemCount,
      isExpress,
      pickupAddressId,
      pickupDate,
      pickupTime,
      paymentMethod,
      totalPrice,
      estimatedReturnDate,
    } = body;

    // Validasi input
    if (!serviceId || !pickupAddressId || !paymentMethod) {
      return NextResponse.json(
        { message: 'Data pesanan tidak lengkap' },
        { status: 400 }
      );
    }

    // TODO: Implementasi logic berikut:
    // 1. Get authenticated user dari session/JWT
    // 2. Validasi service exists di database
    // 3. Validasi address exists dan milik user
    // 4. Calculate total price jika belum ada
    // 5. Create order record di database
    // 6. Create payment record dengan status PENDING
    // 7. Create order items records
    // 8. Trigger payment gateway (QRIS, M-Banking, dll)
    // 9. Send confirmation email ke customer
    // 10. Return order ID dan payment redirect URL

    // Temporary mock response
    const orderId = `ORDER-${Date.now()}`;

    return NextResponse.json(
      {
        success: true,
        orderId,
        message: 'Pesanan berhasil dibuat. Silakan lanjut ke pembayaran',
        paymentUrl: `/payment/${orderId}`, // URL ke payment gateway
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { message: 'Gagal membuat pesanan. Silakan coba lagi.' },
      { status: 500 }
    );
  }
}

// GET /api/orders - Get user orders
export async function GET(request: NextRequest) {
  try {
    // TODO: Implementasi:
    // 1. Get authenticated user
    // 2. Query orders dari database dengan filter user
    // 3. Include order items, payment status, dll
    // 4. Return paginated results

    return NextResponse.json(
      {
        orders: [],
        total: 0,
        message: 'Belum ada pesanan',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { message: 'Gagal mengambil data pesanan' },
      { status: 500 }
    );
  }
}
