export interface StateRecord {
  code: string;
  name: string;
  isPopular?: boolean;
  rtoCount: number;
  portalPrefix: string;
}

export const INDIAN_STATES: StateRecord[] = [
  { code: "DL", name: "Delhi (NCT)", isPopular: true, rtoCount: 14, portalPrefix: "DL" },
  { code: "MH", name: "Maharashtra", isPopular: true, rtoCount: 50, portalPrefix: "MH" },
  { code: "KA", name: "Karnataka", isPopular: true, rtoCount: 65, portalPrefix: "KA" },
  { code: "UP", name: "Uttar Pradesh", isPopular: true, rtoCount: 75, portalPrefix: "UP" },
  { code: "JK", name: "Jammu and Kashmir", isPopular: true, rtoCount: 20, portalPrefix: "JK" },
  { code: "TN", name: "Tamil Nadu", isPopular: true, rtoCount: 70, portalPrefix: "TN" },
  { code: "GJ", name: "Gujarat", isPopular: true, rtoCount: 36, portalPrefix: "GJ" },
  { code: "RJ", name: "Rajasthan", isPopular: true, rtoCount: 52, portalPrefix: "RJ" },
  { code: "HR", name: "Haryana", isPopular: false, rtoCount: 32, portalPrefix: "HR" },
  { code: "PB", name: "Punjab", isPopular: false, rtoCount: 22, portalPrefix: "PB" },
  { code: "WB", name: "West Bengal", isPopular: false, rtoCount: 45, portalPrefix: "WB" },
  { code: "KL", name: "Kerala", isPopular: false, rtoCount: 86, portalPrefix: "KL" },
  { code: "AP", name: "Andhra Pradesh", isPopular: false, rtoCount: 38, portalPrefix: "AP" },
  { code: "TS", name: "Telangana", isPopular: false, rtoCount: 31, portalPrefix: "TS" },
  { code: "MP", name: "Madhya Pradesh", isPopular: false, rtoCount: 51, portalPrefix: "MP" },
  { code: "BR", name: "Bihar", isPopular: false, rtoCount: 38, portalPrefix: "BR" },
  { code: "OD", name: "Odisha", isPopular: false, rtoCount: 35, portalPrefix: "OD" },
  { code: "AS", name: "Assam", isPopular: false, rtoCount: 28, portalPrefix: "AS" },
  { code: "CH", name: "Chandigarh", isPopular: false, rtoCount: 1, portalPrefix: "CH" },
  { code: "GA", name: "Goa", isPopular: false, rtoCount: 8, portalPrefix: "GA" },
];

export interface PortalServiceItem {
  id: string;
  title: string;
  category: "endorsement" | "extract" | "renewal" | "applications" | "learner";
  shortDescription: string;
  highlight?: boolean;
  popular?: boolean;
  officialRef?: string;
  formCode?: string;
  tag: string;
}

export const PORTAL_SERVICES: PortalServiceItem[] = [
  {
    id: "add_endorsement_mcwg",
    title: "Additional Endorsement to DL",
    category: "endorsement",
    shortDescription: "Add Motorcycle With Gear (MCWG) or other vehicle classes to your existing driving licence.",
    highlight: true,
    popular: true,
    officialRef: "AEDL Services (Form 2)",
    formCode: "Form 2",
    tag: "Recommended for You",
  },
  {
    id: "dl_extract",
    title: "DL Extract / Record Verification",
    category: "extract",
    shortDescription: "Generate an authentic certified electronic extract of your driving licence history.",
    highlight: true,
    popular: true,
    officialRef: "Form 9 & SCOSTA Extract",
    formCode: "Extract",
    tag: "Official Verification",
  },
  {
    id: "apply_learner_licence",
    title: "Apply for Learner Licence",
    category: "learner",
    shortDescription: "Apply for a fresh Learner's Licence with online contactless LL test.",
    popular: true,
    formCode: "Form 2",
    tag: "New Drivers",
  },
  {
    id: "dl_renewal",
    title: "Apply for DL Renewal",
    category: "renewal",
    shortDescription: "Renew your expired or soon-to-expire driving licence within statutory grace periods.",
    popular: true,
    formCode: "Form 9",
    tag: "Licence Validity",
  },
  {
    id: "change_of_address",
    title: "Apply for Change of Address in DL",
    category: "renewal",
    shortDescription: "Update your permanent or current residential address with Aadhaar verification.",
    popular: false,
    formCode: "Form 1",
    tag: "Profile Update",
  },
  {
    id: "duplicate_dl",
    title: "Apply for Duplicate DL",
    category: "renewal",
    shortDescription: "Request a replacement smart card for lost, mutilated, or torn driving licences.",
    popular: false,
    formCode: "Form 2",
    tag: "Replacement",
  },
  {
    id: "complete_pending_app",
    title: "Complete your Pending Application",
    category: "applications",
    shortDescription: "Resume document upload, fee payment, or slot booking for an existing application.",
    popular: true,
    tag: "In Progress",
  },
  {
    id: "check_payment_status",
    title: "Check Payment Status",
    category: "applications",
    shortDescription: "Verify e-payment gateway transaction and download official treasury receipt.",
    popular: false,
    tag: "Treasury",
  },
  {
    id: "international_driving_permit",
    title: "Apply for International Driving Permit (IDP)",
    category: "endorsement",
    shortDescription: "Get official multi-lingual permit to drive vehicles in Geneva Convention member countries.",
    popular: false,
    formCode: "Form 4A",
    tag: "Overseas",
  },
];

export interface InstructionRoadmapMilestone {
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime: string;
  isOnline: boolean;
}

export const DL_SERVICES_ROADMAP: InstructionRoadmapMilestone[] = [
  {
    stepNumber: 1,
    title: "Fill Applicant Details & DL Lookup",
    description: "Enter your 16-character Driving Licence Number and Date of Birth to verify records from the national registry.",
    estimatedTime: "2 mins",
    isOnline: true,
  },
  {
    stepNumber: 2,
    title: "Select Service & Verify Eligibility",
    description: "Choose Additional Endorsement (MCWG) and confirm active Learner's Licence & statutory holding period.",
    estimatedTime: "3 mins",
    isOnline: true,
  },
  {
    stepNumber: 3,
    title: "Statutory Fee Payment",
    description: "Pay the ₹850 government fee online securely via UPI, NetBanking, or Card.",
    estimatedTime: "2 mins",
    isOnline: true,
  },
  {
    stepNumber: 4,
    title: "Driving Test Slot Booking (AEDL Only)",
    description: "Select your preferred date and time slot at your designated Automated Driving Test Track (ADTT RTO Facility).",
    estimatedTime: "2 mins",
    isOnline: true,
  },
];

/**
 * Normalizes user-entered DL number in any format to standard:
 * e.g. "dl0420110023456" -> "DL-0420110023456"
 * e.g. "RJ-14/DLC/00/91059" -> "RJ-1420000091059"
 */
export function normalizeDlNumber(rawInput: string): string {
  const clean = rawInput.trim().toUpperCase().replace(/[\s\/\-_]/g, "");
  if (clean.length >= 4) {
    const state = clean.slice(0, 2);
    const rto = clean.slice(2, 4);
    const rest = clean.slice(4);
    return `${state}-${rto}${rest}`;
  }
  return rawInput.trim().toUpperCase();
}
