"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface Props {
  onLoginSuccess: () => void;
}

export default function DoctorLogin({ onLoginSuccess }: Props) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const validate = () => {
    if (!form.email || !form.password) {
      toast.error("All fields are required");
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // Mock login logic
    if (form.email === "doctor@test.com" && form.password === "123456") {
      toast.success("Login successful!");
      onLoginSuccess();
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Doctor Login
      </h1>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full border rounded-lg px-4 py-2"
        />

        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          Login
        </Button>
      </div>
    </div>
  );
}