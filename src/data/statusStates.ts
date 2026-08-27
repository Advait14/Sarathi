import type { BadgeTone } from "@/components/ui/Badge";
import type { StatusType } from "@/components/ui/StatusIndicator";

export type ActionableStatusKey =
  | "submitted"
  | "under_review"
  | "waiting"
  | "action_available"
  | "processing"
  | "completed";

export interface StatusFiveDimensionsData {
  whatHappened: string;
  whatIsHappening: string;
  whoNeedsToAct: {
    owner: "applicant" | "rto" | "system" | "none";
    label: string;
    detail: string;
  };
  doINeedToDoAnything: {
    required: boolean;
    label: string;
    detail: string;
  };
  whatHappensNext: string;
}

export interface ActionableStatusData {
  key: ActionableStatusKey;
  stateBadge: string;
  badgeTone: BadgeTone;
  indicatorStatus: StatusType;
  headline: string;
  subheadline: string;
  applicationReference: string;
  serviceName: string;
  vehicleClass: string;
  submissionDate: string;
  lastUpdatedDate: string;
  rtoName: string;
  officialStatusRaw: string;
  officialStatusMeaning: string;
  dimensions: StatusFiveDimensionsData;
  primaryAction: {
    label: string;
    action: string;
  };
  secondaryAction?: {
    label: string;
    action: string;
  };
}

