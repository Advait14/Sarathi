import fs from "fs";
import path from "path";

export interface UserRecord {
  id: string;
  name: string;
  mobile: string;
  email: string;
  dlNumber: string;
  dateOfBirth: string;
  bloodGroup: string;
  fatherOrHusbandName: string;
  registeredAddress: string;
  stateCode: string;
  rtoCode: string;
  rtoName: string;
}

export interface ClassOfVehicle {
  code: string;
  name: string;
  issueDate: string;
  validUntil: string;
  status: string;
}

export interface LearnerLicenceRecord {
  llNumber: string;
  covCode: string;
  covDescription: string;
  issueDate: string;
  validUntil: string;
  status: string;
  holdingDaysCompleted: number;
  statutoryHoldingDaysRequired: number;
  isHoldingPeriodComplete: boolean;
}

export interface LicenceRecord {
  dlNumber: string;
  userId: string;
  holderName: string;
  status: string;
  originalIssueDate: string;
  validityNonTransport: string;
  issuingAuthority: string;
  existingClasses: ClassOfVehicle[];
  learnerLicences: LearnerLicenceRecord[];
}

export interface ApplicationHistoryEntry {
  timestamp: string;
  action: string;
  actor: string;
  details: string;
}

export interface ApplicationRecord {
  id: string;
  applicationNumber: string;
  userId: string;
  dlNumber: string;
  serviceType: string;
  requestedClass: string;
  linkedLLNumber: string | null;
  stage: number;
  status:
    | "submitted"
    | "under_review"
    | "waiting"
    | "action_available"
    | "processing"
    | "completed"
    | "blocked"
    | "stalled";
  officialPortalStatus: string;
  submissionDate: string;
  lastUpdated: string;
  feePaid: boolean;
  feeAmount: number;
  feeTransactionId: string | null;
  appointment: {
    isBooked: boolean;
    date: string | null;
    timeSlot: string | null;
    trackName: string;
  };
  history: ApplicationHistoryEntry[];
}

export interface SessionRecord {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
}

export interface DatabaseSchema {
  users: UserRecord[];
  licences: LicenceRecord[];
  applications: ApplicationRecord[];
  sessions: SessionRecord[];
}

const DB_PATH = path.join(process.cwd(), "src", "server", "data", "db.json");

/**
 * Read the entire database from JSON file
 */
export function getDatabase(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_PATH)) {
      throw new Error(`Database file not found at ${DB_PATH}`);
    }
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw) as DatabaseSchema;
  } catch (error) {
    console.error("Error reading db.json:", error);
    throw error;
  }
}

/**
 * Atomically write database to JSON file
 */
export function saveDatabase(data: DatabaseSchema): void {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    const tempPath = `${DB_PATH}.tmp`;
    fs.writeFileSync(tempPath, jsonString, "utf-8");
    fs.renameSync(tempPath, DB_PATH);
  } catch (error) {
    console.error("Error writing db.json:", error);
    throw error;
  }
}

// -------------------------------------------------------------
// Database Query & Mutation Helpers
// -------------------------------------------------------------

export function findUserById(userId: string): UserRecord | undefined {
  const db = getDatabase();
  return db.users.find((u) => u.id === userId);
}

export function findUserByMobileOrDL(identifier: string): UserRecord | undefined {
  const db = getDatabase();
  const clean = identifier.trim().toUpperCase();
  return db.users.find(
    (u) =>
      u.mobile === identifier.trim() ||
      u.dlNumber.toUpperCase() === clean ||
      u.email.toLowerCase() === identifier.trim().toLowerCase()
  );
}

export function getLicenceByDL(dlNumber: string): LicenceRecord | undefined {
  const db = getDatabase();
  const clean = dlNumber.trim().toUpperCase();
  return db.licences.find((l) => l.dlNumber.toUpperCase() === clean);
}

export function getApplicationsByUserId(userId: string): ApplicationRecord[] {
  const db = getDatabase();
  return db.applications.filter((a) => a.userId === userId);
}

export function getApplicationByNumber(appNum: string): ApplicationRecord | undefined {
  const db = getDatabase();
  return db.applications.find((a) => a.applicationNumber === appNum);
}

export function updateApplication(
  appId: string,
  updates: Partial<ApplicationRecord>
): ApplicationRecord | undefined {
  const db = getDatabase();
  const index = db.applications.findIndex((a) => a.id === appId);
  if (index === -1) return undefined;

  const current = db.applications[index];
  const updated: ApplicationRecord = {
    ...current,
    ...updates,
    lastUpdated: new Date().toISOString(),
  };

  db.applications[index] = updated;
  saveDatabase(db);
  return updated;
}

export function createSession(userId: string): SessionRecord {
  const db = getDatabase();
  const token = `sess_${userId}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days

  const session: SessionRecord = {
    token,
    userId,
    createdAt: new Date().toISOString(),
    expiresAt,
  };

  // Clean old sessions for this user
  db.sessions = db.sessions.filter((s) => s.userId !== userId);
  db.sessions.push(session);
  saveDatabase(db);

  return session;
}

export function getSession(token: string): SessionRecord | undefined {
  const db = getDatabase();
  const session = db.sessions.find((s) => s.token === token);
  if (!session) return undefined;

  // Check expiry
  if (new Date(session.expiresAt).getTime() < Date.now()) {
    deleteSession(token);
    return undefined;
  }
  return session;
}

export function deleteSession(token: string): void {
  const db = getDatabase();
  db.sessions = db.sessions.filter((s) => s.token !== token);
  saveDatabase(db);
}
