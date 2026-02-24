"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function OtpForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-blue-700">OTP Verification</h2>

      <div className="flex justify-between">
        {otp.map((digit, index) => (
          <input
            key={index}
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-14 h-14 border rounded-lg text-center"
          />
        ))}
      </div>

      <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white transition duration-300" onClick={handleVerify}>
        Verify
      </Button>
    </div>
  );
}
