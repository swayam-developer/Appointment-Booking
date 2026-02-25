import { getDoctorById } from "@/services/api";
import { Doctor } from "@/types";
import Image from "next/image";
import { Star, MapPin, Stethoscope } from "lucide-react";
import BookingSection from "@/components/booking/BookingSection";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DoctorDetailPage({ params }: Props) {
  const { id } = await params;
  console.log("Fetching doctor with ID:", id);

  const doctor: Doctor | null = await getDoctorById(id);

  if (!doctor) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">Doctor not found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Top Profile Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6">
        <Image
          src={`/doctors/${doctor.id}.jpg`}
          alt={`${doctor.name || "Doctor"} profile image`}
          width={150}
          height={150}
          className="rounded-2xl object-cover border border-gray-200"
        />

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-semibold">{doctor.name}</h1>

          <p className="flex items-center gap-2 text-gray-600">
            <Stethoscope size={16} className="text-primary" />
            {doctor.specialization}
          </p>

          <p className="text-gray-600">{doctor.experience} Experience</p>

          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={16} fill="currentColor" />
            {doctor.rating}
          </div>

          <p className="text-gray-600">{doctor.qualification}</p>
        </div>
      </div>

      {/* Hospital Info */}
      <div className="bg-white p-6 rounded-2xl shadow-sm space-y-3">
        <p className="flex items-center gap-2">
          <MapPin size={16} />
          {doctor.hospital}, {doctor.location}
        </p>

        <p>
          <span className="font-medium">Languages:</span>{" "}
          {doctor.languages?.join(", ")}
        </p>

        <p>
          <span className="font-medium">Available:</span> {doctor.availability}
        </p>
      </div>

      {/* About Doctor */}
      <div className="bg-white p-6 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold mb-2">About Doctor</h2>
        <p className="text-gray-600 leading-relaxed">{doctor.description}</p>
      </div>

      {/* Slot Booking Section */}
      <BookingSection
        doctorId={doctor.id}
        doctorName={doctor.name}
        specialization={doctor.specialization}
        slots={doctor.slots || []}
        fee={doctor.consultationFee}
      />
    </div>
  );
}
