"use client";

import { useState } from "react";
import DoctorLogin from "./DoctorLogin";
import DoctorDashboard from "./DoctorDashboard";

export default function DoctorProfilePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return isLoggedIn ? (
    <DoctorDashboard />
  ) : (
    <DoctorLogin onLoginSuccess={() => setIsLoggedIn(true)} />
  );
}