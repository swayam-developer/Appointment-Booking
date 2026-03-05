"use client";

import { AppointmentProvider } from "@/context/AppointmentContext";
import DoctorSidebar from "@/components/doctor/DoctorSidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PrescriptionProvider } from "@/context/PrescriptionContext";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppointmentProvider>
      <PrescriptionProvider>
        <div className="flex min-h-screen bg-gray-50">
          <DoctorSidebar />
          <main className="flex-1 p-8">{children}</main>

          <ToastContainer
            position="top-right"
            autoClose={3000}
            theme="colored"
          />
        </div>
      </PrescriptionProvider>
    </AppointmentProvider>
  );
}
