import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = Redis.fromEnv();

export async function GET() {
  const token = await redis.get('osu_token');
  return NextResponse.json({ token });
}
