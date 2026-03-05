"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  Calendar,
  Clock,
  User,
  Stethoscope,
  Phone,
  XCircle,
} from "lucide-react";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("appointments") || "[]");

    setAppointments(stored);
  }, []);

  const handleCancel = (id: number) => {
    const updated = appointments.filter((a) => a.id !== id);

    localStorage.setItem("appointments", JSON.stringify(updated));

    setAppointments(updated);

    toast.error("Appointment cancelled");
  };

  if (appointments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <Stethoscope className="text-blue-500 mb-4" size={40} />

        <h2 className="text-xl font-semibold text-gray-700">
          No Appointments Yet
        </h2>

        <p className="text-gray-500 mt-2">
          Book an appointment with a doctor to see it here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-8 space-y-8">
      <h1 className="text-2xl font-semibold text-gray-800">My Appointments</h1>

      {appointments.map((appointment) => (
        <div
          key={appointment.id}
          className="bg-white rounded-xl border shadow-sm hover:shadow-md transition"
        >
          <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Stethoscope className="text-blue-600" />
              </div>

              <div>
                <h2 className="font-semibold text-lg">
                  {appointment.doctorName}
                </h2>

                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <Stethoscope size={14} />

                  {appointment.specialization || "General Physician"}
                </p>
              </div>
            </div>

            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
              {appointment.status}
            </span>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="flex items-center gap-2 text-gray-600">
                <Calendar size={16} className="text-blue-600" />

                <span>
                  <strong>Date:</strong> {appointment.date}
                </span>
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <Clock size={16} className="text-blue-600" />

                <span>
                  <strong>Time:</strong> {appointment.time}
                </span>
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <User size={16} className="text-blue-600" />

                <span>
                  <strong>Patient:</strong> {appointment.patientName}
                </span>
              </p>

              <p className="flex items-center gap-2 text-gray-600">
                <Phone size={16} className="text-blue-600" />

                <span>
                  <strong>Phone:</strong> {appointment.phone}
                </span>
              </p>
            </div>

            <div className="space-y-3">
              <p>
                <strong>Age:</strong> {appointment.age}
              </p>

              <p>
                <strong>Gender:</strong> {appointment.gender}
              </p>

              <p>
                <strong>Visit Type:</strong>{" "}
                {appointment.firstVisit === "yes" ? "First Visit" : "Follow-up"}
              </p>

              <p>
                <strong>Health Issue:</strong> {appointment.problem}
              </p>
            </div>
          </div>

          <div className="flex justify-end p-6 border-t">
            <Button
              variant="destructive"
              className="flex items-center gap-2"
              onClick={() => handleCancel(appointment.id)}
            >
              <XCircle size={16} />
              Cancel Appointment
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
