import { NextResponse } from "next/server";
import {
  findUserByMobileOrDL,
  getLicenceByDL,
  getApplicationsByUserId,
  createSession,
} from "@/server/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { identifier, otp } = body;

    if (!identifier) {
      return NextResponse.json(
        { error: "Mobile number or DL number is required." },
        { status: 400 }
      );
    }

    const user = findUserByMobileOrDL(identifier);
    if (!user) {
      return NextResponse.json(
        {
          error:
            "No citizen record found for this Mobile/DL number. Try demo credentials (9876543210 / DL-0420110023456).",
        },
        { status: 404 }
      );
    }

    // Validate Simulated Demo OTP (allow 123456 or any 6-digit code for prototype)
    if (otp && otp !== "123456" && otp.length !== 6) {
      return NextResponse.json(
        { error: "Invalid OTP. Use demo verification code 123456." },
        { status: 401 }
      );
    }

    // Create session in db.json
    const session = createSession(user.id);
    const licence = getLicenceByDL(user.dlNumber);
    const applications = getApplicationsByUserId(user.id);

    const response = NextResponse.json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      user,
      licence,
      activeApplication: applications[0] || null,
    });

    // Set HttpOnly session cookie
    response.cookies.set("sarathi_session", session.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API Error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
