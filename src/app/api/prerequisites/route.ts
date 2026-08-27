import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getSession,
  findUserById,
  getLicenceByDL,
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

    const hasActiveLMV =
      licence?.existingClasses.some(
        (c) => c.code === "LMV" && c.status === "Active"
      ) ?? false;

    const mcwgLL = licence?.learnerLicences.find((ll) => ll.covCode === "MCWG");
    const hasMCWGLL = !!mcwgLL;
    const isLLActive = mcwgLL?.status === "Active";
    const isHoldingComplete = mcwgLL?.isHoldingPeriodComplete ?? false;

    let stateKey = "prerequisite_missing";
    if (hasActiveLMV && hasMCWGLL && isLLActive && isHoldingComplete) {
      stateKey = "eligible_for_endorsement";
    } else if (hasActiveLMV && !hasMCWGLL) {
      stateKey = "prerequisite_missing";
    } else {
      stateKey = "ll_application_required";
    }

    const checklist = [
      {
        id: "existing_lmv",
        title: "Active Driving Licence (LMV)",
        description: `Verified valid Light Motor Vehicle licence (${user.dlNumber}) on Sarathi national registry.`,
        isSatisfied: hasActiveLMV,
        statusLabel: hasActiveLMV ? "Active & Verified" : "Missing / Inactive",
        tone: hasActiveLMV ? ("success" as const) : ("danger" as const),
      },
      {
        id: "mcwg_ll",
        title: "Motorcycle With Gear (MCWG) Learner's Licence",
        description: hasMCWGLL
          ? `Active Learner's Licence (${mcwgLL.llNumber}) issued on ${mcwgLL.issueDate}.`
          : "Mandatory prerequisite required under CMVR Rule 15 before endorsement filing.",
        isSatisfied: hasMCWGLL && isLLActive,
        statusLabel: hasMCWGLL ? (isLLActive ? "Issued & Active" : "Expired") : "Missing",
        tone: hasMCWGLL && isLLActive ? ("success" as const) : ("danger" as const),
      },
      {
        id: "statutory_waiting",
        title: "30-Day Statutory Holding Period",
        description: isHoldingComplete
          ? "Mandatory 30-day training/holding period satisfied under Central Motor Vehicles Rules."
          : hasMCWGLL
          ? `${mcwgLL.holdingDaysCompleted} of ${mcwgLL.statutoryHoldingDaysRequired} holding days completed.`
          : "Begins automatically on the date your MCWG Learner's Licence is issued.",
        isSatisfied: isHoldingComplete,
        statusLabel: isHoldingComplete
          ? "Complete"
          : hasMCWGLL
          ? "In Progress"
          : "Pending LL",
        tone: isHoldingComplete
          ? ("success" as const)
          : hasMCWGLL
          ? ("warning" as const)
          : ("neutral" as const),
      },
    ];

    return NextResponse.json({
      user,
      licence,
      stateKey,
      checklist,
      eligible: stateKey === "eligible_for_endorsement",
    });
  } catch (error) {
    console.error("Prerequisites API Error:", error);
    return NextResponse.json(
      { error: "Internal server error evaluating prerequisites." },
      { status: 500 }
    );
  }
}
