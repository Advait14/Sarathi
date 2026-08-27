export type JourneyStepState = "completed" | "current" | "upcoming";

export interface JourneyStepData {
  id: string;
  title: string;
  shortDescription: string;
  state: JourneyStepState;
  completedDate?: string;
}

export interface StatusDimensionData {
  whereAmI: {
    stageNumber: number;
    totalStages: number;
    title: string;
    description: string;
  };
  whatHappened: string;
  whatIsHappening: string;
  whoNeedsToAct: {
    owner: "applicant" | "rto" | "system";
    label: string;
    detail: string;
  };
  whatINeedToDo: {
    actionTitle: string;
    instructions: string;
    primaryCtaText: string;
  };
  whatHappensNext: string;
}

export interface SyntheticJourney {
  applicationReference: string;
  serviceType: string;
  vehicleClass: string;
  existingLicence: string;
  submissionDate: string;
  lastUpdatedDate: string;
  steps: JourneyStepData[];
  status: StatusDimensionData;
}

export const syntheticJourneyData: SyntheticJourney = {
  applicationReference: "SJ-MCWG-2048",
  serviceType: "Addition of Class of Vehicle (Endorsement)",
  vehicleClass: "MCWG — Motorcycle With Gear",
  existingLicence: "DL-0420110023456 (LMV)",
  submissionDate: "12 Oct 2026",
  lastUpdatedDate: "27 Aug 2026",
  steps: [
    {
      id: "lmv-verified",
      title: "Existing LMV Licence",
      shortDescription: "Your existing driving licence was verified.",
      state: "completed",
      completedDate: "Verified",
    },
    {
      id: "mcwg-ll",
      title: "MCWG Learner Licence",
      shortDescription: "Learner's Licence active and valid.",
      state: "completed",
      completedDate: "Issued",
    },
    {
      id: "eligibility-wait",
      title: "Eligibility / waiting period",
      shortDescription: "Mandatory waiting period completed.",
      state: "completed",
      completedDate: "Complete",
    },
    {
      id: "endorsement-app",
      title: "Endorsement application",
      shortDescription: "Application ready for your next required action.",
      state: "current",
    },
    {
      id: "driving-test",
      title: "Driving test",
      shortDescription: "Slot booking and practical test at RTO.",
      state: "upcoming",
    },
    {
      id: "licence-updated",
      title: "Licence updated",
      shortDescription: "MCWG added to your driving licence.",
      state: "upcoming",
    },
  ],
  status: {
    whereAmI: {
      stageNumber: 4,
      totalStages: 6,
      title: "Endorsement application",
      description: "You are at Stage 4 of your MCWG endorsement journey.",
    },
    whatHappened:
      "Your existing LMV licence was verified, your MCWG Learner's Licence was issued, and your mandatory eligibility waiting period is now complete.",
    whatIsHappening:
      "Your application to add MCWG to your driving licence has progressed to the endorsement filing stage.",
    whoNeedsToAct: {
      owner: "applicant",
      label: "You need to act",
      detail: "Your input is required to continue the application.",
    },
    whatINeedToDo: {
      actionTitle: "Continue endorsement application",
      instructions:
        "Confirm your personal details, review your pre-filled Form 2 information, and proceed to payment and slot selection.",
      primaryCtaText: "Continue application",
    },
    whatHappensNext:
      "After completing the application and fee payment, you will book an appointment slot for your MCWG driving test at the RTO.",
  },
};
