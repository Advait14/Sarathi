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
import { StepSubmission } from "./StepSubmission";
import { StepPayment } from "./StepPayment";
import { StepAppointment } from "./StepAppointment";
import { StepTestConfirmed } from "./StepTestConfirmed";

export interface EndorsementFlowProps {
  onExitFlow?: () => void;
  onFlowCompleted?: () => void;
}

export function EndorsementFlow({ onExitFlow, onFlowCompleted }: EndorsementFlowProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [applicant, setApplicant] = useState<ApplicantRecord>(defaultApplicantRecord);
  const [selectedClass, setSelectedClass] = useState("MCWG");
  const [applicationRef, setApplicationRef] = useState("SJ-MCWG-2048");
  const [appointment, setAppointment] = useState({
    date: "2026-09-15",
    formattedDate: "15 Sep 2026 (Tuesday)",
    time: "10:30 AM - 11:30 AM",
    venue: defaultApplicantRecord.rtoOffice.trackAddress,
  });

  const currentStep = ENDORSEMENT_STEPS[currentStepIndex] || ENDORSEMENT_STEPS[0];
  const canGoBack = currentStepIndex > 0 && currentStep.id !== "test_confirmed";

  const handleNext = () => {
    if (currentStepIndex < ENDORSEMENT_STEPS.length - 1) {
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
    <div className="w-full">
      {/* Step Flow Header */}
      <EndorsementFlowHeader
        currentStepId={currentStep.id}
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

      {currentStep.id === "submission" ? (
        <StepSubmission
          applicant={applicant}
          selectedClass={selectedClass}
          onNext={(ref) => {
            setApplicationRef(ref);
            handleNext();
          }}
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
