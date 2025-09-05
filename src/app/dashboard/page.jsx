"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const searchParams = useSearchParams();
  const token = searchParams.get("access_token");

  useEffect(() => {
    if (token) {
      localStorage.setItem("osu_token", token);
    }
  }, [token]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Token disimpan di localStorage.</p>
    </div>
  );
}
