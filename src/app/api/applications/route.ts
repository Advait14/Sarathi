import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getSession,
  findUserById,
  getApplicationsByUserId,
  updateApplication,
  getDatabase,
  saveDatabase,
  type ApplicationRecord,
} from "@/server/db";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sarathi_session")?.value;

    let user;
    if (token) {
      const session = getSession(token);
      if (session) user = findUserById(session.userId);
    }
    if (!user) {
      const db = getDatabase();
      user = db.users[0];
    }

    const applications = getApplicationsByUserId(user.id);
    return NextResponse.json({ applications });
  } catch (error) {
    console.error("Applications GET API Error:", error);
    return NextResponse.json(
      { error: "Internal server error fetching applications." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sarathi_session")?.value;

    let user;
    if (token) {
      const session = getSession(token);
      if (session) user = findUserById(session.userId);
    }
    if (!user) {
      const db = getDatabase();
      user = db.users[0];
    }

    const body = await request.json();
    const { action, payload } = body;

    const db = getDatabase();
    let app = db.applications.find((a) => a.userId === user.id);

    if (action === "submit_form2") {
      if (!app) {
        app = {
          id: `app_${Date.now()}`,
          applicationNumber: `SJ-MCWG-${Math.floor(1000 + Math.random() * 9000)}`,
          userId: user.id,
          dlNumber: user.dlNumber,
          serviceType: "Endorsement of Vehicle Class (Form 2)",
          requestedClass: "MCWG",
          linkedLLNumber: "LL-0420260089123",
          stage: 4,
          status: "submitted",
          officialPortalStatus: "FORM 2 SUBMITTED - AWAITING SCRUTINY",
          submissionDate: new Date().toISOString(),
          lastUpdated: new Date().toISOString(),
          feePaid: false,
          feeAmount: 850,
          feeTransactionId: null,
          appointment: {
            isBooked: false,
            date: null,
            timeSlot: null,
            trackName: "Automated Driving Test Track, RTO Janakpuri",
          },
          history: [
            {
              timestamp: new Date().toISOString(),
              action: "Form 2 Application Submitted",
              actor: `Citizen (${user.name})`,
              details: "Form 2 endorsement submitted with Aadhaar e-sign.",
            },
          ],
        };
        db.applications.push(app);
      } else {
        app.status = "submitted";
        app.stage = 4;
        app.lastUpdated = new Date().toISOString();
        app.history.push({
          timestamp: new Date().toISOString(),
          action: "Form 2 Application Resubmitted",
          actor: `Citizen (${user.name})`,
          details: "Form 2 updated and submitted for review.",
        });
      }
      saveDatabase(db);
      return NextResponse.json({ success: true, application: app });
    }

    if (action === "pay_fee") {
      if (!app) {
        return NextResponse.json({ error: "No active application found." }, { status: 404 });
      }
      app.feePaid = true;
      app.feeTransactionId = `TXN-${Date.now().toString().slice(-8)}`;
      app.status = "action_available";
      app.lastUpdated = new Date().toISOString();
      app.history.push({
        timestamp: new Date().toISOString(),
        action: "Statutory Fee Paid (₹850)",
        actor: `Citizen (${user.name})`,
        details: `Online payment completed via simulated gateway. Ref: ${app.feeTransactionId}`,
      });
      saveDatabase(db);
      return NextResponse.json({ success: true, application: app });
    }

    if (action === "book_appointment") {
      if (!app) {
        return NextResponse.json({ error: "No active application found." }, { status: 404 });
      }
      const { date, timeSlot } = payload;
      app.appointment = {
        isBooked: true,
        date: date || "2026-09-15",
        timeSlot: timeSlot || "10:30 AM - 11:30 AM",
        trackName: "Automated Driving Test Track, RTO Janakpuri (DL-04)",
      };
      app.stage = 5;
      app.status = "processing";
      app.lastUpdated = new Date().toISOString();
      app.history.push({
        timestamp: new Date().toISOString(),
        action: "Driving Test Appointment Booked",
        actor: `Citizen (${user.name})`,
        details: `Slot reserved for ${app.appointment.date} (${app.appointment.timeSlot}) at RTO Janakpuri Track.`,
      });
      saveDatabase(db);
      return NextResponse.json({ success: true, application: app });
    }

    if (action === "complete_journey") {
      if (app) {
        app.stage = 6;
        app.status = "completed";
        app.officialPortalStatus = "LICENCE ENDORSED AND DISPATCHED";
        app.lastUpdated = new Date().toISOString();
        saveDatabase(db);
      }
      return NextResponse.json({ success: true, application: app });
    }

    return NextResponse.json({ error: "Unknown action provided." }, { status: 400 });
  } catch (error) {
    console.error("Applications POST API Error:", error);
    return NextResponse.json(
      { error: "Internal server error mutating application." },
      { status: 500 }
    );
  }
}
