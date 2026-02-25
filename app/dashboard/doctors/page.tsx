export const dynamic = "force-dynamic";
import { getAllDoctors } from "@/services/api";
import DoctorsClient from "./DoctorsClient";
import { Doctor } from "@/types";

export default async function DoctorsPage() {
  const doctors: Doctor[] | null = await getAllDoctors();

  if (!doctors) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl font-semibold">
          Failed to load doctors
        </h1>
      </div>
    );
  }
  return <DoctorsClient doctors={doctors || []} />;
}