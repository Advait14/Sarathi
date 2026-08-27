import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { deleteSession } from "@/server/db";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sarathi_session")?.value;

    if (token) {
      deleteSession(token);
    }

    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    response.cookies.delete("sarathi_session");
    return response;
  } catch (error) {
    console.error("Logout API Error:", error);
    return NextResponse.json(
      { error: "Internal server error during logout." },
      { status: 500 }
    );
  }
}
