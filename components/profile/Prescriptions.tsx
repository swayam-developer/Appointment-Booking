"use client";

import { usePrescriptions } from "@/context/PrescriptionContext";
import { Button } from "@/components/ui/button";
import { FileText, Download, Trash2, File } from "lucide-react";
import { toast } from "react-toastify";

export default function PrescriptionTab() {
  const { prescriptions, deletePrescription } = usePrescriptions();

  const downloadFile = (file: string, name: string) => {
    const link = document.createElement("a");

    link.href = file;

    link.download = name;

    link.click();
  };

  const handleDelete = (id: number) => {
    deletePrescription(id);

    toast.success("Prescription deleted");
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <File size={18} />
        Your Prescriptions
      </h2>

      {prescriptions.length === 0 && (
        <div className="text-gray-500 border rounded-xl p-6 text-center">
          No prescriptions available
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {prescriptions.map((p) => (
          <div
            key={p.id}
            className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col gap-4"
          >
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <FileText className="text-blue-600" />

                <div>
                  <p className="font-medium">{p.fileName}</p>

                  <p className="text-xs text-gray-500">{p.date}</p>
                </div>
              </div>
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                Doctor: <span className="font-medium">{p.doctorName}</span>
              </p>

              <p>
                Patient: <span className="font-medium">{p.patientName}</span>
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                size="sm"
                className="flex gap-2"
                onClick={() => downloadFile(p.file, p.fileName)}
              >
                <Download size={16} />
                Download
              </Button>

              <Button
                size="sm"
                variant="destructive"
                className="flex gap-2"
                onClick={() => handleDelete(p.id)}
              >
                <Trash2 size={16} />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
