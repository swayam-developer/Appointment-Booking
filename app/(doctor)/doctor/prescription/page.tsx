"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePrescriptions } from "@/context/PrescriptionContext";
import { toast } from "react-toastify";
import { Upload, FileText, File } from "lucide-react";

export default function DoctorPrescriptionPage() {
  const { addPrescription } = usePrescriptions();

  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!file) {
      toast.error("Select a PDF file");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result as string;

      addPrescription({
        id: Date.now(),
        doctorName: "Dr. Sharma",
        patientName: "Swayam",
        date: new Date().toLocaleDateString(),
        fileName: file.name,
        file: base64,
      });

      toast.success("Prescription uploaded successfully");

      setFile(null);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <File className="text-blue-600" size={28} />

        <h1 className="text-2xl font-semibold">Prescription Manager</h1>
      </div>

      <div className="bg-white shadow-sm rounded-2xl border p-8 space-y-6">
        <h2 className="text-lg font-medium">Upload Patient Prescription</h2>

        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-blue-500 transition">
          <Upload className="text-gray-400 mb-3" size={36} />

          <p className="text-sm text-gray-500">Upload prescription PDF</p>

          <input
            type="file"
            accept="application/pdf"
            className="mt-4"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        {file && (
          <div className="flex items-center justify-between bg-gray-50 border rounded-lg p-4">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" />

              <div>
                <p className="text-sm font-medium">{file.name}</p>

                <p className="text-xs text-gray-500">Ready to upload</p>
              </div>
            </div>
          </div>
        )}

        <Button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Upload Prescription
        </Button>
      </div>
    </div>
  );
}
