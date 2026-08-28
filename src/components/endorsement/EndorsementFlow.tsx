"use client";

import { useState } from "react";
import {
  defaultApplicantRecord,
  ENDORSEMENT_STEPS,
  type ApplicantRecord,
  type EndorsementStepId,
} from "@/data/endorsement";
import { EndorsementFlowHeader } from "./EndorsementFlowHeader";
import { StepVerifyDl } from "./StepVerifyDl";
import { StepConfirmLicence } from "./StepConfirmLicence";
import { StepConfirmAddress } from "./StepConfirmAddress";
import { StepSelectClass } from "./StepSelectClass";
import { StepDeclaration } from "./StepDeclaration";
import { StepReviewCheckpoint } from "./StepReviewCheckpoint";
import { StepPayment } from "./StepPayment";
import { StepAppointment } from "./StepAppointment";
import { StepTestConfirmed } from "./StepTestConfirmed";

export interface EndorsementFlowProps {
  onExitFlow?: () => void;
  onFlowCompleted?: () => void;
  onNavigateToMilestone?: (milestoneKey: string) => void;
}

export function EndorsementFlow({
  onExitFlow,
  onFlowCompleted,
  onNavigateToMilestone,
}: EndorsementFlowProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [applicant, setApplicant] = useState<ApplicantRecord>(defaultApplicantRecord);
  const [selectedClass, setSelectedClass] = useState("MCWG");
  const [applicationRef, setApplicationRef] = useState("SJ-MCWG-2048");
  const [appointment, setAppointment] = useState({
    date: "2024-09-16",
    formattedDate: "16 Sep 2024 (Monday)",
    time: "09:30 AM - 11:30 AM",
    venue: defaultApplicantRecord.rtoOffice.trackAddress,
  });

  const stepsList = [
    { id: "verify_dl", title: "1. Verify DL" },
    { id: "confirm_licence", title: "2. Details" },
    { id: "confirm_address", title: "3. Address" },
    { id: "select_service_class", title: "4. Class" },
    { id: "declaration", title: "5. Form 1" },
    { id: "review_checkpoint", title: "6. Review" },
    { id: "payment", title: "7. Fee Pay" },
    { id: "appointment", title: "8. Slot Book" },
    { id: "test_confirmed", title: "9. Confirmed" },
  ];

  const currentStep = stepsList[currentStepIndex] || stepsList[0];
  const canGoBack = currentStepIndex > 0 && currentStep.id !== "test_confirmed";

  const handleNext = () => {
    if (currentStepIndex < stepsList.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (canGoBack) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Step Flow Header */}
      <EndorsementFlowHeader
        currentStepId={currentStep.id as EndorsementStepId}
        canGoBack={canGoBack}
        onBack={handleBack}
        onExitFlow={onExitFlow}
      />

      {/* Progressive Step Views */}
      {currentStep.id === "verify_dl" ? (
        <StepVerifyDl
          applicant={applicant}
          onNext={(dlNumber, dob) => {
            setApplicant((prev) => ({ ...prev, dlNumber, dateOfBirth: dob }));
            handleNext();
          }}
        />
      ) : null}

      {currentStep.id === "confirm_licence" ? (
        <StepConfirmLicence applicant={applicant} onNext={handleNext} />
      ) : null}

      {currentStep.id === "confirm_address" ? (
        <StepConfirmAddress applicant={applicant} onNext={handleNext} />
      ) : null}

      {currentStep.id === "select_service_class" ? (
        <StepSelectClass
          applicant={applicant}
          onNext={(cls) => {
            setSelectedClass(cls);
            handleNext();
          }}
        />
      ) : null}

      {currentStep.id === "declaration" ? (
        <StepDeclaration onNext={handleNext} />
      ) : null}

      {currentStep.id === "review_checkpoint" ? (
        <StepReviewCheckpoint
          applicant={applicant}
          selectedClass={selectedClass}
          applicationReference={applicationRef}
          onBack={handleBack}
          onProceedToPayment={handleNext}
        />
      ) : null}

      {currentStep.id === "payment" ? (
        <StepPayment applicationReference={applicationRef} onNext={handleNext} />
      ) : null}

      {currentStep.id === "appointment" ? (
        <StepAppointment
          applicant={applicant}
          onNext={(apt) => {
            setAppointment(apt);
            handleNext();
          }}
        />
      ) : null}

      {currentStep.id === "test_confirmed" ? (
        <StepTestConfirmed
          applicant={applicant}
          applicationReference={applicationRef}
          appointment={appointment}
          onCompleteFlow={() => {
            if (onFlowCompleted) {
              onFlowCompleted();
            } else if (onExitFlow) {
              onExitFlow();
            }
          }}
        />
      ) : null}
    </div>
  );
}
