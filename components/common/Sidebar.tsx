"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserRound,
  CalendarCheck,
  Stethoscope,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Doctors",
      href: "/dashboard/doctors",
      icon: Stethoscope,
    },
    {
      name: "Appointments",
      href: "/dashboard/appointments",
      icon: CalendarCheck,
    },
    {
      name: "My Profile",
      href: "/dashboard/profile",
      icon: UserRound,
    },
    {
      name: "Doctor Profile",
      href: "/dashboard/doctor-profile",
      icon: UserRound,
    },
  ];

  return (
    <div className="w-64 bg-white border-r min-h-screen p-6 hidden md:flex flex-col">

      {/* Logo Section */}
      <div className="flex items-center gap-2 mb-10">
        <div className="bg-primary text-white p-2 rounded-lg">
          <Stethoscope size={20} />
        </div>
        <h2 className="text-xl font-semibold text-primary">
          Schedula
        </h2>
      </div>

      {/* Menu Items Selection */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                }`}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto pt-10 text-xs text-gray-400">
        © {new Date().getFullYear()} Schedula
      </div>
    </div>
  );
}
