import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) return NextResponse.redirect("/?error=no_code");

  const params = new URLSearchParams();
  params.append("client_id", process.env.OSU_CLIENT_ID);
  params.append("client_secret", process.env.OSU_CLIENT_SECRET);
  params.append("code", code);
  params.append("grant_type", "authorization_code");
  params.append("redirect_uri", process.env.OSU_REDIRECT_URI);

  const tokenRes = await fetch("https://osu.ppy.sh/oauth/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const data = await tokenRes.json();

  return NextResponse.redirect(`/dashboard?access_token=${data.access_token}`);
}
