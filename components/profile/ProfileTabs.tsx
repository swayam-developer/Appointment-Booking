"use client";

import { usePrescriptions } from "@/context/PrescriptionContext";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function ProfileTabs({ activeTab, setActiveTab }: Props) {
  const { prescriptions } = usePrescriptions();

  const tabs = [
    { id: "profile", label: "Profile" },
    { id: "prescriptions", label: "Prescriptions" },
    { id: "reports", label: "Test Reports" },
    { id: "documents", label: "Documents" },
    { id: "vitals", label: "Vital Signs" },
    { id: "emergency", label: "Emergency" },
  ];

  return (
    <div className="flex gap-6 border-b pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`relative pb-2 text-sm font-medium transition
      
      ${
        activeTab === tab.id
          ? "text-blue-600 border-b-2 border-blue-600"
          : "text-gray-600 hover:text-blue-600"
      }`}
        >
          {tab.label}

          {tab.id === "prescriptions" && prescriptions.length > 0 && (
            <span className="absolute -top-3 -right-4 bg-blue-300 text-gray-800 text-xs px-1.5 py-0.5 rounded-full">
              {prescriptions.length}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
