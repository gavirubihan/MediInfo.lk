import { NextResponse } from "next/server";

export async function POST(request: any) {
  const reqBody = await request.json();
  const idToken = reqBody.idToken;

  if (!idToken) {
    return NextResponse.json({ error: "No idToken provided" }, { status: 401 });
  }

  // Store the Firebase ID token in a secure httpOnly cookie.
  // The token itself is signed by Firebase (or the emulator) and can be
  // verified server-side using the Firebase Admin SDK when needed.
  const response = NextResponse.json({ success: true }, { status: 200 });

  const isProduction = process.env.NODE_ENV === "production";
  const expiresIn = 60 * 60 * 24 * 5; // 5 days in seconds

  response.cookies.set("AuthToken", idToken, {
    maxAge: expiresIn,
    httpOnly: true,
    secure: isProduction,
    path: "/",
    sameSite: "lax",
  });

  return response;
}
