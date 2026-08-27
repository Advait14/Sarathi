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

    let user = null;
    if (token) {
      const session = getSession(token);
      if (session) {
        user = findUserById(session.userId);
      }
    }

    if (!user) {
      return NextResponse.json({
        authenticated: false,
        user: null,
        licence: null,
        activeApplication: null,
      });
    }

    const licence = getLicenceByDL(user.dlNumber);
    const applications = getApplicationsByUserId(user.id);

    return NextResponse.json({
      authenticated: true,
      user,
      licence,
      activeApplication: applications[0] || null,
    });

  } catch (error) {
    console.error("Auth Me API Error:", error);
    return NextResponse.json(
      { error: "Internal server error fetching user session." },
      { status: 500 }
    );
  }
}
