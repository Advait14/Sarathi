"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  INDIAN_STATES,
  PORTAL_SERVICES,
  type PortalServiceItem,
  type StateRecord,
} from "@/data/portalEntry";
import { Step1StateSelection } from "./Step1StateSelection";
import { Step2ServicesHub } from "./Step2ServicesHub";
import { Step3ServiceInstructions } from "./Step3ServiceInstructions";
import { Step4SmartDlLookup } from "./Step4SmartDlLookup";
import { Step5DlDetailsConfirmation } from "./Step5DlDetailsConfirmation";
import { Step6AddressConfirmation } from "./Step6AddressConfirmation";
import { Step7CitizenAuthentication } from "./Step7CitizenAuthentication";
import { Step8EndorsementApplicationForm } from "./Step8EndorsementApplicationForm";
import { Step9ApplicationReferenceSlip } from "./Step9ApplicationReferenceSlip";
import { Step10StatutoryFeePayment } from "./Step10StatutoryFeePayment";
import { Step11DrivingTestSlotBooking } from "./Step11DrivingTestSlotBooking";
import { LegacyUxComparisonModal } from "./LegacyUxComparisonModal";

export type PortalStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface PortalEntryFlowProps {
  onCompleteToJourney: (dlNumber: string, dob: string) => void;
}

