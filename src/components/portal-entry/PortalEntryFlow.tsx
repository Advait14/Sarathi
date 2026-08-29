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

export type PortalStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface PortalEntryFlowProps {
  onCompleteToJourney: (dlNumber: string, dob: string) => void;
}

export function PortalEntryFlow({ onCompleteToJourney }: PortalEntryFlowProps) {
  const { login, isAuthenticated } = useAuth();
  const [currentStep, setCurrentStep] = useState<PortalStep>(1);
  const [selectedState, setSelectedState] = useState<StateRecord | null>(null);
  const [selectedService, setSelectedService] = useState<PortalServiceItem>(PORTAL_SERVICES[0]); // Default MCWG Endorsement
  const [dlNumber, setDlNumber] = useState("DL-0420110023456");
  const [dob, setDob] = useState("15/08/1995");
  const [isAddressChanged, setIsAddressChanged] = useState(false);
  const [isSlotOverview, setIsSlotOverview] = useState(false);

  const stepsList = [
    { num: 1, label: "State" },
    { num: 2, label: "Services" },
    { num: 3, label: "Instructions" },
    { num: 4, label: "DL Lookup" },
    { num: 5, label: "Details" },
    { num: 6, label: "Address" },
    { num: 7, label: "e-KYC" },
    { num: 8, label: "Form 2" },
    { num: 9, label: "Reference" },
    { num: 10, label: "Fee Payment" },
    { num: 11, label: "Test Slot" },
  ];

  const currentStepObj = stepsList.find((s) => s.num === currentStep) || stepsList[0];

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

  const activeState = selectedState || INDIAN_STATES[0];

  return (
    <div className="w-full space-y-6">
      {/* Clean, Non-Scrolling Responsive Stepper Bar (Shown during active application steps, hidden on overview screen) */}
      {currentStep >= 4 && !isSlotOverview ? (
        <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface)] p-3 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border-subtle)] pb-3">
            <div className="flex items-center gap-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white font-bold text-xs">
                {currentStep}
              </span>
              <span className="text-xs sm:text-sm font-black text-[var(--color-ink)]">
                Step {currentStep} of 11: {currentStepObj.label}
              </span>
            </div>
          </div>

          {/* Compact Stepper Track */}
          <div className="pt-3">
            <ol className="grid grid-cols-11 gap-1 sm:gap-2">
              {stepsList.map((st) => {
                const isActive = currentStep === st.num;
                const isCompleted = currentStep > st.num;
                return (
                  <li
                    key={st.num}
                    title={st.label}
                    onClick={() => {
                      if (isCompleted) setCurrentStep(st.num as PortalStep);
                    }}
                    className={`flex flex-col items-center gap-1 transition-all ${
                      isCompleted ? "cursor-pointer" : ""
                    }`}
                  >
                    <div
                      className={`h-1.5 w-full rounded-full transition-all ${
                        isActive
                          ? "bg-[var(--color-primary)] ring-2 ring-[var(--color-primary-soft)]"
                          : isCompleted
                          ? "bg-[var(--color-success)]"
                          : "bg-[var(--color-surface-muted)]"
                      }`}
                    />
                    <span
                      className={`text-[0.625rem] font-bold hidden lg:block truncate max-w-full text-center ${
                        isActive
                          ? "text-[var(--color-primary)] font-black"
                          : isCompleted
                          ? "text-[var(--color-success-text)]"
                          : "text-[var(--color-muted)]"
                      }`}
                    >
                      {st.label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      ) : null}

      {/* Step Render Area */}
      <div className="w-full">
        {currentStep === 1 ? (
          <Step1StateSelection
            selectedState={selectedState || undefined}
            onSelectState={(st) => setSelectedState(st)}
            onNext={() => setCurrentStep(2)}
          />
        ) : currentStep === 2 ? (
          <Step2ServicesHub
            selectedState={activeState}
            selectedService={selectedService}
            onSelectService={(srv) => setSelectedService(srv)}
            onBack={() => setCurrentStep(1)}
            onNext={() => setCurrentStep(3)}
          />
        ) : currentStep === 3 ? (
          <Step3ServiceInstructions
            selectedState={activeState}
            selectedService={selectedService}
            onBack={() => setCurrentStep(2)}
            onNext={() => setCurrentStep(4)}
          />
        ) : currentStep === 4 ? (
          <Step4SmartDlLookup
            selectedState={activeState}
            selectedService={selectedService}
            onBack={() => setCurrentStep(3)}
            onProceedToJourney={(verifiedDl, verifiedDob) => {
              setDlNumber(verifiedDl);
              setDob(verifiedDob);
              setCurrentStep(5);
            }}
          />
        ) : currentStep === 5 ? (
          <Step5DlDetailsConfirmation
            selectedState={activeState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            onBack={() => setCurrentStep(4)}
            onNext={() => setCurrentStep(6)}
          />
        ) : currentStep === 6 ? (
          <Step6AddressConfirmation
            selectedState={activeState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            onNext={(hasChanged) => {
              setIsAddressChanged(hasChanged);
              setCurrentStep(7);
            }}
            onBack={() => setCurrentStep(5)}
          />
        ) : currentStep === 7 ? (
          <Step7CitizenAuthentication
            selectedState={activeState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            isAddressChanged={isAddressChanged}
            onComplete={handleAuthenticationComplete}
            onBack={() => setCurrentStep(6)}
          />
        ) : currentStep === 8 ? (
          <Step8EndorsementApplicationForm
            selectedState={activeState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            isAddressChanged={isAddressChanged}
            onSubmitApplication={handleForm2Complete}
            onBack={() => setCurrentStep(7)}
          />
        ) : currentStep === 9 ? (
          <Step9ApplicationReferenceSlip
            selectedState={activeState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            onProceedToFee={() => setCurrentStep(10)}
            onViewDashboard={() => onCompleteToJourney(dlNumber, dob)}
          />
        ) : currentStep === 10 ? (
          <Step10StatutoryFeePayment
            selectedState={activeState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            onPaymentSuccess={handlePaymentSuccess}
            onBack={() => setCurrentStep(9)}
          />
        ) : (
          <Step11DrivingTestSlotBooking
            selectedState={activeState}
            selectedService={selectedService}
            dlNumber={dlNumber}
            dob={dob}
            onBookingConfirmed={handleBookingConfirmed}
            onSlotBookedStateChange={(booked) => setIsSlotOverview(booked)}
            onBack={() => setCurrentStep(10)}
          />
        )}
      </div>
    </div>
  );
}
