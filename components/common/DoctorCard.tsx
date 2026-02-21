"use client";

import { Doctor } from "@/types";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  doctor: Doctor;
}

export default function DoctorCard({ doctor }: Props) {
  const router = useRouter();

  return (
    <Card className="p-5 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Top Section */}
      <div className="flex items-start gap-4">
        <Image
          src={`/doctors/${doctor.id}.jpg`}
          alt={`${doctor.name} profile image`}
          width={100}
          height={100}
          className="rounded-xl object-cover border border-gray-200 shadow-sm w-[120px] h-[120px]"
        />

        <div className="flex-1">
          <h3 className="font-semibold text-lg">{doctor.name}</h3>

          <p className="text-sm text-gray-500 flex items-center gap-1">
            <Stethoscope size={14} className="text-primary" />
            {doctor.specialization}
          </p>

          <p className="text-sm text-gray-500">
            {doctor.experience} Experience
          </p>

          <div className="flex items-center gap-1 mt-1 text-yellow-500 text-sm">
            <Star size={14} fill="currentColor" />
            {doctor.rating}
          </div>
        </div>
      </div>

      {/* Middle Section */}
      <div className="mt-4 space-y-2 text-sm text-gray-600 flex-1">
        <p>
          <span className="font-medium">Hospital:</span> {doctor.hospital}
        </p>

        <p className="flex items-center gap-1">
          <MapPin size={14} />
          {doctor.location}
        </p>

        <p>
          <span className="font-medium">Languages:</span>{" "}
          {doctor.languages.join(", ")}
        </p>

        <p>
          <span className="font-medium">Available:</span> {doctor.availability}
        </p>
      </div>

      {/* Fee Section - ALWAYS AT BOTTOM */}
      <div className="pt-4 flex justify-between items-center border-t mt-auto">
        <span className="text-primary font-semibold text-lg">
          ₹{doctor.consultationFee}
        </span>

        <Button
          className="rounded-xl"
          onClick={() => router.push(`/dashboard/doctors/${doctor.id}`)}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
