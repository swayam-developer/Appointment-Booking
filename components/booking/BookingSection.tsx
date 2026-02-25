"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

interface Props {
  doctorId: string;
  doctorName:string;
  specialization:string;
  slots: string[];
  fee: number;
}

export default function BookingSection({
  doctorId,
  doctorName,
  specialization,
  slots,
  fee,
}: Props) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) return;

   router.push(
  `/dashboard/patient-details?doctorId=${doctorId}&doctorName=${doctorName}&specialization=${specialization}&date=${selectedDate}&slot=${selectedSlot}`
);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Book Appointment</h2>

      {/* Date Picker */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Select Date
        </label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Time Slots */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Available Time Slots
        </label>

        <div className="flex flex-wrap gap-3">
          {slots.map((slot, index) => {
            const isSelected = selectedSlot === slot;

            return (
              <button
                key={index}
                onClick={() => setSelectedSlot(slot)}
                className={`px-4 py-2 rounded-lg border transition 
                  ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300 hover:bg-blue-50"
                  }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4">
        <span className="text-2xl font-semibold text-primary">
          ₹{fee}
        </span>

        <Button
          onClick={handleBook}
          disabled={!selectedDate || !selectedSlot}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}