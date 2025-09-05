"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  FiHome, FiLayers, FiClipboard, FiDatabase, FiBarChart2,
  FiKey, FiBookOpen, FiMessageCircle, FiCreditCard, FiSettings,
  FiSun, FiMoon
} from "react-icons/fi";
import { SiOsu } from "react-icons/si";

export default function Navbar({ isOpen, setIsOpen }) {
  const [darkMode, setDarkMode] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme") === "dark";
    setDarkMode(saved);
    if (saved) document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

 const toggleTheme = () => {
  const html = document.documentElement;
  const isDark = html.classList.toggle("dark"); // otomatis toggle
  setDarkMode(isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");
};

  const menuItems = [
    {
      section: "Apps",
      links: [
        { name: "Home", href: "/", icon: <FiHome />, badge: null },
        { name: "Models", href: "/models", icon: <FiLayers />, badge: "new" },
        { name: "My Workflows", href: "/workflows", icon: <FiClipboard /> },
        { name: "Workflow Templates", href: "/templates", icon: <FiDatabase /> },
        { name: "Model Comparison", href: "/comparison", icon: <FiBarChart2 /> },
      ],
    },
    {
      section: "Developers",
      links: [
        { name: "API Keys", href: "/api-keys", icon: <FiKey /> },
        { name: "Documentation", href: "/docs", icon: <FiBookOpen /> },
        { name: "Discord", href: "/discord", icon: <FiMessageCircle /> },
      ],
    },
  ];

  const workspaceLinks = [
    { name: "Billing", href: "/billing", icon: <FiCreditCard /> },
    { name: "Settings", icon: <FiSettings /> },
  ];

  return (
    <aside className={`fixed top-0 left-0 z-40 h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-md transition-all duration-300 flex flex-col ${isOpen ? "w-60 md:w-72" : "w-16 md:w-20"}`}>
      <div className="flex-1 flex flex-col p-3">
        {/* Hamburger Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="mb-6 flex justify-center text-gray-500 hover:text-pink-500">
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-transform duration-300 ${isOpen ? "rotate-90" : "rotate-0"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>

        {/* Logo */}
        <div className={`mb-6 ${!isOpen && "flex justify-center"}`}>
          <h1 className={`text-lg font-bold text-blue-600 transition-opacity duration-300 ${!isOpen && "opacity-0"}`}>ByteDance</h1>
        </div>

        {/* Menu Sections */}
        {menuItems.map(section => (
          <div key={section.section} className="mb-6">
            <h2 className={`text-xs uppercase text-gray-500 mb-2 transition-opacity duration-300 ${!isOpen && "opacity-0"}`}>{section.section}</h2>
            <ul className="space-y-2">
              {section.links.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className={`group relative flex items-center text-gray-700 hover:text-pink-500 transition-all duration-300 ${isOpen ? "justify-start" : "justify-center"}`}>
                    <span className="text-lg">{link.icon}</span>
                    <span className={`ml-3 whitespace-nowrap transition-all duration-300 overflow-hidden ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>{link.name}</span>
                    {link.badge && isOpen && <span className="ml-auto text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full">{link.badge}</span>}
                    {!isOpen && <span className="absolute left-14 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">{link.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Workspace Section */}
        <div className="mt-auto">
          <h2 className={`text-xs uppercase text-gray-500 mb-2 transition-opacity duration-300 ${!isOpen && "opacity-0"}`}>Workspace</h2>
          <ul className="space-y-2 mb-4">
            {workspaceLinks.map(link => {
              if (link.name === "Settings") {
                return (
                  <li key={link.name} className="relative" ref={dropdownRef}>
                    <button onClick={() => setSettingsOpen(!settingsOpen)} className={`group relative flex items-center text-gray-700 hover:text-pink-500 transition-all duration-300 w-full ${isOpen ? "justify-start" : "justify-center"}`}>
                      <span className="text-lg">{link.icon}</span>
                      <span className={`ml-3 transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>{link.name}</span>
                      {!isOpen && <span className="absolute left-14 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">{link.name}</span>}
                    </button>
                    {settingsOpen && (
                      <div className="absolute mt-1 left-full top-0 bg-white border shadow rounded-md p-2 flex flex-col gap-2 z-50 min-w-[150px]">
                        <button onClick={toggleTheme} className="flex items-center gap-2 text-gray-700 hover:text-pink-500 px-2 py-1 rounded transition">
                          {darkMode ? <FiSun /> : <FiMoon />}
                          {darkMode ? "Light Mode" : "Dark Mode"}
                        </button>
                      </div>
                    )}
                  </li>
                );
              }
              return (
                <li key={link.name}>
                  <Link href={link.href} className={`group relative flex items-center text-gray-700 hover:text-pink-500 transition-all duration-300 ${isOpen ? "justify-start" : "justify-center"}`}>
                    <span className="text-lg">{link.icon}</span>
                    <span className={`ml-3 transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>{link.name}</span>
                    {!isOpen && <span className="absolute left-14 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">{link.name}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Login Button */}
          <button className={`group relative flex items-center gap-3 bg-pink-500 text-white px-3 py-2 rounded w-full hover:bg-pink-600 transition-colors ${isOpen ? "justify-start" : "justify-center"}`}>
            <SiOsu className="text-lg" />
            <span className={`whitespace-nowrap transition-all duration-300 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>Login with osu!</span>
            {!isOpen && <span className="absolute left-14 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition">Login with osu!</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
