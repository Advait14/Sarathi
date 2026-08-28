export type JourneyMilestoneState =
  | "completed"
  | "current"
  | "waiting"
  | "action_required"
  | "upcoming";

export interface TimelineMilestone {
  id: string;
  stageNumber: number;
  title: string;
  shortDescription: string;
  state: JourneyMilestoneState;
  completedDate?: string;
  detailBadge?: string;
}

export interface Status5Dimension {
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
    actionKey?: string;
  };
  whatHappensNext: string;
}

export interface ApplicantParticulars {
  name: string;
  dlNumber: string;
  mobile: string;
  email: string;
  dob: string;
  bloodGroup: string;
  fatherOrHusbandName: string;
  registeredAddress: string;
  rtoCode: string;
  rtoName: string;
}

export interface UnifiedJourneyState {
  scenarioId: string;
  scenarioName: string;
  applicationReference: string;
  serviceType: string;
  existingClass: string;
  targetClass: string;
  applicant: ApplicantParticulars;
  learnerLicence: {
    hasLL: boolean;
    llNumber?: string;
    issueDate?: string;
    validUntil?: string;
    status: "Active" | "Missing" | "Expired";
    holdingDaysCompleted: number;
    statutoryHoldingDaysRequired: number;
    isHoldingComplete: boolean;
    remainingDays?: number;
  };
  prerequisiteOutcome: "missing_ll" | "waiting_period" | "eligible";
  endorsementStage:
    | "not_started"
    | "ll_application_required"
    | "in_progress"
    | "under_review"
    | "fee_pending"
    | "slot_booking_ready"
    | "test_scheduled"
    | "test_completed"
    | "licence_updated";
  feePaid: boolean;
  appointment?: {
    isBooked: boolean;
    date?: string;
    timeSlot?: string;
    trackName?: string;
    reference?: string;
  };
  recoveryMode?: "blocked" | "stalled" | null;
  status: Status5Dimension;
  milestones: TimelineMilestone[];
}

export const defaultApplicantAdvait: ApplicantParticulars = {
  name: "Advait Sharma",
  dlNumber: "DL-0420110023456",
  mobile: "9876543210",
  email: "advait.sharma@example.com",
  dob: "15/08/1995",
  bloodGroup: "B+",
  fatherOrHusbandName: "Rajesh Sharma",
  registeredAddress: "B-4/122, Janakpuri, New Delhi - 110058",
  rtoCode: "DL-04",
  rtoName: "RTO Janakpuri (West Delhi)",
};

export const defaultApplicantPriya: ApplicantParticulars = {
  name: "Priya Verma",
  dlNumber: "DL-0420200099887",
  mobile: "9811223344",
  email: "priya.verma@example.com",
  dob: "22/11/1998",
  bloodGroup: "O+",
  fatherOrHusbandName: "Suresh Verma",
  registeredAddress: "C-2/45, Paschim Vihar, New Delhi - 110063",
  rtoCode: "DL-04",
  rtoName: "RTO Janakpuri (West Delhi)",
};

