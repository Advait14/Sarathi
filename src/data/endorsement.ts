export type EndorsementStepId =
  | "verify_dl"
  | "confirm_licence"
  | "confirm_address"
  | "select_service_class"
  | "declaration"
  | "submission"
  | "payment"
  | "appointment"
  | "test_confirmed";

export interface StepMetadata {
  id: EndorsementStepId;
  stepNumber: number;
  title: string;
  shortTitle: string;
  description: string;
}

export const ENDORSEMENT_STEPS: StepMetadata[] = [
  {
    id: "verify_dl",
    stepNumber: 1,
    title: "Verify Existing Driving Licence",
    shortTitle: "Verify DL",
    description: "Enter your driving licence number and date of birth to retrieve your verified record.",
  },
  {
    id: "confirm_licence",
    stepNumber: 2,
    title: "Confirm Licence Details",
    shortTitle: "Licence Details",
    description: "Review personal and licence details retrieved from the national register.",
  },
  {
    id: "confirm_address",
    stepNumber: 3,
    title: "Confirm Address & Jurisdiction",
    shortTitle: "Address",
    description: "Confirm your residential address and assigned Regional Transport Office (RTO).",
  },
  {
    id: "select_service_class",
    stepNumber: 4,
    title: "Select Additional Class (MCWG)",
    shortTitle: "Select Class",
    description: "Select the addition of motorcycle with gear to your existing licence.",
  },
  {
    id: "declaration",
    stepNumber: 5,
    title: "Self Declaration (Form 1)",
    shortTitle: "Declaration",
    description: "Complete the statutory physical fitness and eligibility declarations.",
  },
  {
    id: "submission",
    stepNumber: 6,
    title: "Application Review & Submission",
    shortTitle: "Submission",
    description: "Review your pre-filled Form 2 endorsement application and generate your reference.",
  },
  {
    id: "payment",
    stepNumber: 7,
    title: "Statutory Fee Payment",
    shortTitle: "Payment",
    description: "Pay the required government endorsement and driving test fees.",
  },
  {
    id: "appointment",
    stepNumber: 8,
    title: "Book Driving Test Slot",
    shortTitle: "Slot Booking",
    description: "Select an appointment date and time slot for your practical MCWG driving test at the RTO.",
  },
  {
    id: "test_confirmed",
    stepNumber: 9,
    title: "Appointment Confirmed",
    shortTitle: "Test Ready",
    description: "Your driving test appointment is booked. Review required documents and next steps.",
  },
];

export interface ApplicantRecord {
  dlNumber: string;
  dateOfBirth: string;
  fullName: string;
  fatherName: string;
  bloodGroup: string;
  gender: string;
  mobileNumber: string;
  email: string;
  currentAddress: {
    street: string;
    locality: string;
    city: string;
    state: string;
    pincode: string;
  };
  rtoOffice: {
    code: string;
    name: string;
    state: string;
    trackAddress: string;
  };
  existingClasses: {
    covCode: string;
    covDescription: string;
    issueDate: string;
    validUntil: string;
  }[];
  learnerLicence: {
    llNumber: string;
    covCode: string;
    covDescription: string;
    issueDate: string;
    validUntil: string;
    status: string;
  };
}

export const defaultApplicantRecord: ApplicantRecord = {
  dlNumber: "DL-0420110023456",
  dateOfBirth: "15/08/1995",
  fullName: "Advait Sharma",
  fatherName: "Rajesh Sharma",
  bloodGroup: "O+",
  gender: "Male",
  mobileNumber: "+91 98765 43210",
  email: "advait.sharma@example.com",
  currentAddress: {
    street: "Flat 402, Block B, Silver Heights",
    locality: "Janakpuri",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110058",
  },
  rtoOffice: {
    code: "DL-04",
    name: "RTO Janakpuri, West Delhi",
    state: "Delhi",
    trackAddress: "Automated Driving Test Track, RTO Janakpuri, New Delhi - 110058",
  },
  existingClasses: [
    {
      covCode: "LMV",
      covDescription: "Light Motor Vehicle (Non-Transport)",
      issueDate: "12/04/2018",
      validUntil: "14/08/2035",
    },
  ],
  learnerLicence: {
    llNumber: "LL-0420260089123",
    covCode: "MCWG",
    covDescription: "Motorcycle With Gear (Non-Transport)",
    issueDate: "10/06/2026",
    validUntil: "09/12/2026",
    status: "Active & Eligible",
  },
};

export interface FeeItem {
  id: string;
  description: string;
  ruleReference: string;
  amount: number;
}

export const feeStructure: FeeItem[] = [
  {
    id: "endorsement_fee",
    description: "Addition of Class of Vehicle (Endorsement)",
    ruleReference: "CMVR Rule 32 / Form 2",
    amount: 500,
  },
  {
    id: "test_fee",
    description: "Driving Skill Test Fee (MCWG)",
    ruleReference: "CMVR Rule 32 — DL Test",
    amount: 300,
  },
  {
    id: "user_charges",
    description: "Automated Driving Test Track User Charges",
    ruleReference: "Delhi Transport Dept",
    amount: 50,
  },
];

export interface AvailableAppointmentSlot {
  date: string;
  formattedDate: string;
  day: string;
  slots: {
    id: string;
    time: string;
    availableSeats: number;
  }[];
}

export const availableAppointmentSlots: AvailableAppointmentSlot[] = [
  {
    date: "2026-09-15",
    formattedDate: "15 Sep 2026",
    day: "Tuesday",
    slots: [
      { id: "slot_1", time: "09:00 AM - 10:00 AM", availableSeats: 4 },
      { id: "slot_2", time: "10:30 AM - 11:30 AM", availableSeats: 8 },
      { id: "slot_3", time: "12:00 PM - 01:00 PM", availableSeats: 3 },
      { id: "slot_4", time: "02:30 PM - 03:30 PM", availableSeats: 6 },
    ],
  },
  {
    date: "2026-09-16",
    formattedDate: "16 Sep 2026",
    day: "Wednesday",
    slots: [
      { id: "slot_5", time: "09:00 AM - 10:00 AM", availableSeats: 2 },
      { id: "slot_6", time: "10:30 AM - 11:30 AM", availableSeats: 5 },
      { id: "slot_7", time: "02:30 PM - 03:30 PM", availableSeats: 9 },
    ],
  },
  {
    date: "2026-09-18",
    formattedDate: "18 Sep 2026",
    day: "Friday",
    slots: [
      { id: "slot_8", time: "10:30 AM - 11:30 AM", availableSeats: 7 },
      { id: "slot_9", time: "12:00 PM - 01:00 PM", availableSeats: 4 },
      { id: "slot_10", time: "02:30 PM - 03:30 PM", availableSeats: 11 },
    ],
  },
];
