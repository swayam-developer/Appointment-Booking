"use client";

import Logo from "@/components/common/Logo";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full flex">
      
      {/* LEFT SIDE - Background Image */}
      <div className="relative w-1/2 hidden md:block">
        <Image
          src="/medicalBg.avif"
          alt="Doctor consultation"
          fill
          priority
          className="object-cover"
        />

        {/* Caption */}
        <div className="absolute bottom-20 left-12 text-white max-w-md">
          <h1 className="text-4xl font-semibold leading-tight text-gray-900">
            Book Care.
            <br />
            Skip the Waiting.
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Trusted doctors. Seamless appointments.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - Login Full Height */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md px-8">
          
          <div className="mt-15 mb-10 flex justify-center">
            <Logo centered />
          </div>

          {children}

        </div>
      </div>
    </div>
  );
}