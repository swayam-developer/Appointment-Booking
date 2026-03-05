"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Appointment {
  id: number;
  doctorId: number;
  patientName: string;
  age: string;
  problem: string;
  date: string;
  time: string;
  status: string;
}

interface ContextType {
  appointments: Appointment[];
}

const AppointmentContext = createContext<ContextType | null>(null);

export function AppointmentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const loadAppointments = () => {
      const stored = JSON.parse(localStorage.getItem("appointments") || "[]");
      setAppointments(stored);
    };

    loadAppointments();

    window.addEventListener("appointmentUpdated", loadAppointments);

    return () => {
      window.removeEventListener("appointmentUpdated", loadAppointments);
    };
  }, []);

  return (
    <AppointmentContext.Provider value={{ appointments }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error("useAppointments must be used inside provider");
  return context;
}
