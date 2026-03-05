"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Stethoscope, Mail, Lock } from "lucide-react";

export default function DoctorLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    if (email && password) {
      router.push("/doctor/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Branding */}{" "}
      <div className="hidden md:flex flex-1 bg-blue-600 text-white items-center justify-center">
        {" "}
        <div className="max-w-md text-center space-y-6 px-6">
          {" "}
          <div className="flex justify-center">
            {" "}
            <Stethoscope size={50} />{" "}
          </div>
          <h1 className="text-3xl font-semibold">Doctor Portal</h1>
          <p className="text-blue-100 leading-relaxed">
            Manage appointments, prescriptions and patient reports in one secure
            place. Access your dashboard to streamline patient care.
          </p>
        </div>
      </div>
      {/* Login Form Side */}
      <div className="flex flex-1 items-center justify-center p-6">
        <form
          onSubmit={handleLogin}
          className="bg-white/90 backdrop-blur shadow-md rounded-2xl p-10 w-full max-w-md space-y-6 border border-blue-100"
        >
          {/* Title */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-semibold text-gray-800">
              Doctor Login
            </h2>

            <p className="text-sm text-blue-600">
             Please sign in to your account.
            </p>
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type="email"
              placeholder="Doctor Email"
              required
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type="password"
              placeholder="Password"
              required
              className="w-full border rounded-lg pl-10 pr-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none transition"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <a href="#" className="text-xs text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition flex justify-center items-center gap-2">
            Login 
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 text-gray-400 text-xs">
            <div className="flex-1 h-px bg-gray-200"></div>
            Secure Doctor Access
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500">
            Don’t have an account?{" "}
            <a
              href="/login"
              className="text-blue-600 font-medium hover:underline"
            >
              Back to user login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
