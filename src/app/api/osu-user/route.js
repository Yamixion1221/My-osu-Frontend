import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = Redis.fromEnv();

export async function GET() {
  const token = await redis.get("osu_token");

  if (!token) {
    return NextResponse.json({ error: "No token found" }, { status: 401 });
  }

  const userRes = await fetch("https://osu.ppy.sh/api/v2/me", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!userRes.ok) {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 400 });
  }

  const user = await userRes.json();
  return NextResponse.json({ user });
}
