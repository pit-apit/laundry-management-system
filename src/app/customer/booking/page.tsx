'use client';

import { useState } from 'react';
import { useBookingStore } from '@/store/bookingStore';
import Step1ServiceSelection from '@/components/booking/Step1ServiceSelection';
import Step2ItemsSelection from '@/components/booking/Step2ItemsSelection';
import Step3AdditionalServices from '@/components/booking/Step3AdditionalServices';
import Step4PickupLocation from '@/components/booking/Step4PickupLocation';
import Step5PickupSchedule from '@/components/booking/Step5PickupSchedule';
import Step6PaymentMethod from '@/components/booking/Step6PaymentMethod';
import Step7ReviewOrder from '@/components/booking/Step7ReviewOrder';
import Step8ConfirmationPayment from '@/components/booking/Step8ConfirmationPayment';

export default function BookingPage() {
  const { data, currentStep, nextStep, previousStep, reset } = useBookingStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleStepComplete = () => {
    setIsLoading(false);
    nextStep();
  };

  const handleBack = () => {
    previousStep();
  };

  const handleSuccess = (orderId: string) => {
    // Redirect ke success page atau order detail
    window.location.href = `/customer/orders/${orderId}`;
  };

  const handleRestart = () => {
    reset();
  };

  // Progress bar
  const progressPercentage = (currentStep / 8) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Booking Laundry</h1>
            <span className="text-sm font-semibold text-gray-600">
              Step {currentStep} dari 8
            </span>
          </div>

          {/* Progress Track */}
          <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600 transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between mt-4 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
              <div
                key={step}
                className={`flex-1 h-10 rounded-lg flex items-center justify-center font-semibold text-sm transition-all ${
                  step < currentStep
                    ? 'bg-green-500 text-white'
                    : step === currentStep
                    ? 'bg-primary-600 text-white ring-2 ring-primary-300'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {step < currentStep ? '✓' : step}
              </div>
            ))}
          </div>

          {/* Step Labels */}
          <div className="grid grid-cols-8 gap-2 mt-3">
            <div className="text-xs text-center text-gray-600 font-medium">
              Layanan
            </div>
            <div className="text-xs text-center text-gray-600 font-medium">
              Items
            </div>
            <div className="text-xs text-center text-gray-600 font-medium">
              Tambahan
            </div>
            <div className="text-xs text-center text-gray-600 font-medium">
              Lokasi
            </div>
            <div className="text-xs text-center text-gray-600 font-medium">
              Jadwal
            </div>
            <div className="text-xs text-center text-gray-600 font-medium">
              Pembayaran
            </div>
            <div className="text-xs text-center text-gray-600 font-medium">
              Review
            </div>
            <div className="text-xs text-center text-gray-600 font-medium">
              Konfirmasi
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentStep === 1 && (
          <Step1ServiceSelection
            onNext={handleStepComplete}
            initialData={data}
          />
        )}

        {currentStep === 2 && (
          <Step2ItemsSelection
            onNext={handleStepComplete}
            onBack={handleBack}
            initialData={data}
          />
        )}

        {currentStep === 3 && (
          <Step3AdditionalServices
            onNext={handleStepComplete}
            onBack={handleBack}
            initialData={data}
          />
        )}

        {currentStep === 4 && (
          <Step4PickupLocation
            onNext={handleStepComplete}
            onBack={handleBack}
            initialData={data}
          />
        )}

        {currentStep === 5 && (
          <Step5PickupSchedule
            onNext={handleStepComplete}
            onBack={handleBack}
            initialData={data}
          />
        )}

        {currentStep === 6 && (
          <Step6PaymentMethod
            onNext={handleStepComplete}
            onBack={handleBack}
            initialData={data}
          />
        )}

        {currentStep === 7 && (
          <Step7ReviewOrder
            onNext={handleStepComplete}
            onBack={handleBack}
            orderData={data}
          />
        )}

        {currentStep === 8 && (
          <Step8ConfirmationPayment
            orderData={data}
            onBack={handleBack}
            onSuccess={handleSuccess}
          />
        )}
      </div>

      {/* Quick Navigation */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        {currentStep > 1 && (
          <button
            onClick={handleBack}
            className="px-4 py-2 bg-white text-gray-700 rounded-lg shadow-lg hover:shadow-xl transition border border-gray-200 font-semibold"
          >
            ← Sebelumnya
          </button>
        )}

        {currentStep === 1 && (
          <button
            onClick={handleRestart}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow-lg hover:bg-gray-300 transition font-semibold"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
