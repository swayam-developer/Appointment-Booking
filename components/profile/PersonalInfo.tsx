"use client";

import {
  User,
  HeartPulse,
  Activity,
  AlertCircle,
  ShieldPlus,
  Heart,
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-8 space-y-6">

      <h1 className="text-2xl font-semibold text-gray-800">
        My Health Reports
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Personal Info */}
        <Card
          icon={<User />}
          title="Personal Information"
          color="bg-blue-50"
          items={[
            { label: "Age", value: "25" },
            { label: "Gender", value: "Male" },
            { label: "Blood Group", value: "A+" },
          ]}
        />

        {/* Physical Details */}
        <Card
          icon={<Activity />}
          title="Physical Details"
          color="bg-green-50"
          items={[
            { label: "Height", value: "Not set" },
            { label: "Weight", value: "Not set" },
            { label: "BMI", value: "Not available" },
          ]}
        />

        {/* Lifestyle */}
        <Card
          icon={<Heart />}
          title="Lifestyle"
          color="bg-purple-50"
          items={[
            { label: "Smoking", value: "Not specified" },
            { label: "Alcohol", value: "Not specified" },
          ]}
        />

        {/* Insurance */}
        <Card
          icon={<ShieldPlus />}
          title="Insurance"
          color="bg-orange-50"
          items={[
            { label: "Provider", value: "Not set" },
            { label: "Number", value: "Not set" },
          ]}
        />

        {/* Medical Conditions */}
        <Card
          icon={<AlertCircle />}
          title="Medical Conditions"
          color="bg-red-50"
          items={[{ label: "", value: "None reported" }]}
        />

        {/* Allergies */}
        <Card
          icon={<HeartPulse />}
          title="Allergies"
          color="bg-yellow-50"
          items={[{ label: "", value: "None reported" }]}
        />
      </div>
    </div>
  );
}

function Card({ icon, title, items, color }: any) {
  return (
    <div
      className={`${color} p-6 rounded-xl shadow-sm border 
      hover:shadow-lg hover:scale-[1.02] transition duration-300 cursor-pointer`}
    >
      <div className="flex items-center gap-2 mb-4 font-semibold text-gray-700">
        {icon}
        {title}
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        {items.map((item: any, i: number) => (
          <div key={i} className="flex justify-between">
            <span>{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}