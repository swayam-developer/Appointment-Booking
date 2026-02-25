"use client";

import DoctorCard from "@/components/common/DoctorCard";
import { Doctor } from "@/types";
import { useSearch } from "@/context/SearchContext";

interface Props {
  doctors: Doctor[];
}

export default function DoctorsClient({ doctors }: Props) {
  const { search } = useSearch();

  const filteredDoctors = doctors.filter((doc) =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredDoctors.length > 0 ? (
        filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No doctors found.
        </div>
      )}
    </div>
  );
}