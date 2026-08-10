import { NextResponse } from "next/server";

export async function GET(request: any) {
  const cookies = request.cookies.getAll();
  const authToken = request.cookies.get('AuthToken');

  return NextResponse.json({
    allCookies: cookies,
    authToken: authToken ?? null,
    hasAuth: !!authToken,
  });
}