// 9 Canonical Scenario Presets
export const UNIFIED_SCENARIOS: Record<string, UnifiedJourneyState> = {
  // Scenario 1: Prerequisite Missing (No MCWG LL)
  scenario_1_prereq_missing: {
    scenarioId: "scenario_1_prereq_missing",
    scenarioName: "1. Prerequisite Missing",
    applicationReference: "SJ-MCWG-2048",
    serviceType: "Addition of Class of Vehicle (MCWG Endorsement)",
    existingClass: "LMV — Light Motor Vehicle",
    targetClass: "MCWG — Motorcycle With Gear",
    applicant: defaultApplicantPriya,
    learnerLicence: {
      hasLL: false,
      status: "Missing",
      holdingDaysCompleted: 0,
      statutoryHoldingDaysRequired: 30,
      isHoldingComplete: false,
    },
    prerequisiteOutcome: "missing_ll",
    endorsementStage: "not_started",
    feePaid: false,
    status: {
      whereAmI: {
        stageNumber: 2,
        totalStages: 6,
        title: "MCWG Learner's Licence Required",
        description: "Your existing LMV licence is active, but you need an MCWG Learner's Licence first.",
      },
      whatHappened:
        "We checked your national driving licence record. Your existing LMV licence is valid and in good standing.",
      whatIsHappening:
        "Under the Motor Vehicles Act, an active Learner's Licence for Motorcycle With Gear (MCWG) is mandatory before endorsement.",
      whoNeedsToAct: {
        owner: "applicant",
        label: "Action Required from You",
        detail: "Submit a simplified MCWG Learner's Licence application.",
      },
      whatINeedToDo: {
        actionTitle: "Apply for MCWG Learner's Licence",
        instructions:
          "Because your LMV licence is already verified, you do not need to re-upload basic identity proofs. Apply for your MCWG LL directly.",
        primaryCtaText: "Apply for MCWG Learner's Licence",
        actionKey: "apply_ll",
      },
      whatHappensNext:
        "Once your MCWG LL is issued, you will automatically continue this endorsement journey without starting over.",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        title: "Existing LMV Licence",
        shortDescription: "Verified with RTO records (DL-0420200099887)",
        state: "completed",
        completedDate: "Verified",
      },
      {
        id: "m2",
        stageNumber: 2,
        title: "MCWG Learner Licence",
        shortDescription: "Action required: Apply for MCWG Learner's Licence",
        state: "action_required",
        detailBadge: "Required First",
      },
      {
        id: "m3",
        stageNumber: 3,
        title: "Eligibility / Waiting Period",
        shortDescription: "30-day mandatory holding period under CMVR Rule 15",
        state: "upcoming",
      },
      {
        id: "m4",
        stageNumber: 4,
        title: "Endorsement Application (Form 2)",
        shortDescription: "Digital application, e-KYC, and fee payment",
        state: "upcoming",
      },
      {
        id: "m5",
        stageNumber: 5,
        title: "Driving Test Evaluation",
        shortDescription: "Slot booking at RTO automated test track",
        state: "upcoming",
      },
      {
        id: "m6",
        stageNumber: 6,
        title: "Driving Licence Updated",
        shortDescription: "MCWG endorsement added to smart card credential",
        state: "upcoming",
      },
    ],
  },

  // Scenario 2: Waiting Period (LL active, 30-day holding in progress)
  scenario_2_waiting_period: {
    scenarioId: "scenario_2_waiting_period",
    scenarioName: "2. Waiting Period (Holding in Progress)",
    applicationReference: "SJ-MCWG-2048",
    serviceType: "Addition of Class of Vehicle (MCWG Endorsement)",
    existingClass: "LMV — Light Motor Vehicle",
    targetClass: "MCWG — Motorcycle With Gear",
    applicant: defaultApplicantAdvait,
    learnerLicence: {
      hasLL: true,
      llNumber: "LL-0420260089123",
      issueDate: "20 Aug 2026",
      validUntil: "19 Feb 2027",
      status: "Active",
      holdingDaysCompleted: 14,
      statutoryHoldingDaysRequired: 30,
      isHoldingComplete: false,
      remainingDays: 16,
    },
    prerequisiteOutcome: "waiting_period",
    endorsementStage: "not_started",
    feePaid: false,
    status: {
      whereAmI: {
        stageNumber: 3,
        totalStages: 6,
        title: "Mandatory Holding Period (In Progress)",
        description: "You're all set for now. Day 14 of 30 completed.",
      },
      whatHappened:
        "Your MCWG Learner's Licence was issued on 20 Aug 2026 and is valid for 6 months.",
      whatIsHappening:
        "Under Central Motor Vehicles Rules (CMVR Rule 15), a 30-day practice holding period is required before scheduling your driving test.",
      whoNeedsToAct: {
        owner: "system",
        label: "Nothing Required Right Now",
        detail: "Your eligibility timer is running automatically. No action needed today.",
      },
      whatINeedToDo: {
        actionTitle: "Prepare for your driving test",
        instructions:
          "Practice the MCWG driving track maneuvers (Figure-8, serpentine, and gradient hill stop) with a licensed rider.",
        primaryCtaText: "Review Test Preparation Tips",
        actionKey: "prep_tips",
      },
      whatHappensNext:
        "On 19 September 2026, your holding period will complete, and your endorsement application will automatically unlock.",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        title: "Existing LMV Licence",
        shortDescription: "Verified with RTO records (DL-0420110023456)",
        state: "completed",
        completedDate: "Verified",
      },
      {
        id: "m2",
        stageNumber: 2,
        title: "MCWG Learner Licence",
        shortDescription: "Active (LL-0420260089123)",
        state: "completed",
        completedDate: "Issued",
      },
      {
        id: "m3",
        stageNumber: 3,
        title: "Eligibility / Waiting Period",
        shortDescription: "Day 14 of 30 in progress · 16 days remaining",
        state: "waiting",
        detailBadge: "16 Days Left",
      },
      {
        id: "m4",
        stageNumber: 4,
        title: "Endorsement Application (Form 2)",
        shortDescription: "Unlocks automatically on 19 Sep 2026",
        state: "upcoming",
      },
      {
        id: "m5",
        stageNumber: 5,
        title: "Driving Test Evaluation",
        shortDescription: "Slot booking at RTO automated test track",
        state: "upcoming",
      },
      {
        id: "m6",
        stageNumber: 6,
        title: "Driving Licence Updated",
        shortDescription: "MCWG endorsement added to smart card credential",
        state: "upcoming",
      },
    ],
  },

  // Scenario 3: Eligible for Endorsement (Prerequisites complete)
  scenario_3_eligible: {
    scenarioId: "scenario_3_eligible",
    scenarioName: "3. Ready for Endorsement",
    applicationReference: "SJ-MCWG-2048",
    serviceType: "Addition of Class of Vehicle (MCWG Endorsement)",
    existingClass: "LMV — Light Motor Vehicle",
    targetClass: "MCWG — Motorcycle With Gear",
    applicant: defaultApplicantAdvait,
    learnerLicence: {
      hasLL: true,
      llNumber: "LL-0420260089123",
      issueDate: "10 Jun 2026",
      validUntil: "09 Dec 2026",
      status: "Active",
      holdingDaysCompleted: 45,
      statutoryHoldingDaysRequired: 30,
      isHoldingComplete: true,
    },
    prerequisiteOutcome: "eligible",
    endorsementStage: "in_progress",
    feePaid: false,
    status: {
      whereAmI: {
        stageNumber: 4,
        totalStages: 6,
        title: "Endorsement Application (Form 2)",
        description: "All prerequisites are satisfied. You are ready to add MCWG.",
      },
      whatHappened:
        "Your existing LMV licence is active, your MCWG LL is valid, and your 30-day statutory holding period is complete.",
      whatIsHappening:
        "Your endorsement filing checkpoint is open. Pre-filled Form 2 is ready for your confirmation.",
      whoNeedsToAct: {
        owner: "applicant",
        label: "You Need to Act",
        detail: "Review pre-filled details, complete medical declaration, and pay statutory fees.",
      },
      whatINeedToDo: {
        actionTitle: "Continue Endorsement Application",
        instructions:
          "Confirm your pre-filled details, complete the quick Form 1 medical declaration, and proceed to fee payment.",
        primaryCtaText: "Continue to Endorsement Application",
        actionKey: "start_endorsement",
      },
      whatHappensNext:
        "After fee payment (₹850), you will immediately choose your preferred driving test appointment date.",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        title: "Existing LMV Licence",
        shortDescription: "Verified (DL-0420110023456)",
        state: "completed",
        completedDate: "Verified",
      },
      {
        id: "m2",
        stageNumber: 2,
        title: "MCWG Learner Licence",
        shortDescription: "Active (LL-0420260089123)",
        state: "completed",
        completedDate: "Issued",
      },
      {
        id: "m3",
        stageNumber: 3,
        title: "Eligibility / Waiting Period",
        shortDescription: "30-day holding period complete",
        state: "completed",
        completedDate: "Complete",
      },
      {
        id: "m4",
        stageNumber: 4,
        title: "Endorsement Application (Form 2)",
        shortDescription: "Current step: Review Form 2 and submit",
        state: "current",
        detailBadge: "Ready to File",
      },
      {
        id: "m5",
        stageNumber: 5,
        title: "Driving Test Evaluation",
        shortDescription: "Slot booking at RTO automated test track",
        state: "upcoming",
      },
      {
        id: "m6",
        stageNumber: 6,
        title: "Driving Licence Updated",
        shortDescription: "MCWG endorsement added to smart card credential",
        state: "upcoming",
      },
    ],
  },

  // Scenario 4: Endorsement Application Flow (Filing / Form 2 active)
  scenario_4_endorsement_filing: {
    scenarioId: "scenario_4_endorsement_filing",
    scenarioName: "4. Endorsement Application Flow",
    applicationReference: "SJ-MCWG-2048",
    serviceType: "Addition of Class of Vehicle (MCWG Endorsement)",
    existingClass: "LMV — Light Motor Vehicle",
    targetClass: "MCWG — Motorcycle With Gear",
    applicant: defaultApplicantAdvait,
    learnerLicence: {
      hasLL: true,
      llNumber: "LL-0420260089123",
      issueDate: "10 Jun 2026",
      validUntil: "09 Dec 2026",
      status: "Active",
      holdingDaysCompleted: 45,
      statutoryHoldingDaysRequired: 30,
      isHoldingComplete: true,
    },
    prerequisiteOutcome: "eligible",
    endorsementStage: "in_progress",
    feePaid: false,
    status: {
      whereAmI: {
        stageNumber: 4,
        totalStages: 6,
        title: "Form 2 Application & Review Checkpoint",
        description: "Reviewing pre-filled particulars and declarations.",
      },
      whatHappened:
        "All prerequisites verified. Form 2 endorsement application initialized with national registry particulars.",
      whatIsHappening:
        "Application review checkpoint is active. Personal details, linked LL, and medical declarations are being confirmed.",
      whoNeedsToAct: {
        owner: "applicant",
        label: "You Need to Act",
        detail: "Complete review checkpoint and proceed to statutory fee payment.",
      },
      whatINeedToDo: {
        actionTitle: "Complete Application & Pay Fee",
        instructions:
          "Review the application summary, verify medical declaration, and pay statutory fee (₹850).",
        primaryCtaText: "Open Application Checkpoint",
        actionKey: "open_endorsement_flow",
      },
      whatHappensNext:
        "Statutory payment will instantly unlock automated test slot booking at RTO Janakpuri.",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        title: "Existing LMV Licence",
        shortDescription: "Verified (DL-0420110023456)",
        state: "completed",
        completedDate: "Verified",
      },
      {
        id: "m2",
        stageNumber: 2,
        title: "MCWG Learner Licence",
        shortDescription: "Active (LL-0420260089123)",
        state: "completed",
        completedDate: "Issued",
      },
      {
        id: "m3",
        stageNumber: 3,
        title: "Eligibility / Waiting Period",
        shortDescription: "30-day holding period complete",
        state: "completed",
        completedDate: "Complete",
      },
      {
        id: "m4",
        stageNumber: 4,
        title: "Endorsement Application (Form 2)",
        shortDescription: "Filing in progress · Review Checkpoint",
        state: "current",
        detailBadge: "In Progress",
      },
      {
        id: "m5",
        stageNumber: 5,
        title: "Driving Test Evaluation",
        shortDescription: "Upcoming after fee payment",
        state: "upcoming",
      },
      {
        id: "m6",
        stageNumber: 6,
        title: "Driving Licence Updated",
        shortDescription: "MCWG added to smart card",
        state: "upcoming",
      },
    ],
  },

  // Scenario 5: Application Under Review (Waiting on Licensing Authority)
  scenario_5_under_review: {
    scenarioId: "scenario_5_under_review",
    scenarioName: "5. Application Under Review",
    applicationReference: "SJ-MCWG-2048",
    serviceType: "Addition of Class of Vehicle (MCWG Endorsement)",
    existingClass: "LMV — Light Motor Vehicle",
    targetClass: "MCWG — Motorcycle With Gear",
    applicant: defaultApplicantAdvait,
    learnerLicence: {
      hasLL: true,
      llNumber: "LL-0420260089123",
      issueDate: "10 Jun 2026",
      validUntil: "09 Dec 2026",
      status: "Active",
      holdingDaysCompleted: 45,
      statutoryHoldingDaysRequired: 30,
      isHoldingComplete: true,
    },
    prerequisiteOutcome: "eligible",
    endorsementStage: "under_review",
    feePaid: true,
    status: {
      whereAmI: {
        stageNumber: 4,
        totalStages: 6,
        title: "Scrutiny by Licensing Authority",
        description: "Your Form 2 endorsement application is currently being reviewed.",
      },
      whatHappened:
        "You submitted your Form 2 application, completed contactless e-KYC, and paid statutory fees (₹850).",
      whatIsHappening:
        "The Licensing Officer at RTO Janakpuri is reviewing your linked Learner's Licence and particulars.",
      whoNeedsToAct: {
        owner: "rto",
        label: "RTO Officer Reviewing",
        detail: "Standard scrutiny takes 1 to 2 business days. No action needed from you.",
      },
      whatINeedToDo: {
        actionTitle: "You're all set for now",
        instructions:
          "No action is required from you while scrutiny is underway. We will notify you via SMS when review completes.",
        primaryCtaText: "Track Scrutiny Status",
        actionKey: "track_scrutiny",
      },
      whatHappensNext:
        "Once review is approved, your driving test track appointment will be activated.",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        title: "Existing LMV Licence",
        shortDescription: "Verified (DL-0420110023456)",
        state: "completed",
        completedDate: "Verified",
      },
      {
        id: "m2",
        stageNumber: 2,
        title: "MCWG Learner Licence",
        shortDescription: "Active (LL-0420260089123)",
        state: "completed",
        completedDate: "Issued",
      },
      {
        id: "m3",
        stageNumber: 3,
        title: "Eligibility / Waiting Period",
        shortDescription: "Holding period satisfied",
        state: "completed",
        completedDate: "Complete",
      },
      {
        id: "m4",
        stageNumber: 4,
        title: "Endorsement Application (Form 2)",
        shortDescription: "Submitted & Fee Paid (₹850) · Scrutiny Active",
        state: "waiting",
        detailBadge: "Under Review",
      },
      {
        id: "m5",
        stageNumber: 5,
        title: "Driving Test Evaluation",
        shortDescription: "Unlocks upon scrutiny clearance",
        state: "upcoming",
      },
      {
        id: "m6",
        stageNumber: 6,
        title: "Driving Licence Updated",
        shortDescription: "MCWG added to smart card",
        state: "upcoming",
      },
    ],
  },

  // Scenario 6: Recovery: Blocked (Missing condition)
  scenario_6_blocked: {
    scenarioId: "scenario_6_blocked",
    scenarioName: "6. Recovery: Blocked",
    applicationReference: "SJ-MCWG-2048",
    serviceType: "Addition of Class of Vehicle (MCWG Endorsement)",
    existingClass: "LMV — Light Motor Vehicle",
    targetClass: "MCWG — Motorcycle With Gear",
    applicant: defaultApplicantPriya,
    learnerLicence: {
      hasLL: false,
      status: "Missing",
      holdingDaysCompleted: 0,
      statutoryHoldingDaysRequired: 30,
      isHoldingComplete: false,
    },
    prerequisiteOutcome: "missing_ll",
    endorsementStage: "not_started",
    feePaid: false,
    recoveryMode: "blocked",
    status: {
      whereAmI: {
        stageNumber: 2,
        totalStages: 6,
        title: "Application Blocked — Prerequisite Required",
        description: "Your application cannot proceed without an active MCWG Learner's Licence.",
      },
      whatHappened:
        "The national registry did not return an active MCWG Learner's Licence linked to your profile.",
      whatIsHappening:
        "Central Motor Vehicles Rules prohibit endorsement test bookings without a valid category LL.",
      whoNeedsToAct: {
        owner: "applicant",
        label: "Action Required from You",
        detail: "Apply for an MCWG Learner's Licence or search existing records.",
      },
      whatINeedToDo: {
        actionTitle: "Apply for MCWG Learner's Licence",
        instructions:
          "Start your simplified LL application online, or search your records if you previously held an LL in another state.",
        primaryCtaText: "Apply for MCWG Learner's Licence",
        actionKey: "apply_ll",
      },
      whatHappensNext:
        "Once your MCWG LL is issued, this endorsement application will unblock automatically.",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        title: "Existing LMV Licence",
        shortDescription: "Verified (DL-0420200099887)",
        state: "completed",
        completedDate: "Verified",
      },
      {
        id: "m2",
        stageNumber: 2,
        title: "MCWG Learner Licence",
        shortDescription: "BLOCKED: Active MCWG LL not found",
        state: "action_required",
        detailBadge: "Blocked",
      },
      {
        id: "m3",
        stageNumber: 3,
        title: "Eligibility / Waiting Period",
        shortDescription: "Holding period pending LL issuance",
        state: "upcoming",
      },
      {
        id: "m4",
        stageNumber: 4,
        title: "Endorsement Application",
        shortDescription: "Blocked pending prerequisites",
        state: "upcoming",
      },
      {
        id: "m5",
        stageNumber: 5,
        title: "Driving Test Evaluation",
        shortDescription: "Upcoming",
        state: "upcoming",
      },
      {
        id: "m6",
        stageNumber: 6,
        title: "Driving Licence Updated",
        shortDescription: "Upcoming",
        state: "upcoming",
      },
    ],
  },

  // Scenario 7: Recovery: Stalled (Review delay beyond SLA)
  scenario_7_stalled: {
    scenarioId: "scenario_7_stalled",
    scenarioName: "7. Recovery: Stalled",
    applicationReference: "SJ-MCWG-2048",
    serviceType: "Addition of Class of Vehicle (MCWG Endorsement)",
    existingClass: "LMV — Light Motor Vehicle",
    targetClass: "MCWG — Motorcycle With Gear",
    applicant: defaultApplicantAdvait,
    learnerLicence: {
      hasLL: true,
      llNumber: "LL-0420260089123",
      issueDate: "10 Jun 2026",
      validUntil: "09 Dec 2026",
      status: "Active",
      holdingDaysCompleted: 45,
      statutoryHoldingDaysRequired: 30,
      isHoldingComplete: true,
    },
    prerequisiteOutcome: "eligible",
    endorsementStage: "under_review",
    feePaid: true,
    recoveryMode: "stalled",
    status: {
      whereAmI: {
        stageNumber: 4,
        totalStages: 6,
        title: "Review Delayed Beyond Standard SLA",
        description: "Your application has been in scrutiny for 6 business days (standard is 2 days).",
      },
      whatHappened:
        "Application Form 2 and fee payment (₹850) were submitted on 20 Aug 2026.",
      whatIsHappening:
        "RTO Janakpuri has experienced a document scrutiny queue backlog. Your application is safe.",
      whoNeedsToAct: {
        owner: "rto",
        label: "Licensing Authority (DL-04)",
        detail: "Escalation ticket automatically generated for the Assistant RTO officer.",
      },
      whatINeedToDo: {
        actionTitle: "Trigger Priority Status Inquiry",
        instructions:
          "Send an automated status inquiry ping to RTO Janakpuri or view helpline contact numbers.",
        primaryCtaText: "Send Status Inquiry to RTO",
        actionKey: "inquire_rto",
      },
      whatHappensNext:
        "The RTO officer is notified with priority status. Review resolution expected within 24 hours.",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        title: "Existing LMV Licence",
        shortDescription: "Verified (DL-0420110023456)",
        state: "completed",
        completedDate: "Verified",
      },
      {
        id: "m2",
        stageNumber: 2,
        title: "MCWG Learner Licence",
        shortDescription: "Active (LL-0420260089123)",
        state: "completed",
        completedDate: "Issued",
      },
      {
        id: "m3",
        stageNumber: 3,
        title: "Eligibility / Waiting Period",
        shortDescription: "Holding period complete",
        state: "completed",
        completedDate: "Complete",
      },
      {
        id: "m4",
        stageNumber: 4,
        title: "Endorsement Application (Form 2)",
        shortDescription: "Scrutiny delayed · Escalation active",
        state: "waiting",
        detailBadge: "Delayed (SLA)",
      },
      {
        id: "m5",
        stageNumber: 5,
        title: "Driving Test Evaluation",
        shortDescription: "Upcoming after clearance",
        state: "upcoming",
      },
      {
        id: "m6",
        stageNumber: 6,
        title: "Driving Licence Updated",
        shortDescription: "Upcoming",
        state: "upcoming",
      },
    ],
  },

  // Scenario 8: Driving Test Booked / Action Available
  scenario_8_test_booked: {
    scenarioId: "scenario_8_test_booked",
    scenarioName: "8. Driving Test Booked",
    applicationReference: "SJ-MCWG-2048",
    serviceType: "Addition of Class of Vehicle (MCWG Endorsement)",
    existingClass: "LMV — Light Motor Vehicle",
    targetClass: "MCWG — Motorcycle With Gear",
    applicant: defaultApplicantAdvait,
    learnerLicence: {
      hasLL: true,
      llNumber: "LL-0420260089123",
      issueDate: "10 Jun 2026",
      validUntil: "09 Dec 2026",
      status: "Active",
      holdingDaysCompleted: 45,
      statutoryHoldingDaysRequired: 30,
      isHoldingComplete: true,
    },
    prerequisiteOutcome: "eligible",
    endorsementStage: "test_scheduled",
    feePaid: true,
    appointment: {
      isBooked: true,
      date: "Mon, 16 Sep 2024",
      timeSlot: "09:30 AM - 11:30 AM",
      trackName: "Automated Driving Test Track, RTO Janakpuri (DL-04)",
      reference: "APT-DL04-2024-9912",
    },
    status: {
      whereAmI: {
        stageNumber: 5,
        totalStages: 6,
        title: "Driving Test Scheduled",
        description: "Your MCWG practical driving skill evaluation is confirmed.",
      },
      whatHappened:
        "Form 2 application scrutinized, fee paid (₹850), and appointment booked.",
      whatIsHappening:
        "Your test slot is confirmed for Mon, 16 Sep 2024 at 09:30 AM at the Janakpuri Automated Track.",
      whoNeedsToAct: {
        owner: "applicant",
        label: "Action Required on Test Day",
        detail: "Arrive 15 minutes before slot with your MCWG two-wheeler and ISI helmet.",
      },
      whatINeedToDo: {
        actionTitle: "Review Test Day Instructions",
        instructions:
          "Download your appointment slip, bring your original RC and insurance, and wear an ISI helmet.",
        primaryCtaText: "Download Appointment Slip (PDF)",
        actionKey: "download_slip",
      },
      whatHappensNext:
        "Upon passing the automated sensor track test, your driving licence will be updated with MCWG.",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        title: "Existing LMV Licence",
        shortDescription: "Verified (DL-0420110023456)",
        state: "completed",
        completedDate: "Verified",
      },
      {
        id: "m2",
        stageNumber: 2,
        title: "MCWG Learner Licence",
        shortDescription: "Active (LL-0420260089123)",
        state: "completed",
        completedDate: "Issued",
      },
      {
        id: "m3",
        stageNumber: 3,
        title: "Eligibility / Waiting Period",
        shortDescription: "Holding period satisfied",
        state: "completed",
        completedDate: "Complete",
      },
      {
        id: "m4",
        stageNumber: 4,
        title: "Endorsement Application (Form 2)",
        shortDescription: "Approved & Fee Paid (₹850)",
        state: "completed",
        completedDate: "Approved",
      },
      {
        id: "m5",
        stageNumber: 5,
        title: "Driving Test Evaluation",
        shortDescription: "Booked: Mon, 16 Sep at 09:30 AM (Janakpuri Track)",
        state: "current",
        detailBadge: "Slot Confirmed",
      },
      {
        id: "m6",
        stageNumber: 6,
        title: "Driving Licence Updated",
        shortDescription: "MCWG endorsement to be generated after test",
        state: "upcoming",
      },
    ],
  },

  // Scenario 9: Completed Journey (MCWG added to Smart Card Licence)
  scenario_9_completed: {
    scenarioId: "scenario_9_completed",
    scenarioName: "9. Journey Completed",
    applicationReference: "SJ-MCWG-2048",
    serviceType: "Addition of Class of Vehicle (MCWG Endorsement)",
    existingClass: "LMV — Light Motor Vehicle",
    targetClass: "MCWG — Motorcycle With Gear",
    applicant: defaultApplicantAdvait,
    learnerLicence: {
      hasLL: true,
      llNumber: "LL-0420260089123",
      issueDate: "10 Jun 2026",
      validUntil: "09 Dec 2026",
      status: "Active",
      holdingDaysCompleted: 45,
      statutoryHoldingDaysRequired: 30,
      isHoldingComplete: true,
    },
    prerequisiteOutcome: "eligible",
    endorsementStage: "licence_updated",
    feePaid: true,
    status: {
      whereAmI: {
        stageNumber: 6,
        totalStages: 6,
        title: "Journey Complete · MCWG Added to Driving Licence",
        description: "Your driving licence now authorizes both LMV and MCWG vehicle classes.",
      },
      whatHappened:
        "You passed the automated driving test, the Licensing Authority approved the endorsement, and your central national registry record has been updated.",
      whatIsHappening:
        "Your digital driving licence is active on DigiLocker/mParivahan. Physical smart card dispatched via Speed Post.",
      whoNeedsToAct: {
        owner: "system",
        label: "Journey Complete",
        detail: "No further action needed. Download digital copy or track Speed Post dispatch.",
      },
      whatINeedToDo: {
        actionTitle: "View Updated Driving Licence",
        instructions:
          "View your updated digital licence card showing both LMV and MCWG classes, or download the official soft copy.",
        primaryCtaText: "View Updated Licence",
        actionKey: "view_licence",
      },
      whatHappensNext:
        "Your physical chip smart card will be delivered to your registered address via India Post Speed Post.",
    },
    milestones: [
      {
        id: "m1",
        stageNumber: 1,
        title: "Existing LMV Licence",
        shortDescription: "Verified (DL-0420110023456)",
        state: "completed",
        completedDate: "Verified",
      },
      {
        id: "m2",
        stageNumber: 2,
        title: "MCWG Learner Licence",
        shortDescription: "Active (LL-0420260089123)",
        state: "completed",
        completedDate: "Issued",
      },
      {
        id: "m3",
        stageNumber: 3,
        title: "Eligibility / Waiting Period",
        shortDescription: "Holding period complete",
        state: "completed",
        completedDate: "Complete",
      },
      {
        id: "m4",
        stageNumber: 4,
        title: "Endorsement Application (Form 2)",
        shortDescription: "Approved & Fee Paid (₹850)",
        state: "completed",
        completedDate: "Approved",
      },
      {
        id: "m5",
        stageNumber: 5,
        title: "Driving Test Evaluation",
        shortDescription: "Automated sensor track test PASSED",
        state: "completed",
        completedDate: "Passed",
      },
      {
        id: "m6",
        stageNumber: 6,
        title: "Driving Licence Updated",
        shortDescription: "MCWG added · LMV + MCWG Active",
        state: "completed",
        completedDate: "Endorsed",
        detailBadge: "Active",
      },
    ],
  },
};
