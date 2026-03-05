"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  FileText,
  FlaskConical,
  LogOut,
} from "lucide-react";

export default function DoctorSidebar() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("doctor");
    router.push("/doctor/login");
  };

  return (
    <aside className="w-64 bg-white border-r shadow-sm flex flex-col h-screen sticky top-0">

      {/* Logo */}
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-blue-600">
          Schedula Doctor
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 p-4 flex-1 text-md text-gray-700">

        <Link
          href="/doctor/dashboard"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          href="/doctor/reschedule"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <CalendarDays size={18} />
          Reschedule Slots
        </Link>

        <Link
          href="/doctor/prescription"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <FileText size={18} />
          Prescriptions
        </Link>

        <Link
          href="/doctor/reports"
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
        >
          <FlaskConical size={18} />
          Patient Reports
        </Link>

      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

    </aside>
  );
}