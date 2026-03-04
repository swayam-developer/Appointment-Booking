"use client";

import { useState } from "react";
import ProfileTabs from "@/components/profile/ProfileTabs";
import PersonalInfo from "@/components/profile/PersonalInfo";
import Prescriptions from "@/components/profile/Prescriptions";
import TestReports from "@/components/profile/TestReports";
import Documents from "@/components/profile/Documents";
import VitalSigns from "@/components/profile/VitalSigns";
import Emergency from "@/components/profile/Emergency";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="p-8 space-y-6">

      <h1 className="text-2xl font-semibold text-gray-800">
        My Profile
      </h1>

      <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mt-6">
        {activeTab === "profile" && <PersonalInfo />}
        {activeTab === "prescriptions" && <Prescriptions />}
        {activeTab === "reports" && <TestReports />}
        {activeTab === "documents" && <Documents />}
        {activeTab === "vitals" && <VitalSigns />}
        {activeTab === "emergency" && <Emergency />}
      </div>

    </div>
  );
}