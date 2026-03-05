"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function RescheduleSlotsPage() {
  const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const router = useRouter();

  const [date, setDate] = useState<Date | undefined>();

  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");

  const [slotDuration, setSlotDuration] = useState(15);

  const [appointmentType, setAppointmentType] = useState("individual");

  const [maxPatients, setMaxPatients] = useState(1);

  const [slots, setSlots] = useState<string[]>([]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const generateSlots = () => {
    if (startTime >= endTime) {
      toast.error("End time must be greater than start time");
      return;
    }

    const toMinutes = (time: string) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    const formatTime = (minutes: number) => {
      const h = Math.floor(minutes / 60);
      const m = minutes % 60;

      const ampm = h >= 12 ? "PM" : "AM";
      const hour = h % 12 || 12;

      return `${hour}:${m.toString().padStart(2, "0")} ${ampm}`;
    };

    let current = toMinutes(startTime);
    const end = toMinutes(endTime);

    const generated: string[] = [];

    while (current < end) {
      generated.push(formatTime(current));

      current += slotDuration;
    }

    setSlots(generated);

    toast.success("Slots generated successfully");
  };

  const refreshDoctorData = async () => {
    try {
      const res = await fetch(`${url}/doctors/1`);

      if (!res.ok) {
        throw new Error("Failed to refresh doctor data");
      }

      const doctor = await res.json();

      setSlots(doctor.slots || []);
    } catch (error) {
      console.error("Refresh error");
    }
  };

  const handleSaveSlots = async () => {
    if (!date) {
      toast.error("Select a date first");
      return;
    }

    if (slots.length === 0) {
      toast.error("Generate slots before saving");
      return;
    }

    try {
      const getDoctor = await fetch(`${url}/doctors/1`);

      if (!getDoctor.ok) {
        throw new Error("Failed to fetch doctor");
      }

      const doctor = await getDoctor.json();

      const updatedDoctor = {
        ...doctor,

        rescheduleDate: format(date, "yyyy-MM-dd"),

        startTime,
        endTime,

        slotDuration,

        appointmentType,

        maxPatients,

        slots,
      };

      const updateRes = await fetch(`${url}/doctors/1`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(updatedDoctor),
      });

      if (!updateRes.ok) {
        throw new Error("Failed to update slots");
      }

      toast.success("Slots updated successfully");

      await refreshDoctorData();

      router.refresh();

      setSlots([]);
      setDate(undefined);
    } catch (error) {
      console.error(error);

      toast.error("Error updating slots");
    }
  };

  return (
    <div className="w-full p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Reschedule Time Slots</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-6">
        {/* Date */}

        <div>
          <p className="font-medium mb-3">Select Date</p>

          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < today}
            className="border rounded-md"
          />
        </div>

        {/* Time Settings */}

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-medium">Start Time</label>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border rounded-lg w-full px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">End Time</label>

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="border rounded-lg w-full px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Slot Duration</label>

            <select
              value={slotDuration}
              onChange={(e) => setSlotDuration(Number(e.target.value))}
              className="border rounded-lg w-full px-3 py-2 mt-1"
            >
              <option value={15}>15 minutes</option>
              <option value={20}>20 minutes</option>
              <option value={30}>30 minutes</option>
            </select>
          </div>
        </div>

        {/* Appointment Type */}

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Appointment Type</label>

            <select
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
              className="border rounded-lg w-full px-3 py-2 mt-1"
            >
              <option value="individual">
                Individual (1 patient per slot)
              </option>

              <option value="group">Group (Multiple patients per slot)</option>
            </select>
          </div>

          {appointmentType === "group" && (
            <div>
              <label className="text-sm font-medium">
                Max Patients per Slot
              </label>

              <input
                type="number"
                min={1}
                value={maxPatients}
                onChange={(e) => setMaxPatients(Number(e.target.value))}
                className="border rounded-lg w-full px-3 py-2 mt-1"
              />
            </div>
          )}
        </div>

        {/* Generate */}

        <Button
          onClick={generateSlots}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Generate Slots
        </Button>

        {/* Slots Preview */}

        {slots.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {slots.map((slot, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                {slot}
              </span>
            ))}
          </div>
        )}

        {/* Save */}

        {slots.length > 0 && (
          <Button
            onClick={handleSaveSlots}
            className="bg-green-600 hover:bg-green-700"
          >
            Save Slots
          </Button>
        )}
      </div>
    </div>
  );
}
