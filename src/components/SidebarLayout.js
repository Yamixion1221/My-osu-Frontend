"use client";
import { useState } from "react";
import Navbar from "./Navbar";

export default function SidebarLayout({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main
        className={`transition-all duration-300 bg-gray-50 dark:bg-gray-950 min-h-screen overflow-y-auto p-6 w-full ${
           isOpen ? "ml-60 md:ml-72" : "ml-16 md:ml-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
