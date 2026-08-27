export type PrerequisiteStatus = "verified" | "missing" | "pending";

export type PrerequisiteStateKey =
  | "prerequisite_missing"
  | "ll_application_required"
  | "eligible_for_endorsement";

export interface PrerequisiteCheckItem {
  id: string;
  title: string;
  description: string;
  status: PrerequisiteStatus;
  statusLabel: string;
  detail: string;
}

export interface PrerequisiteStateData {
  stateKey: PrerequisiteStateKey;
  stateLabel: string;
  goal: {
    title: string;
    targetClass: string;
    existingLicence: string;
    existingNumber: string;
  };
  headline: string;
  subheadline: string;
  checklist: PrerequisiteCheckItem[];
  missingExplanation?: {
    whatIsMissing: string;
    whyRequired: string;
    legalReference: string;
    nextStepSummary: string;
  };
  primaryCta: {
    label: string;
    action: string;
  };
  secondaryAction?: {
    label: string;
  };
}

export const prerequisiteStatesData: Record<PrerequisiteStateKey, PrerequisiteStateData> = {
  prerequisite_missing: {
    stateKey: "prerequisite_missing",
    stateLabel: "Prerequisite Missing",
    goal: {
      title: "Add a new class to your driving licence",
      targetClass: "MCWG — Motorcycle With Gear",
      existingLicence: "Existing LMV (Light Motor Vehicle)",
      existingNumber: "DL-0420110023456",
    },
    headline: "You're not ready to continue yet",
    subheadline:
      "Before adding MCWG to your existing licence, you need an active MCWG Learner's Licence.",
    checklist: [
      {
        id: "existing-dl",
        title: "Existing Driving Licence",
        description: "Valid driving licence in good standing.",
        status: "verified",
        statusLabel: "Verified (LMV)",
        detail: "DL-0420110023456 is active and verified with RTO records.",
      },
      {
        id: "mcwg-ll",
        title: "MCWG Learner's Licence",
        description: "Active Learner's Licence for Motorcycle With Gear.",
        status: "missing",
        statusLabel: "Required first",
        detail: "No active MCWG Learner's Licence was found linked to your record.",
      },
      {
        id: "eligibility-period",
        title: "Mandatory Eligibility Period",
        description: "Holding period requirement before driving test.",
        status: "pending",
        statusLabel: "Pending LL issue",
        detail: "Starts automatically after your MCWG Learner's Licence is issued.",
      },
    ],
    missingExplanation: {
      whatIsMissing: "MCWG Learner's Licence",
      whyRequired:
        "Under the Motor Vehicles Act, an applicant must hold an active Learner's Licence for the specific vehicle category (MCWG) before an additional endorsement can be granted to an existing driving licence.",
      legalReference: "Form 2 / Rule 10 — Central Motor Vehicles Rules",
      nextStepSummary:
        "Submit a quick Learner's Licence application for MCWG. Since you already hold an LMV licence, you can apply directly online with your existing credentials.",
    },
    primaryCta: {
      label: "Apply for MCWG Learner's Licence",
      action: "apply_ll",
    },
    secondaryAction: {
      label: "Why do I need an MCWG Learner's Licence first?",
    },
  },

  ll_application_required: {
    stateKey: "ll_application_required",
    stateLabel: "LL Application Required",
    goal: {
      title: "Add a new class to your driving licence",
      targetClass: "MCWG — Motorcycle With Gear",
      existingLicence: "Existing LMV (Light Motor Vehicle)",
      existingNumber: "DL-0420110023456",
    },
    headline: "You need an MCWG Learner's Licence first",
    subheadline:
      "To add Motorcycle With Gear (MCWG) to your driving licence, the first step is obtaining a Learner's Licence for this vehicle class.",
    checklist: [
      {
        id: "existing-dl",
        title: "Existing Driving Licence",
        description: "Valid driving licence in good standing.",
        status: "verified",
        statusLabel: "Verified (LMV)",
        detail: "DL-0420110023456 is active and eligible for additional class endorsement.",
      },
      {
        id: "mcwg-ll",
        title: "MCWG Learner's Licence",
        description: "Active Learner's Licence for Motorcycle With Gear.",
        status: "missing",
        statusLabel: "Action required",
        detail: "Apply for New LL (MCWG) linked to your existing licence.",
      },
      {
        id: "eligibility-period",
        title: "Mandatory Eligibility Period",
        description: "Holding period requirement before driving test.",
        status: "pending",
        statusLabel: "Pending",
        detail: "Begins upon Learner's Licence approval.",
      },
    ],
    missingExplanation: {
      whatIsMissing: "MCWG Learner's Licence Application",
      whyRequired:
        "Obtaining a Learner's Licence establishes that you are eligible to practice and take the driving skill test for two-wheelers with gear.",
      legalReference: "Issue of New LL Application (MCWG)",
      nextStepSummary:
        "Fill the simplified LL form for MCWG. Once approved by the licensing authority, you can return here to complete your endorsement.",
    },
    primaryCta: {
      label: "Start MCWG Learner's Licence Application",
      action: "start_ll",
    },
    secondaryAction: {
      label: "Learn how the LL process works with an existing licence",
    },
  },

  eligible_for_endorsement: {
    stateKey: "eligible_for_endorsement",
    stateLabel: "Ready for Endorsement",
    goal: {
      title: "Add a new class to your driving licence",
      targetClass: "MCWG — Motorcycle With Gear",
      existingLicence: "Existing LMV (Light Motor Vehicle)",
      existingNumber: "DL-0420110023456",
    },
    headline: "You're ready to add MCWG",
    subheadline:
      "All prerequisites are complete. You can now proceed with your endorsement application and driving test booking.",
    checklist: [
      {
        id: "existing-dl",
        title: "Existing Driving Licence",
        description: "Valid driving licence in good standing.",
        status: "verified",
        statusLabel: "Verified",
        detail: "DL-0420110023456 (LMV) in good standing.",
      },
      {
        id: "mcwg-ll",
        title: "MCWG Learner's Licence",
        description: "Active Learner's Licence for Motorcycle With Gear.",
        status: "verified",
        statusLabel: "Active & Valid",
        detail: "LL-0420260089123 issued and verified.",
      },
      {
        id: "eligibility-period",
        title: "Mandatory Eligibility Period",
        description: "Holding period requirement before driving test.",
        status: "verified",
        statusLabel: "Complete",
        detail: "Mandatory holding period requirement satisfied.",
      },
    ],
    primaryCta: {
      label: "Continue to endorsement application",
      action: "continue_endorsement",
    },
  },
};
