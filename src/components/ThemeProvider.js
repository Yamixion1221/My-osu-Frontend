"use client";
import { useEffect } from "react";

export default function ThemeProvider({ children }) {
  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    if (saved) document.documentElement.classList.add("dark");
  }, []);

  return children;
}
