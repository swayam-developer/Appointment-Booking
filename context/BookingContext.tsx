"use client";

import { createContext, useContext, useState } from "react";

interface BookingData {
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  slot: string;
  fee: number;
}

interface BookingContextType {
  booking: BookingData | null;
  setBooking: (data: BookingData) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

export function BookingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [booking, setBookingState] = useState<BookingData | null>(null);

  const setBooking = (data: BookingData) => {
    setBookingState(data);
  };

  const clearBooking = () => {
    setBookingState(null);
  };

  return (
    <BookingContext.Provider
      value={{ booking, setBooking, clearBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return context;
}