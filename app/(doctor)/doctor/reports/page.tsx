"use client";

import { FileText, Users } from "lucide-react";

export default function PatientReportsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="text-blue-600" size={28} />

        <h1 className="text-2xl font-semibold text-gray-800">
          Patient Reports
        </h1>
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <Users className="text-blue-600" size={30} />
        </div>

        <h2 className="text-lg font-semibold text-gray-700">
          No Patient Reports Yet
        </h2>

        <p className="text-sm text-gray-500 max-w-md">
          Patient medical reports uploaded by patients will appear
          here. You will be able to review, download, and manage reports from
          this section.
        </p>
      </div>
    </div>
  );
}
