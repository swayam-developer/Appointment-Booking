"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useBooking } from "@/context/BookingContext";
import { toast } from "react-toastify";
import { format } from "date-fns";

interface Props {
  doctorId: string;
  doctorName: string;
  specialization: string;
  availability: string;
  time: string[];
  fee: number;
}

const dayMap: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

export default function BookingSection({
  doctorId,
  doctorName,
  specialization,
  availability,
  time,
  fee,
}: Props) {
  const router = useRouter();
  const { setBooking } = useBooking();

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>(time);

  // Parse doctor availability (Mon - Fri)
  const [start, end] = availability.split("-").map((d) => d.trim());

  const startNum = dayMap[start];
  const endNum = dayMap[end];

  const allowedDays: number[] = [];
  for (let i = startNum; i <= endNum; i++) {
    allowedDays.push(i);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isDisabledDay = (date: Date) => {
    const day = date.getDay();
    return date < today || !allowedDays.includes(day);
  };

  // Fetch rescheduled slots when date changes
  useEffect(() => {
    const fetchRescheduledSlots = async () => {
      if (!selectedDate) return;

      try {
        const res = await fetch("http://localhost:5000/doctors/1");
        const doctor = await res.json();

        const selected = format(selectedDate, "yyyy-MM-dd");

        if (doctor.rescheduleDate === selected && doctor.slots?.length) {
          setAvailableSlots(doctor.slots);
        } else {
          setAvailableSlots(time);
        }

        setSelectedSlot(null);
      } catch (error) {
        console.error("Failed to fetch updated slots");
      }
    };

    fetchRescheduledSlots();
  }, [selectedDate, time]);

  const handleBook = () => {
    if (!selectedDate || !selectedSlot) {
      toast.error("Select date and time slot");
      return;
    }

    setBooking({
      doctorId,
      doctorName,
      specialization,
      date: format(selectedDate, "yyyy-MM-dd"),
      time: selectedSlot,
      fee,
    });

    router.push("/dashboard/patient-details");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm space-y-6">
      <h2 className="text-lg font-semibold">Book Appointment</h2>

      {/* Calendar */}
      <div>
        <p className="text-sm font-medium mb-3">Select Date</p>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={isDisabledDay}
          className="rounded-md border"
        />

        <p className="text-sm text-gray-500 mt-2">
          Doctor available: {availability}
        </p>
      </div>

      {/* Time Slots */}
      <div>
        <p className="text-sm font-medium mb-3">Available Time Slots</p>

        {!selectedDate && (
          <p className="text-sm text-gray-400">
            Select a date to view available slots
          </p>
        )}

        <div className="flex flex-wrap gap-3">
          {selectedDate &&
            availableSlots?.map((slot, index) => {
              const isSelected = selectedSlot === slot;

              return (
                <button
                  key={index}
                  type="button"
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
        <span className="text-2xl font-semibold text-primary">₹{fee}</span>

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
