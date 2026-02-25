"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Calendar, Clock, User, Stethoscope } from "lucide-react";

export default function AppointmentsPage() {
  const [appointment, setAppointment] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("appointment");
    if (data) {
      setAppointment(JSON.parse(data));
    }
  }, []);

  const handleCancel = () => {
    localStorage.removeItem("appointment");
    setAppointment(null);
    toast.error("Appointment cancelled successfully!");
  };

  if (!appointment) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">
          No appointment booked.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      
      <h1 className="text-2xl font-semibold">
        Your Appointment Details
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-6 space-y-6 border border-gray-100">

        {/* Status Badge */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold">
              Dr. Name - {appointment.doctorName}
            </h2>
            <p className="text-gray-500 flex items-center gap-2 mt-1">
              <Stethoscope size={16} />
              {appointment.specialization}
            </p>
          </div>

          <span className="px-4 py-1 text-sm rounded-full bg-green-100 text-green-700 font-medium">
            {appointment.status}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">

          <div className="space-y-3">
            <p className="flex items-center gap-2 text-gray-600">
              <Calendar size={16} />
              <strong>Date:</strong> {appointment.date}
            </p>

            <p className="flex items-center gap-2 text-gray-600">
              <Clock size={16} />
              <strong>Time:</strong> {appointment.slot}
            </p>

            <p className="flex items-center gap-2 text-gray-600">
              <User size={16} />
              <strong>Patient:</strong> {appointment.name}
            </p>
          </div>

          <div className="space-y-3">
            <p>
              <strong>Age:</strong> {appointment.age}
            </p>

            <p>
              <strong>Visit Type:</strong>{" "}
              {appointment.firstVisit === "yes"
                ? "First Visit"
                : "Follow-up"}
            </p>

            <p>
              <strong>Health Issue:</strong>{" "}
              {appointment.issue}
            </p>
          </div>

        </div>

        {/* Cancel Button */}
        <div className="pt-4 flex justify-end">
          <Button
            onClick={handleCancel}
            className="bg-red-600 hover:bg-red-700"
          >
            Cancel Appointment
          </Button>
        </div>

      </div>
    </div>
  );
}