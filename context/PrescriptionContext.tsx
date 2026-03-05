"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface Prescription {
  id: number;
  doctorName: string;
  patientName: string;
  date: string;
  fileName: string;
  file: string;
}

interface ContextType {
  prescriptions: Prescription[];
  addPrescription: (data: Prescription) => void;
  deletePrescription: (id: number) => void;
}

const PrescriptionContext = createContext<ContextType | null>(null);

export function PrescriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("prescriptions");
    if (stored) setPrescriptions(JSON.parse(stored));
  }, []);

  const addPrescription = (data: Prescription) => {
    const updated = [...prescriptions, data];

    setPrescriptions(updated);

    localStorage.setItem("prescriptions", JSON.stringify(updated));
  };

  const deletePrescription = (id: number) => {
    const updated = prescriptions.filter((p) => p.id !== id);

    setPrescriptions(updated);

    localStorage.setItem("prescriptions", JSON.stringify(updated));
  };

  return (
    <PrescriptionContext.Provider
      value={{ prescriptions, addPrescription, deletePrescription }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
}

export function usePrescriptions() {
  const context = useContext(PrescriptionContext);

  if (!context)
    throw new Error("usePrescriptions must be used inside provider");

  return context;
}