export const actionableStatusStates: Record<ActionableStatusKey, ActionableStatusData> = {
  submitted: {
    key: "submitted",
    stateBadge: "Application Submitted",
    badgeTone: "primary",
    indicatorStatus: "current",
    headline: "Your licence journey has started",
    subheadline:
      "Your MCWG endorsement application (Form 2) has been registered and received by the transport authority.",
    applicationReference: "SJ-MCWG-2048",
    serviceName: "Addition of Class of Vehicle (Endorsement)",
    vehicleClass: "MCWG — Motorcycle With Gear",
    submissionDate: "27 Aug 2026",
    lastUpdatedDate: "27 Aug 2026, 02:15 PM",
    rtoName: "RTO Janakpuri, West Delhi (DL-04)",
    officialStatusRaw: "APPLICATION SUBMITTED AT RTO LEVEL",
    officialStatusMeaning:
      "Your application documents and initial details have been queued for automated intake.",
    dimensions: {
      whatHappened:
        "Your Form 2 endorsement application details and identity credentials were successfully submitted.",
      whatIsHappening:
        "The application is queued in the RTO processing system for automated verification and initial scrutiny.",
      whoNeedsToAct: {
        owner: "rto",
        label: "Transport Authority (RTO)",
        detail: "System queueing application for officer scrutiny.",
      },
      doINeedToDoAnything: {
        required: false,
        label: "Nothing required right now",
        detail: "Your submission is securely registered on record.",
      },
      whatHappensNext:
        "The licensing authority will review your documents. Once initial scrutiny is complete, fee payment and test slot booking will unlock.",
    },
    primaryAction: {
      label: "View journey timeline",
      action: "view_journey",
    },
    secondaryAction: {
      label: "Download application reference slip",
      action: "download_slip",
    },
  },

  under_review: {
    key: "under_review",
    stateBadge: "Under RTO Review",
    badgeTone: "info",
    indicatorStatus: "waiting",
    headline: "Your application is being reviewed",
    subheadline:
      "Your application is currently being scrutinized by the Licensing Authority at RTO Janakpuri.",
    applicationReference: "SJ-MCWG-2048",
    serviceName: "Addition of Class of Vehicle (Endorsement)",
    vehicleClass: "MCWG — Motorcycle With Gear",
    submissionDate: "27 Aug 2026",
    lastUpdatedDate: "27 Aug 2026, 03:45 PM",
    rtoName: "RTO Janakpuri, West Delhi (DL-04)",
    officialStatusRaw: "APPROVAL OF ENDORSEMENT BY LICENSING AUTHORITY",
    officialStatusMeaning:
      "A licensing officer is actively checking your linked Learner's Licence, existing DL record, and declarations.",
    dimensions: {
      whatHappened:
        "Your application passed initial intake checks and has been assigned to a licensing authority officer.",
      whatIsHappening:
        "A licensing officer is verifying your linked MCWG Learner's Licence and confirming statutory eligibility.",
      whoNeedsToAct: {
        owner: "rto",
        label: "Licensing Officer (RTO)",
        detail: "Officer scrutinizing eligibility and document records.",
      },
      doINeedToDoAnything: {
        required: false,
        label: "Nothing required right now",
        detail: "No documents or actions are requested from you during review.",
      },
      whatHappensNext:
        "As soon as the officer grants approval, your next step (fee payment and driving test slot booking) will become available.",
    },
    primaryAction: {
      label: "View journey progress",
      action: "view_journey",
    },
    secondaryAction: {
      label: "Check assigned RTO details",
      action: "check_rto",
    },
  },

  waiting: {
    key: "waiting",
    stateBadge: "Eligibility Waiting Period",
    badgeTone: "warning",
    indicatorStatus: "waiting",
    headline: "You're all set for now",
    subheadline:
      "Your Learner's Licence is active, and your mandatory statutory holding period is currently in progress.",
    applicationReference: "SJ-MCWG-2048",
    serviceName: "Learner Licence Holding Period",
    vehicleClass: "MCWG — Motorcycle With Gear",
    submissionDate: "10 Jun 2026",
    lastUpdatedDate: "27 Aug 2026, 09:00 AM",
    rtoName: "RTO Janakpuri, West Delhi (DL-04)",
    officialStatusRaw: "HOLDING PERIOD IN PROGRESS UNDER CMVR RULE 15",
    officialStatusMeaning:
      "Motor Vehicles Act requires holding a Learner's Licence for a minimum statutory period before taking the driving test.",
    dimensions: {
      whatHappened:
        "Your MCWG Learner's Licence (LL-0420260089123) was approved and issued on 10 Jun 2026.",
      whatIsHappening:
        "The required statutory eligibility period is counting down before you can book your final driving test.",
      whoNeedsToAct: {
        owner: "system",
        label: "System Timer (Automatic)",
        detail: "Holding period tracked automatically by the system.",
      },
      doINeedToDoAnything: {
        required: false,
        label: "Nothing required right now",
        detail: "You can practice two-wheeler riding with an instructor meanwhile.",
      },
      whatHappensNext:
        "On completion of the holding period (10 Sep 2026), your endorsement application and slot booking will unlock automatically.",
    },
    primaryAction: {
      label: "View journey timeline",
      action: "view_journey",
    },
    secondaryAction: {
      label: "Prepare for driving skill test",
      action: "prepare_test",
    },
  },

  action_available: {
    key: "action_available",
    stateBadge: "Action Required",
    badgeTone: "warning",
    indicatorStatus: "current",
    headline: "Your next step is ready",
    subheadline:
      "Your application has moved forward. You can now complete your fee payment and book your driving test slot.",
    applicationReference: "SJ-MCWG-2048",
    serviceName: "Addition of Class of Vehicle (Endorsement)",
    vehicleClass: "MCWG — Motorcycle With Gear",
    submissionDate: "27 Aug 2026",
    lastUpdatedDate: "27 Aug 2026, 04:10 PM",
    rtoName: "RTO Janakpuri, West Delhi (DL-04)",
    officialStatusRaw: "SLOT BOOKING ENABLED / PAYMENT PENDING",
    officialStatusMeaning:
      "Officer scrutiny was successful. The portal is waiting for applicant fee payment and appointment selection.",
    dimensions: {
      whatHappened:
        "The licensing authority approved your application documents and validated your MCWG eligibility.",
      whatIsHappening:
        "The system is waiting for you to pay the statutory ₹850 fee and select your driving test date.",
      whoNeedsToAct: {
        owner: "applicant",
        label: "You need to act",
        detail: "Action required: Complete payment and choose test appointment.",
      },
      doINeedToDoAnything: {
        required: true,
        label: "Action needed from you",
        detail: "Pay the endorsement fee and choose a convenient test track slot.",
      },
      whatHappensNext:
        "After selecting your slot, an appointment confirmation slip will be generated with test day instructions.",
    },
    primaryAction: {
      label: "Continue to fee payment & slot booking",
      action: "continue_action",
    },
    secondaryAction: {
      label: "View appointment track guidelines",
      action: "view_guidelines",
    },
  },

  processing: {
    key: "processing",
    stateBadge: "Endorsement Processing",
    badgeTone: "info",
    indicatorStatus: "waiting",
    headline: "Your licence is being updated",
    subheadline:
      "You have passed your practical driving test. Final digital endorsement and smart card printing are underway.",
    applicationReference: "SJ-MCWG-2048",
    serviceName: "Endorsement Approval & Smart Card Dispatch",
    vehicleClass: "MCWG — Motorcycle With Gear",
    submissionDate: "27 Aug 2026",
    lastUpdatedDate: "27 Aug 2026, 05:20 PM",
    rtoName: "RTO Janakpuri, West Delhi (DL-04)",
    officialStatusRaw: "TEST PASSED — PRINTING OF DL UNDER PROCESS",
    officialStatusMeaning:
      "The motor vehicles inspector recorded a PASS result. The transport department is generating the updated licence.",
    dimensions: {
      whatHappened:
        "You completed and passed your MCWG practical driving skill test at RTO Janakpuri Automated Track.",
      whatIsHappening:
        "The RTO is signing the digital certificate and queueing your updated smart card for physical printing.",
      whoNeedsToAct: {
        owner: "rto",
        label: "RTO / Transport Authority",
        detail: "Licensing authority finalizing record and issuing updated DL.",
      },
      doINeedToDoAnything: {
        required: false,
        label: "Nothing required right now",
        detail: "Your test result is recorded as Passed. No further tests needed.",
      },
      whatHappensNext:
        "Your digital driving licence will appear on mParivahan/DigiLocker within 24 hours. Physical card will be dispatched by Speed Post.",
    },
    primaryAction: {
      label: "Track licence dispatch status",
      action: "track_dispatch",
    },
    secondaryAction: {
      label: "View digital test score sheet",
      action: "view_scoresheet",
    },
  },

  completed: {
    key: "completed",
    stateBadge: "Journey Complete",
    badgeTone: "success",
    indicatorStatus: "complete",
    headline: "MCWG has been added to your licence",
    subheadline:
      "Your licence journey is complete. You are now legally authorized to operate Motorcycles With Gear (MCWG) and Light Motor Vehicles (LMV).",
    applicationReference: "SJ-MCWG-2048",
    serviceName: "Addition of Class of Vehicle (Endorsement)",
    vehicleClass: "MCWG + LMV (Valid National Register)",
    submissionDate: "27 Aug 2026",
    lastUpdatedDate: "27 Aug 2026, 06:00 PM",
    rtoName: "RTO Janakpuri, West Delhi (DL-04)",
    officialStatusRaw: "DL ENDORSEMENT COMPLETED & DISPATCHED",
    officialStatusMeaning:
      "The national vehicle register record has been permanently updated with MCWG endorsement.",
    dimensions: {
      whatHappened:
        "All steps — prerequisite verification, LL issue, holding period, test passage, and fee settlement — are complete.",
      whatIsHappening:
        "Your updated driving licence is active in the central MoRTH database.",
      whoNeedsToAct: {
        owner: "none",
        label: "Journey Complete (No action needed)",
        detail: "All government and citizen actions are fully finished.",
      },
      doINeedToDoAnything: {
        required: false,
        label: "Nothing required — you're all set!",
        detail: "You can download your updated digital licence immediately.",
      },
      whatHappensNext:
        "Your physical smart card licence has been dispatched via Speed Post (Tracking #ED881290345IN) to your registered address.",
    },
    primaryAction: {
      label: "View updated licence details",
      action: "view_updated_licence",
    },
    secondaryAction: {
      label: "Download digital driving licence",
      action: "download_digital_dl",
    },
  },
};
