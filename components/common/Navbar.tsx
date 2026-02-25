"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearch } from "@/context/SearchContext";
import { Search } from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const { setSearch } = useSearch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsed = JSON.parse(user);
      setUsername(parsed.name);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className="bg-white shadow px-6 py-4 flex items-center justify-between">
      {/* Left */}
      <h1 className="font-semibold text-lg text-primary">
        Welcome To Schedula
      </h1>

      {/* Center Search */}
      <div className="w-1/3 relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search doctors..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg 
               focus:outline-none focus:ring-2 focus:ring-blue-500 
               transition duration-200"
        />
      </div>

      {/* Right Profile */}
      <div className="flex items-center gap-4">
        <Image
          src={`/UserProfile/Avatar.png`}
          alt="User Avatar"
          width={45}
          height={45}
          className="rounded-full border border-gray-300"
        />

        <div className="text-sm">
          <p className="font-medium">Hi, {username}</p>
          <button
            onClick={handleLogout}
            className="text-red-500 text-xs hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
