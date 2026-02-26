"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";
import { SearchProvider } from "@/context/SearchContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BookingProvider } from "@/context/BookingContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SearchProvider>
        <BookingProvider>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <div className="flex flex-col flex-1">
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-1 p-6">{children}</main>
          <ToastContainer position="top-right" autoClose={3000} />

          {/* Footer */}
          <Footer />
        </div>
        </BookingProvider>
      </SearchProvider>
    </div>
  );
}
