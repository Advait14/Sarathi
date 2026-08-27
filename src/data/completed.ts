import type { JourneyStepData } from "./journey";

export interface UpdatedLicenceData {
  licenceNumber: string;
  holderName: string;
  dateOfBirth: string;
  bloodGroup: string;
  fatherOrHusbandName: string;
  originalIssueDate: string;
  endorsementDate: string;
  validityNonTransport: string;
  issuingAuthority: string;
  registeredAddress: string;
  authorizedClasses: {
    code: "LMV" | "MCWG";
    title: string;
    issueDate: string;
    status: "Active" | "Endorsed";
  }[];
}

export const syntheticCompletedLicence: UpdatedLicenceData = {
  licenceNumber: "DL-0420110023456",
  holderName: "Advait Sharma",
  dateOfBirth: "15/08/1995",
  bloodGroup: "B+",
  fatherOrHusbandName: "Rajesh Sharma",
  originalIssueDate: "15/08/2015",
  endorsementDate: "27/08/2026",
  validityNonTransport: "14/08/2035",
  issuingAuthority: "Licensing Authority, RTO Janakpuri, West Delhi (DL-04)",
  registeredAddress: "B-4/122, Janakpuri, New Delhi - 110058",
  authorizedClasses: [
    {
      code: "LMV",
      title: "Light Motor Vehicle (Car / Non-Transport)",
      issueDate: "15/08/2015",
      status: "Active",
    },
    {
      code: "MCWG",
      title: "Motorcycle With Gear (Two-Wheeler)",
      issueDate: "27/08/2026",
      status: "Endorsed",
    },
  ],
};

export const completedJourneySteps: JourneyStepData[] = [
  {
    id: "existing_licence",
    title: "Existing LMV Licence",
    shortDescription: "Verified active driving licence on the national register.",
    state: "completed",
    completedDate: "27 Aug 2026",
  },
  {
    id: "mcwg_ll",
    title: "MCWG Learner Licence",
    shortDescription: "Issued MCWG Learner's Licence (LL-0420260089123).",
    state: "completed",
    completedDate: "10 Jun 2026",
  },
  {
    id: "eligibility_waiting",
    title: "Eligibility / waiting period",
    shortDescription: "Completed mandatory 30-day statutory holding period.",
    state: "completed",
    completedDate: "10 Jul 2026",
  },
  {
    id: "endorsement_app",
    title: "Endorsement application",
    shortDescription: "Form 2 endorsement submitted and ₹850 statutory fee paid.",
    state: "completed",
    completedDate: "27 Aug 2026",
  },
  {
    id: "driving_test",
    title: "Driving test",
    shortDescription: "Attended and passed MCWG skill test at RTO Janakpuri Track.",
    state: "completed",
    completedDate: "27 Aug 2026",
  },
  {
    id: "licence_updated",
    title: "Licence updated",
    shortDescription: "MCWG class permanently added to national register record.",
    state: "completed",
    completedDate: "27 Aug 2026",
  },
];

