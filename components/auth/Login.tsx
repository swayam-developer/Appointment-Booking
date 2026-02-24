"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;

    localStorage.setItem("user", JSON.stringify({ name: "John Doe", email }));
    router.push("/otp");
  };

  return (
    <div className="w-full max-w-md space-y-8">
      
      {/* Heading */}
      <div>
        <h2 className="text-3xl font-semibold text-blue-700">
          Welcome Back
        </h2>
        <p className="text-gray-500 mt-2">
          Sign in to continue booking appointments
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">

        {/* Email */}
        <div>
          <label className="text-sm font-medium">
            Email
          </label>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium">
            Password
          </label>
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* Button */}
        <Button
          className="w-full bg-blue-700 hover:bg-blue-800 text-white transition duration-300"
          onClick={handleLogin}
        >
          Login
        </Button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-blue-700 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
