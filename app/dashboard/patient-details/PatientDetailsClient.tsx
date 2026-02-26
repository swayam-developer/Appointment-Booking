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
    issue: "",
    firstVisit: "yes",
  });

  if (!booking) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">
          No booking data found.
        </h2>
      </div>
    );
  }

  const handleConfirm = () => {
    if (!form.name || !form.age || !form.issue) {
      toast.error("Please fill all fields");
      return;
    }

    const appointment = {
      ...booking,
      name: form.name,
      age: form.age,
      issue: form.issue,
      firstVisit: form.firstVisit,
      status: "Confirmed",
    };

    localStorage.setItem("appointment", JSON.stringify(appointment));

    toast.success("Appointment booked successfully!");

    setTimeout(() => {
      router.push("/dashboard/appointments");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Patient Details</h1>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border rounded-lg px-4 py-2"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="number"
          placeholder="Age"
          className="w-full border rounded-lg px-4 py-2"
          value={form.age}
          onChange={(e) =>
            setForm({ ...form, age: e.target.value })
          }
        />

        <textarea
          placeholder="Health Issue"
          className="w-full border rounded-lg px-4 py-2"
          value={form.issue}
          onChange={(e) =>
            setForm({ ...form, issue: e.target.value })
          }
        />

        <select
          className="w-full border rounded-lg px-4 py-2"
          value={form.firstVisit}
          onChange={(e) =>
            setForm({ ...form, firstVisit: e.target.value })
          }
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