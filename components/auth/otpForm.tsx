"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function OtpForm() {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // Timer Logic
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    router.push("/dashboard");
  };

  const handleResend = () => {
    if (!canResend) return;

    setTimer(30);
    setCanResend(false);
  };

  return (
    <div className="space-y-8">
      
      {/* Heading */}
      <div>
        <h2 className="text-3xl font-semibold text-blue-700">
          OTP Verification
        </h2>
        <p className="text-gray-500 mt-2">
          We’ve sent a 4-digit OTP to your registered mobile number.
        </p>
      </div>

      {/* OTP Inputs */}
      <div className="flex justify-between gap-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            maxLength={1}
            value={digit}
            ref={(el) => (inputsRef.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            className="w-14 h-14 border border-gray-300 rounded-lg text-center text-xl font-semibold 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        ))}
      </div>

      {/* Verify Button */}
      <Button
        className="w-full bg-blue-700 hover:bg-blue-800 text-white transition duration-300"
        onClick={handleVerify}
      >
        Verify OTP
      </Button>

      {/* Resend Section */}
      <div className="text-center text-sm">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-blue-600 font-medium hover:underline"
          >
            Resend OTP
          </button>
        ) : (
          <p className="text-gray-500">
            Resend OTP in <span className="font-medium">{timer}s</span>
          </p>
        )}
      </div>
    </div>
  );
}