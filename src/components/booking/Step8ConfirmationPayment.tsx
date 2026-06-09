'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface OrderData {
  service?: string;
  itemCount?: number;
  isExpress?: boolean;
  address?: {
    name: string;
    phone: string;
    street: string;
    addressType: string;
    latitude: number;
    longitude: number;
  };
  pickupDate?: string;
  pickupTime?: string;
  paymentMethod?: string;
  totalPrice?: number;
  estimatedReturn?: string;
}

interface Step8Props {
  orderData: OrderData;
  onBack: () => void;
  onSuccess: (orderId: string) => void;
}

export default function Step8ConfirmationPayment({
  orderData,
  onBack,
  onSuccess,
}: Step8Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmitOrder = async () => {
    try {
      setError(null);
      setLoading(true);

      if (!agreeTerms) {
        setError('Anda harus menyetujui syarat dan ketentuan');
        return;
      }

      // Validasi data order
      if (!orderData.service || !orderData.address || !orderData.paymentMethod) {
        setError('Data pesanan tidak lengkap');
        return;
      }

      // Submit order ke API
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceId: orderData.service,
          itemCount: orderData.itemCount,
          isExpress: orderData.isExpress,
          pickupAddressId: orderData.address,
          pickupDate: orderData.pickupDate,
          pickupTime: orderData.pickupTime,
          paymentMethod: orderData.paymentMethod,
          totalPrice: orderData.totalPrice,
          estimatedReturnDate: orderData.estimatedReturn,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal membuat pesanan');
      }

      const data = await response.json();
      setOrderId(data.orderId);
      setSuccess(true);

      // Trigger callback
      setTimeout(() => {
        onSuccess(data.orderId);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pesanan Berhasil Dibuat!
          </h2>

          <p className="text-gray-600 mb-4">
            Terima kasih telah mempercayai layanan kami. Pesanan Anda sedang diproses.
          </p>

          {orderId && (
            <div className="bg-primary-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Nomor Pesanan</p>
              <p className="text-2xl font-bold text-primary-600">{orderId}</p>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              ✅ Konfirmasi payment telah dikirim ke email Anda
            </p>
            <p className="text-sm text-blue-800 mt-2">
              🔍 Cek status pesanan di dashboard Anda
            </p>
          </div>

          <button
            onClick={() => (window.location.href = '/customer/dashboard')}
            className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
          >
            Lihat Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Konfirmasi & Pembayaran
            </h1>
            <span className="text-sm font-semibold text-primary-600 bg-primary-50 px-4 py-2 rounded-full">
              Step 8 / 8
            </span>
          </div>
          <p className="text-gray-600">
            Periksa kembali detail pesanan Anda sebelum melakukan pembayaran
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-800 mb-1">Terjadi Kesalahan</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Ringkasan Pesanan</h2>

          <div className="space-y-4">
            {/* Service */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Layanan Laundry</p>
                <p className="font-semibold text-gray-900">{orderData.service}</p>
              </div>
              {orderData.isExpress && (
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  EXPRESS
                </span>
              )}
            </div>

            {/* Items */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Jumlah Item</p>
                <p className="font-semibold text-gray-900">{orderData.itemCount} items</p>
              </div>
            </div>

            {/* Pickup Location */}
            <div className="flex justify-between items-start pb-4 border-b border-gray-200">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">Lokasi Penjemputan</p>
                <p className="font-semibold text-gray-900">{orderData.address?.name}</p>
                <p className="text-sm text-gray-600 mt-1">{orderData.address?.street}</p>
                <p className="text-xs text-gray-500 mt-1">
                  📱 {orderData.address?.phone}
                </p>
              </div>
            </div>

            {/* Schedule */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Jadwal Penjemputan</p>
                <p className="font-semibold text-gray-900">
                  {orderData.pickupDate &&
                    format(new Date(orderData.pickupDate), 'EEEE, dd MMMM yyyy', {
                      locale: id,
                    })}
                </p>
                <p className="text-sm text-gray-600 mt-1">Pukul {orderData.pickupTime}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Metode Pembayaran</p>
                <p className="font-semibold text-gray-900">
                  {getPaymentMethodLabel(orderData.paymentMethod)}
                </p>
              </div>
              <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded-full">
                {getPaymentMethodBadge(orderData.paymentMethod)}
              </span>
            </div>

            {/* Estimated Return */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-600 mb-1">Estimasi Pengembalian</p>
                <p className="font-semibold text-gray-900">
                  {orderData.estimatedReturn &&
                    format(new Date(orderData.estimatedReturn), 'EEEE, dd MMMM yyyy', {
                      locale: id,
                    })}
                </p>
              </div>
            </div>

            {/* Total Price */}
            <div className="flex justify-between items-center pt-4 bg-gradient-to-r from-primary-50 to-primary-100 p-4 rounded-lg">
              <p className="text-lg font-bold text-gray-900">Total Harga</p>
              <p className="text-2xl font-bold text-primary-600">
                Rp {formatCurrency(orderData.totalPrice || 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-1"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Saya menyetujui Syarat & Ketentuan
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Saya telah membaca dan menyetujui{' '}
                <a href="#" className="text-primary-600 hover:underline">
                  syarat & ketentuan
                </a>{' '}
                serta{' '}
                <a href="#" className="text-primary-600 hover:underline">
                  kebijakan privasi
                </a>{' '}
                kami.
              </p>
            </div>
          </label>
        </div>

        {/* Payment Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
          <h3 className="font-bold text-blue-900 mb-3">💳 Informasi Pembayaran</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li>✓ Pembayaran dilakukan setelah menekan tombol "Lanjut Pembayaran"</li>
            <li>✓ Anda akan diarahkan ke gateway pembayaran yang aman</li>
            <li>✓ Pesanan akan dikonfirmasi setelah pembayaran berhasil</li>
            <li>✓ Tim kami akan menghubungi untuk penjemputan</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-4">
          <button
            onClick={onBack}
            disabled={loading}
            className="px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Kembali
          </button>
          <button
            onClick={handleSubmitOrder}
            disabled={loading || !agreeTerms}
            className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:shadow-lg transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader className="w-5 h-5 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                Lanjut Pembayaran →
              </>
            )}
          </button>
        </div>

        {/* Security Badge */}
        <div className="mt-8 flex justify-center items-center gap-2 text-xs text-gray-600">
          <svg
            className="w-4 h-4 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          🔒 Transaksi Anda dilindungi dengan enkripsi SSL 256-bit
        </div>
      </div>
    </div>
  );
}

// Helper Functions
function getPaymentMethodLabel(method?: string): string {
  const labels: Record<string, string> = {
    QRIS: 'QRIS',
    BCA_MBANKING: 'BCA Mobile Banking',
    MANDIRI_MBANKING: 'Mandiri Mobile Banking',
    BRI_MBANKING: 'BRI Mobile Banking',
    COD: 'Cash on Delivery',
    DP: 'Down Payment (50%)',
  };
  return labels[method || ''] || 'Unknown';
}

function getPaymentMethodBadge(method?: string): string {
  const badges: Record<string, string> = {
    QRIS: 'QRIS',
    BCA_MBANKING: 'M-Banking',
    MANDIRI_MBANKING: 'M-Banking',
    BRI_MBANKING: 'M-Banking',
    COD: 'COD',
    DP: 'DP',
  };
  return badges[method || ''] || 'Unknown';
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
