export interface BlockedStateData {
  title: string;
  subtitle: string;
  applicationReference: string;
  vehicleClass: string;
  missingCondition: {
    title: string;
    description: string;
  };
  whyItMatters: string;
  whatYouCanDo: string[];
  primaryRecoveryAction: {
    label: string;
    action: string;
  };
  secondaryRecoveryAction: {
    label: string;
    action: string;
  };
}

export interface StalledStateData {
  title: string;
  subtitle: string;
  applicationReference: string;
  vehicleClass: string;
  currentStage: string;
  lastUpdated: string;
  inactivityDuration: string;
  stepOwner: {
    name: string;
    office: string;
    jurisdiction: string;
  };
  reasonsForDelay: string;
  recoveryOptions: {
    title: string;
    description: string;
    channel: string;
    availability: string;
  }[];
  transparencyNotice: string;
  primaryAction: {
    label: string;
    action: string;
  };
}

export const syntheticBlockedData: BlockedStateData = {
  title: "Application Blocked — Prerequisite Required",
  subtitle:
    "We could not proceed with your endorsement application because an active prerequisite condition has not been met.",
  applicationReference: "SJ-MCWG-2048",
  vehicleClass: "MCWG — Motorcycle With Gear",
  missingCondition: {
    title: "Active MCWG Learner's Licence is missing or expired",
    description:
      "Our search of the national registry found your existing LMV Driving Licence, but no active, valid Learner's Licence for the Motorcycle With Gear (MCWG) vehicle category.",
  },
  whyItMatters:
    "Under Rule 15 of the Central Motor Vehicles Rules (CMVR, 1989), a driver must hold a valid Learner's Licence for the specific vehicle category before applying for an endorsement or taking the driving skill test.",
  whatYouCanDo: [
    "Apply for a fresh MCWG Learner's Licence online (no physical RTO visit needed if Aadhaar authenticated).",
    "If you already hold an MCWG LL issued offline, link it to your profile using the Parivahan reference lookup.",
    "If your previous Learner's Licence expired past 6 months, submit a renewal application.",
  ],
  primaryRecoveryAction: {
    label: "Apply for MCWG Learner's Licence",
    action: "apply_ll",
  },
  secondaryRecoveryAction: {
    label: "Search existing licence records",
    action: "search_records",
  },
};

export const syntheticStalledData: StalledStateData = {
  title: "Application Status Update — Pending Review",
  subtitle:
    "Your application has not progressed past the scrutiny stage within the usual review window.",
  applicationReference: "SJ-MCWG-2048",
  vehicleClass: "MCWG — Motorcycle With Gear",
  currentStage: "Stage 4: Endorsement Scrutiny & Record Verification",
  lastUpdated: "12 Aug 2026, 11:20 AM",
  inactivityDuration: "15 days since last update",
  stepOwner: {
    name: "Licensing Authority (Zonal Scrutiny Unit)",
    office: "RTO Janakpuri (DL-04)",
    jurisdiction: "West Delhi Transport Division",
  },
  reasonsForDelay:
    "Applications may remain in queue due to periodic document scrutiny backlog, officer reassignment, or manual verification of offline historical DL records.",
  recoveryOptions: [
    {
      title: "RTO Facilitation Counter (In-Person)",
      description:
        "Visit the public facilitation desk at RTO Janakpuri with your printed Form 2 acknowledgement slip.",
      channel: "Counter #4, RTO Janakpuri, New Delhi - 110058",
      availability: "Monday to Friday, 9:30 AM – 1:00 PM",
    },
    {
      title: "Delhi Transport Department Helpline",
      description:
        "Contact the official citizen helpdesk and provide your application reference SJ-MCWG-2048 for a queue status check.",
      channel: "1800-11-0004 / 011-23958836",
      availability: "Working Days, 9:00 AM – 6:00 PM",
    },
    {
      title: "Submit an Online Enquiry",
      description:
        "Log an official follow-up inquiry through the Parivahan portal citing your application reference.",
      channel: "Parivahan Citizen Portal Support",
      availability: "Available 24/7 online",
    },
  ],
  transparencyNotice:
    "Note: Support channels can check queue status and verify file location, but statutory driving test requirements and officer scrutiny cannot be bypassed.",
  primaryAction: {
    label: "View RTO Office Details & Contact",
    action: "view_rto",
  },
};
