"use client";

import { useAppointments } from "@/context/AppointmentContext";
import { Eye, FileText, XCircle } from "lucide-react";

export default function DoctorDashboard() {
  const { appointments } = useAppointments();

  return (
    <div className="space-y-8">

      {/* Page Title */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">
          Doctor Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Manage your patient appointments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Today's Appointments</p>
          <h2 className="text-2xl font-semibold">
            {appointments.length}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Upcoming</p>
          <h2 className="text-2xl font-semibold">
            {appointments.filter(a => a.status === "confirmed").length}
          </h2>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Completed</p>
          <h2 className="text-2xl font-semibold">
            {appointments.filter(a => a.status === "completed").length}
          </h2>
        </div>

      </div>

      {/* Appointment Table */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">

        <div className="px-6 py-4 border-b">
          <h2 className="font-semibold text-gray-700">
            Patient Appointments
          </h2>
        </div>

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600">

            <tr>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Problem</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>

          </thead>

          <tbody>

            {appointments.map((appt) => (
              <tr
                key={appt.id}
                className="border-t hover:bg-gray-50 transition"
              >

                {/* Patient */}
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium">{appt.patientName}</p>
                    <p className="text-xs text-gray-500">
                      {appt.phone}
                    </p>
                  </div>
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  {appt.date}
                </td>

                {/* Time */}
                <td className="px-6 py-4">
                  {appt.time}
                </td>

                {/* Problem */}
                <td className="px-6 py-4 text-gray-600">
                  {appt.problem}
                </td>

                {/* Status */}
                <td className="px-6 py-4">

                  <span className={`px-3 py-1 text-xs rounded-full
                  ${
                    appt.status === "confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                    {appt.status}
                  </span>

                </td>

                {/* Actions */}
                <td className="px-6 py-4 flex gap-2">

                  <button className="p-2 rounded-lg hover:bg-blue-50 text-blue-600">
                    <Eye size={18} />
                  </button>

                  <button className="p-2 rounded-lg hover:bg-green-50 text-green-600">
                    <FileText size={18} />
                  </button>

                  <button className="p-2 rounded-lg hover:bg-red-50 text-red-600">
                    <XCircle size={18} />
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}