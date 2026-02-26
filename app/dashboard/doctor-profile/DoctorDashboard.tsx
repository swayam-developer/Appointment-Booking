"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

export default function DoctorDashboard() {

  const url = process.env.NEXT_PUBLIC_API_URL;

  const [doctor, setDoctor] = useState<any>({
    availableFromDate: "",
    availableToDate: "",
    startTime: "",
    endTime: "",
    slotDuration: "15",
  });

  useEffect(() => {
    fetch(`${url}/doctors/1`)
      .then((res) => res.json())
      .then((data) => {
        setDoctor({
          availableFromDate: data.availableFromDate || "",
          availableToDate: data.availableToDate || "",
          startTime: data.startTime || "",
          endTime: data.endTime || "",
          slotDuration: data.slotDuration || "15",
        });
      });
  }, []);

  const generateSlots = (start: string, end: string, duration: number) => {
    const slots: string[] = [];

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

    let current = toMinutes(start);
    const endMinutes = toMinutes(end);

    while (current < endMinutes) {
      slots.push(formatTime(current));
      current += duration;
    }

    return slots;
  };

  const handleUpdate = async () => {
    try {
      // Fetch existing doctor
      const existingRes = await fetch(`${url}/doctors/1`);
      const existingDoctor = await existingRes.json();

      // Generate new slots
      const newSlots = generateSlots(
        doctor.startTime,
        doctor.endTime,
        Number(doctor.slotDuration),
      );

      // Merge updated availability only
      const updatedDoctor = {
        ...existingDoctor,
        availableFromDate: doctor.availableFromDate,
        availableToDate: doctor.availableToDate,
        startTime: doctor.startTime,
        endTime: doctor.endTime,
        slotDuration: doctor.slotDuration,
        slots: newSlots,
      };

      // PATCH merged object
      const res = await fetch(`${url}/doctors/1`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          availableFromDate: updatedDoctor.availableFromDate,
          availableToDate: updatedDoctor.availableToDate,
          startTime: updatedDoctor.startTime,
          endTime: updatedDoctor.endTime,
          slotDuration: updatedDoctor.slotDuration,
          slots: updatedDoctor.slots,
        }),
      });

      if (res.ok) {
        setDoctor(updatedDoctor); 
        toast.success("Appointment's updated!");
        window.dispatchEvent(new Event("doctorUpdated"));
      } else {
        toast.error("Update failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Doctor Dashboard</h1>

      <div className="bg-white p-6 rounded-2xl shadow-md space-y-6 border">
        <div>
          <h2 className="font-medium mb-2">Availability Dates</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="date"
              value={doctor.availableFromDate}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  availableFromDate: e.target.value,
                })
              }
              className="border rounded-lg px-4 py-2"
            />

            <input
              type="date"
              value={doctor.availableToDate}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  availableToDate: e.target.value,
                })
              }
              className="border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div>
          <h2 className="font-medium mb-2">Time Slots Setup</h2>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="time"
              value={doctor.startTime}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  startTime: e.target.value,
                })
              }
              className="border rounded-lg px-4 py-2"
            />

            <input
              type="time"
              value={doctor.endTime}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  endTime: e.target.value,
                })
              }
              className="border rounded-lg px-4 py-2"
            />

            <select
              value={doctor.slotDuration}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  slotDuration: e.target.value,
                })
              }
              className="border rounded-lg px-4 py-2"
            >
              <option value="15">15 mins</option>
              <option value="30">30 mins</option>
              <option value="45">45 mins</option>
              <option value="60">60 mins</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