export function PortalEntryFlow({ onCompleteToJourney }: PortalEntryFlowProps) {
  const { login } = useAuth();
  const [currentStep, setCurrentStep] = useState<PortalStep>(1);
  const [selectedState, setSelectedState] = useState<StateRecord>(INDIAN_STATES[0]); // Default Delhi
  const [selectedService, setSelectedService] = useState<PortalServiceItem>(PORTAL_SERVICES[0]); // Default MCWG Endorsement
  const [dlNumber, setDlNumber] = useState("DL-0420110023456");
  const [dob, setDob] = useState("15/08/1995");
  const [isAddressChanged, setIsAddressChanged] = useState(false);
  const [isUxModalOpen, setIsUxModalOpen] = useState(false);

  const stepsList = [
    { num: 1, label: "1. State" },
    { num: 2, label: "2. Services" },
    { num: 3, label: "3. Instructions" },
    { num: 4, label: "4. DL Lookup" },
    { num: 5, label: "5. Details" },
    { num: 6, label: "6. Address" },
    { num: 7, label: "7. e-KYC" },
    { num: 8, label: "8. Form 2" },
    { num: 9, label: "9. Slip" },
    { num: 10, label: "10. Fee" },
    { num: 11, label: "11. Test Slot" },
  ];

  const handleAuthenticationComplete = async (authMode: "aadhaar" | "mobile") => {
    try {
      await login(dlNumber, "123456");
    } catch (e) {
      console.warn("Auth context sync:", e);
    }
    setCurrentStep(8);
  };

  const handleForm2Complete = () => {
    setCurrentStep(9);
  };

  const handlePaymentSuccess = () => {
    setCurrentStep(11);
  };

  const handleBookingConfirmed = () => {
    onCompleteToJourney(dlNumber, dob);
  };

  return (
    <div className="w-full space-y-6">
      {/* Discreet Official Comparison link in breadcrumb bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--color-border)] pb-3">
        {/* 11-Step Clean Breadcrumb Progress */}
        <nav aria-label="Portal entry progress" className="overflow-x-auto py-1">
          <ol className="flex items-center gap-1 sm:gap-1.5 text-xs font-semibold whitespace-nowrap">
            {stepsList.map((st) => {
              const isActive = currentStep === st.num;
              const isCompleted = currentStep > st.num;
              return (
                <li
                  key={st.num}
                  className={`flex items-center gap-1 transition-all ${
                    isActive
                      ? "text-[var(--color-primary)] font-bold"
                      : isCompleted
                      ? "text-[var(--color-success-text)] font-medium cursor-pointer"
                      : "text-[var(--color-muted)]"
                  }`}
                  onClick={() => {
                    if (isCompleted) setCurrentStep(st.num as PortalStep);
                  }}
                >
                  <span
                    className={`flex size-5 items-center justify-center rounded-full text-[0.625rem] font-bold ${
                      isActive
                        ? "bg-[var(--color-primary)] text-white shadow-xs"
                        : isCompleted
                        ? "bg-[var(--color-success-soft)] text-[var(--color-success-text)] border border-[var(--color-success-border)]"
                        : "bg-[var(--color-surface-subtle)] text-[var(--color-muted)] border border-[var(--color-border)]"
                    }`}
                  >
                    {isCompleted ? "✓" : st.num}
                  </span>
                  <span className="hidden md:inline">{st.label}</span>
                  <span className="md:hidden">{st.num}</span>
                  {st.num < 11 ? <span className="text-[var(--color-border-strong)] ml-0.5">/</span> : null}
                </li>
              );
            })}
          </ol>
        </nav>

        <button
          type="button"
          onClick={() => setIsUxModalOpen(true)}
          className="inline-flex items-center gap-1 text-[0.6875rem] font-bold text-[var(--color-primary)] hover:underline whitespace-nowrap shrink-0 self-end sm:self-center"
        >
          <span>Legacy Parivahan Screens vs New UX ↗</span>
        </button>
      </div>

      {/* Step Render Area */}
      <div className="w-full">
        {currentStep === 1 ? (
          <Step1StateSelection
            selectedState={selectedState}
            onSelectState={setSelectedState}
            onNext={() => setCurrentStep(2)}
          />
        ) : currentStep === 2 ? (
          <Step2ServicesHub
            selectedState={selectedState}
            selectedService={selectedService}
            onSelectService={setSelectedService}
            onNext={() => setCurrentStep(3)}
            onBack={() => setCurrentStep(1)}
          />
        ) : currentStep === 3 ? (
          <Step3ServiceInstructions
            selectedState={selectedState}
            selectedService={selectedService}
            onNext={() => setCurrentStep(4)}
            onBack={() => setCurrentStep(2)}
          />
        ) : currentStep === 4 ? (
          <Step4SmartDlLookup
            selectedState={selectedState}
            selectedService={selectedService}
            onProceedToJourney={(foundDl: string, foundDob: string) => {
              setDlNumber(foundDl);
              setDob(foundDob);
              setCurrentStep(5);
            }}
            onBack={() => setCurrentStep(3)}
          />
        ) : currentStep === 5 ? (
          <Step5DlDetailsConfirmation
            selectedState={selectedState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            onNext={() => setCurrentStep(6)}
            onBack={() => setCurrentStep(4)}
          />
        ) : currentStep === 6 ? (
          <Step6AddressConfirmation
            selectedState={selectedState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            onNext={(addressChanged: boolean) => {
              setIsAddressChanged(addressChanged);
              setCurrentStep(7);
            }}
            onBack={() => setCurrentStep(5)}
          />
        ) : currentStep === 7 ? (
          <Step7CitizenAuthentication
            selectedState={selectedState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            isAddressChanged={isAddressChanged}
            onComplete={handleAuthenticationComplete}
            onBack={() => setCurrentStep(6)}
          />
        ) : currentStep === 8 ? (
          <Step8EndorsementApplicationForm
            selectedState={selectedState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            isAddressChanged={isAddressChanged}
            onSubmitApplication={handleForm2Complete}
            onBack={() => setCurrentStep(7)}
          />
        ) : currentStep === 9 ? (
          <Step9ApplicationReferenceSlip
            selectedState={selectedState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            onProceedToFee={() => setCurrentStep(10)}
            onViewDashboard={() => onCompleteToJourney(dlNumber, dob)}
          />
        ) : currentStep === 10 ? (
          <Step10StatutoryFeePayment
            selectedState={selectedState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => setCurrentStep(9)}
          />
        ) : (
          <Step11DrivingTestSlotBooking
            selectedState={selectedState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            onBookingConfirmed={handleBookingConfirmed}
            onBack={() => setCurrentStep(10)}
          />
        )}
      </div>

      {/* Legacy Comparison Modal */}
      <LegacyUxComparisonModal
        isOpen={isUxModalOpen}
        onClose={() => setIsUxModalOpen(false)}
      />
    </div>
  );
}
