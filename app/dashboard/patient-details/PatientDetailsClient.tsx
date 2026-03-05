"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useBooking } from "@/context/BookingContext";

export default function PatientDetailsClient() {
  const router = useRouter();
  const { booking } = useBooking();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    issue: "",
    firstVisit: "yes",
  });

  if (!booking) {
    return (
      <div className="p-6 text-center">
        {" "}
        <h2 className="text-xl font-semibold">No booking data found. </h2>{" "}
      </div>
    );
  }

  const handleConfirm = () => {
    if (!form.name || !form.age || !form.gender || !form.phone || !form.issue) {
      toast.error("Please fill all fields");
      return;
    }

    const appointment = {
      id: Date.now(),
      doctorId: booking.doctorId || 1,
      doctorName: booking.doctorName,
      specialization: booking.specialization,

      patientName: form.name,
      age: form.age,
      gender: form.gender,
      phone: form.phone,

      problem: form.issue,
      firstVisit: form.firstVisit,

      date: booking.date,
      time: booking.time,

      status: "confirmed",
    };

    const existingAppointments = JSON.parse(
      localStorage.getItem("appointments") || "[]",
    );

    existingAppointments.push(appointment);

    localStorage.setItem("appointments", JSON.stringify(existingAppointments));

    window.dispatchEvent(new Event("appointmentUpdated"));

    toast.success("Appointment booked successfully!");

    setTimeout(() => {
      router.push("/dashboard/appointments");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {" "}
      <h1 className="text-2xl font-semibold">Patient Details</h1>
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-4 py-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="number"
          placeholder="Age"
          className="w-full border rounded-lg px-4 py-2"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-2"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full border rounded-lg px-4 py-2"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <textarea
          placeholder="Describe your health issue"
          className="w-full border rounded-lg px-4 py-2"
          value={form.issue}
          onChange={(e) => setForm({ ...form, issue: e.target.value })}
        />

        <select
          className="w-full border rounded-lg px-4 py-2"
          value={form.firstVisit}
          onChange={(e) => setForm({ ...form, firstVisit: e.target.value })}
        >
          <option value="yes">First Visit</option>
          <option value="no">Follow-up</option>
        </select>

        <Button
          onClick={handleConfirm}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Confirm Appointment
        </Button>
      </div>
    </div>
  );
}
