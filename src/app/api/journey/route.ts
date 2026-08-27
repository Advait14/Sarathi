import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getSession,
  findUserById,
  getLicenceByDL,
  getApplicationsByUserId,
  getDatabase,
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

    const licence = getLicenceByDL(user.dlNumber);
    const applications = getApplicationsByUserId(user.id);
    const app = applications[0];

    const steps = [
      {
        id: "existing_licence",
        stepNumber: 1,
        title: "Existing LMV Licence",
        shortDescription: `Verified active driving licence (${user.dlNumber}) on the national register.`,
        state: "completed" as const,
        completedDate: licence?.originalIssueDate ?? "15 Aug 2015",
      },
      {
        id: "mcwg_ll",
        stepNumber: 2,
        title: "MCWG Learner Licence",
        shortDescription:
          licence?.learnerLicences && licence.learnerLicences.length > 0
            ? `Issued MCWG Learner's Licence (${licence.learnerLicences[0].llNumber}).`
            : "MCWG Learner's Licence missing on central register.",
        state:
          licence?.learnerLicences && licence.learnerLicences.length > 0
            ? ("completed" as const)
            : ("current" as const),
        completedDate: licence?.learnerLicences?.[0]?.issueDate,
      },
      {
        id: "eligibility_waiting",
        stepNumber: 3,
        title: "Eligibility / waiting period",
        shortDescription:
          licence?.learnerLicences?.[0]?.isHoldingPeriodComplete
            ? "Completed mandatory 30-day statutory holding period."
            : "Awaiting completion of mandatory 30-day holding period.",
        state:
          licence?.learnerLicences?.[0]?.isHoldingPeriodComplete
            ? ("completed" as const)
            : ("upcoming" as const),
        completedDate: "10 Jul 2026",
      },
      {
        id: "endorsement_app",
        stepNumber: 4,
        title: "Endorsement application",
        shortDescription: app
          ? `Form 2 submitted (Ref: ${app.applicationNumber}). Document scrutiny in progress.`
          : "Filing Form 2 endorsement for additional vehicle class.",
        state:
          app?.stage && app.stage > 4
            ? ("completed" as const)
            : app?.stage === 4
            ? ("current" as const)
            : ("upcoming" as const),
      },
      {
        id: "driving_test",
        stepNumber: 5,
        title: "Driving test",
        shortDescription: app?.appointment?.isBooked
          ? `Slot confirmed for ${app.appointment.date} at RTO Janakpuri Track.`
          : "Attend practical driving test on scheduled date at RTO Janakpuri Track.",
        state:
          app?.stage && app.stage > 5
            ? ("completed" as const)
            : app?.stage === 5
            ? ("current" as const)
            : ("upcoming" as const),
      },
      {
        id: "licence_updated",
        stepNumber: 6,
        title: "Licence updated",
        shortDescription:
          app?.stage === 6
            ? "MCWG class permanently added to national register record."
            : "New vehicle class added and updated digital smart card dispatched.",
        state: app?.stage === 6 ? ("completed" as const) : ("upcoming" as const),
      },
    ];

    const completedCount = steps.filter((s) => s.state === "completed").length;

    return NextResponse.json({
      applicationReference: app?.applicationNumber ?? "SJ-MCWG-2048",
      serviceType: app?.serviceType ?? "Endorsement of Vehicle Class (Form 2)",
      vehicleClass: "MCWG (Motorcycle With Gear)",
      existingLicence: `${user.dlNumber} (${user.name})`,
      submissionDate: app?.submissionDate ?? "20 Aug 2026",
      lastUpdatedDate: app?.lastUpdated ?? "27 Aug 2026, 11:20 AM",
      steps,
      completedCount,
      totalSteps: steps.length,
      user,
      licence,
      application: app,
    });
  } catch (error) {
    console.error("Journey API Error:", error);
    return NextResponse.json(
      { error: "Internal server error fetching journey." },
      { status: 500 }
    );
  }
}
